import React from "react";


function FilterButton(props) {
  
  return (
    <button type="button" 
    className="btn toggle-btn" 
    aria-pressed="true"
    onClick={() => props.setFilter(props.name)}
    >
      <span className="visually-hidden">顯示 </span>
      <span>{props.name} </span>
      <span className="visually-hidden">任務</span>
    </button>
  );
}

export default FilterButton;