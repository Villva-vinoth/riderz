import { AuthPage } from "@refinedev/mui";
import { CustomLogo } from "./CustomLogo";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={<CustomLogo />}
      registerLink={false}
      forgotPasswordLink={false}
      formProps={{
        defaultValues: { UserName: "", password: "" },
      }}
    />
  );
};


