import React, { useState } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
function App(props) {
  const [filter, setFilter] = useState('All');
  const FILTER_MAP = {
    All: () => true,
    已刪除: task => !task.completed,
    完成: task => task.completed
  };
  const FILTER_NAMES = Object.keys(FILTER_MAP);
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));
  const [tasks, setTasks] = useState(props.tasks);
  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }
  function editTask (id, newName){
    const editedTaskList = tasks.map(task=>{
      if (id === task.id){
        return {...task,name: newName}
      }
      return task;
    })
    setTasks(editedTaskList)
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map(task => (
  <Todo 
    id={task.id} 
    name={task.name} 
    complete={task.complete}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
    />
  )
    );
  const tasksNoun = taskList.length !== 1 ? '任務' : '任務';
  const headingText = `${taskList.length} ${tasksNoun} 事項`;
   
  function toggleTaskCompleted(id){
    const updateTasks = tasks.map(task =>{
      if (id === task.id){
        return {...task, completed: !task.completed}
      }
      return task;
    })
    setTasks(updateTasks);
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoList</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading">
      {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
       {taskList}
      </ul>
    </div>
  );
}
export default App;
