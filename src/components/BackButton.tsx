import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      size="large"
      onClick={() => {
        navigate(-1);
      }}
      icon={<LeftOutlined />}
    >
      Back
    </Button>
  );
}
