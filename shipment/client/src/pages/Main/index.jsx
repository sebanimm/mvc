import { Link } from "react-router-dom";
import Template from "../../template";

const Main = () => {
  return (
    <Template text="택배 물류 관리 서비스">
      <div className="max-w-[1120px] flex justify-between gap-6 m-auto mt-24">
        <div className="border-black border-2 flex flex-1 flex-col justify-center gap-6 rounded-lg px-2 py-4">
          <span className="text-2xl m-auto">유저 생성</span>
          <button className="max-w-[60%] flex justify-center items-center bg-blue-600 p-2 text-white m-auto">
            <Link to="/user-sign-up">생성하러가기</Link>
          </button>
        </div>
        <div className="border-black border-2 flex flex-1 flex-col justify-center gap-6 rounded-lg px-2 py-4">
          <span className="text-2xl m-auto">배달 기사 생성</span>
          <button className="max-w-[60%] flex justify-center items-center bg-blue-600 p-2 text-white m-auto">
            <Link to="/worker-sign-up">생성하러가기</Link>
          </button>
        </div>
        <div className="border-black border-2 flex flex-1 flex-col justify-center gap-6 rounded-lg px-2 py-4">
          <span className="text-2xl m-auto">택배 주문</span>
          <button className="max-w-[60%] flex justify-center items-center bg-blue-600 p-2 text-white m-auto">
            <Link to="/order">주문하러가기</Link>
          </button>
        </div>
        <div className="border-black border-2 flex flex-1 flex-col justify-center gap-6 rounded-lg px-2 py-4">
          <span className="text-2xl m-auto">배송 기록 조회</span>
          <button className="max-w-[60%] flex justify-center items-center bg-blue-600 p-2 text-white m-auto">
            <Link to="/order/list">조회하러가기</Link>
          </button>
        </div>
      </div>
    </Template>
  );
};

export default Main;
