import Cart from "../pages/cart"
import Home from "../Pages/Home"
import OrderManagement from "../pages/order_management"
import Account from "../pages/account"
import Payment from "../pages/payment"
import OrderTracking from "../pages/order_tracking"
import AllProducts from "../pages/AllProducts/AllProducts"
import ItemDetails from "../pages/ItemDetails/ItemDetails";
import Login from "../pages/Login/Login"
import SignUp from "../pages/SignUp/SignUp"
import Search from "../pages/Search/Search"
import Introduce from "../pages/About/About"
import Contact from "../pages/Contact/Contact"
import ForgotPassowrd from "../pages/ForgortPassword/ForgotPassword"
import ConfirmNewPassword from "../pages/ForgortPassword/ConfirmNewPassword"

const publicRoutes = [
    { path: '/', conponent: Home },
    { path: '/gio-hang', conponent: Cart },
    { path: '/tai-khoan/lich-su-don-hang', conponent: OrderManagement },
    { path: '/tai-khoan', conponent: Account },
    { path: '/thanh-toan', conponent: Payment },
    { path: '/tai-khoan/theo-doi-don-hang', conponent: OrderTracking },


    {path:"/san-pham/:slugId", conponent: ItemDetails},
    {path:"/san-pham", conponent: AllProducts},
    {path:"/dang-nhap", conponent: Login},
    {path:"/dang-ky", conponent: SignUp},
    {path:"/dang-nhap/quen-mat-khau", conponent: ForgotPassowrd},
    {path:"/dang-nhap/quen-mat-khau/xac-nhan", conponent: ConfirmNewPassword},
    {path:"/tim-kiem", conponent: Search},
    {path:"/gioi-thieu", conponent: Introduce},
    {path:"/lien-he", conponent: Contact},
]

export { publicRoutes };