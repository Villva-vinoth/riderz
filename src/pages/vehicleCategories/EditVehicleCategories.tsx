import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Switch,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { useApiUrl } from "@refinedev/core";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import axios from "axios";
import * as React from "react";
import { Controller } from "react-hook-form";

export const EditVehicleCategory = () => {
  const [tabValue, setTabValue] = React.useState("1");
  const [uploading, setUploading] = React.useState(false);
  const [promotionImage, setPromotionImage] = React.useState(false);

  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

  const apiUrl = useApiUrl();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const priority = [1, 2, 3, 4, 5, 6];

  const status = ["Active", "Inactive"];

  const {
    register,
    saveButtonProps,
    refineCore: { formLoading, onFinish, query },
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    // defaultValues: {
    //   vehicle_type: "",
    //   base_fare: 0,
    //   price_per_km: 0,
    //   subcategory_id: "",
    //   title: "",
    //   vehicle_category_details: "",
    //   promotion_image: "",
    //   image: "",
    //   waiting_grace_mins: 1,
    //   interval_mins: 1,
    //   waiting_price: 1,
    //   no_show_fee: 0,
    //   mininum_buffer_mins: 1,
    //   cutoff_start: "00:00",
    //   cutoff_end: "00:00",
    //   always_schedule_start: "00:00",
    //   always_schedule_end: "00:00",
    //   max_passengers_without_luggage: 0,
    //   max_passengers_with_luggage: 0,
    //   max_luggage: 0,
    //   cashback_value: 0,
    //   priority: "",
    //   status: "",
    //   public_user: false,
    //   corporate_user: false,
    //   cap_price: 0,
    //   per_stop_fare: 0,
    //   per_stop_increase_cap_fare: 0,
    //   price_per_min: 0,
    //   commission_percentage: 0,
    //   corporate_vehicle_access: false,
    //   cap_price_later: 0,
    //   per_stop_fare_later: 0,
    //   per_stop_increase_cap_fare_later: 0,
    //   base_fare_later: 0,
    //   price_per_km_later: 0,
    //   price_per_min_later: 0,
    //   commission_percentage_later: 0,
    //   per_stop_fare_air: 0,
    //   seats_allowed: 0,
    //   luggage: 0,
    //   wheel_chair: 0,
    //   base_fare_later_air: 0,
    //   commission_percentage_later_air: 0,
    //   corporate_airport_access: false,
    //   min_hours: 0,
    //   max_hours: 0,
    //   price_per_min_later_charter: 0,
    //   commission_percentage_later_charter: 0,
    //   corporate_charter_access: false,
    //   malaysia_minimum_booking_minutes: 0,
    //   malaysia_minimum_fare: 0,
    //   malaysia_base_fare: 0,
    //   malaysia_price_per_km: 0,
    //   commission_percentage_later_malaysia: 0,
    //   corporate_malaysia_access: false,
    //   malaysian_charter_min_hours: 0,
    //   malaysian_charter_max_hours: 0,
    //   price_per_min_later_malaysian_charter: 0,
    //   commission_percentage_later_malaysian_charter: 0,
    //   corporate_malaysian_charter_access: false,
    //   addon_id: [""],
    //   maximum_count_adds_on: 0,
    // },
  });

  const record = query?.data?.data;

  const { autocompleteProps: subCategoriesProps } = useAutocomplete({
    resource: "sub_categories",
    defaultValue: record?.subCategory_id,
  });

  console.log("Records ", record);

  React.useEffect(() => {
    if (record) {
      setValue("public_user", record?.public_user == "on");
      setValue("corporate_user", record?.corporate_user == "on");
      setValue(
        "corporate_vehicle_access",
        record.corporate_vehicle_access == "enable"
      );
      setValue(
        "corporate_airport_access",
        record.corporate_airport_access == "enable"
      );
      setValue(
        "corporate_charter_access",
        record.corporate_charter_access == "enable"
      );
      setValue(
        "corporate_malaysia_access",
        record.corporate_malaysia_access == "enable"
      );
      setValue(
        "corporate_malaysian_charter_access",
        record.corporate_malaysian_charter_access == "enable"
      );
      const parsedOptions = record.addon_id.replace(/[{}"]/g, "").split(",");
      setSelectedOptions(parsedOptions);
    }
  }, [record, setValue]);

  const publicUser = watch("public_user");
  const corporateUser = watch("corporate_user");
  const corporateVehicleAccess = watch("corporate_vehicle_access");
  const corporateAirportaccess = watch("corporate_airport_access");
  const corporateCharterAccess = watch("corporate_charter_access");
  const corporateMalaysiaAccess = watch("corporate_malaysia_access");
  const corporateMalaysiaCharterAccess = watch(
    "corporate_malaysian_charter_access"
  );
  const imageInput = watch("image") as string;

  const promotionInput = watch("promotion_image") as string;

  const onChangeHandler = async (
    event: any,
    field: any,
    setLoading: (loading: boolean) => void
  ) => {
    try {
      setLoading(true);
      const formData = new FormData();
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      formData.append("image", file);
      const res = await axios.post<{ data: any }>(
        `${apiUrl}/api/image/upload`,
        formData,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setValue(field, res.data.data.path, { shouldValidate: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSelectChange = (event: any) => {
    const value = event.target.value as string[];
    setSelectedOptions(value);
    setValue("addon_id", value);
  };

  //   console.log("forms errors:", errors);

  const onSubmit = (data: any) => {
    console.log(data);
    const transformedData = {
      ...data,

      corporate_vehicle_access: data.corporate_vehicle_access
        ? "enable"
        : "disable",
      public_user: data.public_user ? "on" : "off",
      corporate_user: data.corporate_user ? "on" : "off",
      corporate_airport_access: data.corporate_airport_access
        ? "enable"
        : "disable",
      corporate_charter_access: data.corporate_charter_access
        ? "enable"
        : "disable",
      corporate_malaysia_access: data.corporate_malaysia_access
        ? "enable"
        : "disable",
      corporate_malaysian_charter_access:
        data.corporate_malaysian_charter_access ? "enable" : "disable",
    };
    onFinish(transformedData);
  };

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onSubmit) }}
    >
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Basic Info" value="1" />
            <Tab label="Price Configuration" value="2" />
            <Tab label="Schedule Configuration" value="3" />
            <Tab label="Airport Sevice Configuration" value="4" />
            <Tab label="Charter Price Configuration" value="5" />
            <Tab label="Malaysia Price Configuration" value="6" />
            <Tab label="Malaysia Charter Price Configuration" value="7" />
            <Tab label="Adds-on Service" value="8" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("vehicle_type", {
                required: "Vehicle Type is Required",
              })}
              label={"Vehicle Type *"}
              name={"vehicle_type"}
              error={!!(errors as any).vehicle_type?.message}
              helperText={(errors as any).vehicle_type?.message}
              sx={{ flex: 1 }}
            />

            <Controller
              control={control}
              name="subcategory_id"
              rules={{ required: "Subcategory is Required" }}
              render={({ field }) => (
                <TextField
                  sx={{ flex: 1 }}
                  value={field.value || record?.subcategory_id || ""}
                  onChange={(e) => {
                    const selectionOptions = subCategoriesProps.options.find(
                      (option) => option.sub_category_id === e.target.value
                    );

                    field.onChange(
                      selectionOptions ? selectionOptions.sub_category_id : ""
                    );
                  }}
                  label={"Sub category *"}
                  id="subcategory_id"
                  error={!!(errors as any).subcategory_id?.message}
                  helperText={(errors as any).subcategory_id?.message}
                  select
                >
                  {subCategoriesProps.options.map((option: any) => (
                    <MenuItem
                      key={option.sub_category_id}
                      value={option.sub_category_id}
                    >
                      {option.sub_category_type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <TextField
            {...register("title", {
              required: false,
            })}
            label={"Title"}
            name={"title"}
            error={!!(errors as any).title?.message}
            helperText={(errors as any).title?.message}
            sx={{ mb: "15px" }}
            fullWidth
          />
          <TextField
            {...register("vehicle_category_details", {
              required: false,
            })}
            multiline
            minRows={3}
            label={"Vehicle Category Details"}
            name={"vehicle_category_details"}
            error={!!(errors as any).vehicle_category_details?.message}
            helperText={(errors as any).vehicle_category_details?.message}
            sx={{ mb: "15px" }}
            fullWidth
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Stack
              direction="column"
              gap={2}
              flexWrap="wrap"
              sx={{ marginTop: "5px", flex: 1 }}
            >
              <label>Image *</label>
              <label htmlFor="images-input">
                <Input
                  id="images-input"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={(e) => onChangeHandler(e, "image", setUploading)}
                />
                <input
                  id="file"
                  {...register("image", {
                    required: "image is required",
                  })}
                  type="hidden"
                />
                <LoadingButton
                  loading={uploading}
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

            <Stack
              direction="column"
              gap={2}
              flexWrap="wrap"
              sx={{ marginTop: "5px", flex: 1 }}
            >
              <label>Promotion Image *</label>
              <label htmlFor="promotion-input">
                <Input
                  id="promotion-input"
                  type="file"
                  sx={{ display: "none" }}
                  onChange={(e) =>
                    onChangeHandler(e, "promotion_image", setPromotionImage)
                  }
                />
                <input
                  id="file"
                  {...register("promotion_image", {
                    required: "promotion image is required",
                  })}
                  type="hidden"
                />
                <LoadingButton
                  loading={uploading}
                  loadingPosition="end"
                  endIcon={<FileUploadIcon />}
                  variant="contained"
                  component="span"
                >
                  Upload
                </LoadingButton>
                <br />
                {errors.promotion_image && (
                  <Typography variant="caption" color="#fa541c">
                    {errors.promotion_image?.message?.toString()}
                  </Typography>
                )}
              </label>
              {promotionInput && (
                <Box
                  component="img"
                  sx={{
                    maxWidth: 150,
                    maxHeight: 150,
                    objectFit: "contain",
                  }}
                  src={`${apiUrl}/${promotionInput}`}
                  alt="Uploaded image"
                />
              )}
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("waiting_grace_mins", {
                required: "Waiting Grace minute is Required",
              })}
              type="number"
              label={"Waiting Grace Minutes *"}
              name={"waiting_grace_mins"}
              error={!!(errors as any).waiting_grace_mins?.message}
              helperText={(errors as any).waiting_grace_mins?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("interval_mins", {
                required: "Interval Minutes is Required",
              })}
              type="number"
              label={"Interval Minutes *"}
              name={"interval_mins"}
              error={!!(errors as any).interval_mins?.message}
              helperText={(errors as any).interval_mins?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("waiting_price", {
                required: "Waiting Price is Required",
              })}
              type="number"
              label={"Waiting Price *"}
              name={"waiting_price"}
              error={!!(errors as any).waiting_price?.message}
              helperText={(errors as any).waiting_price?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("no_show_fee", {
                required: "No Show Fee is Required",
              })}
              type="number"
              label={"No Show Fee *"}
              name={"no_show_fee"}
              error={!!(errors as any).no_show_fee?.message}
              helperText={(errors as any).no_show_fee?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("mininum_buffer_mins", {
                required: "Minimum Buffer Minutes is Required",
              })}
              type="number"
              label={"Minimum Buffer Minutes"}
              name={"mininum_buffer_mins"}
              error={!!(errors as any).mininum_buffer_mins?.message}
              helperText={(errors as any).mininum_buffer_mins?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <label>Cutoff Start Time</label>
              <TextField
                type="time"
                {...register("cutoff_start", {
                  required: false,
                })}
                name="cutoff_start"
                error={!!(errors as any).cutoff_start?.message}
                helperText={(errors as any).cutoff_start?.message}
              />
            </Stack>
            <Stack sx={{ flex: 1 }}>
              <label>Cutoff End Time</label>
              <TextField
                type="time"
                {...register("cutoff_end", {
                  required: false,
                })}
                name="cutoff_end"
                error={!!(errors as any).cutoff_end?.message}
                helperText={(errors as any).cutoff_end?.message}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <label>Always Schedule Start Time</label>
              <TextField
                type="time"
                {...register("always_schedule_start", {
                  required: false,
                })}
                name="always_schedule_start"
                error={!!(errors as any).always_schedule_start?.message}
                helperText={(errors as any).always_schedule_start?.message}
              />
            </Stack>
            <Stack sx={{ flex: 1 }}>
              <label>Always Schedule End Time</label>
              <TextField
                type="time"
                {...register("always_schedule_end", {
                  required: false,
                })}
                name="always_schedule_end"
                error={!!(errors as any).always_schedule_end?.message}
                helperText={(errors as any).always_schedule_end?.message}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("max_passengers_without_luggage", {
                required: "Max Passengers without luggage is Required",
              })}
              type="number"
              label={"max Passengers without Luggage*"}
              name={"max_passengers_without_luggage"}
              error={!!(errors as any).max_passengers_without_luggage?.message}
              helperText={
                (errors as any).max_passengers_without_luggage?.message
              }
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("max_passengers_with_luggage", {
                required: "Max Passengers with Luggage is Required",
              })}
              type="number"
              label={"Max Passenger with Luggage*"}
              name={"max_passengers_with_luggage"}
              error={!!(errors as any).max_passengers_with_luggage?.message}
              helperText={(errors as any).max_passengers_with_luggage?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("max_luggage", {
                required: "Max Luggage is Required",
              })}
              type="number"
              label={"Max Luggage *"}
              name={"max_luggage"}
              error={!!(errors as any).max_luggage?.message}
              helperText={(errors as any).max_luggage?.message}
              sx={{ flex: 1 }}
            />
            <Stack sx={{ flex: 1 }}>
              <TextField
                {...register("cashback_value", {
                  required: "cashback Value is Required ",
                  // validate: (value) =>
                  //   (value >= 0 && value <= 100) ||
                  //   "value must between 0 - 100",
                })}
                type="number"
                label={"Cashback Value"}
                name={"cashback_value"}
                error={!!(errors as any).cashback_value?.message}
                helperText={(errors as any).cashback_value?.message}
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Stack>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Controller
              control={control}
              name="priority"
              rules={{ required: "priority is Required" }}
              render={({ field }) => (
                <TextField
                  sx={{ flex: 1 }}
                  value={field.value || ""}
                  onChange={field.onChange}
                  label={"priority *"}
                  id="priority"
                  error={!!(errors as any).priority?.message}
                  helperText={(errors as any).priority?.message}
                  select
                >
                  {priority.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={control}
              name="status"
              rules={{ required: "Status is Required" }}
              render={({ field }) => (
                <TextField
                  sx={{ flex: 1 }}
                  value={field.value || ""}
                  onChange={field.onChange}
                  // {...register("status", {
                  //   required: "Status is Required",
                  // })}
                  label={"Status *"}
                  id="status"
                  error={!!(errors as any).status?.message}
                  helperText={(errors as any).status?.message}
                  select
                >
                  {status.map((option: any) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}
            >
              <label>Public user</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={publicUser || false}
                    onChange={(e) => setValue("public_user", e.target.checked)}
                    color="primary"
                  />
                }
                label={publicUser ? "on" : "Off"}
              />
            </Box>

            <Box
              sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}
            >
              <label>Corporate user</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={corporateUser || false}
                    onChange={(e) =>
                      setValue("corporate_user", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label={corporateUser ? "on" : "off"}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("cap_price", {
                required: "Cap Price is Required",
              })}
              type="number"
              label={"Cap Price *"}
              name={"cap_price"}
              error={!!(errors as any).cap_price?.message}
              helperText={(errors as any).cap_price?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("per_stop_fare", {
                required: "Per stop Fare is Required",
              })}
              type="number"
              label={"Per Stop Fare *"}
              name={"per_stop_fare"}
              error={!!(errors as any).per_stop_fare?.message}
              helperText={(errors as any).per_stop_fare?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("per_stop_increase_cap_fare", {
                required: "Per Stop Increase cap Fare is Required",
              })}
              type="number"
              label={"Per Stop Increase Cap Fare *"}
              name={"per_stop_increase_cap_fare"}
              error={!!(errors as any).per_stop_increase_cap_fare?.message}
              helperText={(errors as any).per_stop_increase_cap_fare?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("base_fare", {
                required: "Base Fare is Required",
              })}
              type="number"
              label={"Base Fare *"}
              name={"base_fare"}
              error={!!(errors as any).base_fare?.message}
              helperText={(errors as any).base_fare?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("price_per_km", {
                required: "Price Per KM is Required",
              })}
              type="number"
              label={"Price Per KM *"}
              name={"price_per_km"}
              error={!!(errors as any).price_per_km?.message}
              helperText={(errors as any).price_per_km?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("price_per_min", {
                required: false,
              })}
              type="number"
              label={"Price Per Minutes"}
              name={"price_per_min"}
              error={!!(errors as any).price_per_min?.message}
              helperText={(errors as any).price_per_min?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <TextField
                {...register("commission_percentage", {
                  required: false,
                  // validate: (value) =>
                  //   (value >= 0 && value <= 100) ||
                  //   "value must between 0 - 100",
                })}
                type="number"
                label={"Admin Commission  "}
                name={"commission_percentage"}
                error={!!(errors as any).commission_percentage?.message}
                helperText={(errors as any).commission_percentage?.message}
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Stack>
            <Box
              sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}
            >
              <label>Corporate Vehicle Access</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={corporateVehicleAccess}
                    onChange={(e) =>
                      setValue("corporate_vehicle_access", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label={corporateVehicleAccess ? "on" : "off"}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="3">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("cap_price_later", {
                required: "Cap Price is Required",
              })}
              type="number"
              label={"Cap Price *"}
              name={"cap_price_later"}
              error={!!(errors as any).cap_price_later?.message}
              helperText={(errors as any).cap_price_later?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("per_stop_fare_later", {
                required: "Per stop Fare is Required",
              })}
              type="number"
              label={"Per Stop Fare *"}
              name={"per_stop_fare_later"}
              error={!!(errors as any).per_stop_fare_later?.message}
              helperText={(errors as any).per_stop_fare_later?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("per_stop_increase_cap_fare_later", {
                required: "Per Stop Increase cap Fare is Required",
              })}
              type="number"
              label={"Per Stop Increase Cap Fare *"}
              name={"per_stop_increase_cap_fare_later"}
              error={
                !!(errors as any).per_stop_increase_cap_fare_later?.message
              }
              helperText={
                (errors as any).per_stop_increase_cap_fare_later?.message
              }
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("base_fare_later", {
                required: "Base Fare is Required",
              })}
              type="number"
              label={"Base Fare *"}
              name={"base_fare_later"}
              error={!!(errors as any).base_fare_later?.message}
              helperText={(errors as any).base_fare_later?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("price_per_km_later", {
                required: "Price Per KM is Required",
              })}
              type="number"
              label={"Price Per KM *"}
              name={"price_per_km_later"}
              error={!!(errors as any).price_per_km_later?.message}
              helperText={(errors as any).price_per_km_later?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("price_per_min_later", {
                required: false,
              })}
              type="number"
              label={"Price Per Minutes"}
              name={"price_per_min_later"}
              error={!!(errors as any).price_per_min_later?.message}
              helperText={(errors as any).price_per_min_later?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Stack sx={{ width: "50%" }}>
              <TextField
                {...register("commission_percentage_later", {
                  required: false,
                  // validate: (value) =>
                  //   (value >= 0 && value <= 100) ||
                  //   "value must between 0 - 100",
                })}
                type="number"
                label={"Admin Commission "}
                name={"commission_percentage_later"}
                error={!!(errors as any).commission_percentage_later?.message}
                helperText={
                  (errors as any).commission_percentage_later?.message
                }
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Stack>
          </Box>
        </TabPanel>
        <TabPanel value="4">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("per_stop_fare_air", {
                required: "Per Stop Fare is Required",
              })}
              type="number"
              label={"Per Stop Fare *"}
              name={"per_stop_fare_air"}
              error={!!(errors as any).per_stop_fare_air?.message}
              helperText={(errors as any).per_stop_fare_air?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("seats_allowed", {
                required: "Seats Allowed is Required",
              })}
              type="number"
              label={"seats Allowed *"}
              name={"seats_allowed"}
              error={!!(errors as any).seats_allowed?.message}
              helperText={(errors as any).seats_allowed?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("luggage", {
                required: "Luggage Allowed is Required",
              })}
              type="number"
              label={"Luggage Allowed  *"}
              name={"luggage"}
              error={!!(errors as any).luggage?.message}
              helperText={(errors as any).luggage?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("wheel_chair", {
                required: "Wheel Chairs is Required",
              })}
              type="number"
              label={"Wheel Chair *"}
              name={"wheel_chair"}
              error={!!(errors as any).wheel_chair?.message}
              helperText={(errors as any).wheel_chair?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("base_fare_later_air", {
                required: "Base Fare is Required",
              })}
              type="number"
              label={"Base Fare *"}
              name={"base_fare_later_air"}
              error={!!(errors as any).base_fare_later_air?.message}
              helperText={(errors as any).base_fare_later_air?.message}
              sx={{ flex: 1 }}
            />

            <Stack sx={{ flex: 1 }}>
              <TextField
                {...register("commission_percentage_later_air", {
                  required: false,
                  // validate: (value) =>
                  //   (value >= 0 && value <= 100) ||
                  //   "value must between 0 - 100",
                })}
                type="number"
                label={"Admin Commission "}
                name={"commission_percentage_later_air"}
                error={
                  !!(errors as any).commission_percentage_later_air?.message
                }
                helperText={
                  (errors as any).commission_percentage_later_air?.message
                }
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Stack>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}
            >
              <label>Corporate Airport Access</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={corporateAirportaccess}
                    onChange={(e) =>
                      setValue("corporate_airport_access", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label={corporateAirportaccess ? "on" : "off"}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="5">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("min_hours", {
                required: false,
              })}
              type="number"
              label={"Minimum No of Hours"}
              name={"min_hours"}
              error={!!(errors as any).min_hours?.message}
              helperText={(errors as any).min_hours?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("max_hours", {
                required: false,
              })}
              type="number"
              label={"Maximim No of Hours"}
              name={"max_hours"}
              error={!!(errors as any).max_hours?.message}
              helperText={(errors as any).max_hours?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("price_per_min_later_charter", {
                required: false,
              })}
              type="number"
              label={"Price Per Hours"}
              name={"price_per_min_later_charter"}
              error={!!(errors as any).price_per_min_later_charter?.message}
              helperText={(errors as any).price_per_min_later_charter?.message}
              sx={{ flex: 1 }}
            />

            <Stack sx={{ flex: 1 }}>
              <TextField
                {...register("commission_percentage_later_charter", {
                  required: false,
                  // validate: (value) =>
                  //   (value >= 0 && value <= 100) ||
                  //   "value must between 0 - 100",
                })}
                type="number"
                label={"Admin Commission "}
                name={"commission_percentage_later_charter"}
                error={
                  !!(errors as any).commission_percentage_later_charter?.message
                }
                helperText={
                  (errors as any).commission_percentage_later_charter?.message
                }
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Stack>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}
            >
              <label>Corporate Charter Access</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={corporateCharterAccess}
                    onChange={(e) =>
                      setValue("corporate_charter_access", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label={corporateCharterAccess ? "on" : "off"}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="6">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("malaysia_minimum_booking_minutes", {
                required: false,
              })}
              type="number"
              label={"Minimum Booking Minutes"}
              name={"malaysia_minimum_booking_minutes"}
              error={
                !!(errors as any).malaysia_minimum_booking_minutes?.message
              }
              helperText={
                (errors as any).malaysia_minimum_booking_minutes?.message
              }
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("malaysia_minimum_fare", {
                required: false,
              })}
              type="number"
              label={"Minimum Distance Fare"}
              name={"malaysia_minimum_fare"}
              error={!!(errors as any).malaysia_minimum_fare?.message}
              helperText={(errors as any).malaysia_minimum_fare?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("malaysia_base_fare", {
                required: false,
              })}
              type="number"
              label={"Base Fare"}
              name={"malaysia_base_fare"}
              error={!!(errors as any).malaysia_base_fare?.message}
              helperText={(errors as any).malaysia_base_fare?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("malaysia_price_per_km", {
                required: false,
              })}
              type="number"
              label={"Price Per KM"}
              name={"malaysia_price_per_km"}
              error={!!(errors as any).malaysia_price_per_km?.message}
              helperText={(errors as any).malaysia_price_per_km?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <TextField
                {...register("commission_percentage_later_malaysia", {
                  required: false,
                  // validate: (value) =>
                  //   (value >= 0 && value <= 100) ||
                  //   "value must between 0 - 100",
                })}
                type="number"
                label={"Admin Commission "}
                name={"commission_percentage_later_malaysia"}
                error={
                  !!(errors as any).commission_percentage_later_malaysia
                    ?.message
                }
                helperText={
                  (errors as any).commission_percentage_later_malaysia?.message
                }
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Stack>
            <Box
              sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}
            >
              <label>Corporate Malaysia Access</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={corporateMalaysiaAccess}
                    onChange={(e) =>
                      setValue("corporate_malaysia_access", e.target.checked)
                    }
                    color="primary"
                  />
                }
                label={corporateMalaysiaAccess ? "on" : "off"}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="7">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("malaysian_charter_min_hours", {
                required: false,
              })}
              type="number"
              label={"Minimum No of Hours"}
              name={"malaysian_charter_min_hours"}
              error={!!(errors as any).malaysian_charter_min_hours?.message}
              helperText={(errors as any).malaysian_charter_min_hours?.message}
              sx={{ flex: 1 }}
            />
            <TextField
              {...register("malaysian_charter_max_hours", {
                required: false,
              })}
              type="number"
              label={"Maximim No of Hours"}
              name={"malaysian_charter_max_hours"}
              error={!!(errors as any).malaysian_charter_max_hours?.message}
              helperText={(errors as any).malaysian_charter_max_hours?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("price_per_min_later_malaysian_charter", {
                required: false,
              })}
              type="number"
              label={"Price Per Hours"}
              name={"price_per_min_later_malaysian_charter"}
              error={
                !!(errors as any).price_per_min_later_malaysian_charter?.message
              }
              helperText={
                (errors as any).price_per_min_later_malaysian_charter?.message
              }
              sx={{ flex: 1 }}
            />

            <Stack sx={{ flex: 1 }}>
              <TextField
                {...register("commission_percentage_later_malaysian_charter", {
                  required: false,
                  // validate: (value) =>
                  //   (value >= 0 && value <= 100) ||
                  //   "value must between 0 - 100",
                })}
                type="number"
                label={"Admin Commission "}
                name={"commission_percentage_later_malaysian_charter"}
                error={
                  !!(errors as any)
                    .commission_percentage_later_malaysian_charter?.message
                }
                helperText={
                  (errors as any).commission_percentage_later_malaysian_charter
                    ?.message
                }
                sx={{ flex: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
                inputProps={{
                  min: 0,
                  max: 100,
                }}
              />
            </Stack>
          </Box>
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", flex: 1, gap: 2 }}
            >
              <label>Corporate Charter Access</label>
              <FormControlLabel
                control={
                  <Switch
                    checked={corporateMalaysiaCharterAccess}
                    onChange={(e) =>
                      setValue(
                        "corporate_malaysian_charter_access",
                        e.target.checked
                      )
                    }
                    color="primary"
                  />
                }
                label={corporateMalaysiaCharterAccess ? "on" : "off"}
              />
            </Box>
          </Box>
        </TabPanel>
        <TabPanel value="8">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              mb: "15px",
            }}
          >
            <TextField
              {...register("maximum_count_adds_on", {
                required: false,
              })}
              type="number"
              label={"Maximim Selected Adds-on Service Count"}
              name={"maximum_count_adds_on"}
              error={!!(errors as any).maximum_count_adds_on?.message}
              helperText={(errors as any).maximum_count_adds_on?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Adds-on service</InputLabel>
            <Select
              multiple
              value={selectedOptions}
              onChange={handleSelectChange}
              renderValue={(selected) => (selected as string[]).join(", ")}
              label={"Adds-on service"}
            >
              {[1, 2, 3, 4, 5, 6].map((option) => (
                <MenuItem key={option} value={option.toString()}>
                  <Checkbox
                    checked={selectedOptions.indexOf(option.toString()) > -1}
                  />
                  <ListItemText primary={`Option ${option}`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </TabPanel>
      </TabContext>
    </Edit>
  );
};
