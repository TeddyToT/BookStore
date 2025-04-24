import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CategoryTable from "../../components/tables/CategoryTable";

const CategoryOverview = () => {
  return (
    <div>
      <Breadcrumb pageName="Tổng quan thể loại" />

      <Link
        to="/category-overview/add-category"
        className="mb-3 inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-center font-normal text-white hover:bg-opacity-90 dark:bg-gray-300 dark:text-black dark:hover:bg-slate-600 dark:hover:text-white lg:px-4 xl:px-6"
      >
        Thêm thể loại
      </Link>

      <div className="flex flex-col gap-10">
        <CategoryTable />
      </div>
    </div>
  );
};

export default CategoryOverview;