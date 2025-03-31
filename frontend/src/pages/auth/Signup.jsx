// pages/Signup.js
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link as RouteLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import { toast } from "react-hot-toast";
import usePageTitle from "../../hooks/usePageTitle";
import axios from "../../utils/axios";
import { catchError } from "../../utils/catchError";
import AuthLayout from "../../components/layouts/AuthLayout";
import FormInput from "../../components/inputs/FormInput";
import BACKENDURL from "../../constants/constent";
import { FaEye } from "react-icons/fa";

// 📝 Signup validation schema with additional fields
const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phonenumber: z
    .string()
    .regex(/^\d{10}$/, "Phone number must be 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  email: z.string().min(1, "Email is required").email({ message: "Invalid email" }),
  userName: z
    .string()
    .regex(/^\S*$/, "Spaces are not allowed")
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username cannot exceed 20 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const defaultValues = {
  name: "",
  phonenumber: "",
  address: "",
  email: "",
  userName: "",
  password: ""
};

const Signup = () => {
  usePageTitle("Create account");
  const [submitting, setSubmitting] = useState(false);
  const [toggleShowPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      console.log(data);
      
      const response = axios.post(`/api/auth/signup`, data);
      toast.promise(response, {
        loading: "Saving...",
        success: ({ data }) => {
          reset(defaultValues);
          setSubmitting(false);
          return data.message;
        },
        error: (error) => {
          console.log(error);
          setSubmitting(false);
          return catchError(error);
        },
      });
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error(catchError(error));
    }
  };

  return (
    <AuthLayout>
      <div className="text-left w-full max-w-sm mx-auto p-5">
        <h1 className="text-3xl font-bold text-center mb-16">Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <FormInput control={control} name="name" label="Name" errors={errors} className="my-3" />
          <FormInput control={control} name="phonenumber" label="Phone Number" errors={errors} className="my-3" />
          <FormInput control={control} name="address" label="Address" errors={errors} className="my-3" />
          <FormInput control={control} name="email" label="Email" errors={errors} className="my-3" />
          <FormInput control={control} name="userName" label="Username" errors={errors} className="my-3" />
          <FormInput
            control={control}
            name="password"
            label="Password"
            type={toggleShowPassword ? "text" : "password"}
            errors={errors}
            className="my-3"
          />
          <button
            type="button"
            onClick={handleClickShowPassword}
            className="text-sm hover:underline flex items-center gap-2"
          >
            <FaEye />{toggleShowPassword ? "Hide Password" : "Show Password"}
          </button>
          {error && <span className="text-lg">{error}</span>}
          <button
            type="submit"
            className={`w-full bg-[#003973] text-white text-xl rounded-lg my-5 py-2 font-semibold transition duration-200 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Signup"}
          </button>
        </form>
        <div className="flex justify-between items-center mt-4">
          <RouteLink to="/login" className="text-sm hover:underline">
            Already have an account? Sign in
          </RouteLink>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Signup;