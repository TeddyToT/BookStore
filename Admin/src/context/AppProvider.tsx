import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataContext } from "./DataContext"; // import từ file trên

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [carts, setCarts] = useState([]);
  const [shop, setShop] = useState([]);
  const [banners, setBanners] = useState([]);

  const fetchProducts = () => {
    axios.get("http://localhost:8081/v1/api/user/products")
      .then((res) => setProducts(res.data))
      .catch(console.log);
  };

  const fetchCategories = () => {
    axios.get("http://localhost:8081/v1/api/user/categories")
      .then((res) => setCategories(res.data))
      .catch(console.log);
  };

  const fetchUsers = () => {
    axios.get("http://localhost:8081/v1/api/user/users")
      .then((res) => setUsers(res.data))
      .catch(console.log);
  };

//   const fetchOrders = () => {
//     axios.get("http://localhost/be-shopbangiay/api/invoice.php")
//       .then((res) => setOrders(res.data))
//       .catch(console.log);
//   };

  const fetchAuthors = () => {
    axios.get("http://localhost:8081/v1/api/user/authors")
      .then((res) => setAuthors(res.data))
      .catch(console.log);
  };

  const fetchFeedbacks = () => {
    axios.get("http://localhost:8081/v1/api/user/feedbacks")
      .then((res) => setFeedbacks(res.data))
      .catch(console.log);
  };

//   const fetchCarts = () => {
//     axios.get("http://localhost/be-shopbangiay/api/cart.php")
//       .then((res) => setCarts(res.data))
//       .catch(console.log);
//   };

  const fetchShop = () => {
    axios.get("http://localhost:8081/v1/api/user/shop")
      .then((res) => {
        setShop(res.data)
        console.log(res.data);
      })
      .catch(console.log);
  };

  const fetchBanners = () => {
    axios.get("http://localhost:8081/v1/api/user/banner")
      .then((res) => setBanners(res.data))
      .catch(console.log);
  };

  const fetchUserDetail = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios.get(`http://localhost:8081/v1/api/user/users/${userId}`)
        .then((res) => {
            setUserDetail(res.data)
            console.log("siu:::: ",res.data);
        })
            
        .catch(console.log);
    }
  //   axios.get(`http://localhost:8081/v1/api/user/users/68076400c8165a06a654ce74`)
  //   .then((res) => {
  //       setUserDetail(res.data)
  //       console.log("siu:::: ",res.data);
  //   })
  //   .catch(console.log);

  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
    fetchAuthors();
    // fetchOrders();
    fetchShop();
    fetchBanners();
    fetchUserDetail();
    fetchFeedbacks();
  }, []);

  return (
    <DataContext.Provider
      value={{
        users, setUsers,
        userDetail, setUserDetail, fetchUserDetail,
        products, setProducts, fetchProducts,
        categories, setCategories, fetchCategories,
        authors, setAuthors, fetchAuthors,
        // orders, setOrders, fetchOrders,
        feedbacks, setFeedbacks, fetchFeedbacks,
        // carts, setCarts, fetchCarts,
        shop, setShop, fetchShop,
        banners, setBanners, fetchBanners,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default AppProvider;
