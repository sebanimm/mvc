import { useEffect, useState } from "react";
import Template from "../../template";
import {
  getAllDelivery,
  modifyDelivery,
  getAllUser,
  getAllWorker,
} from "../../apis";

const OrderList = () => {
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [worker, setWorker] = useState([]);

  const getList = async () => {
    const data = await getAllDelivery();
    setList(data);
  };

  const getUser = async () => {
    const data = await getAllUser();
    setUser(data);
  };

  const getWorker = async () => {
    const data = await getAllWorker();
    setWorker(data);
  };

  useEffect(() => {
    getList();
    getUser();
    getWorker();
  }, []);

  return (
    <Template text="배송 기록 조회">
      <div className="max-w-[800px] flex flex-col justify-center gap-6 m-auto text-xl">
        <table>
          <thead>
            <tr className="flex">
              <th className="flex-1">주문자</th>
              <th className="flex-1">배송자</th>
              <th className="flex-1">택배번호</th>
              <th className="flex-1">도착일</th>
              <th className="flex-1">배송여부</th>
              <th className="flex-1"></th>
            </tr>
          </thead>
          <tbody>
            {list.map((value, index) => (
              <tr key={index} className="flex text-center">
                <td className="flex-1">
                  {user.find((obj) => obj.id === value.userId)?.name}
                </td>
                <td className="flex-1">
                  {worker.find((obj) => obj.id === value.workerId)?.name}
                </td>
                <td className="flex-1">{value.shipmentId}</td>
                <td className="flex-1">{value.date}</td>
                <td className="flex-1">
                  {value.isArrived ? "도착완료" : "배송중"}
                </td>
                <td className="flex-1">
                  <button
                    className="bg-blue-600"
                    onClick={() => {
                      modifyDelivery(
                        value.userId,
                        value.workerId,
                        value.shipmentId,
                        value.isArrived,
                      );
                    }}
                  >
                    {value.isArrived ? "배송 확인 취소" : "배송 확인"}
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

export default OrderList;
