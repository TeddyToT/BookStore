import { useState } from "react";

interface KindItem {
  kind: number;
  stock: number;
  price: number;
  discount: number;
}

interface AddKindInputProps {
  onAdd: (item: KindItem) => void;
  onRemove?: (kind: number) => void; // Thêm optional để hỗ trợ xoá nếu cần
}

const AddKindInput = ({ onAdd, onRemove }: AddKindInputProps) => {
  const [kind, setKind] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [discount, setDiscount] = useState<number | "">("");

  const handleAddClick = () => {
    if (kind !== "" && stock !== "" && price !== "" && discount !== "") {
      onAdd({
        kind: Number(kind),
        stock: Number(stock),
        price: Number(price),
        discount: Number(discount),
      });
      setKind("");
      setStock("");
      setPrice("");
      setDiscount("");
    }
  };

  const handleRemoveClick = () => {
    if (onRemove && kind !== "") {
      onRemove(Number(kind));
      setKind("");
      setStock("");
      setPrice("");
      setDiscount("");
    }
  };

  return (
    <div className="flex flex-row gap-3 pt-3">
      <input
        type="number"
        value={kind}
        placeholder="Nhập loại sách"
        onChange={(e) => setKind(Number(e.target.value) || "")}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <input
        type="number"
        value={stock}
        placeholder="Nhập tồn kho"
        onChange={(e) => setStock(Number(e.target.value) || "")}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <input
        type="number"
        value={price}
        placeholder="Nhập giá"
        onChange={(e) => setPrice(Number(e.target.value) || "")}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <input
        type="number"
        value={discount}
        placeholder="Nhập tỉ lệ giảm giá (0-100%)"
        onChange={(e) => setDiscount(Number(e.target.value) || "")}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <button
        onClick={handleAddClick}
        className="rounded bg-primary px-4 py-2 text-white hover:bg-opacity-90"
      >
        Thêm
      </button>
      {onRemove && (
        <button
          onClick={handleRemoveClick}
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-opacity-90"
        >
          Xoá
        </button>
      )}
    </div>
  );
};

export default AddKindInput;
