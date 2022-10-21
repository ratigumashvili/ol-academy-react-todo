import React from "react";

class Header extends React.Component {
  render() {
    const { deleteAll, deleteComplete, deleteChecked, todos, title } =
      this.props;
    const completed = todos.filter((item) => item.isComplete);
    const checked = todos.filter((item) => item.isChecked);
    return (
      <div className="header">
        <h1>{title}</h1>
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
            onClick={deleteComplete}
            title="Delete completed items"
          >
            Delete Completed
          </button>
          <button
            disabled={!checked.length}
            onClick={deleteChecked}
            title="Delete checked items"
          >
            Delete checked
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
