import React from "react";
import { useOne } from "@refinedev/core";
import { Card, Spin } from "antd";
import { useParams } from "react-router-dom";

const TodoShow: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading } = useOne({ resource: "todos", id: id as string });

    if (isLoading) {
        return <Spin style={{ display: "block", margin: "40px auto" }} />;
    }

    if (!data?.data) {
        return <div style={{ textAlign: "center", marginTop: 40 }}>未找到该待办事项</div>;
    }

    return (
        <Card
            title={data.data.title}
            bordered={false}
            style={{ maxWidth: 500, margin: "40px auto" }}
        >
            <div><strong>描述：</strong></div>
            <div style={{ whiteSpace: "pre-wrap" }}>{data.data.description || "无"}</div>
        </Card>
    );
};

export default TodoShow;
