import { useState, useEffect, useContext } from "react";

import { useSearchParams } from 'react-router-dom';
import Item from "../../components/Item.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import { DataContexts } from "../../AppContexts/Contexts.jsx";

import "../../hideScrollbar.css";

const Search = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const {products} = useContext(DataContexts)
  
//   const [searchParams] = useSearchParams();
//   const query = searchParams.get('query');





  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchProduct, setSearchProduct] = useState([]);




  useEffect(() => {
    let temp = [];
    for (let i = 0; i < products.length; i++) {
      const searchQuery = query.trim().toLowerCase();
      const productName = products[i].name.toLowerCase();
      const isMatch = productName.includes(searchQuery);
      if (isMatch) temp.push(products[i]);
    }
    setSearchProduct(temp);

  }, [products, query]);


  const paginatedProducts = searchProduct.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


//   const handleKeyDown = (event) => {
//     if (event.key === "Enter") {
//       setQuery(event.target.value);
//     }
//   };

  const totalPages = Math.ceil(searchProduct.length / itemsPerPage);
  return (
    <div className=" w-full h-auto flex justify-center place-self-center pb-[10vh] pt-7 ">
      <div className="w-11/12">
        <div className="flex flex-col h-full ">
         
            <div className="md:w-4/5 w-full  flex flex-col justify-center place-self-center">
            <h2 className="mb-5 text-2xl">
            Có {searchProduct.length} sản phẩm theo kết quả tìm kiếm {`"${query}"`}
            </h2>
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {paginatedProducts.map((value, index) => (
                    <Item key={index} value={value} />
                  ))}
                </div>
              ) : (
                <div>
                  <img src="https://cei.org/wp-content/uploads/2020/09/GettyImages-1207750534.jpg" />
                </div>
              )}
              {searchProduct.length > 0 && totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          
        </div>
      </div>
    </div> 
  );
};
export default Search;
