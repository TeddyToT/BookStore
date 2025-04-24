import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/ScrollToTop";
import SignIn from "./pages/Auth/SignIn/SignIn";
import AppProvider from "./context/AppProvider";
import BarChart from "./pages/Dashboard/Test";
import HomeRedirect from "./pages/Home/HomeDirect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductOverview from "./pages/Product/ProductOverview";
import AddProduct from "./pages/Product/AddProduct/AddProduct";
import EditProduct from "./pages/Product/EditProduct/EditProduct";
import CategoryOverview from "./pages/Category/CategoryOverview";
import AddCategory from "./pages/Category/AddCategory/AddCategory";
import EditCategory from "./pages/Category/EditCategory/EditCategory";
import AuthorOverview from "./pages/Author/AuthorOverview";
import AddAuthor from "./pages/Author/AddAuthor/AddAuthor";
import EditAuthor from "./pages/Author/EditAuthor.tsx/EditAuthor";
export default function App() {
  return (
    <>
      <AppProvider>
      <ToastContainer className="!z-[9999]"/>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route index path="/" element={<HomeRedirect />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<BarChart />} />
              <Route path="/product-overview" element={<ProductOverview />} />
              <Route path="/product-overview/add-product" element={<AddProduct />} />
              <Route path="/product-overview/edit-product/:id" element={<EditProduct />} />

              <Route path="/category-overview" element={<CategoryOverview />} />
              <Route path="/category-overview/add-category" element={<AddCategory />} />
              <Route path="/category-overview/edit-category/:id" element={<EditCategory />} />

              <Route path="/author-overview" element={<AuthorOverview />} />
              <Route path="/author-overview/add-author" element={<AddAuthor />} />
              <Route path="/author-overview/edit-author/:id" element={<EditAuthor />} />


            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />

            {/* Fallback Route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Router>
      </AppProvider>
    </>
  );
}
