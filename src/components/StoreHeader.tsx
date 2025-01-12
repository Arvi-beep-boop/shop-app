import { Flex, Layout } from "antd";

export function StoreHeader({ children }) {
  return (
    <Layout.Header
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#ffffff",
        height: 80,
        zIndex: 10,
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        rootClassName="padding-normal"
        gap={20}
      >
        {children}
      </Flex>
    </Layout.Header>
  );
}
