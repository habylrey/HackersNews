import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewsList from "../components/NewsList";
import { Story } from "../types";
import { fetchTopStories, fetchStory } from "../api";
import classes from "./NewsPage.module.css";
import SortOptions, { SortType } from "../components/SortOption";

const ITEMS_PER_PAGE = 30;
const AUTO_REFRESH_INTERVAL = 30000;

/**
 * Компонент страницы со списком новостей.
 * Загружает список топ-новостей, обрабатывает пагинацию, сортировку и автообновление.
 * @returns {JSX.Element} JSX-элемент страницы со списком новостей.
 */
const NewsPage: React.FC = () => {
  const { page } = useParams<{ page: string }>();
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortType, setSortType] = useState<SortType>("top");
  const intervalRef = useRef<number | null>(null);
  const [timer, setTimer] = useState(AUTO_REFRESH_INTERVAL / 1000);

  const pageNumber = parseInt(page || "1", 10);
  const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  /**
   * Загружает список топ-новостей с учетом пагинации.
   */
  const fetchStories = async () => {
    setLoading(true);
    setError(null);
    try {
      const topStories = await fetchTopStories();
      const limitedStories = topStories.slice(startIndex, endIndex);
      const fetchedStories = await Promise.all(
        limitedStories.map((id) => fetchStory(id))
      );
      const filteredStories = fetchedStories.filter(
        (story) => story && story.title
      );
      setStories(filteredStories);
    } catch (err) {
      setError("Ошибка при загрузке данных");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Запускает таймер автообновления списка новостей.
   */
  const startAutoRefresh = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      fetchStories();
      setTimer(AUTO_REFRESH_INTERVAL / 1000);
    }, AUTO_REFRESH_INTERVAL);

    setTimer(AUTO_REFRESH_INTERVAL / 1000);
  };

  /**
   * Обработчик клика по кнопке "Обновить вручную".
   * Загружает список новостей и перезапускает таймер автообновления.
   */
  const handleManualRefresh = () => {
    fetchStories();
    startAutoRefresh();
  };

  /**
   * Хук эффекта для загрузки списка новостей, запуска таймера автообновления и обработки размонтирования компонента.
   */
  useEffect(() => {
    fetchStories();
    startAutoRefresh();

    const countdown = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(countdown);
    };
  }, [pageNumber]);

  /**
   * Переход на следующую страницу списка новостей.
   */
  const handleNextPage = () => navigate(`/news/${pageNumber + 1}`);

  /**
   * Переход на предыдущую страницу списка новостей.
   */
  const handlePrevPage = () => {
    if (pageNumber > 1) navigate(`/news/${pageNumber - 1}`);
  };

  /**
   * Обработчик изменения типа сортировки списка новостей.
   * @param sort Новый тип сортировки.
   */
  const handleSortChange = (sort: SortType) => {
    setSortType(sort);};

    /**
     * Сортирует список новостей в соответствии с выбранным типом сортировки.
     * @param stories Список новостей.
     * @param sortType Тип сортировки.
     * @returns {Story[]} Отсортированный список новостей.
     */
    const sortStories = (stories: Story[], sortType: SortType) => {
      switch (sortType) {
        case "top":
          return stories;
        case "best":
          return stories.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        case "new":
          return stories.sort((a, b) => b.time - a.time);
        default:
          return stories;
      }
    };
  
    return (
      <div className={classes.news_page__container}>
        <h1>Топ Новости Hacker News</h1>
        <SortOptions selected={sortType} onChange={handleSortChange} />
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <p className={classes.error_message}>{error}</p>
        ) : (
          <>
            <NewsList stories={sortStories(stories, sortType)} />
            <p>Обновление через: {timer} секунд</p>
            <button className={classes.reload_button} onClick={handleManualRefresh}>
              Обновить вручную
            </button>
            <div className={classes.pagination_buttons}>
              <button onClick={handlePrevPage} disabled={pageNumber === 1}>
                Предыдущая страница
              </button>
              <button onClick={handleNextPage}>Следующая страница</button>
            </div>
          </>
        )}
      </div>
    );
  };
  
  export default NewsPage;