import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../../context/DataContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import axios from "axios";
// import DefaultLayout from "@/components/Layouts/DefaultLayout";

const SignIn: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { fetchUserDetail, shop } = useContext(DataContext);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleClick = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userName) {
      toast.warn("Vui lòng nhập tên đăng nhập");
      return;
    }
    if (!password) {
      toast.warn("Vui lòng nhập mật khẩu");
      return;
    }

    axios
      .post("http://localhost:8081/v1/api/login", {
        email: userName,
        password: password,
      })
      .then((res) => {
        if (res.data.success === false) {
          localStorage.clear();
          toast.error("Sai tên đăng nhập hoặc mật khẩu");
        } else {
          if (res.data.role === "Customer") {
            toast.error("Khách hàng không thể đăng nhập vào trang quản lý");
            return;
          }

          toast.success("Đăng nhập thành công", {
            autoClose: 1000,
            onClose: () => {
              localStorage.setItem("userId", res.data.user._id);
              fetchUserDetail();
              navigate("/");
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
      <div className="mx-0 my-auto h-screen  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-[#101828]">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <a className="mb-5.5 inline-block" href="/">
                {shop?.logodark && (
                  <img
                    className="w-[400px] h-[400px] hidden dark:block"
                    src={shop.logodark}
                    alt="Logo"
                  />
                )}
                {shop?.logo && (
                  <img
                    className="w-[400px] h-[400px] dark:hidden"
                    src={shop.logo}
                    alt="Logo"

                  />
                )}
              </a>
              <span className="mt-15 inline-block"></span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-xl font-bold text-black dark:text-white sm:text-title-lg">
                Đăng nhập
              </h2>

              <form>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Tên tài khoản
                  </label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    placeholder="Nhập tên đăng nhập"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Mật khẩu
                  </label>
                  <div className="relative flex w-full items-center">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    {password && (
                      <div
                        className="absolute right-4 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-5">
                  <button
                    onClick={handleClick}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  >
                    Đăng nhập
                  </button>
                </div>

                <div className="w-full text-end">
                  <p>
                    Quên mật khẩu?{" "}
                    <a href="/signin/forgot-password" className="text-primary">
                      Lấy lại mật khẩu
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
  );
};

export default SignIn;
