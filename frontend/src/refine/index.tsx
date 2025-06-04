import { Refine } from "@refinedev/core";
import { notificationProvider, RefineThemes } from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";

export const RefineRoot = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          dataProvider={dataProvider}
          notificationProvider={notificationProvider}
          authProvider={authProvider}
          resources={[
            {
              name: "todos",
              list: "/todos",
              create: "/todos/create",
              edit: "/todos/edit/:id",
              show: "/todos/show/:id",
            },
          ]}
        />
      </ConfigProvider>
    </BrowserRouter>
  );
};
