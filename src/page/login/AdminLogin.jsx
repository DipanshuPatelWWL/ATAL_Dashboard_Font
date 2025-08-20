import port from "../assets/PORT.jpg";
import logo from "../../assets/image/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import API from "../API/Api";

function AdminLogin() {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { storeadmintoken } = useAuth();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const handleClick = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.post("/loginAdmin", data);
            await storeadmintoken(response.data.admintoken);
            setData({
                email: "",
                password: "",
            });
            sessionStorage.setItem("adminid", response.data.payload.adminId);
            navigate("/layout");
        } catch (err) {
            const message = err.response?.data?.extradetails || err.response?.data?.message || "Login failed";
            toast.error(message);
            console.log("login error:", err);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] min-h-screen">
            <div className="mb-4 mt-4 flex max-w-5xl flex-col sm:mx-2 xl:flex-row">
                {/* Left Side */}
                <div className="w-full bg-white shadow-2xl xl:w-auto xl:rounded-bl-2xl xl:rounded-tl-2xl">
                    <div className="mx-7 mt-14 rounded-xl bg-white shadow-2xl">
                        <div className="m-10">
                            <img
                                src={logo}
                                loading="lazy"
                                alt="logo"
                                className="w-[150px] pt-10"
                            />
                            <h1 className="mb-4 mt-4 text-2xl font-bold">WELCOME ADMIN!</h1>

                            <div className="flex flex-col justify-center gap-1 text-left">
                                <span className="text-xl">
                                    EMAIL <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    id="email"
                                    required
                                    placeholder="Email Address"
                                    className="w-full appearance-none rounded border px-3 py-2 shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                                />
                            </div>

                            <div className="relative mt-4 flex flex-col justify-center gap-1 text-left">
                                <span className="text-xl">
                                    Password <span className="text-red-500">*</span>
                                </span>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    required
                                    value={data.password}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded border mb-6 px-3 py-2 pr-10 shadow focus:bg-slate-50 focus:shadow focus:outline-none focus:border-red-300"
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-11 text-gray-400"
                                    onClick={handleClick}
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>

                            <button
                                onClick={handlesubmit}
                                className="mb-10 rounded-md bg-red-500 px-6 py-2 text-xl font-semibold text-white hover:bg-red-600 hover:shadow-lg active:bg-red-700 active:shadow-lg hover:rounded-full transition duration-200 ease-in-out"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="w-full bg-white shadow-2xl xl:w-auto xl:rounded-br-2xl xl:rounded-tr-2xl">
                    <img
                        src={port}
                        loading="lazy"
                        alt="port"
                        className="hidden w-full object-cover xl:block xl:w-[400px] xl:rounded-br-2xl xl:rounded-tr-2xl"
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;


