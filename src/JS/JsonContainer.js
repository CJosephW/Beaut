import React from "react"
import {useState} from 'react';

import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useContainerStore } from "../stores/ContainerContext";
import { useObserver } from 'mobx-react';
import "../style/Json.scss"



function JsonContainer(props){
    var [prettyText, setPrettyText] = useState("");
    var [errorBool, setErrorBool] = useState(false)
    

    return(
        <div class = "container w-75">
            <div class = "row" >
                {/*<JsonContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>*/}
                <div class = "col-xl-5">
                    <label class = 'label' onClick = {props.onClick}>{props.title}</label>
                    <br></br>
                    <textarea class = "textArea" spellCheck = "false" type = "text" value = {props.value} onChange = {props.onChange}/> 
                </div>
                <div class = "col-xl-2 align-self-end">
                    <button class = "button"  onClick = {(event) => {
                        setPrettyText(beautify(props.value));
                        event.preventDefault();
                        }}><p class = "buttonText">{props.button_label}</p></button>
                </div>
                <div class = "col-xl-5">
                    {/** set lines to break and overwrite component's styling for sizing and add border color based on if the error condition is met */}
                    <label class = "label">Pretty JSON</label>
                    <SyntaxHighlighter customStyle = {styles.syntax_highlighter_style}
                    lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language = "json"  style = {dark}>{prettyText} </SyntaxHighlighter> 
                </div>
            </div>
        </div>
    );
    function beautify(text){
        let pretty_text = ""
    
        try{
            let ugly_contents = text;
            let ugly_json = JSON.parse(ugly_contents);
            pretty_text = JSON.stringify(ugly_json, null, "\t");
            setErrorBool(false)
        
        }
        catch(JSONerror){
            pretty_text = "invali " + JSONerror.message
            setErrorBool(true)
            return
        
        }
        finally{
        
            return pretty_text
        }
    }

} export default JsonContainer;

//hack for styles on syntax highlighter
const styles : StyleSheet = {
    syntax_highlighter_style:{
        backgroundColor: "#202020",
        height: "100%",
        margin: 0,
        border:0,
        borderRadius: 10,
        boxShadow: 'none',
        overflowY:'scroll',
        maxHeight:800
    }
}