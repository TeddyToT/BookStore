import React, { useState, useContext, useEffect } from "react";
import ItemSwiper from "../../components/RecommentItem/ItemSwiper";
import { DataContexts } from "../../AppContexts/Contexts";
import { Link } from "react-router-dom";
const AuthorSelector = () => {
  const { products, authors } = useContext(DataContexts); 
  const [selectedAuthor, setSelectedAuthor] = useState(null); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  
  useEffect(() => {
    if (selectedAuthor) {
      const filtered = products.filter(
        (product) => product.manufacturerId.manufacturerId === selectedAuthor.manufacturerId
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]); 
    }
  }, [products, selectedAuthor]);


  useEffect(() => {
    if (authors.length > 0) {
      setSelectedAuthor(authors[0]);
    }
  }, [authors]);

  return (
    <div className="p-5">
      
      <div className="flex gap-2 mb-5 md:w-3/4 w-full  place-self-center justify-around text-center">
        {authors.map((author) => (
          <button
            key={author.manufacturerId}
            onClick={() => setSelectedAuthor(author)}
            className={` text-center sm:py-3 rounded-lg capitalize w-1/5 text-base sm:text-xl font-semibold   ${
              selectedAuthor?.manufacturerId === author.manufacturerId
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {author.name}
          </button>
          
        ))}

      </div>

      {filteredProducts.length > 0 ? (
        <ItemSwiper items={filteredProducts} />
        
      ) : (
        <p className="text-gray-600">Không có sản phẩm nào cho tác giả này.</p>
      )}
      {selectedAuthor?(<div className="w-full text-right mt-8">
      <Link to={`/san-pham?author=${selectedAuthor.name}`} className="text-white hover:text-red-500  text-base font-bold bg-[#3e3e3e] hover:bg-black py-3 px-3 rounded-xl">Xem thêm</Link>
      </div>):(
        <div>
          </div>
      )}
      
       
    </div>
  );
};

export default AuthorSelector;
