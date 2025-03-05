import { FormProvider, useForm } from "react-hook-form";
import { Flex, Layout, Typography } from "antd";
import { ButtonAnt, InputField } from "../components";
import { useUserLogin } from "../hooks/useUserLogin";

const layoutStyle = {
  borderRadius: 8,
  maxWidth: "500px",
  height: "400px",
  backgroundColor: "#e6eaed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
};

export const Login = () => {
  const methods = useForm();
  const { mutate } = useUserLogin();

  const { getValues, handleSubmit } = methods;

  const handleClick = () => {
    const { username, password } = getValues();
    mutate({
      data: {
        username,
        password,
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <Flex
        justify="center"
        align="center"
        style={{
          height: "100vh",
        }}
      >
        <Layout style={layoutStyle}>
          <Typography.Title level={2}>Login</Typography.Title>
          <Flex vertical gap={10}>
            <InputField name="username" label="Enter Username" />
            <InputField
              name="password"
              label="Enter Password"
              type="password"
            />
          </Flex>
          <ButtonAnt title="Submit" onClick={handleSubmit(handleClick)} />
        </Layout>
      </Flex>
    </FormProvider>
  );
};
