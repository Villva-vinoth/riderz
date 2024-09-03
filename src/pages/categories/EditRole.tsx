import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
export const EditRole: React.FC = () => {
  const {
    saveButtonProps,
    register,
    formState: { errors },
  } = useForm({});

  console.log("edit", saveButtonProps);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          {...register("role_name", {
            required: "please enter the role",
          })}
          error={!!(errors as any)?.role}
          helperText={(errors as any)?.role?.message}
          type="text"
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Role"
          name="role_name"
        />
      </Box>
    </Edit>
  );
};
