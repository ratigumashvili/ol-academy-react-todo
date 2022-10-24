import { useState } from "react";
import Header from "./Header";
import AddTodo from "./AddTodo";
import ErrorNotification from "./ErrorNotification";
import TodoItem from "./TodoItem";
import Edit from "./Edit";

const MOVEMENTS = {
  UP: -1,
  DOWN: 1,
};

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [grabedId, setGrabedId] = useState("");

  const checkTitle = (newTitle) =>
    todos?.some((existingTitles) => existingTitles.title === newTitle);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title: todoValue.trim(),
      isComplete: false,
      isChecked: false,
    };

    if (todoValue.length === 0) {
      setErrMsg("Input field must not be empty");
      return;
    }
    if (checkTitle(newTodo.title)) {
      setErrMsg("Item with such title already registered");
      return;
    }

    setTodos([...todos, newTodo]);
    setErrMsg("");
    setTodoValue("");
  };

  const handleMarkItem = (id, param) => {
    const updatedList = todos.map((item) => {
      if (item.id === id) {
        if (param === "isComplete") {
          item.isComplete = !item.isComplete;
        }
        if (param === "isChecked") {
          item.isChecked = !item.isChecked;
        }
      }
      return item;
    });
    setTodos(updatedList);
  };

  const handleDeleteItem = (currentId) => {
    setTodos(todos.filter((item) => currentId !== item.id));
    setErrMsg("");
    setShowEditMenu(false);
  };

  const handleMoveItem = (id, direction) => {
    const position = todos.findIndex((item) => item.id === id);

    if (
      (direction === MOVEMENTS.UP && position === 0) ||
      (direction === MOVEMENTS.DOWN && position === todos.length - 1)
    ) {
      return;
    }

    const item = todos[position];
    const reordered = todos.filter((item) => item.id !== id);
    reordered.splice(position + direction, 0, item);

    setTodos(reordered);
  };

  const handleOpenEditMenu = (item) => {
    setShowEditMenu(true);
    setEditTitle(item.title);
    setGrabedId(item.id);
  };

  const handleSaveEdited = () => {
    const isDuplicate = checkTitle(editTitle.trim());

    const updatedObj = todos.map((item) => {
      if (item.id === grabedId && editTitle.length !== 0 && !isDuplicate) {
        item.title = editTitle;
      }
      return item;
    });
    if (isDuplicate) {
      setErrMsg("Item with such title already registered");
      return;
    }
    setTodos(updatedObj);
    setShowEditMenu(false);
    setEditTitle("");
    setErrMsg("");
    setTodoValue("");
  };
  return (
    <div>
      <Header todos={todos} setTodos={setTodos} />
      {errMsg && <ErrorNotification errMsg={errMsg} />}
      <AddTodo
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodo={handleAddTodo}
      />
      <ul className="todo-list">
        {todos.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            handleDeleteItem={handleDeleteItem}
            handleMarkItem={handleMarkItem}
            MOVEMENTS={MOVEMENTS}
            handleMoveItem={handleMoveItem}
            handleOpenEditMenu={handleOpenEditMenu}
          />
        ))}
      </ul>
      {showEditMenu && (
        <Edit
          editTitle={editTitle}
          handleSaveEdited={handleSaveEdited}
          setEditTitle={setEditTitle}
        />
      )}
    </div>
  );
};

export default Todos;
