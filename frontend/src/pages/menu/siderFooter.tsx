import { useGetIdentity, useLogout } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";
import {
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export const CustomSiderFooter = () => {
  const { data: identity, isLoading } = useGetIdentity();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  if (isLoading) return null;

  return (
    <Menu
      style={{ borderTop: "1px solid #f0f0f0" }}
      selectable={false}
      items={[
        identity
          ? {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout1",
              onClick: () => {
                console.log("logout");
                logout();
              }
            }
          : {
              key: "login",
              icon: <LoginOutlined />,
              label: "Login2",
              onClick: () => {
                console.log("login");
                navigate("/login");
              }
            },
      ]}
    />
  );
};
