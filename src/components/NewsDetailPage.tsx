import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchStory } from "../api";
import { Story } from "../types";
import classes from "./NewsDetailPage.module.css";

/**
 * Компонент страницы с подробной информацией о новости.
 * Загружает данные о новости и её комментариях, отображает их на странице.
 * @returns {JSX.Element} JSX-элемент страницы с новостью.
 */
const NewsDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [story, setStory] = useState<Story | null>(null);
  const [comments, setComments] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);

  /**
   * Хук эффекта для загрузки данных о новости и её комментариях при монтировании компонента.
   */
  useEffect(() => {
    const fetchStoryDetails = async () => {
      try {
        const fetchedStory = await fetchStory(Number(id));
        setStory(fetchedStory);

        if (fetchedStory.kids) {
          const fetchedComments = await Promise.all(
            fetchedStory.kids.map((commentId) => fetchStory(commentId))
          );
          setComments(fetchedComments);
        }
      } catch (err) {
        setError("Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetails();
  }, [id]);

  /**
   * Обработчик клика по кнопке "Показать/Скрыть комментарии".
   * Изменяет состояние `showComments` на противоположное.
   */
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  /**
   * Функция для рендеринга списка комментариев.
   * @param comments Массив комментариев.
   * @returns {JSX.Element[]} Массив JSX-элементов, представляющих комментарии.
   */
  const renderComments = (comments: Story[]) => {
    return comments.map((comment) => (
      <div key={comment.id} className={classes.comment}>
        <p className={classes.comment_author}>{comment.by}:</p>
        {comment.text &&<p dangerouslySetInnerHTML={{ __html: comment.text }} />}
      </div>
    ));
  };

  if (loading) {
    return <div className={classes.loading}>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!story) {
    return <div>Новость не найдена</div>;
  }

  /**
   * Форматирует временную метку в удобочитаемую дату и время.
   * @param timestamp Временная метка в секундах.
   * @returns {string} Отформатированная дата и время.
   */
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className={classes.news_detail_page}>
      <button onClick={() => navigate(-1)}>Назад</button>
      <h2>{story.title}</h2>
      <p>
        Автор: {story.by}, Дата: {formatDate(story.time)}
      </p>
      {story.url && (
        <a href={story.url} target="_blank" rel="noopener noreferrer">
          Перейти к источнику
        </a>
      )}
      <button onClick={toggleComments}>
        {showComments ? "Скрыть комментарии" : "Показать комментарии"}
      </button>
      {showComments && (
        <div className={classes.comments}>
          <h3>Комментарии:</h3>
          {comments.length > 0 ? (
            renderComments(comments)
          ) : (
            <p>Нет комментариев к этой новости.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsDetailPage;