const z = require("zod");

const login = {
  body: z.object({
    userName: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .min(5, "Username minimum 5 characters")
      .max(20, "Username maximum 20 characters"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password minimum 6 characters"),
  }),
};

const signup = {
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .trim()
      .min(2, "Name must be at least 2 characters"),
    phonenumber: z
      .string({
        required_error: "Phone number is required",
        invalid_type_error: "Phone number must be a string",
      })
      .trim()
      .regex(/^\d{10}$/, "Phone number must be 10 digits"),
    address: z
      .string({
        required_error: "Address is required",
        invalid_type_error: "Address must be a string",
      })
      .trim()
      .min(5, "Address must be at least 5 characters"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Invalid email" }),
    userName: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .regex(/^[^\s]+$/, "Spaces are not allowed in username")
      .min(5, "Username must be at least 5 characters")
      .max(20, "Username must not exceed 20 characters"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password must be at least 6 characters"),
  }),
};


module.exports = {
  login,
  signup,
};
