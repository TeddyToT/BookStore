import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ClickOutside from "../ClickOutside";
import { DataContext } from "../../context/DataContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { toast } from "react-toastify";
import {ArrowDropDown, ArrowDropUp} from '@mui/icons-material';
const UserDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { userDetail, setUserDetail, shop } = useContext(DataContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Đăng xuất thành công", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    setUserDetail(null);
    if (location.pathname === "/") {
      navigate("/auth/signin");
    } else {
      navigate("/");
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
      onClick={() => setDropdownOpen(!!userDetail && !dropdownOpen)}
        className="flex items-center gap-4"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {shop.name}
          </span>
          <span className="block text-sm dark:text-white capitalize">{userDetail ? userDetail.role : ""}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img
            width={112}
            height={100}
            src={shop.logo}
            style={{ width: "auto", height: "auto" }}
            alt="User"
          />
        </span>
        {dropdownOpen?
        (
<span className="dark:text-white">
            <ArrowDropUp/>
        </span>
        )
    :
    (
<span className="dark:text-white">
            <ArrowDropDown/>
        </span>
    )}
        
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-30 md:w-50 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-5 dark:border-strokedark">
            <li>
              <p className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out lg:text-base">
                {userDetail ? userDetail.name : ""}
              </p>
            </li>
            <li className="hover:cursor-pointer" onClick={handleLogout}>
              <p className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                <LogoutIcon />
                Đăng xuất
              </p>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default UserDropdown;