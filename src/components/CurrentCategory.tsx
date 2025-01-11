import { Typography } from "antd";
import { storeApi } from "../api/api.slice";

interface CurrentCategoryProps {
  categoryId: number | undefined;
}

export function CurrentCategory({ categoryId } : CurrentCategoryProps) {
  const { data } = storeApi.useGetCategoriesQuery();
  const categoryName = data?.find(({ id }) => {
    return id === categoryId;
  })?.name;
  return <Typography.Title className="padding-normal">{categoryName || 'All products'}</Typography.Title>;
}
