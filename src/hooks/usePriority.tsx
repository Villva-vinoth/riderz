import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../constant";
import { TOKEN_KEY } from "../providers/authProvider";

interface PermissionItem {
  name: string;
  list: string | undefined;
  show: string | undefined;
  create: string | undefined;
  edit: string | undefined;
  delete: boolean;
}

export const usePriority = () => {
  const [permissions, setPermissions] = useState<PermissionItem[]>([]);

  useEffect(() => {
    const fetchPermissions = async (role: string) => {
      try {
        const token = localStorage.getItem(TOKEN_KEY);
        const response = await axios.get(
          `${API_URL}/api/permissions/showRole/${role}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'ngrok-skip-browser-warning': 'true'

            },
          }
        );
        const permissionsData = response.data.data;
        // console.log(permissionsData);

        const per: PermissionItem[] = permissionsData.map((item: any) => {
          const retr: PermissionItem = {
            name: item.resources || "",
            list: item.can_list ? `/${item.resources}` : undefined,
            show: item.can_show ? `/${item.resources}/show/:id` : undefined,
            create: item.can_create ? `/${item.resources}/create` : undefined,
            edit: item.can_update ? `/${item.resources}/edit/:id` : undefined,
            delete: !!item.can_delete,
          };
          // console.log(retr, "item");
          return retr;
        });

        // console.log('permissions', per);
        setPermissions(per);
      } catch (err) {
        console.error("Failed to fetch permissions", err);
      }
    };

    const role = localStorage.getItem("role");
    console.log(role)
    if (role) {
      fetchPermissions(role);
    }
  }, []);

  return permissions;
};
