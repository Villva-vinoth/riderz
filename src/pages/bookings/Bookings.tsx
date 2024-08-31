import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const BookingForm = () => {
  const currentDate = dayjs().format("YYYY-MM-DD");
  const currentTime = dayjs().format("HH:mm");

  const { control, handleSubmit } = useForm({
    defaultValues: {
      book_time: currentTime,
      book_date: currentDate,
      book_details: "",
      book_comment: "",
      pickup_location: "",
      drop_location: "",
      vehicle_type: "",
      passenger: 0,
      lagguage: 0,
      return_date: currentDate,
      return_time: currentTime,
      return_pickup_location: "",
      return_drop_location: "",
      return_vehicle_type: "",
    },
  });
  const [formType, setFormType] = useState("type1");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const renderCommonFields = () => (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Controller
          control={control}
          name="book_time"
          render={({ field }) => (
            <TextField
              {...field}
              label="Book Time"
              type="time"
              margin="normal"
              sx={{ flex: 1 }}
            />
          )}
        />
        <Controller
          control={control}
          name="book_date"
          render={({ field }) => (
            <TextField
              {...field}
              label="Book Date"
              type="date"
              margin="normal"
              sx={{ flex: 1 }}
            />
          )}
        />
      </Box>
      <Controller
        control={control}
        name="book_details"
        render={({ field }) => (
          <TextField
            {...field}
            label="Book Details"
            multiline
            rows={4}
            margin="normal"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="book_comment"
        render={({ field }) => (
          <TextField
            {...field}
            label="Book Comment"
            multiline
            rows={2}
            margin="normal"
            fullWidth
          />
        )}
      />
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          <Controller
            control={control}
            name="pickup_location"
            render={({ field }) => (
              <TextField
                {...field}
                label="Pickup Location"
                margin="normal"
                sx={{ flex: 1 }}
              />
            )}
          />
          <Controller
            control={control}
            name="drop_location"
            render={({ field }) => (
              <TextField
                {...field}
                label="Drop Location"
                margin="normal"
                sx={{ flex: 1 }}
              />
            )}
          />
        </Box>
      </>
      <Controller
        control={control}
        name="vehicle_type"
        render={({ field }) => (
          <TextField
            {...field}
            label="Vehicle Type"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="passenger"
        render={({ field }) => (
          <TextField
            {...field}
            label="Passenger"
            type="number"
            margin="normal"
            fullWidth
          />
        )}
      />
      <Controller
        control={control}
        name="lagguage"
        render={({ field }) => (
          <TextField
            {...field}
            label="Luggage"
            type="number"
            margin="normal"
            fullWidth
          />
        )}
      />
    </>
  );

  const renderType2Fields = () => (
    <>
        <Box sx={{
            display:'flex',
            aligItems:'center',
            width:'100%',
            gap:2
        }}>
        <Controller
        control={control}
        name="return_date"
        render={({ field }) => (
          <TextField
            {...field}
            label="Return Date"
            type="date"
            margin="normal"
            sx={{flex:1}}
          />
        )}
      />
      <Controller
        control={control}
        name="return_time"
        render={({ field }) => (
          <TextField
            {...field}
            label="Return Time"
            type="time"
            margin="normal"
            sx={{flex:1}}
          />
        )}
      />
        </Box>
        <Box sx={{
            display:'flex',
            alignItems:'center',
            width:'100%',
            gap:2
        }}>
        <Controller
        control={control}
        name="return_pickup_location"
        render={({ field }) => (
          <TextField
            {...field}
            label="Return Pickup Location"
            margin="normal"
            sx={{flex:1}}
          />
        )}
      />
      <Controller
        control={control}
        name="return_drop_location"
        render={({ field }) => (
          <TextField
            {...field}
            label="Return Drop Location"
            margin="normal"
            sx={{flex:1}}
          />
        )}
      />
        </Box>
      <Controller
        control={control}
        name="return_vehicle_type"
        render={({ field }) => (
          <TextField
            {...field}
            label="Return Vehicle Type"
            margin="normal"
            fullWidth
          />
        )}
      />
    </>
  );

  return (
    <Box>
      <FormControl component="fieldset">
        <RadioGroup
          row
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
        >
          <FormControlLabel
            value="type1"
            control={<Radio />}
            label="One Way Trip"
          />
          <FormControlLabel
            value="type2"
            control={<Radio />}
            label="Round Trip"
          />
        </RadioGroup>
      </FormControl>

      <form onSubmit={handleSubmit(onSubmit)}>
        {renderCommonFields()}

        {formType === "type2" && renderType2Fields()}

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default BookingForm;
