import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useList, useCreate, useUpdate } from "@refinedev/core";
import { List, Table, Button, Modal, Form, Input, message, DatePicker } from "antd";
import dayjs from "dayjs";

console.log("TodoList loaded");

export const TodoList: React.FC = () => {
    const { data, isLoading, refetch } = useList({ resource: "todos" });
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const { mutate: createTodo, isLoading: isCreating } = useCreate();
    const { mutate: updateTodo } = useUpdate();
    const navigate = useNavigate();

    // add todo item
    const handleCreate = (values: any) => {
        const payload = {
            ...values,
            user_id: 1, // TODO: get user id from backend
            due_date: values.due_date ? values.due_date.toISOString() : undefined,
        };
        createTodo(
            { resource: "todos", values: payload },
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

    // complete todo item
    const handleComplete = (item: any) => {
        updateTodo(
            { resource: "todos", id: item.id, values: { is_completed: true } },
            {
                onSuccess: () => {
                    message.success("Task completed");
                    refetch();
                },
                onError: () => message.error("Failed to complete task"),
            }
        );
    };

    // reopen completed todo item
    const handleReopen = (item: any) => {
        updateTodo(
            { resource: "todos", id: item.id, values: { is_completed: false } },
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
                header={<div>My Todo List</div>}
                bordered
                dataSource={data?.data || []}
                renderItem={(item: any) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                onClick={() => navigate(`/todos/show/${item.id}`)}
                                key="detail"
                            >
                                Detail
                            </Button>,
                            !item.is_completed && (
                                <Button
                                    type="link"
                                    onClick={() => handleComplete(item)}
                                    key="complete"
                                >
                                    Complete
                                </Button>
                            ),
                            item.is_completed && (
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

export default TodoList;
