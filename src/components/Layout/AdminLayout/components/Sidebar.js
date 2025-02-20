import * as Icon from 'react-feather';
import { useRef, useState, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Sidebar({ cookies }) {
    const navigate = useNavigate()
    const [check, setCheck] = useState(0);
    const sideBar = useRef()
    const handleClickLogOut = useCallback(() => {
        cookies.remove('AccessTokenAdmin', { path: '/' })
        navigate('/')
        setCheck(14)
    }, [])
    return (
        <nav ref={sideBar} id="sidebar" className="sidebar js-sidebar"
            style={{
                overflowY: 'scroll'
            }}
        >
            <div className="sidebar-content js-simplebar">
                <Link to="/admmin" className="sidebar-brand">
                    <span className="align-middle">Hello Admin</span>
                </Link>
                <ul className="sidebar-nav">
                    <li className="sidebar-header">
                        Pages
                    </li>
                    <li onClick={() => setCheck(0)} className={check === 0 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin" className="sidebar-link">
                            <Icon.Sliders className="align-middle" />
                            <span className="align-middle">Dashboard</span>
                        </Link>
                    </li>
                    <li className="sidebar-header">
                        Tools & Components
                    </li>

                    <li onClick={() => setCheck(1)} className={check === 1 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showbill" className="sidebar-link">
                            <Icon.AlignLeft style={{ width: '24px' }} className="align-middle" />
                            <span className="align-middle">Đơn Hàng</span>
                        </Link>
                    </li>
                    <li onClick={() => setCheck(3)} className={check === 3 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/open" className="sidebar-link" href="">
                            <Icon.Grid className="align-middle" />
                            <span className="align-middle">Hoạt động</span>
                        </Link>
                    </li>

                    <li onClick={() => setCheck(4)} className={check === 4 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showslider" className="sidebar-link">
                            <Icon.AlignLeft className="align-middle" />
                            <span className="align-middle">Slider</span>
                        </Link>
                    </li>
                    <li onClick={() => setCheck(6)} className={check === 6 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showcomment" className="sidebar-link">
                            <Icon.Plus style={{ width: '24px' }} className="align-middle" />
                            <span className="align-middle">Đánh giá</span>
                        </Link>
                    </li>
                    <li onClick={() => setCheck(14)} className={check === 14 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showtable" className="sidebar-link">
                            <Icon.Plus style={{ width: '24px' }} className="align-middle" />
                            <span className="align-middle">Bàn</span>
                        </Link>
                    </li>
                    <li onClick={() => setCheck(15)} className={check === 15 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/createqr" className="sidebar-link">
                            <Icon.Plus style={{ width: '24px' }} className="align-middle" />
                            <span className="align-middle">Tạo QR</span>
                        </Link>
                    </li>
                    <li className="sidebar-header">
                        Web Data
                    </li>
                    <li onClick={() => setCheck(7)} className={check === 7 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showtypes" className="sidebar-link">
                            <Icon.Plus className="align-middle" />
                            <span className="align-middle">Nhóm Sản Phẩm</span>
                        </Link>
                    </li>

                    <li onClick={() => setCheck(8)} className={check === 8 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showdetailtypes" className="sidebar-link">
                            <Icon.Plus className="align-middle" />
                            <span className="align-middle">Chi Tiết Nhóm Sản Phẩm</span>
                        </Link>
                    </li>


                    <li onClick={() => setCheck(9)} className={check === 9 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showcategori" className="sidebar-link">
                            <Icon.Plus className="align-middle" />
                            <span className="align-middle">Loại Sản Phẩm</span>
                        </Link>
                    </li>

                    <li onClick={() => setCheck(10)} className={check === 10 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showproduct" className="sidebar-link">
                            <Icon.Plus style={{ width: '24px' }} className="align-middle" />
                            <span className="align-middle">Sản Phẩm</span>
                        </Link>
                    </li>
                    <li onClick={() => setCheck(11)} className={check === 11 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showdetailproduct" className="sidebar-link">
                            <Icon.Plus style={{ width: '24px' }} className="align-middle" />
                            <span className="align-middle">Chi Tiết Sản Phẩm</span>
                        </Link>
                    </li>
                    <li onClick={() => setCheck(13)} className={check === 13 ? 'sidebar-item active' : 'sidebar-item'}>
                        <Link to="/admin/showvoucher" className="sidebar-link">
                            <Icon.Plus style={{ width: '24px' }} className="align-middle" />
                            <span className="align-middle">Voucher</span>
                        </Link>
                    </li>
                    <li className='sidebar-item'>
                        <button onClick={handleClickLogOut} className="sidebar-link">
                            <span className="align-middle">Đăng xuất</span>
                        </button>
                    </li>
                </ul>
                <div className="sidebar-cta">
                    <div className="sidebar-cta-content">
                        <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
                        <div className="mb-3 text-sm">
                            Are you looking for more components? Check out our premium version.
                        </div>
                        <div className="d-grid">
                            <a href="upgrade-to-pro.html" className="btn btn-primary">Upgrade to Pro</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default memo(Sidebar);