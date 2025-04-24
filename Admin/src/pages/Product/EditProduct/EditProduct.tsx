import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import SelectAuthorOption from "../../../components/SelectGroup/AuthorOption";
import SelectCategoryOption from "../../../components/SelectGroup/SelectCategoryOption";
import { useState, useRef, useContext, useEffect } from "react";
import { DataContext } from "../../../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";
interface KindItem {
  kind: number | "";
  stock: number | "";
  discount: number | "";
  price: number | "";
}

const EditProduct = () => {
const { id } = useParams<{ id: string }>();
  const [productName, setProductName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [kinds, setKinds] = useState<KindItem[]>([]);
  
  const [des, setDes] = useState("");
  const { fetchProducts }: any = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/v1/api/user/products/` + id)
      .then((res) => {
        setProductName(res.data.name);
        setCategoryName(res.data.categoryId._id);
        setAuthorName(res.data.authorId._id);
        setImagePreviews(res.data.images);
        setImages(res.data.images);
        setKinds(res.data.type);
        setDes(res.data.description);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleAddRow = (event) => {
    event.preventDefault();
    setKinds([...kinds, { kind: "", stock: "",price: "" ,discount: ""  }]);
  };

  

  const handleKindChange = (index, field, value) => {
    setKinds((prevKinds) =>
      prevKinds.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };
  const handleRemoveKind = (index) => {
    setKinds((prevKinds) => prevKinds.filter((_, i) => i !== index));
  };

  const handleCategoryChange = (selectedType) => {
    setCategoryName(selectedType);

  };
  const handleAuthorChange = (selectedType) => {
    setAuthorName(selectedType);

  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    if (files) {
      const uploadedFiles = Array.from(files);
  
      const hasMainImage = images.some((image) => typeof image !== 'string' && image.name.includes("main"));
  
      const validFiles = uploadedFiles.filter((file) => {
        if (file.name.includes("main") && hasMainImage) {
          toast.warning('Chỉ được 1 file ảnh "main".', {
            position: "top-right",
            autoClose: 1500,
          });
          return false;
        }
        return true;
      });
  
      if (images.length + validFiles.length > 4) {
        toast.warning("You can upload up to 4 images only.", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }
  
      const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
  
      setImages((prev) => [...prev, ...validFiles]);
      setImagePreviews((prev) => [...prev, ...previewUrls]);
    }
  };

  const handleRemoveImage = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
  
    // Xóa ảnh preview khi loại bỏ
    URL.revokeObjectURL(imagePreviews[index]);
  
    // Loại bỏ ảnh theo index trong mảng images
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };
  console.log("Category đã chọn:", categoryName);
  console.log("Kinds: ",kinds);
  console.log("author đã chọn:", authorName);
  console.log("name",productName);
  console.log("des",des);
  console.log("img",images);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData();

    if (!productName) {
      toast.warning("Yêu cầu nhập tên sản phẩm", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    if (!categoryName) {
      toast.warning("Yêu cầu chọn thể loại sản phẩm", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    if (!des) {
      toast.warning("Yêu cầu nhập mô tả sản phẩm", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (!images) {
      toast.warning("Yêu cầu thêm ảnh cho sản phẩm", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    if (kinds.length === 0) {
      toast.warning("Yêu cầu thêm loại sản phẩm", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
  
    const hasInvalidKind = kinds.some(
      (item) => item.kind === "" || item.stock === "" || item.price === "" || item.discount === ""
    );
    if (hasInvalidKind) {
      toast.warning("Yêu cầu nhập đầy đủ thông tin về loại, số lượng, giá và discount sản phẩm", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    const hasInvalidStock = kinds.some((item) => Number(item.stock) < 0);
    if (hasInvalidStock) {
      toast.warning("Tồn kho phải lớn hơn hoặc bằng 0", {
        position: "top-right",
        autoClose: 1500,
      });
      return ;
    }
    
  const hasInvalidDiscount = kinds.some((item) =>
    Number(item.discount) < 0 || Number(item.discount) > 100
  );

  if (hasInvalidDiscount) {
    toast.warning("Tỉ lệ giảm giá phải nằm trong khoảng 0 đến 100", {
      position: "top-right",
      autoClose: 1500,
    });
    return ;
  }
    const duplicateKind = kinds.filter((item, index) => kinds.some((elem, idx) => elem.kind === item.kind && idx !== index));
    if (duplicateKind.length >= 1) {
      toast.warning(`Có loại bị trùng`, {
        
        position: "top-right",
        autoClose: 1500,
      });
      console.log(duplicateKind);
      return;
    }




    form.append("name", productName);
    form.append("type", JSON.stringify(kinds));
    form.append("description", des);
    form.append("categoryId", categoryName);
    form.append("authorId", authorName);
    const sortedImages = [...images].sort((a, b) => {
        const aIsMain = typeof a !== 'string' && a.name.includes("main");
        const bIsMain = typeof b !== 'string' && b.name.includes("main");
        return aIsMain === bIsMain ? 0 : aIsMain ? -1 : 1;
      });
  
      sortedImages.forEach((image) => {
        form.append("images", image instanceof File ? image : image);  // Nếu là file, append File, nếu là string, append URL
      });
  setIsLoading(true);

    axios
      .put(`http://localhost:8081/v1/api/user/products/` + id, form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.success == false) {
          toast.error("Sửa sản phẩm thất bại, kiểm tra lại", {
            position: "top-right",
            autoClose: 1500,
          });
          setIsLoading(false);
          console.log("Response:", res.data);
          return;
        } else {
          fetchProducts();
          toast.success("Sửa sản phẩm thành công", {
            position: "top-right",
            autoClose: 2000,
          });
          setIsLoading(false);
          navigate("/product-overview");
        }

        console.log("Response:", res.data);
      })
      .catch((err) => {
        toast.error("Sửa sản phẩm thất bại, kiểm tra lại", {
          position: "top-right",
          autoClose: 1500,
        });
        setIsLoading(false);
        console.log("Error:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/" },
          { name: "Tông quan sản phẩm", href: "/product-overview" },
          { name: "Sửa sản phẩm" },
        ]}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {isLoading && <LoadingSpinner />}
        
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block  font-medium text-black dark:text-white">
                  Tên sản phẩm
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Nhập tên sản phẩm"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
      <div className="mb-3 flex flex-row items-center gap-3">
        <label className="block font-medium text-black dark:text-white">
          Loại sách
        </label>
        <button
          onClick={handleAddRow}
          className="flex justify-center rounded bg-primary p-2 font-medium text-gray hover:bg-opacity-90"
        >
          Thêm loại sách mới
        </button>
      </div>

      {kinds.map((item, index) => (
  <div key={index} className="flex flex-row gap-3 pt-3 items-center">
    <input
      type="text"
      value={item.kind}
      onChange={(e) => handleKindChange(index, "kind", e.target.value)}
      placeholder="Nhập loại sách"
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    <input
      type="number"
      value={item.stock}
      onChange={(e) => handleKindChange(index, "stock", e.target.value)}
      placeholder="Nhập tồn kho"
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    <input
      type="number"
      value={item.price}
      onChange={(e) => handleKindChange(index, "price", e.target.value)}
      placeholder="Nhập gía"
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    <input
      type="number"
      value={item.discount}
      onChange={(e) => handleKindChange(index, "discount", e.target.value)}
      placeholder="Nhập discount 0-100%"
      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    <p
      onClick={() => handleRemoveKind(index)}
      className="hover:cursor-pointer px-3 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
    >
      Xóa
    </p>
  </div>
))}


    </div>
              <SelectCategoryOption
                value={categoryName}
                onCategoryChange={handleCategoryChange}
              />
              <SelectAuthorOption
                value={authorName}
                onAuthorChange={handleAuthorChange}
              />
              <div className="mb-4.5">
                <label className="mb-3 block  font-medium text-black dark:text-white">
                  Mô tả
                </label>
                <input
                  type="text"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="Nhập mô tả sản phẩm"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Ảnh sản phẩm (
                  {images.length < 4 ? '4 ảnh - 1 ảnh "main"' : "Đã đủ 4 ảnh"})
                </label>

                <div className="relative mt-2 flex items-center justify-center">
                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
                  />

                  <button className=" w-1/2 rounded-lg bg-blue-500 px-5 py-3 text-white hover:bg-blue-600 focus:outline-none">
                    Thêm ảnh
                  </button>
                </div>
              </div>

              {imagePreviews.length > 0 && (
                <div className="my-10 grid grid-cols-2 gap-2 w-1/2 place-self-center ">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="group relative flex flex-row  w-fit">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        width={128}
                        height={128}
                        className="h-32 w-32 rounded-lg border border-stroke object-cover"
                      />
                      {(typeof images[index] === "string" &&
                        images[index]?.includes("main")) ||
                      (images[index] instanceof File &&
                        images[index]?.name.includes("main")) ? (
                        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-2 py-1 text-xs text-white">
                          Main
                        </span>
                      ) : null}

                      <button
                        type="button"
                        onClick={(e) => handleRemoveImage(e, index)}
                        className="absolute rounded-full bg-black bg-opacity-50 p-1 text-white opacity-0 transition group-hover:opacity-100"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Sửa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
