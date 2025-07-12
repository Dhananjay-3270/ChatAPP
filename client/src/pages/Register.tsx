import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  ConfirmPassword: string;
  age: number;
}

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setData] = useState<User>({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:3000/login/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 201) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        className="bg-white p-8 rounded-2xl shadow-xl w-96 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">
          Register
        </h2>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userName"
          placeholder="Username"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="ConfirmPassword"
          placeholder="Confirm Password"
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.ConfirmPassword}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          min={0}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.age === 0 ? "" : formData.age}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};
