import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import { Show, TextFieldComponent as TextField } from "@refinedev/mui";

export const ShowRole = () => {
  const { query } = useShow();

  const record = query?.data?.data;

  return (
    <Show>
      <Stack gap={1}>
        {record &&
          Object.keys(record).map((key,index) => {
            let value = record[key];
            // if (key === "created_at") {
            //   value = new Date(value).toLocaleDateString();
            // }

            return (
              <div key={index}>
                <Typography variant="body1" fontWeight="bold">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                <TextField value={value} />
              </div>
            );
          })}
      </Stack>
    </Show>
  );
};
