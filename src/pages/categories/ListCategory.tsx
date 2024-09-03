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
export const ListCategory = () => {
  const { dataGridProps } = useDataGrid();

  const role = localStorage.getItem("role");

  const apiUrl = useApiUrl();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "category_id",
        headerName: "ID",
        type: "number",
        width: 100,
      },
      {
        field: "category_type",
        headerName: "Category Type",
        type: "string",
        // flex: 1,
        minWidth: 100,
      },

      {
        field: "image",
        headerName: "Image",
        minWidth: 150,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => {
          return (
            <img
              src={`${apiUrl}/${row.image}`}
              width={100}
              height={100}
              alt="image"
            />
          );
        },
      },
      {
        field: "status",
        headerName: "status",
        minWidth: 100,
      },
      {
        field: "created_at",
        headerName: "Create At",
        minWidth: 150,
      },

      {
        field: "action",
        headerName: "Actions",
        minWidth: 150,
        // flex: 1,
        renderCell: ({ row }) => {
          const id = row.category_id;

          return (
            <>
              <ShowButton hideText recordItemId={id} />
              <>
                <EditButton
                  hideText
                  recordItemId={id}

                />
                <DeleteButton
                  hideText
                  recordItemId={id}
                />
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
        getRowId={(row) => row.category_id}
      />
    </List>
  );
};
