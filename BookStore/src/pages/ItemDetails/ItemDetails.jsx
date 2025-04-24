import { useState, useEffect, useContext, useMemo } from "react";
import QuantitySelection from "../../components/QuantitySelection";
import { useParams, Link, useNavigate } from "react-router-dom";
import RecommentItem from "../../components/RecommentItem/RecommentItem";
import axios from "axios";
import { DataContexts } from "../../AppContexts/Contexts";
import SizeSelect from "./SizeSelect";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { toast } from "react-toastify";
const ItemDetails = () => {
  const { slugId } = useParams();
  const { products, fetchCartUser } = useContext(DataContexts)
  const lastDashIndex = slugId.lastIndexOf("-");
  const productId = slugId.slice(lastDashIndex + 1);
  const userId = localStorage.getItem('id');
  const [items, setItems] = useState([])

  const [quantity, setQuantity] = useState(0);

  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState({});
  const [authorName, setAuthorName] = useState({});
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [des, setDes] = useState("");
  const [discount, setDiscount] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedSize, setSelectedSize] = useState({});


  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(
        `http://localhost/be-shopbangiay/api/product.php?productId=` + productId
      )
      .then((res) => {
        const allImages = [res.data.mainImage, ...res.data.otherImages];
        setProductName(res.data.name);
        setCategoryName(res.data.categoryId);
        setAuthorName(res.data.manufacturerId);
        setImages(allImages);
        setSizes(res.data.type);
        setDes(res.data.description);
        setDiscount(res.data.discount);
        setPrice(parseInt(res.data.price));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [productId]);

  const handleAddCartClick = () => {
    if(!userId)
    {
      toast.warn('Yêu cầu đăng nhập thể thêm vào giỏ hàng', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (selectedSize.quantity == 0)
    {
      toast.warn('Hiện tồn kho cho loại sách này đã hết', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (quantity == 0)
      {
        toast.warn('Yêu cầu chọn số lượng sản phẩm lớn hơn 0', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        return;
      }

    axios.post("http://localhost/be-shopbangiay/api/cart.php", {
      userId: userId.toString(),
      productId: productId.toString(),
      quantity: Number(quantity),
      size: selectedSize.size.toString(),
    })
      .then((res) => {
        if (res.data.success == false) {
          toast.error('Thêm vào giỏ hàng thất bại', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });

        }
        else {

          toast.success('Thêm vào giỏ hàng thành công', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          fetchCartUser(userId)

        }
      }
      )
      .catch(err => {
        console.log(err)
      })


  }

  const handleOrderClick = async () => {
    if(!userId)
      {
        toast.warn('Yêu cầu đăng nhập mua ngay sản phẩm', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (selectedSize.quantity == 0)
        {
          toast.warn('Hiện tồn kho cho loại sách này đã hết', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
          return;
        }
    
        if (quantity == 0)
          {
            toast.warn('Yêu cầu chọn số lượng sản phẩm lớn hơn 0', {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: false,
              progress: undefined,
              theme: "light",
            });
            return;
          }

    const payload = [{
      productId: productId,
      name: productName,
      price: Number(price),
      quantity: Number(quantity),
      discount: Number(discount),
      size: selectedSize.size.toString(),
      image: images[0]
      
    }]

    navigate('/thanh-toan', { state: payload });

  };


  useEffect(() => {
    if (sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes]);
  const [activeImg, setActiveImage] = useState(images[0]);

  useEffect(() => {
    if (!activeImg && images.length > 0) {
      setActiveImage(images[0]);
    }
  }, [activeImg, images]);

  useEffect(() => {
    if (productName) {
      const temps = [
        { name: 'Trang chủ', href: '/' },
        { name: 'Sản phẩm', href: '/san-pham' },
        { name: productName }
      ]
      setItems(temps);
    }
  }, [activeImg, images, productName]);
  const [expandText, setExpandText] = useState(false);

  function handleExpandButton() {
    setExpandText(!expandText);
  }
  const formatNumber = (number) => {
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const [isHoverEnabled, setIsHoverEnabled] = useState(true);
  const handleImageClick = () => {
    setIsHoverEnabled(false);

    setTimeout(() => {
      setIsHoverEnabled(true);
    }, 1000);
  };


  const refProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.manufacturerId.name === authorName.name ||
        product.categoryId.name === categoryName.name
    );
  }, [products, authorName.name, categoryName.name]);
  
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const recProducts = useMemo(() => {
    return shuffle(refProducts).slice(0, 10);
  }, [refProducts]);

  return (
    <>
     
      <div className="w-11/12 h-auto flex flex-col py-5 mb-20  items-center place-self-center">
      <div className=" place-self-start mb-3">
      <Breadcrumb items={items} />
      </div>
        <div className="w-full px-5 flex ">
          <div className="w-full flex flex-col md:flex-row xl:gap-10 justify-between gap-2">
            <div className="w-full md:w-2/3 lg:w-7/12 flex flex-row  gap-1">
              <div className="flex flex-col basis-1/4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt=""
                    className={`rounded-lg hover:scale-105 hover:brightness-105 w-full xl:h-[15vh] lg:h-[12vh] h-[10vh] object-cover cursor-pointer ${activeImg === image ? "opacity-100" : "opacity-20"
                      }`}
                    onMouseOver={() => {
                      if (isHoverEnabled) setActiveImage(image);
                    }}
                    onClick={() => {
                      setActiveImage(image);
                      handleImageClick();
                    }}
                  />
                ))}
              </div>

              <div className="basis-3/4 flex flex-row ">
                <img
                  src={activeImg}
                  alt="mainImage"
                  className="w-full xl:h-[60vh] lg:h-[48vh] md:h-[40vh] h-[40vh] object-cover border-b-2 rounded-lg"
                />
              </div>
            </div>

            <div className="w-full md:w-1/3 lg:w-5/12 ">
              <div className="w-full pb-5 mb-5 border-b-2 border-gray-500">
                <p className="w-[120%] lg:text-4xl text-2xl md:text-xl font-bold mt-2 mb-1">{productName}</p>
                <p className="pt-5 text-base font-bold flex flex-row items-center">
                  Tác giả: 
                  <div className="group ml-1 hover:bg-slate-700  px-2 py-1 rounded-lg">
                    <Link
                      to={`/san-pham?author=${authorName.name}`}
                      className="capitalize font-bold text-sky-600 group-hover:text-white">
                      {authorName.name}
                    </Link>
                  </div>
                </p>
                <p className="text-base font-bold flex flex-row items-center">
                  Thể loại sách:
                  <div className=" flex flex-row group ml-1 hover:bg-slate-700  py-1 rounded-lg">
                    <Link
                      to={`/san-pham?categories=${categoryName.categoryId}`}
                      className="font-bold text-sky-600 group-hover:text-white">
                      {categoryName.name}
                    </Link>
                  </div>
                </p>
              </div>
              <div className="w-full border-b-2 border-gray-500 mb-5 pb-5">

                {discount != 0 ? (
                  <div className="w-full flex flex-row items-start gap-3 lg:text-4xl md:text-xl text-2xl">
                    <p className="font-bold ">
                      {formatNumber(price - (price * discount) / 100)}đ
                    </p>

                    <p className=" font-medium text-gray-500 line-through">
                      {formatNumber(price)}đ
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-row items-end gap-3">
                    <p className="font-bold text-4xl">
                      {formatNumber(price)}đ
                    </p>

                  </div>
                )}



              </div>
              <div className="lg:flex-col  w-full">
                <p className="text-lg font-bold text-left my-2">
                  Mô tả sản phẩm:{" "}
                </p>
                <p className=" text-left whitespace-pre-wrap break-words">
                  {expandText ? des : des.slice(0, 100) + "..."}
                </p>
                <p
                  className="italic text-lg text-gray-600 font-bold my-2 hover:text-blue-600 hover:cursor-pointer"
                  onClick={handleExpandButton}
                >
                  {expandText ? "Thu gọn" : "Xem thêm"}{" "}
                </p>
              </div>
              <p className="font-bold lg:text-lg">Chọn Size</p>
              <SizeSelect
                sizes={sizes}
                selectedSize={selectedSize}
                updateSelectedSize={setSelectedSize}
              />
              <div className="w-full mt-3">
                <QuantitySelection
                  quantity={quantity}
                  updateQuantity={setQuantity}
                  limit={parseInt(selectedSize.quantity)}
                />
              </div>
              <div className="flex flex-row mt-5 gap-3">
                <button onClick={handleOrderClick} className="group overflow-hidden w-1/3 h-[60px] flex items-center justify-start border hover:bg-slate-700 border-[#3e3e3e] rounded-xl cursor-pointer group hover:border-none ">
                  <p 
                 
                    className="text-lg w-full text-black group-hover:text-white font-bold "
                  >
                    Mua ngay
                  </p>
                </button>
                <button onClick={handleAddCartClick}
                  className="group overflow-hidden w-1/3 h-[60px] flex items-center justify-start  border hover:bg-slate-700 border-[#3e3e3e] rounded-xl cursor-pointer group hover:border-none "
                >
                  <p className="text-lg w-full text-black group-hover:text-white font-bold">
                    Thêm vào giỏ
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center items-center mt-20">
          <RecommentItem items={recProducts} className="flex justify-center items-center" />
        </div>
      </div>
    </>
  );
};

export default ItemDetails;