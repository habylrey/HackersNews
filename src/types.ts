/**
 * Интерфейс для объекта новости.
 */
export interface Story {
  /** Автор новости. */
  by: string;
  /** Количество ответов (комментариев) к новости. */
  descendants?: number;
  /** ID новости. */
  id: number;
  /** Массив ID ответов (комментариев) к новости. */
  kids?: number[];
  /** Рейтинг новости. */
  score?: number;
  /** Временная метка создания новости. */
  time: number;
  /** Заголовок новости. */
  title: string;
  /** Тип новости (story, comment, etc.). */
  type?: string;
  /** URL новости. */
  url?: string;
  /** Текст новости. */
  text?: string;

}

/**
 * Пропсы компонента `NewsList`.
 */
export interface NewsListProps {
  /** Массив объектов новостей. */
  stories: Story[];
}

/**
 * Пропсы компонента `NewsItem`.
 */
export interface NewsItemProps {
  /** Объект новости. */
  story: Story;
  /** Позиция новости в списке. */
  rank?: number;
}