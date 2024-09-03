import { GridColDef } from "@mui/x-data-grid";
import { useApiUrl } from "@refinedev/core";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import React from "react";

export const ListVehicleCategory = () => {
  const { dataGridProps } = useDataGrid();

  const apiUrl = useApiUrl()

  const column = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "vehicle_category_id",
        headerName: "Vehicle Category",
      },
      {
        field:"image",
        headerName:"Image",
        renderCell:({row})=>{
            return (
                <img src="" alt="Image" />
            )
        }
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: ({ row }) => {
          const id = row.vehicle_category_id;
          return (
            <>
              <EditButton hideText recordItemId={id} />
              <DeleteButton hideText recordItemId={id} />
            </>
          );
        },
      },
    ],
    []
  );

  return <List></List>;
};
