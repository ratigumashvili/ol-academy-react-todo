import {
  HiChevronDown,
  HiChevronUp,
  HiOutlinePencilAlt,
  HiOutlineTrash,
} from "react-icons/hi";

const TodoItem = ({
  item,
  handleDeleteItem,
  handleMarkItem,
  MOVEMENTS,
  handleMoveItem,
  handleOpenEditMenu,
}) => {
  const { id, title, isComplete } = item;
  return (
    <li className="todo-list-item__item">
      <div className="list-item">
        <input
          type="checkbox"
          onClick={() => handleMarkItem(id, "isChecked")}
        />
        <span
          className={`${isComplete === true && "mark"}`}
          onClick={() => handleMarkItem(id, "isComplete")}
        >
          {title}
        </span>
        <div className="list-item__controls">
          <button onClick={() => handleDeleteItem(id)}>
            <HiOutlineTrash size={18} />
          </button>
          <button onClick={() => handleOpenEditMenu(item)} title="Edit">
            <HiOutlinePencilAlt size={18} />
          </button>
          <button
            className="test"
            onClick={() => handleMoveItem(id, MOVEMENTS.UP)}
            title="Move up"
          >
            <HiChevronUp size={18} />
          </button>
          <button
            className="test"
            onClick={() => handleMoveItem(id, MOVEMENTS.DOWN)}
            title="Move down"
          >
            <HiChevronDown size={18} />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
