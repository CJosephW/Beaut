import { findByLabelText } from "@testing-library/react";
import React from "react"

function TextContainer(props){
    return <div style = {styles.div}>
        <label>{props.title}</label>
        <br></br>
        <input style = {styles.input} type = "text" value = {props.default_text}></input>
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
        height: "80vh",
        width: "45vh",
        margin:  50,
    }
}
