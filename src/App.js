import React from "react";
import TodosComponent from "./components/TodosComponent";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <TodosComponent />
      </div>
    );
  }
}

export default App;
