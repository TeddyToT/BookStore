import { Layout, Tabs } from "antd";
import UserOptionMenu from "../../Mini_components/User_option_menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChevronRight,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

function ContentOderTracking() {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("id"); // Lấy id từ localStorage

  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchOrderData();
    }
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `http://localhost/be-shopbangiay/api/user.php?userId=${userId}`
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        `http://localhost/be-shopbangiay/api/invoice.php?userId=${userId}`
      );
      const data = await response.json();

      const filteredOrders = data.filter(
        (order) =>
          order.state === "Pending" ||
          order.state === "Shipping" ||
          order.state === "Confirming"
      );

      const transformedStatus = filteredOrders.map((order) => {
        order.state =
          order.state === "Pending"
            ? "Chờ xác nhận"
            : (order.state =
                order.state === "Confirming"
                  ? "Đã xác nhận"
                  : order.state === "Shipping"
                  ? "Đang giao"
                  : order.state);
        return order;
      });
      transformedStatus.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      );

      setOrders(transformedStatus);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const calculatePrice = (item) => {
    if (!item) return 0;
    const sum = 0;
    if (item.productId.discount == 0) {
      return sum + Number(item.productId.price) * Number(item.quantity);
    } else {
      return (
        sum +
        Number(item.productId.price) *
          (1 - Number(item.productId.discount) / 100) *
          Number(item.quantity)
      );
    }
  };
  const format = (dateTimeString) => {
    const [datePart, timePart] = dateTimeString.split(" ");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year} ${timePart}`;
  };

  const OrderDetail = ({ order }) => (
    <div
      className="oder__tracking__info shadow-xl"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontSize: "18px",
        fontWeight: "600",
        border: "1px solid #e0e0e0",
        margin: "20px",
        borderRadius: "8px",
      }}
    >
      <div
        className="oder__main__info"
        style={{
          margin: "0 50px 20px 50px",
          padding: "0 30px",
        }}
      >
        <p
          style={{
            margin: "20px 0 5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Mã đơn hàng:</span> <span>#{order.invoiceId}</span>
        </p>
        <p
          style={{
            margin: "5px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Ngày đặt hàng:</span> <span>{format(order.orderDate)}</span>
        </p>
        <p
          style={{
            margin: "5px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Hình thức thanh toán:</span>{" "}
          <span>{order.paymentMethod || "Tiền mặt"}</span>
        </p>
        <p
          style={{
            margin: "5px 0",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Tình trạng đơn hàng:</span>
          <span
            style={{
              color: order.state === "Đã giao" ? "#52c41a" : "#faad14",
            }}
          >
            {order.state}
          </span>
        </p>
      </div>

      {userData && (
        <div
          className="oder__info"
          style={{
            backgroundColor: "#E5E7EB",
            margin: "0 60px 20px",
            padding: "0 30px 10px",
            borderRadius: "10px",
          }}
        >
          <h3 style={{ margin: "10px 0 5px", fontWeight: "bold" }}>
            Thông tin đặt hàng
          </h3>
          <p
            style={{
              margin: "5px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Người nhận:</span> <span>{order.name}</span>
          </p>
          <p
            style={{
              margin: "5px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Số điện thoại:</span> <span>{order.phone}</span>
          </p>
          <p
            style={{
              margin: "5px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Địa chỉ:</span> <span>{order.address}</span>
          </p>
        </div>
      )}

      <div
        className="cart__info"
        style={{
          backgroundColor: "#E5E7EB",
          margin: "0 60px 20px",
          padding: "0 30px 10px",
          borderRadius: "10px",
        }}
      >
        <h3
          style={{
            margin: "10px 0 5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Tổng giá trị</span>
          <span style={{ color: "#1677ff" }}>
            {Number(order.totalPrice).toLocaleString()}đ
          </span>
        </h3>
        {order.items.map((item, index) => (
          <div key={index}>
            {item.productId && (
              <div
                className="cart__info__item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <img
                  src={item.productId.mainImage}
                  alt={item.productId.name}
                  style={{ width: "80px", height: "72px", objectFit: "cover" }}
                />
                <div
                  className="item-info"
                  style={{ flexGrow: "1", marginLeft: "10px" }}
                >
                  <p style={{ margin: "0 0 4px 0", fontSize: "14px" }}>
                    {item.productId.name}
                  </p>
                  <p
                    className="item-quantity"
                    style={{
                      margin: "4px 0 0 0",
                      fontWeight: "500",
                      fontSize: "14px",
                    }}
                  >
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <p className="total-price" style={{ fontWeight: "500" }}>
                  {Number(calculatePrice(item)).toLocaleString()}đ
                </p>
              </div>
            )}

            {!item.productId && (
              <div
                className="cart__info__item py-3"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  borderBottom: "1px solid",
                }}
              >
                <p className="">Sản phẩm đã bị xóa</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Content
      style={{
        padding: "0 16px",
        maxWidth: "1440px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div className="content__container">
        <div
          className="content__user__head"
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "12px",
          }}
        >
          <div className="content__user__head-home">
            <FontAwesomeIcon
              icon={faHouse}
              style={{ fontSize: "26px", margin: "20px " }}
            />
            <a href="/" style={{ fontSize: "20px", fontWeight: "700" }}>
              Trang chủ
            </a>
          </div>
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ fontSize: "20px", margin: "20px" }}
          />
          <span style={{ fontSize: "20px", fontWeight: "700" }}>
            Theo dõi đơn hàng
          </span>
        </div>

        <div
          className="content__user__main"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "clamp(24px, 3vw, 32px)",
            maxWidth: "1440px",
            margin: "0 auto",
            flexWrap: "wrap",
          }}
        >
          <div
            className="user__aside"
            style={{
              backgroundColor: "#fff",
              padding: "clamp(24px, 3vw, 36px)",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "450px",
              maxHeight: "600px",
            }}
          >
            <div
              className="user__avatar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <FontAwesomeIcon
                icon={faCircleUser}
                style={{ fontSize: "80px", display: "flex" }}
              />
            </div>

            <div className="user__account__opt">
              <UserOptionMenu />
            </div>
          </div>

          <div
            className="oder__tracking"
            style={{
              backgroundColor: "#fff",
              padding: "clamp(12px, 3vw, 18px)",
              borderRadius: "12px",
              border: "1px solid #e0e0e0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              width: "100%",
              maxWidth: "700px",
              maxHeight: "600px",
            }}
          >
            <div
              className="oder__tracking__label"
              style={{
                fontSize: "30px",
                fontWeight: "700",
                textAlign: "center",
                marginBottom: "5px",
              }}
            >
              Theo dõi đơn hàng
            </div>

            <div style={{ maxHeight: "500px", overflowY: "auto" }}>
              {orders.map((order, index) => (
                <OrderDetail key={order.invoiceId} order={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}

export default ContentOderTracking;
