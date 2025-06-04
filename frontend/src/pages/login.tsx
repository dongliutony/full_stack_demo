import { useLogin, useNavigation } from "@refinedev/core";
import { Form, Input, Button, Card } from "antd";

export default function Login() {
    const navigation = useNavigation();
    const { mutate: login, isLoading } = useLogin();

    const onFinish = (values: any) => {
        login(
            { username: values.email, password: values.password },
            {
                onSuccess: () => {
                    navigation.push("/todos");
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