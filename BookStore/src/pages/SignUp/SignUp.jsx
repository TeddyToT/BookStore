import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { CiUser, CiLock, CiMail } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import axios from "axios";
import { DataContexts } from "../../AppContexts/Contexts";
import { toast } from "react-toastify";

const SignUp = () => {
  const {shop} = useContext(DataContexts)
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password2, setPassword2] = useState("");
  const [showPassword2, setShowPassword2] = useState(false);
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prevState) => !prevState);
  };

  const handleClick = () => {

    if (!userName) {
      toast.warning('Chưa nhập tên đăng nhập', {
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
    if (!password) {
      toast.warning('Chưa nhập mật khẩu', {
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
    if (!password2) {
      toast.warning('Chưa nhập xác nhận mật khẩu', {
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
    if (!email) {
      toast.warning('Chưa nhập email', {
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
    if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      toast.warning('Email không hợp lệ', {
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
    if (password != password2) {
      toast.warning('Mật khẩu chưa trùng khớp', {
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
    else if (password.length < 6) {
      toast.warning('Yêu cầu mật khẩu hơn 6 kí tự', {
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


    axios.post("http://localhost/be-shopbangiay/api/SignUp.php", {
      username: userName,
      password: password,
      email: email,
      role: "Customer",
    })
      .then((res) => {
        if (res.data.success == false) {
          toast.error('Đăng kí tài khoản thất bại', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });

        }
        else {
          toast.success('Đăng kí tài khoản thành công, mời đăng nhập', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          navigate("/dang-nhap")
        }
      }
      )
      .catch(err => {
        console.log(err)
      })


  }

  return (
    <div>
      <div className="w-11/12 place-self-center py-5">

      
<div className="  place-self-start mb-3">
<Breadcrumb pageName="Đăng ký" />
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
                Đăng ký ngay
              </h2>

              <div>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black ">
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    {/* <CiUser size={40} /> */}
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                    />
                    <span className="absolute left-4 top-3">
                      <CiUser size={32} />
                    </span>
                  </div>
                </div>
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
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black ">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    />

                    <span className="absolute left-4 top-3">
                      <CiLock size={32} />
                    </span>
                    {password && (<span
                      className="absolute right-4 top-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <FaRegEye size={24} />
                      ) : (
                        <FaRegEyeSlash size={24} />
                      )}
                    </span>)}

                  </div>
                </div>
                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black ">
                    Nhập lại mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword2 ? "text" : "password"}
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Nhập lại mật khẩu"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                    />

                    <span className="absolute left-4 top-3">
                      <CiLock size={32} />
                    </span>
                    {password2 && (<span
                      className="absolute right-4 top-3 cursor-pointer"
                      onClick={togglePasswordVisibility2}
                    >
                      {showPassword2 ? (
                        <FaRegEye size={24} />
                      ) : (
                        <FaRegEyeSlash size={24} />
                      )}
                    </span>)}

                  </div>
                </div>

                <div className="mb-5">
                  <button
                    onClick={handleClick}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-blue-500 p-4 text-white transition hover:bg-opacity-90">
                    Đăng ký
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Đã có tài khoản?{" "}
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

export default SignUp;
