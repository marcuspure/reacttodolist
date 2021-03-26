import React from 'react';
import {Link} from 'react-router-dom';
const SecondPage=()=>{
    const StyleSheet={
        width:"50vw",
        height:"50vh",
        backgroundColor:"#08D9D6",
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column"
    }
    return(
      <div style={StyleSheet}>
      <h1 style={{color:"white",fontFamily:"Microsoft JhengHei"}}>我是第一頁</h1>
  </div>
    )
}

export default SecondPage;