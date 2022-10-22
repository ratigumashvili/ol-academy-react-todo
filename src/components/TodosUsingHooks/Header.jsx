const Header = ({ todos, setTodos }) => {
  const checked = todos.filter((item) => item.isChecked);
  const completed = todos.filter((item) => item.isComplete);

  const deleteAll = () => {
    setTodos([]);
  };

  const deleteMarkedItems = (param) => {
    const updatedList = todos.filter((item) => {
      if (param === "deleteComplete") {
        return !item.isComplete;
      }
      if (param === "deleteChecked") {
        return !item.isChecked;
      }
      return item;
    });
    setTodos(updatedList);
  };
  return (
    <div className="header">
      <h1>Todo App</h1>
      <div className="header-controls">
        <button
          disabled={!todos.length}
          onClick={deleteAll}
          title="Delete all items"
        >
          Delete All
        </button>
        <button
          disabled={!completed.length}
          onClick={() => deleteMarkedItems("deleteComplete")}
          title="Delete completed items"
        >
          Delete Completed
        </button>
        <button
          disabled={!checked.length}
          onClick={() => deleteMarkedItems("deleteChecked")}
          title="Delete checked items"
        >
          Delete checked
        </button>
      </div>
    </div>
  );
};

export default Header;
