import { ThemedSiderV2 } from "@refinedev/antd";
import { useGetIdentity, useLogout, useMenu } from "@refinedev/core";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

export const CustomSider = (props: any) => {
    const { menuItems, selectedKey } = useMenu();
    const { data: identity } = useGetIdentity();
    const { mutate: logout } = useLogout();
    const navigate = useNavigate();

    console.log("[CustomSider] loaded");
    console.log("[CustomSider] identity:", identity);
    console.log("[CustomSider] menuItems:", menuItems);
    console.log("[CustomSider] selectedKey:", selectedKey);
    console.log("[CustomSider] props:", props);

    const mainMenu = menuItems.slice(0, -1);

    // Dynamic Login/Logout
    const footerMenu = [
        identity
            ? {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: "Logout",
                  onClick: () => logout(),
              }
            : {
                  key: "login",
                  icon: <LoginOutlined />,
                  label: "Login",
                  onClick: () => navigate("/login"),
              },
    ];

    const customMenuItems = [...mainMenu, ...footerMenu];

    return (
        <ThemedSiderV2 
        {...props}
        render={({ items, dashboard, collapsed }) => {
            // items 是 Refine 自动生成的菜单项
            // 你可以裁剪、插入自定义项
            const mainMenu = items;
            const footerMenu = [
                identity
                    ? {
                          key: "logout",
                          icon: <LogoutOutlined />,
                          label: "Logout",
                          onClick: () => {
                            logout(undefined, {
                                onSuccess: () => {
                                    navigate("/todos");
                                },
                            });
                          },
                      }
                    : {
                          key: "login",
                          icon: <LoginOutlined />,
                          label: "Login",
                          onClick: () => navigate("/login"),
                      },
            ];
            return (
                <>
                    {mainMenu}
                    {footerMenu.map((item) => (
                        <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
                            {item.label}
                        </Menu.Item>
                    ))}
                </>
            );
        }}
        />
    );
};