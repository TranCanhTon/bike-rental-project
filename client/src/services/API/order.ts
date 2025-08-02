import { API } from "../config";

const getCurrentUserOrder = async () => {
  return await API.get("/api/v1/orders/myOrders")
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Failed to fetch bikes", error);
      throw error;
    });
};

const checkoutOrder = async ({
  items,
  tax,
  deliveryMethod,
}: {
  items: { product: string; rentalDuration: number }[];
  tax: number;
  deliveryMethod: string;
}) => {
  return await API.post("/api/v1/orders", {
    items,
    tax,
    deliveryMethod,
  })
    .then(({ data }) => data)
    .catch((error) => {
      console.error("Checkout failed", error);
      throw error;
    });
};

export const orderAPI = {
  getCurrentUserOrder,
  checkoutOrder,
};
