import React from "react";
import classes from "./SortOption.module.css";

/**
 * Тип сортировки списка новостей.
 */
export type SortType = "top" | "best" | "new";

/**
 * Пропсы компонента `SortOptions`.
 */
interface SortOptionsProps {
  /** Текущий тип сортировки. */
  selected: SortType;
  /** Обработчик изменения типа сортировки. */
  onChange: (sort: SortType) => void;
}

/**
 * Компонент выбора типа сортировки списка новостей.
 * @param selected Текущий тип сортировки.
 * @param onChange Обработчик изменения типа сортировки.
 * @returns {JSX.Element} JSX-элемент выбора типа сортировки.
 */
const SortOptions: React.FC<SortOptionsProps> = ({ selected, onChange }) => {
  /**
   * Обработчик изменения значения выпадающего списка.
   * Вызывает переданный обработчик `onChange` с новым типом сортировки.
   * @param event Объект события изменения.
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as SortType);
  };

  return (
    <div className={classes.sort_options}>
      <label htmlFor="sort">Сортировать по: </label>
      <select id="sort" value={selected} onChange={handleChange}>
        <option value="top">Топ</option>
        <option value="best">Лучшие</option>
        <option value="new">По дате</option>
      </select>
    </div>
  );
};

export default SortOptions;