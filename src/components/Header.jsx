import React from "react";

class Header extends React.Component {
  render() {
    const { deleteAll, deleteComplete, todos } = this.props;
    const completed = todos.filter((item) => item.isComplete === true);
    return (
      <div className="header">
        <h1>{this.props.title}</h1>
        <div className="header-controls">
          <button
            disabled={todos.length !== 0 ? false : true}
            onClick={deleteAll}
            title="Delete all items"
          >
            Delete All
          </button>
          <button
            disabled={completed.length !== 0 ? false : true}
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
