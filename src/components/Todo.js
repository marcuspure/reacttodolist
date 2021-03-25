import React,{useState} from  "react";

export default function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  function handleChange(e) {
    setNewName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.editTask(props.id, newName);
    setNewName("");
    setEditing(false);
  }
  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
         修改任務 {props.name}
        </label>
        <input id={props.id} 
        className="todo-text" 
        type="text" 
        value={newName}
        onChange={handleChange}
        />
      </div>
      <div className="btn-group">
        <button type="button" 
        className="btn todo-cancel"
        onClick={() => setEditing(false)}
        >
          取消
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          儲存
          <span className="visually-hidden">new name for {props.name}</span>
        </button>
      </div>
    </form>
  );
  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" 
                  className="btn"
                  onClick={() => setEditing(true)}
                  >
            修改 <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            刪除 <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
    </div>

    
  );
  return (
    <li className="todo stack-small">
      {isEditing ? editingTemplate : viewTemplate}
      <div className="c-cb">
        <input id={props.id} 
        type="checkbox" 
        defaultChecked={props.completed} 
        onChange={()=>props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" 
        htmlFor={props.id}>
         {props.name}
        </label>
      </div>
      <div className="btn-group">
        <button 
          type="button" 
          className="btn"
          >
          修改 <span className="visually-hidden"> {props.name}</span>
        </button>
        <button 
        type="button" 
        className="btn btn__danger"
        onClick={()=> props.deleteTask(props.id)}
        >
          刪除 <span className="visually-hidden"> {props.name}</span>
        </button>
      </div>
    </li>
  );
}