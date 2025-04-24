import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const DataContexts = createContext({});

export const AppProvider = ({ children }) => {
  // const[email, setEmail] = useState("")

  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [orders, setOrders] = useState([]);
  const [carts, setCarts] = useState([]);
  const [shop, setShop] = useState([]);
  const [banners, setBanners] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const id = localStorage.getItem("id")

  
  const fetchUserInfo = (id) => {
    if (!id) {
        console.log("Không có user");
        return;
    }

    axios.get(`http://localhost:8081/v1/api/user/users/` + id)
        .then((res) => {
          setUserInfo(res.data);
            console.log(res.data);
            return
        })
        .catch((err) => {
            console.log(err);
        });
};

  const fetchCartUser = (id) => {
      if (!id) {
          console.log("Không có user");
          return;
      }

      axios.get(`http://localhost:8081/v1/api/user/carts/` + id)
          .then((res) => {
              setUserCart(res.data);
              console.log(res.data);
              return
          })
          .catch((err) => {
              console.log(err);
          });
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:8081/v1/api/user/products")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCategories = () => {
    axios
      .get("http://localhost:8081/v1/api/user/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchUsers = () => {
    axios
      .get("http://localhost/be-shopbangiay/api/user.php")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAuthors = () => {
    axios
      .get("http://localhost/be-shopbangiay/api/manufacturer.php")
      .then((res) => {
        setAuthors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOrders = () => {
    axios
      .get("http://localhost:8081/v1/api/user/orders")
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCarts = () => {
    axios
      .get("http://localhost:8081/v1/api/user/carts")
      .then((res) => {
        setCarts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchShop = () => {
    axios
      .get("http://localhost:8081/v1/api/user/shop")
      .then((res) => {
        setShop(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBanners = () => {
    axios
      .get("http://localhost:8081/v1/api/user/banner")
      .then((res) => {
        setBanners(res.data.images);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchUsers();
    fetchOrders();
    fetchAuthors();
    fetchCarts();
    fetchShop();
    fetchBanners();
  }, []);

  useEffect(() => {
    if (!id) {
      console.log("User is not logged in. Redirecting to login.");
      return;
    }

    fetchCartUser(id);
    fetchUserInfo(id)
  }, [id]);

  return (
    <DataContexts.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        categories,
        setCategories,
        fetchCategories,
        users,
        setUsers,
        fetchUsers,
        orders,
        setOrders,
        fetchOrders,
        authors,
        setAuthors,
        fetchAuthors,
        carts,
        setCarts,
        fetchCarts,
        shop,
        setShop,
        fetchShop,
        banners,
        setBanners,
        fetchBanners,
        userCart,
        fetchCartUser,
        userInfo,
        setUserInfo,
        fetchUserInfo
      }}
    >
      {children}
    </DataContexts.Provider>
  );
};
