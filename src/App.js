import React, { useState } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [todo, setTodo] = useState('');

  function Finish(id) {
    setTodos(todos.map(obj => {
      if (obj.id === id) {
        const confirmed = window.confirm("Have you finished this task?");
        if (confirmed) {
          obj.status = true;
        }
      }
      return obj;
    }));
  }

  function Remove(id) {
    setTodos(todos.filter(obj => obj.id !== id));
  }

  function Edit(id) {
    const updatedText = prompt("Edit the task:", todos.find(obj => obj.id === id).text);
    if (updatedText !== null) {
      setTodos(todos.map(obj => {
        if (obj.id === id) {
          obj.text = updatedText;
        }
        return obj;
      }));
    }
  }

  return (
    <>
      <div className="container pt-5">
        <div className="input-group mb-3">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Create ToDo"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            onClick={() => setTodos([...todos, { id: Date.now(), text: todo, status: false }])}
            className="btn btn-outline-info"
            type="button"
            id="button-addon2"
          >
            Add ToDo
          </button>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          {todos.map((value) => (
            <div className="col-md-4 mb-4" key={value.id}>
              <div className={`card ${value.status ? "bg-success text-white" : ""}`}>
                <div className="card-body">
                  <div className="mb-4 d-flex align-items-center justify-content-between">
                    <p className="card-text">{value.text}</p>
                    <button className="btn btn-outline-dark" onClick={() => Edit(value.id)}>
                      Edit
                    </button>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <button
                      onClick={() => Finish(value.id)}
                      className="btn btn-outline-info"
                    >
                      Finish
                    </button>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => Remove(value.id)}
                    ></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
