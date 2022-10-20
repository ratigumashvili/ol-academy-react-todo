import React from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiOutlinePencilAlt,
  HiOutlineTrash,
  HiPlusCircle,
  HiCheckCircle,
} from "react-icons/hi";

class TodoItem extends React.Component {
  render() {
    const {
      item,
      handleDelete,
      handleComplete,
      handleOpenEditMenu,
      handleMove,
      MOVEMENTS,
      showControls,
    } = this.props;

    return (
      <>
        <li className="todo-list-item__item">
          <div className="list-item">
            <label htmlFor={item.id}>
              {item.isComplete === true ? (
                <HiCheckCircle className="complete-icon" />
              ) : (
                <HiPlusCircle className="complete-icon" />
              )}
            </label>
            <input
              type="checkbox"
              id={item.id}
              onChange={() => handleComplete(item.id)}
              style={{ display: "none" }}
            />
            <span className={`${item.isComplete === true && "mark"}`}>
              {item.title}
            </span>
            {showControls && (
              <div className="list-item__controls">
                <button onClick={() => handleDelete(item.id)} title="Delete">
                  <HiOutlineTrash size={18} />
                </button>
                <button onClick={() => handleOpenEditMenu(item)} title="Edit">
                  <HiOutlinePencilAlt size={18} />
                </button>
                <button
                  onClick={(e) => handleMove(item.id, MOVEMENTS.UP, e)}
                  title="Move up"
                >
                  <HiChevronUp size={18} />
                </button>
                <button
                  onClick={(e) => handleMove(item.id, MOVEMENTS.DOWN, e)}
                  title="Move down"
                >
                  <HiChevronDown size={18} />
                </button>
              </div>
            )}
          </div>
        </li>
      </>
    );
  }
}

export default TodoItem;
