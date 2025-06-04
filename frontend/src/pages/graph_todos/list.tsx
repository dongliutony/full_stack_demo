import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useList, useCreate, useUpdate } from "@refinedev/core";
import { List, Button, Modal, Form, Input, message, DatePicker } from "antd";
import dayjs from "dayjs";

const GraphTodoList: React.FC = () => {
    const { data, isLoading, refetch } = useList({ resource: "graph_todos" });
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { mutate: createTodo, isLoading: isCreating } = useCreate();
    const { mutate: updateTodo } = useUpdate();
    const navigate = useNavigate();

    const handleCreate = (values: any) => {
        const payload = {
            ...values,
            user_id: 4,
            due_date: values.due_date ? values.due_date.toISOString() : undefined,
        };
        createTodo(
            { resource: "graph_todos", values: payload },
            {
                onSuccess: () => {
                    message.success("Task added");
                    setModalVisible(false);
                    form.resetFields();
                    refetch();
                },
                onError: () => message.error("Failed to add task"),
            }
        );
    };

    const handleComplete = (item: any) => {
        updateTodo(
            { resource: "graph_todos", id: item.id, values: { isCompleted: true } },
            {
                onSuccess: () => {
                    message.success("Task completed");
                    refetch();
                },
                onError: () => message.error("Failed to complete task"),
            }
        );
    };

    const handleReopen = (item: any) => {
        updateTodo(
            { resource: "graph_todos", id: item.id, values: { isCompleted: false } },
            {
                onSuccess: () => {
                    message.success("Task reopened");
                    refetch();
                },
                onError: () => message.error("Failed to reopen task"),
            }
        );
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
                <Button type="primary" onClick={() => setModalVisible(true)}>
                    Add Task
                </Button>
            </div>
            <List
                loading={isLoading}
                header={<div>GraphQL Todo List</div>}
                bordered
                dataSource={data?.data || []}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                onClick={() => navigate(`/graph_todos/show/${item.id}`)}
                                key="detail"
                            >
                                Detail
                            </Button>,
                            !item.isCompleted && (
                                <Button
                                    type="link"
                                    onClick={() => handleComplete(item)}
                                    key="complete"
                                >
                                    Complete
                                </Button>
                            ),
                            item.isCompleted && (
                                <Button
                                    type="link"
                                    onClick={() => handleReopen(item)}
                                    key="reopen"
                                >
                                    Reopen
                                </Button>
                            ),
                        ]}
                    >
                        <div>
                            <strong>{item.title}</strong>
                            <div>{item.description}</div>
                        </div>
                    </List.Item>
                )}
            />
            <Modal
                title="New Task"
                open={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleCreate}>
                    <Form.Item
                        label="Task"
                        name="title"
                        rules={[{ required: true, message: "give me a title" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item label="Due Date" name="due_date">
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={isCreating} block>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default GraphTodoList; 