import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useApiUrl } from "@refinedev/core";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const ListVehicleCategory = () => {
  const { dataGridProps } = useDataGrid();

  const apiUrl = useApiUrl();

  const column = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "vehicle_category_id",
        headerName: "Id",
        minWidth: 100,
      },
      {
        field: "vehicle_type",
        headerName: "Vehicle",
        minWidth: 150,
      },
      {
        field: "vehicle_categories.sub_category_type",
        headerName: "category",
        minWidth: 150,
        renderCell: ({ row }) => {
          return (
            <Typography>{row.vehicle_categories.sub_category_type}</Typography>
          );
        },
      },
      {
        field: "priority",
        headerName: "priority",
        minWidth: 150,
      },
      {
        field: "status",
        headerName: "status",
        minWidth: 150,
      },
      {
        field: "image",
        headerName: "Image",
        minWidth: 150,
        align: "center",
        headerAlign: "center",
        renderCell: ({ row }) => {
          const [imageSrc, setImageSrc] = useState("");

          useEffect(() => {
            const fetchImage = async () => {
              try {
                const response = await axios.get(`${apiUrl}/${row.image}`, {
                  responseType: "blob",
                  headers: {
                    "ngrok-skip-browser-warning": "true",
                  },
                });

                if (response.status == 200) {
                  // console.log(response);
                  const blob = await response.data;
                  const imageUrl = URL.createObjectURL(blob);
                  setImageSrc(imageUrl);
                }
              } catch (error) {
                console.error("Error fetching the image:", error);
              }
            };

            fetchImage();
          }, [row.image]);
          return <img src={imageSrc} alt="Image" width={90} height={90} />;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 150,
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

  return (
    <List>
      <DataGrid
        columns={column}
        {...dataGridProps}
        autoHeight
        getRowId={(row) => row.vehicle_category_id}
      />
    </List>
  );
};
