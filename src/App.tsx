import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/dashboard/Dashboard";
import { Header } from "./components/header";
import { CustomHeader } from "./components/sidebar/CustomHeader";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { usePriority } from "./hooks/usePriority";
import { CreateSelectCategory } from "./pages/bookingCategory";
import { CreateCategory, EditCategory, ListCategory } from "./pages/categories";
import { Login } from "./pages/login";
import {
  CreatePermission,
  EditPermission,
  ListPermission,
  ShowPermission,
} from "./pages/permissions";
import { CreateRole, EditRole, ListRole, ShowRole } from "./pages/Role";
import {
  CreateSubCategory,
  EditSubCategory,
  ListSubCategory,
} from "./pages/subCategories";
import { CreateUser, EditUser, ListUser } from "./pages/User";
import { ShowUser } from "./pages/User/ShowUser";
import {
  CreateVehicleCategory,
  EditVehicleCategory,
  ListVehicleCategory,
} from "./pages/vehicleCategories";
import { authProvider } from "./providers/authProvider";
import { dataProvider } from "./providers/dataProvider";

function App() {
  const responsibilityRes = usePriority();

  const res = [
    // {
    //   name: "booking",
    //   list: "/bookings",
    // },
    {
      name: "selectCategory",
      list: "/selectCategory",
      create: "/selectCategory/create",
    },
    {
      name: "categories",
      list: "/categories",
      create: "/categories/create",
      edit: "/categories/edit/:id",
    },
    {
      name: "sub_categories",
      list: "/sub_categories",
      create: "/sub_categories/create",
      edit: "/sub_categories/edit/:id",
    },
    {
      name: "vehicle_categories",
      list: "/vehicle_categories",
      create: "/vehicle_categories/create",
      edit: "/vehicle_categories/edit/:id",
    },
    ...responsibilityRes,
  ];

  // const resource = [
  //   // {
  //   //   name: "roles",
  //   //   list: "/roles",
  //   //   create: "/roles/create",
  //   //   edit: "/roles/edit/:id",
  //   //   show: "/roles/show/:id",
  //   // },
  //   // {
  //   //   name: "admin_users",
  //   //   list: "/admin_users",
  //   //   create: "/admin_users/create",
  //   //   edit: "/admin_users/edit/:id",
  //   //   show: "/admin_users/show/:id",
  //   // },
  //   // {
  //   //   name: "permissions",
  //   //   list: "/permissions",
  //   //   create: "/permissions/create",
  //   //   // edit: "/admin_users/edit/:id",
  //   //   show: "/permissions/show/:id",
  //   // },
  // ]

  const resourceNames = res.map((r) => r.name);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={res}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "CtLd0w-wFOQtg-i5fFy7",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={Header} Title={CustomHeader}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route path="/" element={<Dashboard />} />
                    {/* <Route path="/bookings">
                    <Route index element={<BookingForm />} />
                    </Route> */}
                    <Route path="/selectCategory">
                      <Route index element={<CreateSelectCategory />} />
                    </Route>

                    <Route path="/roles">
                      <Route index element={<ListRole />} />
                      <Route path="create" element={<CreateRole />} />
                      <Route path="edit/:id" element={<EditRole />} />
                      <Route path="show/:id" element={<ShowRole />} />
                    </Route>

                    <Route path="/admin_users">
                      <Route index element={<ListUser />} />
                      <Route path="create" element={<CreateUser />} />
                      <Route path="edit/:id" element={<EditUser />} />
                      <Route path="show/:id" element={<ShowUser />} />
                    </Route>

                    <Route path="/permissions">
                      <Route index element={<ListPermission />} />
                      <Route
                        path="create"
                        element={
                          <CreatePermission resourceNames={resourceNames} />
                        }
                      />
                      <Route
                        path="edit/:id"
                        element={
                          <EditPermission resourceNames={resourceNames} />
                        }
                      />
                      <Route path="show/:id" element={<ShowPermission />} />
                    </Route>

                    <Route path="/categories">
                      <Route index element={<ListCategory />} />
                      <Route path="create" element={<CreateCategory />} />
                      <Route path="edit/:id" element={<EditCategory />} />
                    </Route>

                    <Route path="/sub_categories">
                      <Route index element={<ListSubCategory />} />
                      <Route path="create" element={<CreateSubCategory />} />
                      <Route path="edit/:id" element={<EditSubCategory />} />
                    </Route>

                    <Route path="/vehicle_Categories">
                      <Route index element={<ListVehicleCategory />} />
                      <Route
                        path="create"
                        element={<CreateVehicleCategory />}
                      />
                      <Route
                        path="edit/:id"
                        element={<EditVehicleCategory />}
                      />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>

                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
