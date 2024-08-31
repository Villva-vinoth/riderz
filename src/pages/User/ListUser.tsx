import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
export const ListUser = () => {
  const { dataGridProps } = useDataGrid();

  const role = localStorage.getItem('role')

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "user_id",
        headerName: "sno",
        type: "number",
      },
      {
        field: "full_name",
        headerName: "Name",
        type: "string",
        // width:200
        flex:1,
      },
      {
        field: "roles.role_name",
        headerName: "Role",
        type: "string",
        valueGetter: (params) => params.row.roles.role_name,
      },
      {
        field: "created_at",
        headerName: "Create At",
        width:200
      },
      {
        field: "action",
        headerName: "Actions",
        renderCell: ({ row }) => {
          const id = row.user_id;
          return (
            <>
              <ShowButton hideText recordItemId={id} />
              <EditButton hideText recordItemId={id} />
              <DeleteButton hideText recordItemId={id}  disabled={row.role == role}/>
            </>
          );
        },
        width: 150,
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
        getRowId={(row) => row.user_id}
        // onRowClick={(row)=>}
      />

      
    </List>
  );
};
