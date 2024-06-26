import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import NewsDetailPage from "./components/NewsDetailPage";

/**
 * Корневой компонент приложения.
 * Настраивает маршрутизацию и отображает соответствующие страницы.
 * @returns {JSX.Element} JSX-элемент приложения.
 */
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news/:page" element={<NewsPage />} />
        <Route path="/news/details/:id" element={<NewsDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;