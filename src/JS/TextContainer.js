import React from "react"
import {useState} from 'react';

import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { useContainerStore } from "../stores/ContainerContext";


function TextContainer(props){

    var [uglyText, setUglyText] = useState("");
    var [prettyText, setPrettyText] = useState("");
    var [errorBool, setErrorBool] = useState(false)
    /**If the JWT tab is selected, set state to true and rerender */

    return (<div style = {styles.div}>
            <div>
                <div className = "JSON_containers" style = {styles.ContainerRows}>
                {/*<TextContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>*/}
                <div style = {styles.ugly_style}>
                    <label onClick = {props.onClick}>{props.title}</label>
                    <br></br>
                    <textarea style = {styles.input1} type = "text" value = {props.value} onChange = {props.onChange}/> 
                </div>
                {/** set lines to break and overwrite component's styling for sizing and add border color based on if the error condition is met */}
                <SyntaxHighlighter customStyle = {errorBool ? styles.error_input : styles.input} 
                lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language = "json">{prettyText}</SyntaxHighlighter> 
                </div>
                <button style = {styles.button} onClick = {(event) => {
                setPrettyText(beautify({uglyText}));
                event.preventDefault();
                }}><p>{props.button_label}</p></button>
            </div>
        </div>);

        function beautify(text){
            let pretty_text = ""

            console.log(uglyText);

            try{
                let ugly_contents = text.uglyText;
                let ugly_json = JSON.parse(ugly_contents);
                pretty_text = JSON.stringify(ugly_json, null, "\t");
                setErrorBool(false)
            
            }
            catch(JSONerror){
            
                pretty_text = "invalid " + JSONerror.message
                setErrorBool(true)
                return
            
            }
            finally{
            
                return pretty_text
            }
        }

} export default TextContainer;

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
