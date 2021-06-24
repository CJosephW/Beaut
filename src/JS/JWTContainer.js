import React from "react"
import {useState} from 'react';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { useAppStore } from "../stores/AppContext";
import { useObserver } from 'mobx-react';
import JsonContainer from "./JsonContainer";
import CryptoJS from "crypto-js";
import "../style/Input.scss"
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';



function JWTContainer(props){
    var [prettyText, setPrettyText] = useState("");
    var [errorBool, setErrorBool] = useState(false)
    var [secret, setSignatureSecret] = useState("");
    var [isChecked, setIsChecked] = useState(false)
    var [isValidSecret, setIsValidSecret] = useState(false)

    const stores = useAppStore()

    return useObserver ( () => (
        <div class = "container w-75">
            <div class = "row" >

                {/*<JsonContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>*/}
                <div class = "col-xl-5">
                    <label class = 'inputHeader' onClick = {props.onClick}>{props.title}</label>
                    <br></br>
                    <textarea class = "uglyInput" spellCheck = "false" type = "text" value = {props.value} onChange = {props.onChange}/> 
                    <label class = "checkboxText">
                        {"Verify Signature:\t" }
                        <input
                            name = "verify signature"
                            type = "checkbox"
                            onChange = {() => {
                                setIsChecked(!isChecked)
                                setIsValidSecret(false)
                                }}
                            checked = {isChecked}
                        ></input>
                    </label>

                    <textarea class = "sigInput" value = {stores.jwt.secret} onChange = {(event) => 
                        {stores.jwt.secret = event.target.value; setSignatureSecret(stores.jwt.secret); setIsValidSecret(false)}}/>
                    {
                        isChecked ? 

                        <p class = "signatureWarning">Warning: Do not disclose secrets to untrusted sources, third party sources may be able to generate valid tokens for your applications</p>
                        : null
                    }
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
                    {
                        isValidSecret ? 
                        <p class = "validSecretText">Your Token is Valid</p>
                        : null

                    } 
                </div>

            </div>  
        </div>
    ));
    function beautify(text){
        let pretty_text = ""
    
        try{

            let base64_jwt = text.split('.',3)
            let header = atob(base64_jwt[0])
            let payload = atob(base64_jwt[1])
            let signature = base64_jwt[2]
            console.log(secret)
            if(stores.jwt.secret !== ""  && isChecked === true){
                let signature_hmac = CryptoJS.HmacSHA256(base64_jwt[0] +"." + base64_jwt[1], stores.jwt.secret).toString(CryptoJS.enc.Base64)
                signature_hmac = base64urlEscape(signature_hmac)
                if(signature === signature_hmac){
                    //todo at style change on match, as well as warnings for entering keys
                    setIsValidSecret(true)
                    console.log('they match')
                }
                else{
                    console.log("they don't match")
                }
                
            }

            pretty_text = ("{\n\"header\":"+ header + ",\n\"payload\":"+ payload + ",\n\"signature\": \""+signature+ "\"\n}")
            console.log(pretty_text);
            pretty_text = JSON.parse(pretty_text)
            pretty_text = JSON.stringify(pretty_text, null, '\t')
            
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