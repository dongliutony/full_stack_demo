import React from "react";
import { useOne } from "@refinedev/core";
import { Card, Spin, Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";

const TodoShow: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading } = useOne({ resource: "todos", id: id as string });
    const navigate = useNavigate();

    if (isLoading) {
        return <Spin style={{ display: "block", margin: "40px auto" }} />;
    }

    if (!data?.data) {
        return <div style={{ textAlign: "center", marginTop: 40 }}>Task not found</div>;
    }

    return (
        <div style={{ maxWidth: 500, margin: "40px auto" }}>
            <Button onClick={() => navigate("/todos")} style={{ marginBottom: 16 }}>
                Back
            </Button>
            <Card
                title={data.data.title}
                bordered={false}
            >
                <div><strong>Description:</strong></div>
                <div style={{ whiteSpace: "pre-wrap" }}>{data.data.description || "None"}</div>
                <div style={{ marginTop: 16 }}>
                    <strong>Due Date:</strong> {data.data.due_date ? new Date(data.data.due_date).toLocaleString() : "None"}
                </div>
                <div style={{ marginTop: 16 }}>
                    <strong>Completed:</strong> {data.data.is_completed ? "Yes" : "No"}
                </div>
            </Card>
        </div>
    );
};

export default TodoShow;
