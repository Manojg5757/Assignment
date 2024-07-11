import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await axios.post("/server/auth/login", formData);
      dispatch(loginSuccess(res.data));
      navigate('/admin-panel')
      console.log(res.data);
    } catch (error) {
      dispatch(loginFailure(error.response.data.message));
    }
  };
  console.log(formData);
  return (
    <div className="">
      <h1 className="text-center">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl mx-auto p-3"
      >
        <input
          type="email"
          placeholder="Email..."
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="p-3 outline-none rounded-lg"
        />
        <input
          type="password"
          placeholder="password..."
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="p-3 outline-none rounded-lg"
        />
        <button
          type="submit"
          className="bg-slate-700 p-3 rounded-lg text-white"
        >
          {loading ? "Logging...." : "Login"}
        </button>
        <p className="text-red-500">{error ? error : ""}</p>
      </form>
    </div>
  );
};

export default Login;
