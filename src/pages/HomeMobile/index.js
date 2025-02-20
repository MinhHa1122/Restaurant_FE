import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { useEffect, useState,useMemo, useRef } from "react";
import { Cookies } from 'react-cookie';
import * as Icon from 'react-feather';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders,faHouse,faBasketShopping,faBell,faStar,faPlus, faClipboard, } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Slider from "./Slider/index"
import SliderImg from "../../Asset/images/102557336_3097466270292175_2765808264509443624_n.jpg"
// scss
import './HomeMobile.scss'

function App() {
    const cookies = new Cookies
    // State
    const [products, setProducts] = useState([])
    const [categoris, setCategoris] = useState([])
    const [page, setPage] = useState(1)
    const [checkActiveCate, setCheckActiveCate] = useState(0)
    const [amountCard, setAmountCard] = useState(0)
    const cardButton = useRef([])
    const cartProduct = useRef([])
    const animationRef = useRef([])
    const buttonFakeAddCard = useRef([])
    // Call Api
  // Gửi dữ liệu lên API
  async function fillterpProductCate(IdCate) {
    setCheckActiveCate(IdCate)
    try {
        const response = await axios.post(`${process.env.REACT_APP_IP_SEVER}/api/v12/filterproductcate`, {IdCate:IdCate,token:cookies.get('AccessTokenOrder')});
       if(response.data.massege === 'Thanh cong') {
            setProducts(response.data.data)
            animationRef.current.forEach((ani) => {
                cancelAnimationFrame(ani)
            })
            buttonFakeAddCard.current.forEach((btn) => {
                btn.classList.remove('open')
            })
       }
    } catch (error) {   
        console.error('Lỗi khi thêm sản phẩm:', error);
        // Xử lý lỗi tại đây.
    }
    }
    const handlePageChange = (selectedItem) => {
        setPage(selectedItem.selected + 1)
        animationRef.current.forEach((ani) => {
            cancelAnimationFrame(ani)
        })
        buttonFakeAddCard.current.forEach((btn) => {
            btn.classList.remove('open')
        })
      };
      const handleSearchChangeInput = (e) => {
        if(page !== 1) {
            setPage(1)
        }
        const result = []
        products.forEach((product) => {
            if(product.Name.toLowerCase().includes(e.toLowerCase())) {
                result.unshift({...product,Status: 'visible'})
            }
            else {
                result.push({...product,Status: 'hidden'})
            }
        })
        if(animationRef.current.length > 0) {
            animationRef.current.forEach((ani) => {
                cancelAnimationFrame(ani)
            })
            buttonFakeAddCard.current.forEach((btn) => {
                btn.classList.remove('open')
            })
         }
        setProducts(result)
    }
      const handleClickAddCard = async (button,IdProduct) => {
        if(button !== null) {
            const newArr = JSON.parse(localStorage.getItem('card')) || []
        const result = newArr.find((product) => product.Id === IdProduct)
        if(result === undefined) {
             products.forEach((product) => {
                if(product.Id === IdProduct) {
                    buttonFakeAddCard.current[button].classList.add('open')
                    let x = 0
                    let y = 0
                    const speed = 0.9;
                    let lastTime = 0;
                    const animateAddcard = (timestamp) => {
                        if (!lastTime) lastTime = timestamp;
                        const deltaTime = timestamp - lastTime;
                        lastTime = timestamp;
                        const indexCard = cartProduct.current[2].getBoundingClientRect()
                        const icardProduct = cardButton.current[button].getBoundingClientRect()
                        const xTo = indexCard.left -  icardProduct.left
                        const yTo = indexCard.top - icardProduct.top
                        const xDistance = xTo - x;
                        const yDistance = yTo - y;
                        if (Math.abs(xDistance) > 1) {
                            x += (xDistance * (deltaTime / 500) * speed);
                        }
                    
                        if (Math.abs(yDistance) > 1) {
                            y += (yDistance * (deltaTime / 500) * speed);
                        }
                        buttonFakeAddCard.current[button].style.transform = `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px)`;
                        if (Math.abs(xDistance) > 10 || Math.abs(yDistance) > 10) {
                            animationRef.current[button] = requestAnimationFrame(animateAddcard);
                        }else {
                            buttonFakeAddCard.current[button].classList.remove('open')
                        }
                    };
                       animationRef.current[button] = requestAnimationFrame(animateAddcard)
                    newArr.push(product)
                    localStorage.setItem('card', JSON.stringify(newArr))
                    setAmountCard(prev => prev + 1)
                }
       })
   }
   else {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sản phẩm đã tồn tại !",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
   }
                }  
     }
    const handleClickAllproducts = async () => {
        setCheckActiveCate(0)
        try {
            const response = await axios.get(`${process.env.REACT_APP_IP_SEVER}/api/v12/getproductorder?token=${cookies.get('AccessTokenOrder')}`);
           if(response.data.massege === 'Thanh cong') {
                setProducts(response.data.data)
           }
        } catch (error) {   
            console.error('Lỗi khi thêm sản phẩm:', error);
        }
    }
    useEffect(() => {
            if(cookies.get('AccessTokenOrder') !== undefined) {
                axios.all([
                    axios.get(`${process.env.REACT_APP_IP_SEVER}/api/v12/getproductorder?token=${cookies.get('AccessTokenOrder')}`),
                    axios.get(`${process.env.REACT_APP_IP_SEVER}/api/v12/getcateorder?token=${cookies.get('AccessTokenOrder')}`),
                    ])
                    .then(axios.spread((Product,Categoris) => {
                        if(Product.data.massege === 'Thanh cong' && Categoris.data.massege === 'Thanh cong') {
                            setProducts(Product.data.data)
                            setCategoris(Categoris.data.data)
                        }
                    }))
                    .catch (err => {
                        console.error()
                    })
                    return () => {
                        animationRef.current.forEach((ani) => {
                            cancelAnimationFrame(ani)
                        })
                    }
            }
        },[])
      // Phân trang
      const productPage = useMemo(() => {
        const count = products.filter(item => typeof item === 'object').length
        let trang = Math.ceil(count / 6)
        let from = (page - 1) * 6;
        let to = from + 5;
        let productPage = [];
        const pageRangeDisplayed = 3; // Số lượng trang hiển thị trên thanh phân trang
        const marginPagesDisplayed = 1; // Số lượng trang trước và sau trang hiện tại
       for (let i = from; i <= to; i++) {
           if (!products[i]) {
               break
           }
           productPage.push(products[i])
       }
       return [productPage,trang,pageRangeDisplayed,marginPagesDisplayed]
    },[products,page])
    const Amount = useMemo(() => {
        let sl = 0
        if(JSON.parse(localStorage.getItem('card') !== null)) {
             sl = JSON.parse(localStorage.getItem('card')).length
        }
        return sl
    },[amountCard])
    return ( 
        <>
            <div className="Layout_mobile">
                <div className="layout_gid">
                    <div>
                        <div className="header_content">
                            <span>Location</span>
                            <h2>Khách hàng</h2>
                        </div>
                    </div>
                    <div className="header_search">
                        <div className='icon-search'>
                            <Icon.Search style={{width: '15%',marginRight: '4px'}} />
                            <input  onChange={(e) => handleSearchChangeInput(e.target.value)} placeholder='Tìm kiếm sản phẩm' />
                        </div>
                        <div className='header_search-listIcon'>
                            <FontAwesomeIcon style={{fontSize:'20px'}} icon={faSliders} />
                        </div>
                    </div>
                </div>
                <div className='slider'>
                    <Slider children={SliderImg} />
                </div>
                    <div className="mobile_content">
                            <div className='navbar_content'>
                            <span onClick={() => handleClickAllproducts()} className={checkActiveCate === 0 ? 'active' : null}>Tất Cả</span>
                                {categoris.map((valuaCate,indexCate) => (
                                            <span className={checkActiveCate === valuaCate.Id ? 'active' : null} onClick={() => fillterpProductCate(valuaCate.Id)} key={indexCate}>{valuaCate.Name}</span>
                                        ))}                                                                                                                                                                                                                                              
                            </div>
                        <div className='product_container_mobile'>
                        {productPage[0].map((product,index) => (
                            (product.Status === 'visible' ? (
                                <div key={index} className='product_content_mobile'>
                                <Link to={`/order/detail/${product.Id}`}>
                                <div className='product_content_mobile-img'>
                                    <span className='product_content_mobile-star'>
                                         <FontAwesomeIcon style={{color: 'rgb(255, 204, 0)'}} icon={faStar} />
                                         <span style={{fontWeight:'700',color:'#333'}}>{product.Star}</span>
                                    </span>
                                    <div className='product_content_mobile-img-item'>
                                        <img src={`${process.env.REACT_APP_IP_SEVER}/api/v12/showimgproduct/${product.Img}`} style={{width: '100%', height: '100%',objectFit: 'cover'}} />
                                    </div>
                                </div>
                                </Link>
                                <div className='product_noti'>
                                    <div className='product_name'>
                                        <h2>{product.Name}</h2>
                                    </div>
                                    <div className='product_size'>
                                        <h2>{product.NameCate}</h2>
                                    </div>
                                    <div className='product_price'>
                                        {
                                        (JSON.parse(localStorage.getItem('Table')) && JSON.parse(localStorage.getItem('Table')).Buffe !== 'All') ? (
                                            <h2>00.000đ</h2>
                                        ) : (
                                            <h2>{product.Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '₫'}</h2>
                                        )
                                        }
                                        <button ref = {e => cardButton.current[index] = e} onClick={() => handleClickAddCard(index,product.Id)} className='button_addcard'><FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <div ref={el => buttonFakeAddCard.current[index] = el} className='button_img-fake'>
                                                <img src={`${process.env.REACT_APP_IP_SEVER}/api/v12/showimgproduct/${product.Img}`} style={{width: '100%', height: '100%',objectFit: 'cover'}} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ) : null)
                        ))}
                            {/*  */}
                            
                            {/*  */}
                        </div>
                        <ReactPaginate className='product_page'
                        pageCount={productPage[1]} // Tổng số trang
                        pageRangeDisplayed={productPage[2]} // Số lượng trang hiển thị trên thanh phân trang
                        marginPagesDisplayed={productPage[3]}
                        onPageChange={handlePageChange}// Số lượng trang trước và sau trang hiện tại // Hàm xử lý khi chuyển trang
                        activeClassName="active"
                        previousLabel={false} // Bỏ nút "Previous"
                        nextLabel={false} // Bỏ nút "Next" // Lớp CSS cho trang hiện tại
                        />
                    </div>
                    <div className='navbar_footer'>
                        <div className='navbar_footer-content'>
                            <Link datacount = {0} ref={e => cartProduct.current[0] = e} to='/' className='navbar_footer-content-icon active'>
                                    <FontAwesomeIcon icon={faHouse} />
                            </Link>
                            <div datacount = {0} ref={e => cartProduct.current[1] = e} className='navbar_footer-content-icon'>
                                <FontAwesomeIcon icon={faBell} />
                            </div>
                            <Link to={`/order/card?token=${cookies.get('AccessTokenOrder')}`} datacount = {Amount} ref={e => cartProduct.current[2] = e} className='navbar_footer-content-icon cardmobile'>
                                <FontAwesomeIcon icon={faBasketShopping} /> 
                            </Link>
                            <Link to={`/order/billorder?token=${cookies.get('AccessTokenOrder')}`} datacount = {0} ref={e => cartProduct.current[3] = e} className='navbar_footer-content-icon'>
                                <FontAwesomeIcon icon={faClipboard} />
                            </Link>
                        </div>
                    </div>
            </div>
        </>
     );
}

export default App;