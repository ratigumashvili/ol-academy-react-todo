import React from "react";
import AddTodoForm from "./AddTodoForm";
import TodoItem from "../components/TodoItem";
import Header from "../components/Header";
import ErrorNotification from "../components/ErrorNotification";
import Edit from "./Edit";

const MOVEMENTS = {
  UP: -1,
  DOWN: 1,
};

class TodosComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: "",
      todos: [],
      showEditMenu: false,
      editTitle: "",
      errorMsg: "",
      grabedId: "",
      showControls: true,
      btnDisabled: false,
    };
  }

  render() {
    const {
      todos,
      todo,
      showEditMenu,
      editTitle,
      errorMsg,
      showControls,
      grabedId,
    } = this.state;

    const checkTitle = (newTitle) =>
      todos?.some((existingTitles) => existingTitles.title === newTitle);

    const handleChangeInput = (e) => {
      this.setState({ todo: e.target.value });
    };

    const handleEditTitleChange = (e) => {
      this.setState({ editTitle: e.target.value });
    };
    const addTodo = (e) => {
      e.preventDefault();
      const newTodo = {
        id: Date.now(),
        title: todo.trim(),
        isComplete: false,
      };

      if (checkTitle(newTodo.title)) {
        this.setState({
          errorMsg: "Item with such title already registered",
        });
        return;
      }
      if (todo.length === 0) {
        this.setState({
          errorMsg: "Input field must not be empty",
        });
        return;
      }
      this.setState({
        todos: [...todos, newTodo],
        todo: "",
        errorMsg: "",
      });
    };

    const handleDelete = (id) => {
      this.setState({
        todos: todos.filter((item) => item.id !== id),
        showEditMenu: false,
      });
    };

    const handleComplete = (id) => {
      const updatedList = todos.map((item) => {
        if (item.id === id) {
          item.isComplete = !item.isComplete;
        }
        return item;
      });
      this.setState({ todos: updatedList });
    };

    const handleOpenEditMenu = (item) => {
      this.setState({
        showEditMenu: true,
        editTitle: item.title,
        grabedId: item.id,
        showControls: false,
      });
    };

    const handleSaveEdited = () => {
      const isDuplicate = checkTitle(editTitle);

      const updatedObj = todos.map((item) => {
        if (item.id === grabedId && editTitle.length !== 0 && !isDuplicate) {
          item.title = editTitle;
        }
        return item;
      });
      if (isDuplicate) {
        this.setState({
          errorMsg: "Item with such title already registered",
        });
        return;
      }
      this.setState({
        todos: updatedObj,
        showEditMenu: false,
        editTitle: "",
        errorMsg: "",
        todo: "",
        showControls: true,
      });
    };

    const handleMove = (id, direction) => {
      const position = todos.findIndex((i) => i.id === id);

      if (
        (direction === MOVEMENTS.UP && position === 0) ||
        (direction === MOVEMENTS.DOWN && position === todos.length - 1)
      ) {
        return;
      }

      const item = todos[position];
      const reordered = todos.filter((i) => i.id !== id);
      reordered.splice(position + direction, 0, item);

      this.setState({ todos: reordered });
    };

    const deleteAll = () => {
      this.setState({ todos: [] });
    };

    const deleteComplete = () => {
      this.setState({ todos: todos.filter((item) => !item.isComplete) });
    };

    return (
      <>
        <Header
          title="Todos"
          deleteAll={deleteAll}
          deleteComplete={deleteComplete}
          todos={todos}
        />
        {errorMsg !== "" && <ErrorNotification errorMsg={errorMsg} />}
        <AddTodoForm
          addTodo={addTodo}
          todo={todo}
          handleChangeInput={handleChangeInput}
        />
        <ul className="todo-list">
          {todos.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              handleOpenEditMenu={handleOpenEditMenu}
              handleMove={handleMove}
              MOVEMENTS={MOVEMENTS}
              showControls={showControls}
            />
          ))}
        </ul>
        {showEditMenu && (
          <Edit
            editTitle={editTitle}
            handleSaveEdited={handleSaveEdited}
            handleEditTitleChange={handleEditTitleChange}
          />
        )}
      </>
    );
  }
}

export default TodosComponent;
