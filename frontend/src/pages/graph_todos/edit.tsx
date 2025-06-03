import React, { useEffect } from "react";
import { useUpdate, useOne } from "@refinedev/core";
import { Form, Input, Button, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const GraphTodoEdit: React.FC = () => {
    const { id } = useParams();
    const { data, isLoading: loading } = useOne({ resource: "graph_todos", id: id as string });
    const { mutate, isLoading } = useUpdate();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.data) {
            form.setFieldsValue({
                title: data.data.title,
                description: data.data.description,
            });
        }
    }, [data, form]);

    const onFinish = (values: any) => {
        mutate(
            {
                resource: "graph_todos",
                id,
                values,
            },
            {
                onSuccess: () => {
                    message.success("修改成功！");
                    navigate("/graph_todos");
                },
                onError: () => {
                    message.error("修改失败！");
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
            initialValues={{ title: "", description: "" }}
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
                <Button type="primary" htmlType="submit" loading={isLoading || loading} block>
                    保存
                </Button>
            </Form.Item>
        </Form>
    );
};

export default GraphTodoEdit; 