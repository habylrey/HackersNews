import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Home.module.css";

/**
 * Компонент главной страницы.
 * Отображает приветственное сообщение и кнопку для перехода к списку новостей.
 * @returns {JSX.Element} JSX-элемент главной страницы.
 */
const Home: React.FC = () => {
  const navigate = useNavigate();

  /**
   * Обработчик клика по кнопке "Посмотреть топ новости".
   * Перенаправляет пользователя на страницу со списком новостей.
   */
  const handleClick = () => {
    navigate("/news/1");
  };

  return (
    <div className={classes.home_container}>
      <h1>Добро пожаловать в Hacker News</h1>
      <button onClick={handleClick}>Посмотреть топ новости</button>
    </div>
  );
};

export default Home;