import React from "react"
import {useState} from 'react';

import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { useContainerStore } from "../stores/ContainerContext";
import { useObserver } from 'mobx-react';


function JsonContainer(props){
    var [prettyText, setPrettyText] = useState("");
    var [errorBool, setErrorBool] = useState(false)
    

    return(
        <div style = {styles.div}>
            <div>
                <div className = "JSON_containers" style = {styles.ContainerRows}>
                {/*<JsonContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>*/}
                <div style = {styles.ugly_style}>
                    <label onClick = {props.onClick}>{props.title}</label>
                    <br></br>
                    <textarea style = {styles.input1} type = "text" value = {props.value} onChange = {props.onChange}/> 
                </div>
                {/** set lines to break and overwrite component's styling for sizing and add border color based on if the error condition is met */}
                <SyntaxHighlighter customStyle = {errorBool ? styles.error_input : styles.input} 
                lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language = "json" >{prettyText} </SyntaxHighlighter> 
                </div>
                <button style = {styles.button} onClick = {(event) => {
                setPrettyText(beautify(props.value));
                event.preventDefault();
                }}><p>{props.button_label}</p></button>
            </div>
        </div>
    );
    function beautify(text){
        let pretty_text = ""
    
        try{
            console.log("hello")
            console.log(text + "end")
            let ugly_contents = text;
            let ugly_json = JSON.parse(ugly_contents);
            pretty_text = JSON.stringify(ugly_json, null, "\t");
            setErrorBool(false)
        
        }
        catch(JSONerror){
            console.log('hello')
            pretty_text = "invali " + JSONerror.message
            setErrorBool(true)
            return
        
        }
        finally{
        
            return pretty_text
        }
    }

} export default JsonContainer;

const styles : StyleSheet = {
    div: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: "canter"
       
    },
    input1:{
        height: "70vh",
        width: "45vh",
        margin: 50,
        textAlignVertical: "top",
        borderStyle: 'solid',
        borderWidth: 5,
        marginTop:10

    },
    ContainerRows: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        
      },
      button:{
        height:50,
        width: 200
      },
      input:{
        height: "70vh",
        width: "45vh",
        border: 'solid',
    
    },
      error_input:{
        border: 'solid',
        borderColor: '#ff0000',
        textColor: '',
        height: "70vh",
        width: "45vh",
    },
}
