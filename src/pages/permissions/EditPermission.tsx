import { Autocomplete, Box, FormControlLabel, Switch, TextField } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { Controller } from "react-hook-form";

interface EditPermissionProps {
  resourceNames: string[];
}

export const EditPermission: React.FC<EditPermissionProps> = ({resourceNames}) => {
  const {
    saveButtonProps,
    register,
    control,
    refineCore: { query },
    formState: { errors },
  } = useForm({});

  const records = query?.data?.data;

  const { autocompleteProps: roleAutoCompleteProps } = useAutocomplete({
    resource: "roles",
    defaultValue: records?.role,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box component="form" sx={{ display: "flex", flexDirection: "column" }}>
        <Controller
          control={control}
          name="resources"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={resourceNames}
              getOptionLabel={(option) =>
                typeof option === "string" ? option : ""
              }
              value={field.value || null}
              onChange={(_, value) => field.onChange(value || null)}
              isOptionEqualToValue={(option, value) => option === value}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Resource"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.resources}
                  helperText={(errors as any)?.resources?.message}
                  required
                />
              )}
            />
          )}
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

<Controller
          control={control}
          name="can_show"
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked ={field.value !=undefined ? field.value : records?.can_show || false}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                />
              }
              label="Can Show"
            />
          )}
        />

        <Controller
          control={control}
          name="can_list"
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked ={field.value !=undefined ? field.value : records?.can_list || false}
                  {...field}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Can List"
            />
          )}
        />

        <Controller
          control={control}
          name="can_create"
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked ={field.value != undefined ? field.value : records?.can_create || false}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                />
              }
              label="Can Create"
            />
          )}
        />

        <Controller
          control={control}
          name="can_edit"
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked ={ field.value != undefined ? field.value : records?.can_edit || false}
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                />
              }
              label="Can Edit"
            />
          )}
        />

        <Controller
          control={control}
          name="can_delete"
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  checked ={field.value !=undefined  ? field.value : records?.can_delete || false} 
                  onChange={(e) => {
                    field.onChange(e.target.checked);
                  }}
                />
              }
              label="Can Delete"
            />
          )}
        />
        
        
        
      </Box>
    </Edit>
  );
};
