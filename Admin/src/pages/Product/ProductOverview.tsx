import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ProductTable from "../../components/tables/ProductTable";

const ProductOverview = () => {
  return (
    <div>
      <Breadcrumb pageName="Tổng quan sản phẩm" />

      <Link
        to="/product-overview/add-product"
        className="mb-3 inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-center font-normal text-white hover:bg-opacity-90 dark:bg-gray-300 dark:text-black dark:hover:bg-slate-600 dark:hover:text-white lg:px-4 xl:px-6"
      >
        Thêm sản phẩm
      </Link>

      <div className="flex flex-col gap-10">
        <ProductTable />
      </div>
    </div>
  );
};

export default ProductOverview;