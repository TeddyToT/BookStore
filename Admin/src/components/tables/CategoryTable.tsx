import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import axios from "axios";

const CategoryTable = () => {
  const { categories, fetchCategories }: any = useContext(DataContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const filtered = categories.filter((product: any) =>
      product.name.toLowerCase().includes(searchInput.trim().toLowerCase())
    );
    setSearchProducts(filtered);
  }, [categories, searchInput]);

  const handleDeleteCategory = (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"))
      return;
    if (!window.confirm("Hãy cân nhắc, xóa thể loại sẽ xóa hết các sản phẩm trong đó!!!\nYêu cầu xác nhận lại"))
        return;
    axios
      .delete(`http://localhost:8081/v1/api/user/categories/${id}`)
      .then((res) => {
        if (res.data.success == true) {
          toast.success("Xóa thể loại thành công");
          fetchCategories();
        } else {
          toast.error("Xóa thể loại thất bại\n", res.data.message);
        }
      })
      .catch(() => toast.error("Đã xảy ra lỗi khi xóa sản phẩm"));
  };
  
  const totalPages = Math.ceil(searchProducts.length / itemsPerPage);
  const getPaginatedData = () =>
    searchProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div className="mb-5 rounded-sm border border-stroke dark:text-white bg-white shadow-default dark:border-[#2E3A47] dark:bg-boxdark">
      {/* Search */}
      <div className="inset-0 flex justify-start dark:text-white">
        <div className="w-full px-4 py-5 sm:block">
          <div className="relative">
            <button className="absolute left-0 top-1/2 -translate-y-1/2">
              <SearchOutlinedIcon />
            </button>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Nhập tên thể loại..."
              className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-11/12"
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-10 border-t border-stroke px-4 py-4.5 dark:text-white dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-8">
          <p className="font-bold">Tên thể loại</p>
        </div>
        
        <div className="col-span-2 text-center">
          <p className="font-bold">Hành động</p>
        </div>
      </div>

      {getPaginatedData().map((category: any, key) => (
        <div
          key={category._id}
          className={`grid grid-cols-10 px-4 py-4.5 md:px-6 2xl:px-7.5 ${
            key % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800" : ""
          }`}
        >
          <div className="col-span-8 items-center">
            <div className="flex items-center">
              <p className="ml-2 md:w-2/3 w-full text-black dark:text-white truncate ">
                {category.name}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <div className="flex items-center justify-between gap-5">
              <Link
                to={`/category-overview/edit-category/${category._id}`}
                className="hover:text-primary"
              >
                <ModeEditIcon />
              </Link>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="hover:text-red-500"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                >
                  <path d="M6 2L5 3H2V5H16V3H13L12 2H6Z" fill="currentColor" />
                  <path
                    d="M4 6V15C4 15.55 4.45 16 5 16H13C13.55 16 14 15.55 14 15V6H4Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center py-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3"
        >
          Previous
        </button>
        <div className="mx-3 flex items-center">
          <input
            type="number"
            value={currentPage}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (!isNaN(val) && val >= 1 && val <= totalPages)
                setCurrentPage(val);
            }}
            min="1"
            max={totalPages}
            className="w-16 text-center border rounded"
          />
          <span className="ml-2">/ {totalPages}</span>
        </div>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryTable;
