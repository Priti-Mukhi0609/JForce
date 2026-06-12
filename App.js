import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/tasks');
    setTasks(res.data);
  };

  const addTask = async () => {
  await axios.post('http://localhost:5000/tasks', { title });
  setTitle('');
  fetchTasks();
};

const deleteTask = async (id) => {
  await axios.delete(`http://localhost:5000/tasks/${id}`);
  fetchTasks();
};

const updateTask = async (id) => {
  const newTitle = prompt('You got a chance to edit your FEEDBACK!:');
  if (newTitle) {
    await axios.put(`http://localhost:5000/tasks/${id}`, { title: newTitle });
    fetchTasks();
  }
};

  // return (
  //   <div>
  //     <h1>Task Manager</h1>
  //   </div>
  // );

  return (
  <div className="container">
    <h2>Customer FeedBack</h2>
    <br/>
    <div className="input-area">
      <input
        type="text"
        placeholder="Please add a Feedback:)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Feed It!</button>
    </div>

    <div id="content">
      {tasks.map((task) => (
        <div className="task-item" key={task.id}>
          <span>{task.title}</span>

          <div className="task-btns">
            <button onClick={() => updateTask(task.id)}>
              EDIT
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
)};

export default App;