import {
  Autocomplete,
  Box,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
interface FormValues {
  role: string;
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  canDelete: boolean;
  canShow: boolean;
}
interface CreatePermissionProps {
  resourceNames: string[]; // Add this interface for the prop type
}

export const CreatePermission: React.FC<CreatePermissionProps> = ({
  resourceNames,
}) => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const { autocompleteProps: roleAutoCompleteProps } = useAutocomplete({
    resource: "roles",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="resources"
          rules={{ required: "This field is required" }}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={resourceNames}
              getOptionLabel={(option) => typeof option === 'string' ? option : ''}  
              value={ field.value || null}  
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
                field.onChange( value ? value.role_id : null);
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
                return value === undefined || value ==null   || optionId === valueId;
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
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  defaultChecked
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
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
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
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  defaultChecked
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
                  defaultChecked
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
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  defaultChecked
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
    </Create>
  );
};
