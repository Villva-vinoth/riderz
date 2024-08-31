import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import React from "react";
export const ListPermission = () => {
  const { dataGridProps } = useDataGrid();

  const role = localStorage.getItem("role");

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "permission_id",
        headerName: "ID",
        type: "number",
      },
      {
        field: "resources",
        headerName: "Resources",
        type: "string",
        // width:200
        flex: 1,
      },
      {
        field: "roles_permissions.role_name",
        headerName: "Role",
        type: "string",
        valueGetter: (params) => params.row.roles_permissions.role_name,
      },
      {
        field: "created_at",
        headerName: "Create At",
        width: 200,
      },
      {
        field: "action",
        headerName: "Actions",
        renderCell: ({ row }) => {
          const id = row.permission_id;
          return (
            <>
              <ShowButton hideText recordItemId={id} />
              <EditButton
                hideText
                recordItemId={id}
                disabled={row.role == role}
              />
              <DeleteButton
                hideText
                recordItemId={id}
                disabled={row.role == role}
              />
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
        getRowId={(row) => row.permission_id}
        // onRowClick={(row)=>}
      />
    </List>
  );
};
