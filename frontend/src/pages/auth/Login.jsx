import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { catchError } from "../../utils/catchError";
import useAuth from "../../hooks/useAuth";
import usePageTitle from "../../hooks/usePageTitle";
import { useForm } from "react-hook-form";
import { Link as RouteLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import AuthLayout from "../../components/layouts/AuthLayout";
import FormInput from "../../components/inputs/FormInput";

const schema = z.object({
    userName: z
        .string()
        .trim()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username cannot exceed 20 characters"),
    password: z
        .string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .max(40, "Password cannot exceed 40 characters"),
});

const defaultValues = {
    userName: "",
    password: "",
};

export default function Login() {
    usePageTitle("Login");
    const [toggleShowPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    });

    // Toggle show password
    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    // On submit
    const onSubmit = async (data) => {
        
        try {
            setLoading(true);
            await login(data.userName, data.password);
        } catch (error) {
            setError(catchError(error));
            setLoading(false);
        }
    };

    return (
        <AuthLayout>
            <div className="text-left w-full max-w-sm mx-auto p-5">
                <h1 className="text-3xl font-bold text-center mb-16">Login</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                    <FormInput
                        control={control}
                        name="userName"
                        label="Username"
                        errors={errors}
                        className="my-3"
                    />
                    <FormInput
                        control={control}
                        name="password"
                        label="Password"
                        type={toggleShowPassword ? "text" : "password"}
                        errors={errors}
                        className="my-3"
                    />
                    {/* Show password toggle */}
                    <button
                        type="button"
                        onClick={handleClickShowPassword}
                        className="text-sm hover:underline flex items-center gap-2"
                    >
                        <FaEye />{toggleShowPassword ? "Hide Password" : "Show Password"}
                    </button>

                    {error && (
                        <span className="text-lg">
                            {error}
                        </span>
                    )}

                    <button
                        type="submit"
                        className={`w-full bg-[#003973] text-white text-xl rounded-lg my-5 py-2 font-semibold transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="flex justify-between items-center mt-4">
                    <RouteLink to="/signup" className="text-sm hover:underline">
                        Sign Up
                    </RouteLink>
                    {/* <RouteLink to="/forgot-password" className="text-sm  hover:underline">
                        Forgot Password
                    </RouteLink> */}
                </div>
            </div>
        </AuthLayout>
    );
}
