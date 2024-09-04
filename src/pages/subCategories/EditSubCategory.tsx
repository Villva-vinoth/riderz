import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useApiUrl } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

export const EditSubCategory = () => {
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const apiUrl = useApiUrl();

  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish, query },
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
    control,
  } = useForm({});

  const record = query?.data?.data;

  const { autocompleteProps: categoriesProps } = useAutocomplete({
    resource: "categories",
    defaultValue: record?.category_id,
  });

  useEffect(() => {
    if (record) {
      setValue("status", record.status === "Active");
      setValue(
        "corporate_sub_category_access",
        record.corporate_sub_category_access === "enable"
      );
      setValue("priority", record.priority || 1);
      setValue("category_id", record.category_id || "");
      setValue("sub_category_type", record.sub_category_type || "");
      setValue("image", record.image || "");
    }
  }, [record, setValue]);

  const isActive = watch("status") === true;
  const isAccess = watch("corporate_sub_category_access") === true;
  const imageInput = watch("image") as string;


  const priority = [1, 2, 3, 4, 5, 6];

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setIsUploadLoading(true);

      const formData = new FormData();
      const target = event.target;
      const file: File = (target.files as FileList)[0];

      formData.append("image", file);

      const res = await axios.post<{
        data: any;
        path: string;
      }>(`${apiUrl}/api/image/upload`, formData, {
        withCredentials: false,
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Access-Control-Allow-Origin": "*",
        },
      });

      setValue("image", res.data.data.path, { shouldValidate: true });
      setIsUploadLoading(false);
    } catch (error) {
      setIsUploadLoading(false);
    }
  };

  const onSubmit = (data: any) => {

    const transformedData = {
      ...data,
      status: data.status ? "Active" : "Inactive",
      corporate_sub_category_access: data.corporate_sub_category_access
        ? "enable"
        : "disable",
    };

    onFinish(transformedData);
  };

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onSubmit) }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Box mb={2}>
          <Controller
            name="category_id"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                id="category_id"
                label="Category"
                select
                variant="outlined"
                fullWidth
                required
                value={field.value || record?.category_id || ""}
                onChange={(e) => {
                  const selectedOption = categoriesProps.options.find(
                    (option) => option.category_id === e.target.value
                  );
                  field.onChange(
                    selectedOption ? selectedOption.category_id : ""
                  );
                }}
                error={!!(errors as any).category_id}
                helperText={(errors as any).category_id?.message}
              >
                {categoriesProps.options?.map((option) => (
                  <MenuItem key={option.category_id} value={option.category_id}>
                    {option.category_type}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>

        <Stack
          direction="column"
          gap={2}
          flexWrap="wrap"
          sx={{ marginTop: "5px" }}
        >
          <label htmlFor="images-input">
            <Input
              id="images-input"
              type="file"
              sx={{ display: "none" }}
              onChange={onChangeHandler}
            />
            <input id="file" {...register("image")} type="hidden" />
            <LoadingButton
              loading={isUploadLoading}
              loadingPosition="end"
              endIcon={<FileUploadIcon />}
              variant="contained"
              component="span"
            >
              Upload
            </LoadingButton>
            <br />
            {errors.image && (
              <Typography variant="caption" color="#fa541c">
                {errors.image?.message?.toString()}
              </Typography>
            )}
          </label>
          {imageInput && (
            <Box
              component="img"
              sx={{
                maxWidth: 150,
                maxHeight: 150,
                objectFit: "contain",
              }}
              src={`${apiUrl}/${imageInput}`}
              alt="Uploaded image"
            />
          )}
        </Stack>

        <TextField
          {...register("sub_category_type", {
            required: "This field is required",
          })}
          error={!!(errors as any).sub_category_type}
          helperText={(errors as any).sub_category_type?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Sub Category Type"
        />

      

        <FormControl>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                labelId="priority-label"
                id="priority"
                value={field.value || 1}
                onChange={field.onChange}
                label="Priority"
                error={!!(errors as any).priority}
                
              >
                {priority.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            )}
            rules={{ required: "This field is required" }}
          />
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={isActive}
              onChange={(e) => setValue("status", e.target.checked)}
              color="primary"
            />
          }
          label={isActive ? "Active" : "Inactive"}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isAccess}
              onChange={(e) =>
                setValue("corporate_sub_category_access", e.target.checked)
              }
              color="primary"
            />
          }
          label={isAccess ? "Enable" : "Disable"}
        />
      </Box>
    </Edit>
  );
};
