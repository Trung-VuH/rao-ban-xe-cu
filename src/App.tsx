import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="hang-xe/:brand" element={<CategoryPage type="brand" />} />
          <Route path="phan-khuc/:bodyStyle" element={<CategoryPage type="bodyStyle" />} />
          <Route path="tinh-thanh/:location" element={<CategoryPage type="location" />} />
          <Route path="dong-xe/:brand/:model" element={<CategoryPage type="model" />} />
          <Route path="doi-xe/:brand/:model/:year" element={<CategoryPage type="year" />} />
          <Route path="tinh-trang/:condition" element={<CategoryPage type="condition" />} />
          <Route path="tag/:tag" element={<CategoryPage type="tag" />} />
          <Route path="xe/:id" element={<DetailPage />} />
          <Route path="tim-kiem" element={<SearchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
