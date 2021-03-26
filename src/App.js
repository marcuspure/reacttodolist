import React, { useState ,useRef, useEffect  } from "react";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";
import { nanoid } from "nanoid";
import { HashRouter,Route,Switch } from "react-router-dom";
import FirstPage from "./components/FirstPage";
import SecondPage from "./components/SecondPage";
import Layout from "./components/Layout";
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
const FILTER_MAP = {
  All: () => true,
  進行中: task => !task.completed,
  完成: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');


  const filterList = FILTER_NAMES.map(name => (
    <FilterButton 
    key={name} 
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
    />
  ));
  
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
   
  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

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
    <>
    <div className="todoapp stack-large">
      <h1>TodoList</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" 
        ref={listHeadingRef}>
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
    <div>
    <HashRouter>
            <Switch>
                <Layout>
                    <Route exact path="/" component={FirstPage}/>
                    <Route path="/second" component={SecondPage}/>
                </Layout>
            </Switch>
        </HashRouter>
    </div>
  
  
  </>
  );
}
export default App;
