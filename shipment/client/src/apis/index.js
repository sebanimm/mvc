import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return error;
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return error;
  },
);

export const getAllUser = async () => {
  const { data } = await instance.get("/user");
  return data;
};

export const createUser = async (name, email, phone) => {
  await instance.post("/user", { name, email, phone });
};

export const getUserId = async (name, phone) => {
  const { data } = await instance.get(`/user/id?name=${name}&phone=${phone}`);
  return data;
};

export const getAllWorker = async () => {
  const { data } = await instance.get("/worker");
  return data;
};

export const createWorker = async (name, phone) => {
  await instance.post("/worker", { name, phone });
};

export const getAllShipment = async () => {
  const { data } = await instance.get("/shipment");
  return data;
};

export const createShipment = async (user, phone, location, content) => {
  const [userId] = await getUserId(user, phone);
  await instance.post("/shipment", { userId: userId.id, location, content });
};

export const removeShipment = async (shipmentId) => {
  await instance.delete("/shipment", { data: { shipmentId } });
};

export const getAllDelivery = async () => {
  const { data } = await instance.get("/delivery");
  return data;
};

export const createDelivery = async (userId, shipmentId) => {
  const data = await getAllWorker();
  const workerList = data.map((obj) => obj.id);
  const randomNumber = Math.floor(Math.random() * workerList.length);
  await instance.post("/delivery", {
    userId,
    workerId: workerList[randomNumber],
    shipmentId,
  });
};

export const modifyDelivery = async (
  userId,
  workerId,
  shipmentId,
  isArrived,
) => {
  await instance.put(
    `/delivery?userId=${userId}&workerId=${workerId}&shipmentId=${shipmentId}&isArrived=${isArrived}`,
  );
};

export default instance;
