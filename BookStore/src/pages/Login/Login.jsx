import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { CiUser, CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Layout } from "antd";
import { toast } from "react-toastify";
import { DataContexts } from "../../AppContexts/Contexts";
import axios from "axios";
const Login = () => {
  const {shop} = useContext(DataContexts)
  const navigate = useNavigate();
  const [userName, setUsername] = useState("")
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const handleClick = () => {
    if (!userName) {
      toast.warn('Vui lòng nhập tên đăng nhập', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return
    }
    if (!password) {
      toast.warn('Vui lòng nhập mật khẩu', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return
    }

    axios.post('http://localhost/be-shopbangiay/api/SignIn.php', {
      username: userName,
      password: password
    }
    )
      .then((res) => {
        console.log(res);
        if (res.data.success === false) {
          localStorage.clear();
          toast.error('Sai tên đăng nhập hoặc mật khẩu', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        } else {
          if (res.data.role != "Customer")
          {
            toast.warn('Nhân viên và Admin không đăng nhập web bán hàng', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
              });
          }
          else{
            toast.success('Đăng nhập thành công', {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              progress: undefined,
              theme: "light",
              });
              localStorage.setItem('id', res.data.userId)
              // setUserId(res.data.userId); 
                navigate("/");
                
          }
          
          
        }
      })
      .catch((err) => console(err));
  };
  return (
    <div className="">
      <div className="w-11/12 place-self-center py-5">

      
      <div className="  place-self-start mb-3">
      <Breadcrumb pageName="Đăng nhập" />
      </div>
      </div>

      <div className="mt-5 mb-10 rounded-sm border border-stroke shadow-default ">
        <div className="flex  md:flex-row items-center">
          <div className="hidden w-full md:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 sm:inline-block flex w-[200px] md:w-[350px] lg:w-[400px]" href="/">
                <img className="" src={shop.logo} alt="Logo" />
              </Link>


            </div>
          </div>

          <div className="w-full border-stroke  xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black  sm:text-title-xl2">
                Đăng nhập ngay
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
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-16 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none "
                    />
                    <span className="absolute left-4 top-3">
                      <CiUser size={32} />
                    </span>
                  </div>
                </div>

                <div className="mb-6">
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
                    <div className="mt-4 text-right mr-4">
                      <p>
                        Quên mật khẩu?{" "}
                        <Link
                          to={"/dang-nhap/quen-mat-khau"}
                          className="text-cyan-800 hover:text-blue-900"
                        >
                          Lấy lại mật khẩu
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    onClick={handleClick}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-blue-500 p-4 text-white transition hover:bg-opacity-90">
                    Đăng nhập
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p>
                    Chưa có tài khoản?{" "}
                    <Link
                      to={"/dang-ky"}

                      className="text-cyan-800 hover:text-blue-900"
                    >
                      Đăng ký ngay
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

export default Login;