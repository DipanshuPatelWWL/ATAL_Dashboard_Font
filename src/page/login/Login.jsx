import React, { useState, useContext } from "react";
import { AuthContext } from "../../authContext/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../API/Api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Forgot password states
    const [step, setStep] = useState(1); // 1 = email, 2 = otp, 3 = reset
    const [resetEmail, setResetEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // 🔔 Toast
    const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);

        if (success) {
            Toast.fire({ icon: "success", title: "Login successful!" });
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (storedUser?.role === "admin") navigate("/admin/home");
            if (storedUser?.role === "vender") navigate("/vender-dashboard");
            if (storedUser?.role === "company") navigate("/company-dashboard");
        } else {
            Toast.fire({ icon: "error", title: "Invalid email or password" });
        }
    };

    // Step 1: Request OTP
    const sendOtp = async () => {
        try {
            await API.post("/auth/send-otp", { email: resetEmail });
            Toast.fire({ icon: "success", title: "OTP sent to email!" });
            setStep(2);
        } catch (err) {
            Toast.fire({ icon: "error", title: err.response?.data?.message || "Failed to send OTP" });
        }
    };

    // Step 2: Verify OTP
    const verifyOtp = async () => {
        try {
            await API.post("/auth/verify-otp", { email: resetEmail, otp });
            Toast.fire({ icon: "success", title: "OTP verified!" });
            setStep(3);
        } catch (err) {
            Toast.fire({ icon: "error", title: "Invalid OTP" });
        }
    };

    // Step 3: Reset Password
    const resetPassword = async () => {
        try {
            await API.post("/auth/reset-password", { email: resetEmail, newPassword });
            Toast.fire({ icon: "success", title: "Password reset successfully!" });
            setStep(1);
        } catch (err) {
            Toast.fire({ icon: "error", title: "Failed to reset password" });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {/* Email */}
                <div className="mb-4">
                    <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Login Button */}
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                    Login
                </button>

                {/* Links */}
                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
                </p>
                <p
                    onClick={() => Swal.fire({
                        title: "Forgot Password?",
                        html: step === 1 ? (
                            `<input type="email" id="email" class="swal2-input" placeholder="Enter your email"/>`
                        ) : step === 2 ? (
                            `<input type="text" id="otp" class="swal2-input" placeholder="Enter OTP"/>`
                        ) : (
                            `<input type="password" id="newPassword" class="swal2-input" placeholder="Enter new password"/>`
                        ),
                        confirmButtonText: step === 1 ? "Send OTP" : step === 2 ? "Verify OTP" : "Reset Password",
                        showCancelButton: true,
                        preConfirm: () => {
                            if (step === 1) {
                                setResetEmail(document.getElementById("email").value);
                                sendOtp();
                            } else if (step === 2) {
                                setOtp(document.getElementById("otp").value);
                                verifyOtp();
                            } else {
                                setNewPassword(document.getElementById("newPassword").value);
                                resetPassword();
                            }
                        }
                    })}
                    className="text-blue-500 text-sm cursor-pointer text-center mt-2 block"
                >
                    Forgot Password?
                </p>
            </form>
        </div>
    );
};

export default Login;
