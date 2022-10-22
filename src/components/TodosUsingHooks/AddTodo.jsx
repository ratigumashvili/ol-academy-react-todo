import { HiPlusSm } from "react-icons/hi";

const AddTodo = ({ todoValue, setTodoValue, handleAddTodo }) => {
  return (
    <form className="add-form" onSubmit={handleAddTodo}>
      <input
        type="text"
        placeholder="Add your task"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
      />
      <button type="submit" title="Add todo">
        <HiPlusSm size={30} />
      </button>
    </form>
  );
};

export default AddTodo;
