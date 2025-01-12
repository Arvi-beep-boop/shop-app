import { Route, Routes } from "react-router";
import { ProductListPage } from "./components/ProductListPage";
import { ShoppingCartPage } from "./components/ShoppingCartPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductListPage />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
    </Routes>
  );
}
