import React from "react";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";

const FormInput = ({ control, name, label, type = "text", errors, className = "" }) => {
  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextField
            fullWidth
            {...field}
            type={type}
            label={label}
            sx={{
              input: { color: "black" },
              "& .MuiInputLabel-root": {
                color: "#000", // Change label text color
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#000" },
                "&:hover fieldset": { borderColor: "#000" },
                "&.Mui-focused fieldset": { borderColor: "#000" },
              },
            }}
            error={!!errors[name]}
            helperText={errors?.[name]?.message}
          />
        )}
      />
    </div>
  );
};

export default FormInput;
