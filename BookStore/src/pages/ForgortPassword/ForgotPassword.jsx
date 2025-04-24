import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { CiMoneyCheck1, CiLock, CiMail } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { DataContexts } from "../../AppContexts/Contexts";
const ForgotPassowrd = () => {
  const {shop} = useContext(DataContexts)
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    if (!email) {
      toast.warning("Chưa nhập email", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      toast.warning("Email không hợp lệ", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    axios
      .post("http://localhost/be-shopbangiay/api/ForgetPassword.php", {
        email: email,
      })
      .then((res) => {
        if (res.data.success == false) {
          toast.error("Email chưa được đăng kí", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success(
            "Xác nhận yêu cầu lấy lại mật khẩu thành công. Xin hãy kiểm tra mail gửi về",
            {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
            }
          );
          navigate("/dang-nhap/quen-mat-khau/xac-nhan");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const items = [
    { name: "Trang chủ", href: "/" },
    { name: "Đăng nhập", href: "/dang-nhap" },
    { name: "Quên mật khẩu" },
  ];
  return (
    <div>
      <div className="w-11/12 place-self-center py-5">
        <div className="  place-self-start mb-3">
          <Breadcrumb items={items} />
        </div>
      </div>

      <div className="mt-5 mb-10 rounded-sm border border-strokeshadow-default ">
        <div className="flex  md:flex-row items-center">
          <div className="hidden w-full md:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <img className="" src={shop.logo} alt="Logo" width={400} />
              </Link>
            </div>
          </div>

          <div className="w-full border-stroke  xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black  sm:text-title-xl2">
                Lấy lại mật khẩu
              </h2>

              <div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black ">
                    Email
                  </label>
                  <div className="relative">
                    {/* <CiUser size={40} /> */}
                    <input
                      type="text"
                      placeholder="Nhập email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                    />
                    <span className="absolute left-4 top-3">
                      <CiMail size={32} />
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    onClick={handleClick}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-blue-500 p-4 text-white transition hover:bg-opacity-90"
                  >
                    Lấy lại mật khẩu
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Hoặc{" "}
                    <Link
                      to={"/dang-nhap"}
                      className="text-cyan-800 hover:text-blue-900"
                    >
                      Đăng nhập ngay
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassowrd;
