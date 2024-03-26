import Template from "../../template";
import { useState, useEffect } from "react";
import { getAllWorker, createWorker } from "../../apis";

const WorkerSignUp = () => {
  const [input, setInput] = useState({ name: "", phone: "" });
  const [workers, setWorkers] = useState([]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const getWorker = async () => {
    const data = await getAllWorker();
    setWorkers(data);
  };

  const postWorker = async () => {
    await createWorker(input.name, input.phone);
  };

  useEffect(() => {
    getWorker();
  }, []);

  return (
    <Template text="택배 기사 등록">
      <div className="max-w-[800px] flex flex-col justify-center gap-6 m-auto text-xl">
        <div className="w-full flex gap-4">
          이름:
          <input
            name="name"
            value={input.name}
            onChange={handleInputs}
            className="flex-1 border-2 rounded border-black text-base"
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div className="w-full flex gap-4">
          전화번호:
          <input
            name="phone"
            value={input.phone}
            onChange={handleInputs}
            className="flex-1 border-2 rounded border-black text-base"
            placeholder="전화번호를 입력해주세요."
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-600 p-4 text-white" onClick={postWorker}>
            가입하기
          </button>
        </div>
        <table>
          <thead>
            <tr className="flex">
              <th className="flex-1">이름</th>
              <th className="flex-1">전화번호</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((value) => (
              <tr key={value.id} className="flex text-center">
                <td className="flex-1">{value.name}</td>
                <td className="flex-1">{value.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
};

export default WorkerSignUp;
