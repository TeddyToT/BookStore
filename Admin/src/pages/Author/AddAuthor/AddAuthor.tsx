import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

import { useState, useContext } from "react";
import { DataContext } from "../../../context/DataContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/Loading/LoadingSpinner";

const AddAuthor = () => {
  const [authorName, setAuthorName] = useState("");
  const { fetchAuthors }: any = useContext(DataContext);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!authorName) {
      toast.warning("Yêu cầu nhập tên tác giả", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    if (!image) {
      toast.warning("Yêu cầu thêm hình cho tác giả", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    setIsLoading(true);

    const form = new FormData();
    form.append("name", authorName);
    form.append("avatar", image);
    axios
      .post("http://localhost:8081/v1/api/user/authors", form)
      .then((res) => {
        if (res.data.success == false) {
          toast.error(
            `Thêm tác giả thất bại, kiểm tra lại\n ${res.data.message}`,
            {
              position: "top-right",
              autoClose: 1500,
            }
          );
          setIsLoading(false);
          console.log("Response:", res.data);
          return;
        } else {
          fetchAuthors();
          toast.success("Thêm tác giả thành công", {
            position: "top-right",
            autoClose: 2000,
          });
          setIsLoading(false);
          navigate("/author-overview");
        }

        console.log("Response:", res.data);
      })
      .catch((err) => {
        toast.error(`Thêm tác giả thất bại, kiểm tra lại `, {
          position: "top-right",
          autoClose: 1500,
        });
        setIsLoading(false);
        console.log("Error:", err.response ? err.response.data : err.message);
      });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // let reader = new FileReader();
    const file = event.target.files?.[0] || null;

    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      setImage(file);
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { name: "Dashboard", href: "/" },
          { name: "Tông quan tác giả", href: "/authors-overview" },
          { name: "Thêm tác giả" },
        ]}
      />
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {isLoading && <LoadingSpinner />}

          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-3 block  font-medium text-black dark:text-white">
                  Tên tác giả
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Nhập tên sản phẩm"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Hình ảnh tác giả
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              {imagePreview && (
                <div className="mt-4">
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        width={128}
                        height={128}
                        src={imagePreview}
                        alt="Preview"
                        className="h-32 w-32 rounded-lg border border-stroke object-cover"
                      />
                    </div>
                  )}
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAuthor;
