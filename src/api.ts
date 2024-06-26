import { Story } from "./types";

/**
 * Загружает список ID топ-новостей с API Hacker News.
 * @returns {Promise<number[]>} Промис, который разрешается в массив ID новостей.
 */
export const fetchTopStories = async (): Promise<number[]> => {
  const response = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
  );
  return response.json();
};

/**
 * Загружает данные о новости по её ID с API Hacker News.
 * @param id ID новости.
 * @returns {Promise<Story>} Промис, который разрешается в объект новости.
 */
export const fetchStory = async (id: number): Promise<Story> => {const response = await fetch(
  `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
);
return response.json();
};