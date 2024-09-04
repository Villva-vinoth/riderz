import { Autocomplete, Box, TextField } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { Controller } from "react-hook-form";
export const EditUser: React.FC = () => {
  const {
    saveButtonProps,
    register,
    control,
    refineCore: { query },
    formState: { errors },
  } = useForm({});

  const users = query?.data?.data;

  const { autocompleteProps: roleAutoCompleteProps } = useAutocomplete({
    resource: "roles",
    defaultValue: users?.role,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          {...register("full_name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.full_name}
          helperText={(errors as any)?.full_name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Full Name"}
          name="full_name"
        />
        <Controller
          control={control}
          name="role"
          defaultValue={null as any}
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...roleAutoCompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value.role_id);
              }}
              getOptionLabel={(item) => {
                return (
                  roleAutoCompleteProps?.options?.find((p) => {
                    const itemId =
                      typeof item === "object"
                        ? item?.role_id?.toString()
                        : item?.toString();
                    const pId = p?.role_id?.toString();
                    return itemId === pId;
                  })?.role_name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.role_id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.role_id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Role"}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.role}
                  helperText={(errors as any)?.role?.message}
                  required
                />
              )}
            />
          )}
        />
        <TextField
          {...register("user_name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"user_name"}
          name="user_name"
        />

        {/* <TextField
          {...register("password", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.password}
          helperText={(errors as any)?.password?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Password"}
          name="password"
        /> */}
        {/* <TextField
          {...register("confirm_password", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.role}
          helperText={(errors as any)?.role?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Confirm Password"}
          name="confirm_password"
        /> */}
      </Box>
    </Edit>
  );
};
