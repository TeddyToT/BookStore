import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import AuthorTable from "../../components/tables/AuthorTable";

const AuthorOverview = () => {
  return (
    <div>
      <Breadcrumb pageName="Tổng quan tác giả" />

      <Link
        to="/author-overview/add-author"
        className="mb-3 inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-center font-normal text-white hover:bg-opacity-90 dark:bg-gray-300 dark:text-black dark:hover:bg-slate-600 dark:hover:text-white lg:px-4 xl:px-6"
      >
        Thêm tác giả
      </Link>

      <div className="flex flex-col gap-10">
        <AuthorTable />
      </div>
    </div>
  );
};

export default AuthorOverview;