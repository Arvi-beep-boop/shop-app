import { Steps } from "antd";

export function OrderSteps({currentStep}) {
  return (
    <Steps
      current={currentStep}
      items={[
        {
          title: "Cart",
        },
        {
          title: "Shipping and payment",
        },
        {
          title: "Summary",
        },
      ]}
    />
  );
}
