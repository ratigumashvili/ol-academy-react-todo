import React from "react";
import { HiPlusSm } from "react-icons/hi";

class Form extends React.Component {
  render() {
    const { addTodo, todo, handleChangeInput } = this.props;
    return (
      <form onSubmit={addTodo} className="add-form">
        <input
          type="text"
          placeholder="Add your task"
          value={todo}
          onChange={handleChangeInput}
        />
        <button type="submit" title="Add item">
          <HiPlusSm size={30} />
        </button>
      </form>
    );
  }
}

export default Form;
