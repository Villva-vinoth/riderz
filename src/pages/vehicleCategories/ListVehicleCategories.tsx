import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
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
        headerName: "Id",
        minWidth:100,
      },
      {
        field:"vehicle_type",
        headerName:"Vehicle",
        minWidth:150,
      },
      {
        field:"vehicle_categories.sub_category_type",
        headerName:"category",
        minWidth:150,
        renderCell:({row})=>{
          return (<Typography>{row.vehicle_categories.sub_category_type}</Typography>)
        }
      },
      {
        field:"priority",
        headerName:"priority",
        minWidth:150,
        
      },
      {
        field:"status",
        headerName:"status",
        minWidth:150
      },
      {
        field:"image",
        headerName:"Image",
        minWidth:150,
        align:'center',
        headerAlign:'center',
        renderCell:({row})=>{
            return (
                <img src={`${apiUrl}/${row.image}`} alt="Image" width={90} height={90}  />
            )
        }
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth:150,
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

  return <List>
    <DataGrid columns={column}  {...dataGridProps} autoHeight getRowId={(row)=>row.vehicle_category_id} />
  </List>;
};
