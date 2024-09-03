import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useApiUrl } from "@refinedev/core";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
export const ListSubCategory = () => {
  const { dataGridProps } = useDataGrid();

  const role = localStorage.getItem("role");

  const apiUrl = useApiUrl();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "sub_category_id",
        headerName: "ID",
        type: "number",
        width: 100,
      },
      {
        field: "sub_category_type",
        headerName: "Sub Category",
        type: "string",
        // flex: 1,
        minWidth: 150,
      },
      {
        field: "categories.category_type",
        headerName: "Category",
        type: "string",
        // flex: 1,
        minWidth: 150,
        renderCell: ({ row }) => {
          return (
            <Typography>{row.categories.category_type || "N/A"}</Typography>
          );
        },
      },

      {
        field: "image",
        headerName: "Image",
        minWidth: 150,
        headerAlign: "center",
        align: "center",
        sortable: false,
        renderCell: ({ row }) => {
          return (
            <img
              src={`${apiUrl}/${row.image}`}
              width={90}
              height={90}
              alt="image"
            />
          );
        },
      },
      {
        field: "status",
        headerName: "status",
        minWidth: 150,
        sortable: true,
      },
      {
        field: "created_at",
        headerName: "Create At",
        minWidth: 150,
        sortable:false,
      },

      {
        field: "action",
        headerName: "Actions",
        minWidth: 150,
        sortable: false,
        // flex: 1,
        renderCell: ({ row }) => {
          const id = row.sub_category_id;

          return (
            <>
              <ShowButton hideText recordItemId={id} />
              <>
                <EditButton hideText recordItemId={id} />
                <DeleteButton hideText recordItemId={id} />
              </>
              {/* )} */}
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        {...dataGridProps}
        columns={columns}
        autoHeight
        getRowId={(row) => row.sub_category_id}
      />
    </List>
  );
};
