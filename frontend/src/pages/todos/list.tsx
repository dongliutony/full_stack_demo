import React from "react";
import { useList } from "@refinedev/core";
import { List, Table } from "antd";

export const TodoList: React.FC = () => {
    const { data, isLoading } = useList({ resource: "todos" });

    return (
        <List
            loading={isLoading}
            header={<div>我的待办</div>}
            bordered
            dataSource={data?.data || []}
            renderItem={(item: any) => (
                <List.Item>
                    <div>
                        <strong>{item.title}</strong>
                        <div>{item.description}</div>
                    </div>
                </List.Item>
            )}
        />
    );
};

export default TodoList;
