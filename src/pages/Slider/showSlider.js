import React, { useState ,useEffect, useReducer, useRef, memo } from 'react';
import axios from 'axios'
import './showSlider.scss'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { getImgBody, updateLinkYoutube} from './action'
import reducer, { initState } from './reducer'
function App() {
    const [checkEdit, setCheckEdit] = useState(false)
    const [idYoutube, setIdYoutube] = useState('')
    const [state, dispatch] = useReducer(reducer, initState)
    const {  imgBodys } = state
    const inputRefBody = useRef()
  // Call Api
      //   // Gửi dữ liệu lên API Update
      async function updateLinkYtb(Link) {
      try {
        const response = await axios.put('http://localhost:8080/api/v12/updatelinkytb', Link);
        if(response.data.message === 'Success') {
          dispatch(updateLinkYoutube(Link.newName))
          setIdYoutube('')
        }
      } catch (error) {
        console.error('Lỗi khi thêm sản phẩm:', error);
      }
    }
    const handleClickEdit = (e) => {
      if(e.target.checked === true) {
        setCheckEdit(true)
      }
      else {
        setCheckEdit(false)
      }
    }
    const handleClickSaveLinkYoutube = () => {
      if(idYoutube.length > 0) {
         const videoId = idYoutube.split('v=')[1];
         const Link = {
          newName: videoId,
          Name: imgBodys[3].Img
         }
         updateLinkYtb(Link)
      }
      else {
        Swal.fire("Vui Lòng Nhập Link !");
      }
    }
    useEffect(()=> {
        axios.all([
            axios.get('http://localhost:8080/api/v12/showimgbody'),
          ])
            .then(axios.spread((ImgBody) => {
                dispatch(getImgBody(ImgBody.data.data))
            }))
            .catch (err => {
                console.error()
            })
    },[])
    return (
        <>
        <div className='Slider_box'>
              <div className='Button_checkEdit-container'>
                <div className='Checkedit_content'>
                    <p>Chế độ chỉnh sửa:</p>
                    <div className='button_edit-slider'>
                      <label className="switch">
                        <input onChange={e => handleClickEdit(e)} type="checkbox" className="input"/>
                        <span className="slider_checkedit"></span>
                      </label>
                    </div>
                    <p>{checkEdit ? ('Bật') : ('Tắt')}</p>
                </div>
              </div>
              <div className='Page_img'>
                <div className='Page_img-container'>
                     <input  ref={inputRefBody} type="file" style={{display: 'none'}} />
                    <div className={'youtube_content'}>
                                {checkEdit ? (
                                  <div className='Input_youtube'>
                                      <div className="inputBox">
                                        <input onChange={(e) => setIdYoutube(e.target.value)} type="text" value={idYoutube} />
                                        <span>Nhập vào link youtube</span>
                                      </div>
                                      <div className='btn-savelink'>
                                          <button onClick={handleClickSaveLinkYoutube} className="button">Lưu</button>
                                      </div>
                                  <iframe style={{marginTop: '20px'}} width="560" height="315" src={`https://www.youtube.com/embed/${(imgBodys.length !== 0 ? (imgBodys[3].Img) : (null))}`}title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                  </div>
                                ) : (
                                  <iframe width="560" height="315" src={`https://www.youtube.com/embed/${(imgBodys.length !== 0 ? (imgBodys[3].Img) : (null))}`}title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                                )}
                            </div>
                    </div>
              </div>
        </div>
        </>
     );
} 
export default memo(App);