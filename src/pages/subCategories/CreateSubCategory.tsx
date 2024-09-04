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
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import axios from "axios";
import { useState } from "react";

export const CreateSubCategory = () => {
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const apiUrl = useApiUrl();

  const {
    saveButtonProps,
    refineCore: { formLoading, onFinish },
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      status: false,
      corporate_sub_category_access: false,
      sub_category_type: "",
      priority: 1,
      image: "",
      category_id: "",
    },
  });

  const isActive = watch("status");
  const isAccess = watch("corporate_sub_category_access");
  const imageInput = watch("image") as string;

  const priority = [1, 2, 3, 4, 5, 6];
  const { autocompleteProps: categoriesProps } = useAutocomplete({
    resource: "categories",
  });

  // console.log(categoriesProps.options)

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
    console.log(data);
    const transformedData = {
      ...data,
      status: data.status ? "Active" : "Inactive",
      corporate_sub_category_access: data.corporate_sub_category_access
        ? "enable"
        : "disable",
    };

    onFinish(transformedData);
  };

  // console.log('Form errors:', errors);

  return (
    <Create
      isLoading={formLoading}
      saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onSubmit) }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Box mb={2}>
          <TextField
            id="category_id"
            label="Category"
            select
            variant="outlined"
            fullWidth
            required
            defaultValue=""
            {...register("category_id", {
              required: "category_id is Required",
            })}
            error={!!errors.category_id?.message}
            helperText={errors.category_id?.message}
          >
            {/* <MenuItem value="">Select a category</MenuItem> */}
            {categoriesProps.options?.map((option) => (
              <MenuItem key={option.category_id} value={option.category_id}>
                {option.category_type}
              </MenuItem>
            ))}
          </TextField>
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
            <input
              id="file"
              {...register("image", {
                required: "image is required",
              })}
              type="hidden"
            />
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
          error={!!(errors as any)?.category_type}
          helperText={(errors as any)?.category_type?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"sub_category_type"}
          name="sub_category_type"
        />

        <FormControl>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            defaultValue={1}
            {...register("priority", {
              required: "this field is Required",
            })}
            label="priority"
          >
            {priority.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
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
          label={isAccess ? "enable" : "disable"}
        />
      </Box>
    </Create>
  );
};
