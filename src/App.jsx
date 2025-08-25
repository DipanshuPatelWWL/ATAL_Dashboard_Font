import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Home from "./page/Home";
import FAQ from "./page/faq/FAQ";
import Products from "./page/product/Products";
import Category from "./page/category/Category";
import Review from "./page/review/Review";
import Service from "./page/service/Service";
import Subcategory from "./page/subcategory/Subcategory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Home/>} />
        <Route path="/admin/faq" element={<FAQ />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/sub-category" element={<Subcategory />} />
        <Route path="/admin/product" element={<Products />} />
        <Route path="/admin/review" element={<Review/> } />
        <Route path="/admin/service" element={<Service/> } />
      </Route>
    </Routes>
  );
}

export default App;

