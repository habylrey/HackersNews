import React from "react";
import { Link } from "react-router-dom";
import { NewsItemProps } from "../types";
import classes from "./NewsItem.module.css";

/**
 * Форматирует временную метку в удобочитаемую дату и время.
 * @param timestamp Временная метка в секундах.
 * @returns {string} Отформатированная дата и время.
 */
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

/**
 * Компонент элемента списка новостей.
 * Отображает информацию о новости и ссылку для перехода к подробной информации.
 * @param story Объект новости.
 * @param rank Позиция новости в списке.
 * @returns {JSX.Element} JSX-элемент элемента списка новостей.
 */
const NewsItem: React.FC<NewsItemProps> = ({ story, rank }) => {
  return (
    <li className={classes.news_item}>
      <Link to={`/news/details/${story.id}`}>
        <h2>
          {rank && <span className={classes.news_rank}>{rank}. </span>}
          {story.title}
        </h2>
      </Link>
      <p>
        Автор: {story.by}, Дата: {formatDate(story.time)}
      </p>
      {story.url && (
        <a href={story.url} target="_blank" rel="noopener noreferrer">
          Перейти к источнику
        </a>
      )}
    </li>
  );
};

export default NewsItem;