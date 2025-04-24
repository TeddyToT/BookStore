import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

import { useState, useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";


const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const { fetchCategories }: any = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!categoryName) {
      toast.warning("Yêu cầu nhập tên thể loại", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    setIsLoading(true);

    axios
      .post("http://localhost:8081/v1/api/user/categories", {
        name: categoryName },
      )
      .then((res) => {
        if (res.data.success == false) {
          toast.error(`Thêm thể loại thất bại, kiểm tra lại\n ${res.data.message}` , {
            position: "top-right",
            autoClose: 1500,
          });
          setIsLoading(false);
          console.log("Response:", res.data);
          return;
        } else {
        fetchCategories();
          toast.success("Thêm thể loại thành công", {
            position: "top-right",
            autoClose: 2000,
          });
          setIsLoading(false);
          navigate("/category-overview");
        }

        console.log("Response:", res.data);
      })
      .catch((err) => {
        toast.error(`Thêm thể loại thất bại, kiểm tra lại `, {
          position: "top-right",
          autoClose: 1500,
        });
        setIsLoading(false);
        console.log("Error:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/" },
          { name: "Tông quan thể loại", href: "/categories-overview" },
          { name: "Thêm thể loại" },
        ]}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {isLoading && <LoadingSpinner />}
        
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block  font-medium text-black dark:text-white">
                  Tên thể loại
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Nhập tên sản phẩm"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
