import { createUser, getAllUser } from "../../apis";
import Template from "../../template";
import { useState, useEffect } from "react";

const UserSignUp = () => {
  const [input, setInput] = useState({ name: "", phone: "", email: "" });
  const [users, setUsers] = useState([]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const getUser = async () => {
    const data = await getAllUser();
    setUsers(data);
  };

  const postUser = async () => {
    await createUser(input.name, input.email, input.phone);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Template text="유저 등록">
      <div className="max-w-[800px] flex flex-col justify-center gap-6 m-auto text-xl">
        <div className="w-full flex gap-4">
          이름:
          <input
            name="name"
            required={true}
            value={input.name}
            onChange={handleInputs}
            className="flex-1 border-2 rounded border-black text-base"
            placeholder="이름을 입력해주세요."
          />
        </div>
        <div className="w-full flex gap-4">
          전화번호:
          <input
            required={true}
            name="phone"
            value={input.phone}
            onChange={handleInputs}
            className="flex-1 border-2 rounded border-black text-base"
            placeholder="전화번호를 입력해주세요."
          />
        </div>
        <div className="w-full flex gap-4">
          이메일:
          <input
            required={true}
            name="email"
            value={input.email}
            onChange={handleInputs}
            className="flex-1 border-2 rounded border-black text-base"
            placeholder="이메일을 입력해주세요."
          />
        </div>
        <div className="flex justify-center">
          <button className="bg-blue-600 p-4 text-white" onClick={postUser}>
            가입하기
          </button>
        </div>
        <table>
          <thead>
            <tr className="flex">
              <th className="flex-1">이름</th>
              <th className="flex-1">전화번호</th>
              <th className="flex-1">이메일</th>
            </tr>
          </thead>
          <tbody>
            {users.map((value) => (
              <tr key={value.id} className="flex text-center">
                <td className="flex-1">{value.name}</td>
                <td className="flex-1">{value.phone}</td>
                <td className="flex-1">{value.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
};

export default UserSignUp;
