import { useState, useEffect, useContext } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import Item from "../../components/Item.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import RadioCheckBox from "../../components/Checkbox/RadioCheckbox.jsx";
import { DataContexts } from "../../AppContexts/Contexts.jsx";
import "../../hideScrollbar.css";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb.jsx";
const AllProducts = () => {
  const { products, categories, manufacturers } = useContext(DataContexts);
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [categoriesOptions, setCategoriesOptions] = useState(
    searchParams.get("categories")
      ? searchParams.get("categories").split(",")
      : []
  );
  const [authorOption, setAuthorOption] = useState(
    manufacturers.find((m) => m.name === searchParams.get("author")) || null
  );
  const [searchProduct, setSearchProduct] = useState([]);

  useEffect(() => {
    const params = {};
    if (query) params.query = query;

    if (categoriesOptions.length > 0) {
      const categoryIds = categoriesOptions
        .map((category) => category.categoryId)
        .filter((id) => id);

      if (categoryIds.length > 0) {
        params.categories = categoryIds.join(",");
      }
    }

    if (authorOption) params.author = authorOption.name;

    setSearchParams(params);
  }, [query, categoriesOptions, authorOption, setSearchParams]);

  useEffect(() => {
    const query = searchParams.get("query");
    const categoriesFromURL = searchParams.get("categories");
    const authorFromURL = searchParams.get("author");

    console.log("Categories from URL:", categoriesFromURL);
    console.log("Author from URL:", authorFromURL);

    if (query) {
      setQuery(query);
    }

    if (categoriesFromURL) {
      const decodedCategories =
        decodeURIComponent(categoriesFromURL).split(",");
      const selectedCategories = decodedCategories
        .map((categoryId) =>
          categories.find((category) => category.categoryId === categoryId)
        )
        .filter((category) => category);

      setCategoriesOptions(selectedCategories);
    }

    if (authorFromURL) {
      const selectedAuthor = manufacturers.find(
        (manufacturer) => manufacturer.name === authorFromURL
      );
      setAuthorOption(selectedAuthor);
    }
  }, [searchParams, categories, manufacturers]);

  useEffect(() => {
    let filtered = products;

    if (query) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (categoriesOptions.length > 0) {
      const categoryIds = categoriesOptions.map(
        (category) => category.categoryId
      );

      filtered = filtered.filter((product) =>
        categoryIds.includes(product.categoryId.categoryId)
      );
    }

    if (authorOption) {
      filtered = filtered.filter(
        (product) => product.manufacturerId.name === authorOption.name
      );
    }

    setSearchProduct(filtered);
  }, [products, query, categoriesOptions, authorOption]);

  const paginatedProducts = searchProduct.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClearFilters = () => {
    setQuery("");
    setCategoriesOptions([]);
    setAuthorOption(null);
    setSearchParams({});
  };

  return (
    <div className="py-5 pb-20 w-full">
      <div className="w-11/12 place-self-center">
        <div className="w-2/3">
          <Breadcrumb pageName="Sản phẩm" />
        </div>
        <div className=" w-full h-auto flex flex-col lg:flex-row justify-center pb-[10vh] pt-7">
          <div className="w-11/12 flex place-self-center">
            <div className="flex flex-col lg:flex-row h-full">
              <div className="w-full flex md:flex-row flex-col gap-2">
                <div className="flex flex-col md:w-4/12 lg:w-1/4 gap-1 place-items-center items-center">
                  <div className="w-3/4 md:w-2/3 flex flex-row border rounded-lg bg-zinc-200 p-2">
                    <form
                      className="w-full"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="flex flex-row items-center w-full">
                        <FaMagnifyingGlass className="basis-1/6" />
                        <input
                          type="text"
                          placeholder="Tìm tên sản phẩm"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="ml-2 basis-5/6 bg-transparent font-medium focus:outline-none text-left"
                        />
                      </div>
                    </form>
                  </div>
                  <Checkbox
                    dropdownName="Thể loại sách"
                    options={categories}
                    selectedOptions={categoriesOptions}
                    setSelectedOptions={setCategoriesOptions}
                  />
                  <RadioCheckBox
                    dropdownName="Tác giả"
                    options={manufacturers}
                    selectedOption={authorOption}
                    setSelectedOption={setAuthorOption}
                  />
                  <div className="pl-3 pt-3 w-[50%]">
                    <button
                      onClick={handleClearFilters}
                      className="w-full rounded-md border border-gray-500 px-4 py-2 text-sm font-medium text-gray-700 bg-zinc-400 hover:bg-sky-600"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                </div>
                <div className="md:w-8/12 w-11/12 lg:w-4/5 flex justify-center items-center place-self-center flex-col">
                  {paginatedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                      {paginatedProducts.map((value, index) => (
                        <Item key={index} value={value} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center w-full">
                      <p className="text-center md:text-xl text-lg font-semibold mb-3 text-red-800">
                        Không tìm thấy sản phẩm, hãy thử tìm lại
                      </p>
                      <img
                        src="https://www.aggarwalplantation.com/images/product-not-found.png"
                        className="w-full"
                      />
                    </div>
                  )}
                  {searchProduct.length > 0 &&
                    Math.ceil(searchProduct.length / itemsPerPage) > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(
                          searchProduct.length / itemsPerPage
                        )}
                        onPageChange={setCurrentPage}
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllProducts;
