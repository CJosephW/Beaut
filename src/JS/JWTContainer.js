import React from "react"
import {useState} from 'react';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { useContainerStore } from "../stores/ContainerContext";
import { useObserver } from 'mobx-react';
import JsonContainer from "./JsonContainer";
import CryptoJS from "crypto-js";


function JWTContainer(props){
    var [prettyText, setPrettyText] = useState("");
    var [errorBool, setErrorBool] = useState(false)
    var [secret, setSignatureSecret] = useState("");

    return(
        <div style = {styles.div}>
            <div>
                <div className = "JSON_containers" style = {styles.ContainerRows}>
                {/*<JsonContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>*/}
                    <div style = {styles.div23}>
                        <label onClick = {props.onClick}>{props.title}</label>
                        <textarea style = {styles.input1} type = "text" value = {props.value} onChange = {props.onChange}/> 
                        <textarea style = {styles.signature_key} value = {secret} onChange = {(event) => setSignatureSecret(event.target.value)}></textarea>
                    </div>
                    {/** set lines to break and overwrite component's styling for sizing and add border color based on if the error condition is met */}
                    <SyntaxHighlighter customStyle = {errorBool ? styles.error_input : styles.input} 
                    lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language="json">{prettyText} </SyntaxHighlighter> 
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
        catch(JSONerror){
            pretty_text = "invalid " + JSONerror.message
            setErrorBool(true)
            return
        
        }
        finally{
        
            return pretty_text
        }
    }
    function base64urlEscape(str) {
        // React throws a fit unless this is explicitly put in a RegExp constructor
        const plusReg = new RegExp('/+/', 'g');
        return str.replace("+", '-').replace(/\//g, '_').replace(/=/g, '');
      };

}export default JWTContainer




const styles : StyleSheet = {
div23: {
display: 'flex',
justifyContent: 'center',
flexDirection: 'column',
textAlign: "center"

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
signature_key:{
    resize: 'none',
    
}
}
