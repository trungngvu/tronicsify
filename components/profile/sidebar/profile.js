export const profile = [
  {
    heading: "Tài khoản của tôi",
    links: [
      {
        name: "Sổ địa chỉ",
        link: "/profile/address",
      },
      {
        name: "Phương thức thanh toán",
        link: "/profile/payment",
      },
      {
        name: "Bảo mật tài khoản",
        link: "/profile/security",
      },
    ],
  },
  {
    heading: "Đơn đặt hàng của tôi",
    links: [
      {
        name: "Tất cả đơn hàng",
        link: "/profile/orders",
        filter: "",
      },
      {
        name: "Đơn đã thanh toán",
        link: "/profile/orders",
        filter: "paid",
      },
      {
        name: "Đơn chưa thanh toán",
        link: "/profile/orders",
        filter: "unpaid",
      },
      {
        name: "Đơn đang xử lý",
        link: "/profile/orders",
        filter: "processing",
      },
      {
        name: "Đơn đã xử lý",
        link: "/profile/orders",
        filter: "unprocessed",
      },
      {
        name: "Đơn chờ giao hàng",
        link: "/profile/orders",
        filter: "dispatched",
      },
      {
        name: "Đơn đã giao hàng",
        link: "/profile/orders",
        filter: "Completed",
      },
      {
        name: "Đơn đã hủy",
        link: "/profile/orders",
        filter: "cancelled",
      },
    ],
  },
  {
    heading: "Yêu thích",
    links: [
      {
        name: "Danh sách yêu thích",
        link: "/profile/wishlist",
      },
    ],
  },

  {
    heading: "Sign Out",
    link: [],
  },
];
