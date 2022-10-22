import React from "react";
// import TodosComponent from "./components/TodosUsingClasses/TodosComponent";
import Todos from "./components/TodosUsingHooks/Todos";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        {/* <TodosComponent /> */}
        <Todos />
      </div>
    );
  }
}

export default App;
