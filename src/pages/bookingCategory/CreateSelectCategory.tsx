import { Box, MenuItem, TextField } from "@mui/material";
import { useApiUrl } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { TOKEN_KEY } from "../../providers/authProvider";

export const CreateSelectCategory = () => {
  const { saveButtonProps, register, setValue, watch, handleSubmit,formState: { errors } } =
    useForm({
      defaultValues:{
        category:"",
        subcategory:""
      }
    });
  const selectedCategory = watch("category", "");

  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const apiUrl = useApiUrl();

  const { autocompleteProps: categoryProps } = useAutocomplete({
    resource: "categories",
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    const fetchSubcategories = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `${apiUrl}/api/sub_categories/showCategoryId/${selectedCategory}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "ngrok-skip-browser-warning": "true",
              },
            }
          );
          console.log(response.data.data);
          setFilteredSubcategories(response?.data?.data);
        } catch (error) {
          console.error("Error fetching subcategories:", error);
        }
      } else {
        setFilteredSubcategories([]);
      }
    };
    fetchSubcategories();
  }, [selectedCategory, apiUrl]);

  return (
    <Create
      saveButtonProps={{ ...saveButtonProps, onClick: handleSubmit(onSubmit) }}
    >
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
        autoComplete="off"
      >

        <TextField
          select
          label="Category"
           defaultValue=""
          {...register("category", { required: true })}
          onChange={(event) => {
            const value = event.target.value;
            setValue("category", value);
          }}
          error={!!(errors as any).category?.message}
            helperText={(errors as any).category?.message}
        >
          {categoryProps.options?.map((category: any) => (
            <MenuItem key={category.category_id} value={category.category_id}>
              {category.category_type}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
           defaultValue=""
          label="Subcategory"
          {...register("subcategory", { required: true })}
          disabled={!filteredSubcategories.length}
          error={!!(errors as any).subcategory?.message}
          helperText={(errors as any).subcategory?.message}
        >
          {filteredSubcategories?.map((subcategory: any, index: number) => (
            <MenuItem key={index} value={subcategory?.sub_category_id}>
              {subcategory?.sub_category_type}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Create>
  );
};
