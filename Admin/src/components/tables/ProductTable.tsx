import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { DataContext } from "../../context/DataContext";
import { toast } from "react-toastify";
import axios from "axios";

const ProductTable = () => {
  const { products, fetchProducts }: any = useContext(DataContext);
  const [searchInput, setSearchInput] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(searchInput.trim().toLowerCase())
    );
    setSearchProducts(filtered);
  }, [products, searchInput]);

  const handleDeleteProduct = (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?"))
      return;

    axios
      .delete(`http://localhost:8081/v1/api/user/products/${id}`)
      .then((res) => {
        if (res.data.success == true) {
          toast.success("Xóa sản phẩm thành công");
          fetchProducts();
        } else {
          toast.error("Xóa sản phẩm thất bại\n", res.data.message);
        }
      })
      .catch(() => toast.error("Đã xảy ra lỗi khi xóa sản phẩm"));
  };
  function shortenPrice(price: number) {
    if (price >= 1_000_000) {
      const millions = Math.floor(price / 1_000_000);
      const thousands = Math.floor((price % 1_000_000) / 1_000);
      return `${millions}tr${thousands > 0 ? thousands : ''}`;
    } else if (price >= 1_000) {
      return `${Math.floor(price / 1_000)}k`;
    }
    return price.toString();
  }
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
              placeholder="Nhập tên sản phẩm..."
              className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-11/12"
            />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="grid grid-cols-10 border-t border-stroke px-4 py-4.5 dark:text-white dark:border-strokedark md:px-6 2xl:px-7.5">
        <div className="col-span-3">
          <p className="font-bold">Tên sản phẩm</p>
        </div>
        <div className="col-span-1 ">
          <p className="font-bold">Tình trạng</p>
        </div>
        <div className="col-span-1 justify-center flex">
          <p className="font-bold">Thể loại</p>
        </div>
        <div className="col-span-1 justify-center flex">
          <p className="font-bold">Tác giả</p>
        </div>
        <div className="col-span-2 justify-center flex">
          <p className="text-center font-bold">Loại</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="font-bold">Giá</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="font-bold">Hành động</p>
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      {getPaginatedData().map((product: any, key) => (
        <div
          key={product.productId}
          className={`grid grid-cols-10 px-4 py-4.5 md:px-6 2xl:px-7.5 ${
            key % 2 !== 0 ? "bg-gray-50 dark:bg-gray-800" : ""
          }`}
        >
          {/* Tên sản phẩm + ảnh */}
          <div className="col-span-3 w-5/6 md:w-full items-center">
            <div className="flex md:flex-row flex-col lg:gap-4 gap-2 items-center">
              <img
                src={
                  product.images.find((image: string) =>
                    image.includes("main")
                  ) || product.images[0]
                }
                alt={product.name}
                className=" md:w-1/3 md:h-[80px] rounded-md object-cover text-sm "
              />
              <p className="text-sm md:w-2/3 w-full text-black dark:text-white truncate ">
                {product.name}
              </p>
            </div>
          </div>

          {/* Tình trạng */}
          <div className="col-span-1 items-center justify-center flex ">
            <p
              className={`text-sm capitalize ${
                product.type.some((t: any) => parseInt(t.stock) > 0)
                  ? "text-green-600"
                  : "text-danger"
              } dark:text-white`}
            >
              {product.type.some((t: any) => parseInt(t.stock) > 0)
                ? "Còn hàng"
                : "Hết hàng"}
            </p>
          </div>

          {/* Thể loại */}
          <div className="col-span-1 items-center flex justify-center">
            <p className="text-sm capitalize text-black dark:text-white">
              {product.categoryId.name}
            </p>
          </div>

          {/* Tác giả */}
          <div className="col-span-1 items-center flex justify-center">
            <p className="text-sm capitalize text-black dark:text-white">
              {product.authorId.name}
            </p>
          </div>

          <div className="col-span-2 flex flex-col items-center gap-2 justify-center">
            {product.type
              //   .sort((a: any, b: any) => parseInt(a.size) - parseInt(b.size))
              .map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex w-full justify-center  gap-1 md:gap-5"
                >
                  <p className="text-sm text-black dark:text-white w-1/2 text-center">
                    {item.kind}
                  </p>
                  <p className="text-sm text-black dark:text-white w-1/2 text-center">
                    {item.stock}
                    <span className="md:inline hidden"> sản phẩm</span>
                    <span className="md:hidden inline"> sp</span>
                  </p>
                </div>
              ))}
          </div>

          {/* Giá */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            {product.type
              //   .sort((a: any, b: any) => parseInt(a.size) - parseInt(b.size))
              .map((item: any, i: number) => (
                <div key={i} className="flex w-full justify-center">
  <p className="text-sm text-black dark:text-white">
    <span className="md:inline hidden">
      {parseInt(item.price).toLocaleString("vi-VN")} VNĐ
    </span>

    <span className="md:hidden inline">
      {shortenPrice(parseInt(item.price))}
    </span>
  </p>
</div>
              ))}
          </div>

          {/* Hành động */}
          <div className="col-span-1 flex items-center justify-center">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Link
                to={`/product-overview/edit-product/${product._id}`}
                className="hover:text-primary"
              >
                <ModeEditIcon />
              </Link>
              <button
                onClick={() => handleDeleteProduct(product._id)}
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

export default ProductTable;
