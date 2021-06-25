import React from "react"
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import "../style/Input.scss"
import { useAppStore } from "../stores/AppContext";
import { useObserver } from 'mobx-react';


function JsonContainer(props){
    const stores = useAppStore()

    return useObserver ( () =>(
        <div class = "container w-75">
            <div class = "row" >
                <div class = "col-xl-6">
                    <div class = "dropdown">
                        <button class = "dropbtn">JSON ↓</button>
                        <div class = "dropdown-content">
                            <a onClick = {props.onClick}>JWT</a>
                        </div>
                    </div>
                    <textarea class = "uglyInput" spellCheck = "false" type = "text"  value = {stores.json.JSON} 
                        onChange ={(e) => {
                        e.preventDefault()
                        stores.json.JSON = e.target.value
                        stores.json.prettyJSON = beautify(stores.json.JSON)
                        }}/> 
                </div>
                <div class = "col-xl-6">
                    {/** set lines to break and overwrite component's styling for sizing and add border color based on if the error condition is met */}
                    <label class = "inputHeader">Pretty JSON</label>
                    <SyntaxHighlighter customStyle = {styles.syntax_highlighter_style}
                    lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language = "json"  style = {dark}>{stores.json.prettyJSON} </SyntaxHighlighter> 
                </div>
            </div>
        </div>
    ));

    function beautify(text){
        let pretty_text = ""
        try{
            let ugly_contents = text;
            let ugly_json = JSON.parse(ugly_contents);
            pretty_text = JSON.stringify(ugly_json, null, "\t");        
        }
        catch(JSONerror){
            pretty_text = "invalid: " + JSONerror.message
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