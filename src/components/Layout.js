import React from 'react';
import {Link} from 'react-router-dom';
const Layout=(props)=>{
  const StyleSheet={
    // width:"70vw",
    // height:"70vh",
    backgroundColor:(props.location.pathname==="/")?"#F1E1FF":"#08D9D6",
    display: "flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column"
    
  }
  return(
    
      <div style={StyleSheet}>
          <nav>
              <Link to="/" style={{marginLeft:"10px"
                      
            
            }}>第一頁</Link>
              <Link to="/second" style={{marginLeft:"10px"}}>第二頁</Link>
          </nav> 
          {props.children}
      </div>
  );
}
export default Layout;