import React from "react";
import NewsItem from "./NewsItem";
import { NewsListProps } from "../types";
import classes from "./NewsList.module.css";

/**
 * Компонент списка новостей.
 * Отображает список новостей, используя компонент `NewsItem` для каждого элемента.
 * @param stories Массив объектов новостей.
 * @returns {JSX.Element} JSX-элемент списка новостей.
 */
const NewsList: React.FC<NewsListProps> = ({ stories }) => {
  return (
    <ul className={classes.news_list}>
      {stories.map((story, index) => (
        <NewsItem key={story.id} story={story} rank={index + 1} />))}
        </ul>
      );
    };
    
    export default NewsList;