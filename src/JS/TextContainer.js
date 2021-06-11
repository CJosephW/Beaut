import { findByLabelText } from "@testing-library/react";
import { useState } from "react";
import React from "react"





function TextContainer(props){

    const [text, setText] = useState("")
    
    return <div style = {styles.div}>
        <label>{props.title}</label>
        <br></br>
        <textarea style = {styles.input} type = "text" value = {text} onChange = {() => setText()}/>
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
        margin: 50,
        textAlignVertical: "top",
        borderStyle: 'solid',
        borderWidth: 5,
        marginTop:10

    }
}
