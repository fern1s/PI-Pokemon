import "../App.css"
import "../css_modules/FirstPage.css"
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { getTypes } from "../actions/actions";


function FirstPage() {
  const dispatch = useDispatch();

  useEffect(()=>{
  dispatch(getTypes("true"))
  })

  return (
    <div className="container">
      <div className="start"> 
        <Link to="/home">Start!</Link>
        </div> 
    </div> //tengo que usar la libreria styled para usar modules creo
  );
}

export default FirstPage;
