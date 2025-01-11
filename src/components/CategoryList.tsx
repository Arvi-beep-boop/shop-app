import { Button, List } from "antd";
import { Category } from "../types/Category";
import { storeApi } from "../api/api.slice";

interface CategoryListProps {
  onSelect: (id: number) => void;
}

export function CategoryList({ onSelect }: CategoryListProps) {
  const { data } = storeApi.useGetCategoriesQuery();

  return (
    <List
      header={<div>Categories</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Button onClick={() => onSelect(item.id)} type="text">
            {item.name}
          </Button>
        </List.Item>
      )}
    />
  );
}
