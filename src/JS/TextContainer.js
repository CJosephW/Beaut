import { findByLabelText } from "@testing-library/react";
import { useState } from "react";
import React from "react"





function TextContainer(props){

    const [text, setText] = useState("")
    
    return <div style = {styles.div}>
        <label>{props.title}</label>
        <br></br>
        <input style = {styles.input} type = "text" value = {text} onChange = {() => setText()}></input>
        </div>;

} export default TextContainer;

const styles : StyleSheet = {
    div: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: "canter"
       
    },
    input:{
        height: "70vh",
        width: "45vh",
        margin:  50,
    }
}
