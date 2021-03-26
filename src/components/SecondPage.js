import ReactDOM from 'react-dom'
import React from 'react';

function CategoryItem(props){
  return ( 
      <tr>
        <td>{props.name}</td>
        <td>{props.type}</td>
        <td>{props.type1}</td>
        <td>{props.type2}</td>
      </tr>
  )
}
const List=()=>{

const [list, setList] = React.useState([]);

React.useEffect(() => {
  fetch("https://data.tainan.gov.tw/api/3/action/datastore_search?resource_id=6da8e048-3b16-4eca-965f-3a3f4720494a&limit=10")
    .then((res) => res.json())
    .then((categories) => {
      console.log(categories.result.records);
      setList(categories.result.records);
    })
}, []);
  console.log(list);

return (
  <div> 
    <div className="category-wrap">
    <table>
    {
      list.map((category)=> {
        return (
          <CategoryItem 
          name={category['地址']}
            key={category.id}
            type={category['建置年度']}
            type1={category['熱點分類']}
            type2={category['熱點名稱']}/>
        )
      })
    }
    </table>
    </div>
  </div>
    )  
  }

// ReactDOM.render(
//   <List />,
//   document.getElementById('app1') 
// );
export default List;