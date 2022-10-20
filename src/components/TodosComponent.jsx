import React from "react";
import Form from "../components/Form";
import TodoItem from "../components/TodoItem";
import Header from "../components/Header";
import ErrorNotification from "../components/ErrorNotification";

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

    const checkTitle = (newTitle) => {
      const isTitle = todos?.some((existingTitles) => {
        return existingTitles.title === newTitle;
      });
      return isTitle;
    };

    const up = -1;
    const down = 1;

    const handleChangeInput = (e) => {
      this.setState({ todo: e.target.value });
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
      } else if (todo.length === 0) {
        this.setState({
          errorMsg: "Input field must not be empty",
        });
      } else {
        this.setState({
          todos: [...todos, newTodo],
          todo: "",
          errorMsg: "",
        });
      }
    };

    const handleDelete = (id) => {
      const updatedList = [...todos].filter((item) => item.id !== id);
      this.setState({ todos: updatedList, showEditMenu: false });
    };

    const handleComplete = (id) => {
      const updatedList = [...todos].map((item) => {
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
      const isTitle = checkTitle(editTitle);

      const updatedObj = [...todos].map((item) => {
        if (item.id === grabedId && editTitle.length !== 0 && !isTitle) {
          item.title = editTitle;
        }
        return item;
      });
      if (isTitle) {
        this.setState({
          errorMsg: "Item with such title already registered",
        });
      } else {
        this.setState({
          todos: updatedObj,
          showEditMenu: false,
          editTitle: "",
          errorMsg: "",
          todo: "",
          showControls: true,
        });
      }
    };

    const handleMove = (id, direction) => {
      const position = todos.findIndex((i) => i.id === id);

      if (
        (direction === up && position === 0) ||
        (direction === down && position === todos.length - 1)
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
      const updatedList = [...todos].filter((item) => item.isComplete !== true);
      this.setState({ todos: updatedList });
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
        <Form
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
              up={up}
              down={down}
              showControls={showControls}
            />
          ))}
        </ul>
        {showEditMenu && (
          <div className="edit-menu">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => this.setState({ editTitle: e.target.value })}
            />
            <button onClick={handleSaveEdited}>Save</button>
          </div>
        )}
      </>
    );
  }
}

export default TodosComponent;
