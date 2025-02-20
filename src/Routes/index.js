import DefaultLayout from "~/components/Layout/DefaultLayout";
import LoginLayout from "~/components/Layout/LoginLayout";
import CardLayout from "~/components/Layout/CardLayout";
import AdminLayout from "~/components/Layout/AdminLayout";
import PurchaseLayout from "~/components/Layout/PurchaseLayout";
import LoginAdmin from "~/components/Layout/LoginAdmin";
import ModalAuthen from "~/pages/ModalAuthen";
import Purchase from "~/pages/Purchase";
import DetailBill from "~/pages/DetailBill";
import User from "~/pages/User"
import OTPAuthen from "~/pages/ModalAuthen/Authen.js"
import Dashboard from "~/pages/Dashboard";
import Bill from "~/pages/Bill";
import Open from "~/pages/Open";
import Slider from "~/pages/Slider/showSlider";
import Comment from "~/pages/Comment";
import Type from "~/pages/Type/showTypes";
import DetailType from "~/pages/DetailType/showDetailType";
import Categoris from "~/pages/Categoris/showCategoris";
import Products from "~/pages/Product/showProduct";
import DetailProduct from "~/pages/DetailProduct/showDetailProduct";
import Voucher from "~/pages/Voucher";
import createQr from "~/pages/CreateQR";
import showTable from "~/pages/Table";
import Order from "~/components/Layout/MobileLayout";
import OrderCard from "~/pages/CardMobile";
import BillMobileOrder from "~/pages/BillMobileOrder";
import HomeOrder from "~/pages/HomeMobile";
import DetaiProductMobileOrder from "~/pages/DetailProductOrder";
const publicRoutes = [
    {path: '/admin', component: Dashboard, layout: AdminLayout ,},
    {path: '/admin/showtable', component: showTable, layout: AdminLayout, },
    {path: '/admin/createqr', component: createQr, layout: AdminLayout, },
    {path: '/admin/login', component: null, layout: LoginAdmin ,},
    {path: '/admin/showbill', component: Bill, layout: AdminLayout ,},
    {path: '/admin/open', component: Open, layout: AdminLayout ,},
    {path: '/admin/showslider', component: Slider, layout: AdminLayout ,},
    {path: '/admin/showcomment', component: Comment, layout: AdminLayout ,},
    {path: '/admin/showtypes', component: Type, layout: AdminLayout ,},
    {path: '/admin/showdetailtypes', component: DetailType, layout: AdminLayout ,},
    {path: '/admin/showcategori', component: Categoris, layout: AdminLayout ,},
    {path: '/admin/showproduct', component: Products, layout: AdminLayout ,},
    {path: '/admin/showdetailproduct', component: DetailProduct, layout: AdminLayout ,},
    {path: '/admin/showvoucher', component: Voucher, layout: AdminLayout ,},
    // 
    {path: '/user', component: User, layout: PurchaseLayout ,},
    {path: '/login', component: ModalAuthen, layout: LoginLayout ,},
    {path: '/login/OTPAuthen', component: OTPAuthen, layout: LoginLayout ,},
    {path: '/purchase', component: Purchase, layout: PurchaseLayout ,},
    {path: '/purchase/detail/:IdBill', component: DetailBill, layout: PurchaseLayout ,},
    {path: '/card', component: null, layout: CardLayout ,},
    {path: '/', component: null, layout: DefaultLayout ,},
    // Order
    { path: '/order/detail/:IdProduct', component: DetaiProductMobileOrder, layout: Order, },
    { path: '/order', component: HomeOrder, layout: Order, },
    { path: '/order/card', component: OrderCard, layout: Order, },
    { path: '/order/billorder', component: BillMobileOrder, layout: Order, },
]
export { publicRoutes }