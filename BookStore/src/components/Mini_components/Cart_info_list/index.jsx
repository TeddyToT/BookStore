import {
  Typography,
  Table,
  InputNumber,
  notification,
  Button,
  Divider,
  Input,
  Row,
  Col,
} from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContexts } from "../../../AppContexts/Contexts";
const { Text } = Typography;
import { toast } from "react-toastify";

const CartInfoList = () => {
  const { fetchCartUser } = useContext(DataContexts);
  const [cartData, setCartData] = useState([]);
  const userId = localStorage.getItem("id"); // Lấy id từ localStorage

  useEffect(() => {
    if (userId) {
      fetchCartData();
    }
  }, [userId]);

  const navigate = useNavigate();

  const fetchCartData = async () => {
    try {
      const response = await fetch(
        `http://localhost/be-shopbangiay/api/cart.php?userId=${userId}`
      );
      const data = await response.json();

      const transformedData = data.map((item) => ({
        cartId: item.cartId,
        productId: item.productId.productId,
        name: item.productId.name,
        price: Number(item.productId.price),
        quantity: Number(item.quantity),
        discount: Number(item.productId.discount),
        image: item.productId.mainImage,
        size: item.size,
      }));
      setCartData(transformedData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleDecrease = (record) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.productId === record.productId && item.size === record.size
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const handleIncrease = (record) => {
    setCartData((prevData) =>
      prevData.map((item) =>
        item.productId === record.productId && item.size === record.size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleOrderClick = async () => {
    const items = cartData.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size,
    }));

    const payload = {
      userId: userId,
      items: items,
    };

    try {
      const response = await fetch(
        "http://localhost/be-shopbangiay/api/updatecart.php",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const res = await response.json();

      if (res.success == true) {
        navigate("/thanh-toan");
      } else {
        console.error("Failed to update cart:", res.statusText);
        toast.error('Xảy ra lỗi khi thanh toán', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error('Cập nhật giỏ hàng thất bại', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      console.log("Dữ liệu gửi đi:", JSON.stringify(payload));
    }
  };

  const handleRemoveItem = async (productId, size) => {
    console.log(size);
    const itemToRemove = cartData.find(
      (item) => item.productId === productId && item.size === size
    );
    if (!itemToRemove) return;

    const payload = {
      userId: userId,
      productId: itemToRemove.productId,
      size: size.toString(),
    };

    try {
      const response = await fetch(
        "http://localhost/be-shopbangiay/api/cart.php",
        {
          method: "PUT", // Sử dụng phương thức DELETE
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const res = await response.json();

      if (res.success) {
        // setCartData(prevData => {
        // const updatedData = prevData.filter(item => item.productId !== productId);
        toast.success('Sản phẩm đã được xóa khỏi giỏ hàng', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        fetchCartUser(userId)
        fetchCartData();
        return;
        // });
      } else {
        toast.error('Xảy ra lỗi. Không thể xóa sản phẩm', {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error('Xảy ra lỗi. Không thể xóa sản phẩm', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const columns = [
    {
      title: (
        <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>
          Sản phẩm
        </div>
      ),
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CloseCircleOutlined
            style={{
              fontSize: "24px",
              marginRight: "20px",
              flex: "0 0 auto",
            }}
            onClick={() => handleRemoveItem(record.productId, record.size)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: "1",
            }}
          >
            <img
              src={record.image}
              alt={text}
              style={{
                width: 50,
                height: 50,
                marginRight: "10px",
                flex: "0 0 auto",
              }}
            />
            <div
              style={{
                flex: "1",
                minWidth: 0,
              }}
            >
              <Text style={{ display: "block" }}>{text}</Text>
              {record.discount != 0?(
                <div className="flex gap-2">

<Text type="secondary">{(record.price*(1-record.discount/100)).toLocaleString()}đ</Text>
<Text className="line-through" type="secondary">{record.price.toLocaleString()}đ</Text>


                </div>
              )
              :(
<Text type="secondary">{record.price.toLocaleString()}đ</Text>
              )
            }
              
              <Text type="secondary" style={{ display: "block" }}>
                Size: {record.size}
              </Text>
            </div>
          </div>
        </div>
      ),
      width: "50%",
    },
    {
      title: (
        <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>
          Số lượng
        </div>
      ),
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => handleDecrease(record)}
            style={{ textAlign: "center", fontSize: "20px", padding: "10px" }}
          >
            -
          </Button>
          <InputNumber
            readOnly
            min={1}
            value={quantity}
            style={{ width: "40px", margin: "0 4px" }}
          />
          <Button
            onClick={() => handleIncrease(record)}
            style={{ textAlign: "center", fontSize: "16px", padding: "10px" }}
          >
            +
          </Button>
        </div>
      ),
    },
    {
      title: (
        <div style={{ fontSize: 20, fontWeight: 700, textAlign: "center" }}>
          Thành tiền
        </div>
      ),
      dataIndex: "price",
      key: "total",
      render: (text, record) =>
        record.discount != 0 ? (
          <div>
            <Text
            className="line-through text-gray-500"
              style={{
                display: "block",
                textAlign: "center",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              {(record.price * record.quantity).toLocaleString()}đ
            </Text>
            <Text
              style={{
                display: "block",
                textAlign: "center",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              {((record.price*(1-record.discount/100)) * record.quantity).toLocaleString()}đ
            </Text>
          </div>
        ) : (
          <Text
            style={{
              display: "block",
              textAlign: "center",
              fontWeight: 500,
              fontSize: 16,
            }}
          >
            {(record.price * record.quantity).toLocaleString()}đ
          </Text>
        ),
    },
  ];

  const totalPrice = cartData.reduce((total, item) => {
    return (
      total +
      Number(item.price) *
        (1 - Number(item.discount) / 100) *
        Number(item.quantity)
    );
  }, 0);
  const totalQuantity = cartData.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Row gutter={16}>
      <Col span={16}>
        <span style={{ margin: 20, fontWeight: 700, fontSize: 30 }}>
          Giỏ hàng
        </span>
        <Table
          columns={columns}
          dataSource={cartData}
          pagination={false}
          scroll={{ y: 400 }}
        />
        <div style={{ textAlign: "right", margin: "20px" }}>
          <Text strong style={{ fontSize: 20 }}>
            Tổng: {totalPrice.toLocaleString()}đ
          </Text>
        </div>
      </Col>

      <Col span={8}>
        <div
          style={{
            padding: "20px",
            background: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <Text strong style={{ fontSize: 18, fontWeight: 500 }}>
            Tổng số lượng:
          </Text>
          <Text style={{ float: "right", fontSize: 16, fontWeight: 600 }}>
            {totalQuantity} sản phẩm
          </Text>
          <Divider />
          <Text strong style={{ fontSize: 18, fontWeight: 500 }}>
            Tạm tính:
          </Text>
          <Text style={{ float: "right", fontSize: 16, fontWeight: 600 }}>
            {totalPrice.toLocaleString()}đ
          </Text>
          <Divider />
          <Text strong>
            <span>*Lưu ý:</span> Mức thanh toán chưa bao gồm phí vận chuyển. Phí
            vận chuyển có thể khác nhau tùy thuộc vào khu vực và thời gian.
          </Text>

          <Divider />

          <Button
            type="primary"
            block
            style={{ marginTop: "20px" }}
            onClick={handleOrderClick}
            disabled={!totalPrice}
          >
            Đặt hàng
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default CartInfoList;
