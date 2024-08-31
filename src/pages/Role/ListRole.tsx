import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
export const ListRole = () => {
  const { dataGridProps } = useDataGrid();

  const role = localStorage.getItem("role");

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "role_id",
        headerName: "sno",
        type: "number",
        width: 100,
      },
      {
        field: "role_name",
        headerName: "Role",
        type: "string",
        // width: 350,
        flex: 1,
      },
      {
        field: "created_at",
        headerName: "Create At",
        // width: 200,
        flex:1
      },
      {
        field: "action",
        headerName: "Actions",
        minWidth: 150,
        flex: 1,
        renderCell: ({ row }) => {
          const id = row.role_id;
          console.log(row.role_id !== role);
          return (
            <>
              <ShowButton hideText recordItemId={id} />
              <EditButton
                hideText
                recordItemId={id}
                disabled={row.row_id == role}
              />
              <DeleteButton
                hideText
                recordItemId={id}
                disabled={row.role_id == role}
              />
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
        getRowId={(row) => row.role_id}
      />
    </List>
  );
};
