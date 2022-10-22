import React, { Component } from "react";

class Edit extends Component {
  render() {
    const { editTitle, handleSaveEdited, handleEditTitleChange } = this.props;
    return (
      <div className="edit-menu">
        <input type="text" value={editTitle} onChange={handleEditTitleChange} />
        <button onClick={handleSaveEdited}>Save</button>
      </div>
    );
  }
}

export default Edit;
