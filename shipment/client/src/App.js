import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./tailwind.css";
import Main from "./pages/Main";
import Order from "./pages/Order";
import UserSignUp from "./pages/UserSignUp";
import WorkerSignUp from "./pages/WorkerSignUp";
import OrderList from "./pages/OrderList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/list" element={<OrderList />} />
        <Route path="/user-sign-up" element={<UserSignUp />} />
        <Route path="/worker-sign-up" element={<WorkerSignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
