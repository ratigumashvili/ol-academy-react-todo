import React from "react";

class Header extends React.Component {
  render() {
    const { deleteAll, deleteComplete, todos, title } = this.props;
    const completed = todos.filter((item) => item.isComplete);
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
        </div>
      </div>
    );
  }
}

export default Header;
