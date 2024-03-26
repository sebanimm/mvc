import { useState, useEffect } from "react";
import Template from "../../template";
import {
  createDelivery,
  createShipment,
  getAllShipment,
  getAllUser,
  removeShipment,
  getUserId,
} from "../../apis";

const Order = () => {
  const [input, setInput] = useState({
    user: "",
    phone: "",
    location: "",
    content: "",
  });
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState([]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptions = (e) => {
    const { value } = e.target;
    const index = value.indexOf("(");
    const user = value.substring(0, index);
    const phone = value.substring(index + 1, value.length - 1);
    setInput((prev) => ({ ...prev, user, phone }));
  };

  const handleSubmit = async () => {
    await postShipment();
    await postDelivery();
  };

  const getShipment = async () => {
    const data = await getAllShipment();
    setOrders(data);
  };

  const postShipment = async () => {
    await createShipment(
      input.user,
      input.phone,
      input.location,
      input.content,
    );
  };

  const deleteShipment = async (e) => {
    const { id } = e.target;
    await removeShipment(id);
  };

  const getUser = async () => {
    const data = await getAllUser();
    setUser(data);
  };

  const postDelivery = async () => {
    const [userId] = await getUserId(input.user, input.phone);
    const data = await getAllShipment();
    const shipmentId = data[data.length - 1].id;
    await createDelivery(userId.id, shipmentId);
  };

  useEffect(() => {
    getShipment();
    getUser();
  }, []);

  return (
    <Template text="택배 주문하기">
      <div className="max-w-[800px] flex flex-col justify-center gap-6 m-auto text-xl">
        <div className="w-full flex gap-4">
          주문자:
          <select onChange={handleOptions}>
            <option default>선택해주세요</option>
            {user.map((value) => (
              <option key={value.id}>
                {value.name}({value.phone})
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex gap-4">
          배송 위치:
          <input
            name="location"
            value={input.location}
            onChange={handleInputs}
            className="flex-1 border-2 rounded border-black text-base"
            placeholder="배송 위치를 입력해주세요."
          />
        </div>
        <div className="w-full flex gap-4">
          물품:
          <input
            name="content"
            value={input.content}
            onChange={handleInputs}
            className="flex-1 border-2 rounded border-black text-base"
            placeholder="물품을 입력해주세요."
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-600 p-4 text-white" onClick={handleSubmit}>
            주문하기
          </button>
        </div>
        <table>
          <thead>
            <tr className="flex">
              <th className="flex-1">택배번호</th>
              <th className="flex-1">배송 위치</th>
              <th className="flex-1">물품</th>
              <th className="flex-1">주문일</th>
              <th className="flex-1"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((value) => (
              <tr key={value.id} className="flex text-center">
                <td className="flex-1">{value.id}</td>
                <td className="flex-1">{value.location}</td>
                <td className="flex-1">{value.content}</td>
                <td className="flex-1">{value.date}</td>
                <td className="flex-1">
                  <button
                    id={value.id}
                    className="p-1 bg-red-500 text-white"
                    onClick={deleteShipment}
                  >
                    취소하기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
};

export default Order;
