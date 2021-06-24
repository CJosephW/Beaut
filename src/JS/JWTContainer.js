import React from "react"
import {useState} from 'react';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { useContainerStore } from "../stores/ContainerContext";
import { useObserver } from 'mobx-react';
import JsonContainer from "./JsonContainer";
import CryptoJS from "crypto-js";
import "../style/Input.scss"
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';



function JWTContainer(props){
    var [prettyText, setPrettyText] = useState("");
    var [errorBool, setErrorBool] = useState(false)
    var [secret, setSignatureSecret] = useState("");

    return(
        <div class = "container w-75">
            <div class = "row" >

                {/*<JsonContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>*/}
                <div class = "col-xl-5">
                    <label class = 'inputHeader' onClick = {props.onClick}>{props.title}</label>
                    <br></br>
                    <textarea class = "uglyInput" spellCheck = "false" type = "text" value = {props.value} onChange = {props.onChange}/> 
                    <textarea class = "sigInput" value = {secret} onChange = {(event) => setSignatureSecret(event.target.value)}></textarea>
                </div >

                <div class = "col-xl-2 align-self-end">
                    <button class = "submitButton"  onClick = {(event) => {
                        setPrettyText(beautify(props.value));
                        event.preventDefault();
                        }}><p class = "submitButtonText">{props.button_label}</p></button>
                </div>

                <div class = "col-xl-5">
                    {/** set lines to break and overwrite component's styling for sizing and add border color based on if the error condition is met */}
                    <label class = "inputHeader">Pretty JWT</label>
                    <SyntaxHighlighter customStyle = {styles.syntax_highlighter_style}
                    lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language = "json"  style = {dark}>{prettyText} </SyntaxHighlighter> 
                </div>

            </div>  
        </div>
    );
    function beautify(text){
        let pretty_text = ""
    
        try{

            let base64_jwt = text.split('.',3)
            let header = atob(base64_jwt[0])
            let payload = atob(base64_jwt[1])
            let signature = base64_jwt[2]
            if(secret !== ""){
                let signature_hmac = CryptoJS.HmacSHA256(base64_jwt[0] +"." + base64_jwt[1], secret).toString(CryptoJS.enc.Base64)
                signature_hmac = base64urlEscape(signature_hmac)
                if(signature === signature_hmac){
                    //todo at style change on match, as well as warnings for entering keys
                }
                
            }

            pretty_text = ("\n\"header\":"+ header + ",\n\"payload\":"+ payload + ",\n\"signature:\" \""+ signature+ "\"")

            setErrorBool(false)
        
        }
        catch(JWTError){
            pretty_text = "invalid " + JWTError.message
            setErrorBool(true)
            return
        
        }
        finally{
        
            return pretty_text
        }
    }
    function base64urlEscape(str) {
        // React throws a fit unless this is explicitly put in a RegExp constructor
        //const plusReg = new RegExp('/+/', 'g');
        return str.replace("+", '-').replace(/\//g, '_').replace(/=/g, '');
      };

}export default JWTContainer

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