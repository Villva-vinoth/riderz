import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const ShowUser = () => {
  const { query } = useShow();
  const record = query?.data?.data;

  return (
    <Show>
      <Stack spacing={2}>
        {record &&
          Object.keys(record).map((key, index) => {
            let value = record[key];

            if (typeof value === "object" && value !== null) {
              value = JSON.stringify(value);
            }
            if (key == "roles") {
              value = record.roles.role_name;
            }

            return (
              <Stack key={index} spacing={1}>
                <Typography variant="body1" fontWeight="bold">
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                </Typography>
                <TextField value={value} />
              </Stack>
            );
          })}
      </Stack>
    </Show>
  );
};
