import React from "react";
import { Refine } from "@refinedev/core";
import { RefineThemes, ThemedLayoutV2, ThemedTitleV2, Title } from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import TodoList from "./pages/todos/list";
import TodoCreate from "./pages/todos/create";
import TodoEdit from "./pages/todos/edit";
import TodoShow from "./pages/todos/show";

import "@refinedev/antd/dist/reset.css";
import { dataProvider } from "./refine/dataProvider";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine 
                dataProvider={dataProvider}
                resources = {[
                    {
                        name: "todos",
                        list: "/todos",
                        create: "/todos/create",
                        edit: "/todos/edit/:id",
                        show: "/todos/show/:id",
                    },
                ]}>
                    <ThemedLayoutV2
                    Title={({ collapsed }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <CheckCircleOutlined style={{ fontSize: 32, color: "#1890ff", marginRight: 15 }} />
                                {!collapsed && <span style={{ fontWeight: 700, fontSize: 20 }}>我的待办</span>}
                            </div>
                        )}
                    >
                        <Routes>
                            <Route path="/" element={<div>Hello World!</div>} />
                            <Route path="/todos" element={<TodoList />} />
                            <Route path="/todos/create" element={<TodoCreate />} />
                            <Route path="/todos/edit/:id" element={<TodoEdit />} />
                            <Route path="/todos/show/:id" element={<TodoShow />} />
                        </Routes>
                    </ThemedLayoutV2>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>

    )
}

export default App;