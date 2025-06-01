import React from "react";
import { useCreate } from "@refinedev/core";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const TodoCreate: React.FC = () => {
    const { mutate, isLoading } = useCreate();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        mutate(
            {
                resource: "todos",
                values,
            },
            {
                onSuccess: () => {
                    message.success("创建成功！");
                    navigate("/todos");
                },
                onError: () => {
                    message.error("创建失败！");
                },
            }
        );
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: "0 auto", marginTop: 32 }}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: "请输入标题" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item label="描述" name="description">
                <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading} block>
                    创建
                </Button>
            </Form.Item>
        </Form>
    );
};

export default TodoCreate;
