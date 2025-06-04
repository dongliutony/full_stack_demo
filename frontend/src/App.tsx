import React from "react";
import { Refine, Authenticated } from "@refinedev/core";
import { RefineThemes, ThemedLayoutV2} from "@refinedev/antd";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { CheckCircleOutlined, CheckSquareOutlined } from "@ant-design/icons";
import "@refinedev/antd/dist/reset.css";

import { authProvider } from "./refine/authProvider";
import TodoList from "./pages/todos/list";
import TodoCreate from "./pages/todos/create";
import TodoEdit from "./pages/todos/edit";
import TodoShow from "./pages/todos/show";
import GraphTodoList from "./pages/graph_todos/list";
import GraphTodoCreate from "./pages/graph_todos/create";
import GraphTodoEdit from "./pages/graph_todos/edit";
import GraphTodoShow from "./pages/graph_todos/show";
import Login from "./pages/login";
import * as providers from "./refine/dataProvider";
import { CustomSider } from "./pages/menu/customSider";
// import { dataProvider } from "./refine/dataProvider";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue}>
                <Refine 
                // dataProvider={dataProvider}
                resources = {[
                    {
                        name: "todos",
                        list: "/todos",
                        create: "/todos/create",
                        edit: "/todos/edit/:id",
                        show: "/todos/show/:id",
                        options: {
                            label: "Todos",
                            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
                        },
                        meta: {
                            dataProviderName: "default"
                        }
                    },
                    {
                        name: "graph_todos",
                        list: "/graph_todos",
                        create: "/graph_todos/create",
                        edit: "/graph_todos/edit/:id",
                        show: "/graph_todos/show/:id",
                        options: {
                            label: "Graphql Todos",
                            icon: <CheckSquareOutlined style={{ color: "#52c41a" }} />,
                        },
                        meta: {
                            dataProviderName: "graphql"
                        }
                    },
                ]}
                dataProvider={{
                    default: providers.dataProvider,
                    graphql: providers.dataProviderGraphql
                }}
                authProvider={authProvider}
                >
                <ThemedLayoutV2
                    Title={({ collapsed }) => (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <CheckCircleOutlined style={{ fontSize: 32, color: "#1890ff", marginRight: 15 }} />
                                {!collapsed && <span style={{ fontWeight: 700, fontSize: 20 }}>我的待办</span>}
                            </div>
                        )}
                    Sider={CustomSider}
                    >
                        <Routes>
                            <Route path="/" element={<div>Hello World!</div>} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/todos" element={
                                <Authenticated key="todos-auth" fallback={<Login />}>
                                    <TodoList />
                                </Authenticated>
                            } />
                            <Route path="/todos/create" element={<TodoCreate />} />
                            <Route path="/todos/edit/:id" element={<TodoEdit />} />
                            <Route path="/todos/show/:id" element={<TodoShow />} />
                            <Route path="/graph_todos" element={<GraphTodoList />} />
                            <Route path="/graph_todos/create" element={<GraphTodoCreate />} />
                            <Route path="/graph_todos/edit/:id" element={<GraphTodoEdit />} />
                            <Route path="/graph_todos/show/:id" element={<GraphTodoShow />} />
                        </Routes>
                    </ThemedLayoutV2>
                </Refine>
            </ConfigProvider>
        </BrowserRouter>

    )
}

export default App;