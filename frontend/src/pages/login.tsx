import { useLogin, useNavigation, useGetIdentity } from "@refinedev/core";
import { useEffect } from "react";
import { Form, Input, Button, Card } from "antd";

export default function Login() {
    const navigation = useNavigation();
    const { mutate: login, isLoading } = useLogin();
    const { data: identity } = useGetIdentity();

    useEffect(() => {
        if (identity) {
            navigation.push("/todos");
        }
    }, [identity, navigation]);

    const onFinish = (values: any) => {
        login(
            { username: values.email, password: values.password },
            {
                onSuccess: () => {
                    window.location.href = "/todos";
                },
            }
        );
    };

    return (
        <Card title="Login" style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" loading={isLoading} type="primary" block>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}