import React from "react"
import {useState, useEffect} from 'react';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { useAppStore } from "../stores/AppContext";
import { useObserver } from 'mobx-react';
import CryptoJS from "crypto-js";
import "../style/Input.scss"
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

function JWTContainer(props){
    const [isChecked, setIsChecked] = useState(false)
    const [isValidSecret, setIsValidSecret] = useState(false)

    const stores = useAppStore()
    useEffect(() => {
        if(isChecked === true){
            //if checked, attempt to validate the signature 
            checkSig();
        }
        else{
            //if the checkbox is not checked, do not attempt to validate the secret
            setIsValidSecret(false);
        }
    }, [isChecked]);


    return useObserver ( () => (
        <div class = "container w-75">
            <div class = "row" >
                <div class = "col-xl-6">
                    <div class = "dropdown">
                        <button class = "dropbtn">JWT ↓</button>
                        <div class = "dropdown-content">
                            <a onClick = {props.onClick}>JSON</a>
                        </div>
                    </div>
                    <textarea class = "uglyInput" spellCheck = "false" type = "text" value = {stores.jwt.JWT} 
                        onChange ={(e) => {
                            setIsValidSecret(false)
                            e.preventDefault();
                            stores.jwt.JWT = e.target.value
                            stores.jwt.prettyJWT= beautify(stores.jwt.JWT)
                        }}/> 
                    <label class = "checkboxText">
                        {"Verify Signature:\t" }
                        <input
                            name = "verify signature"
                            type = "checkbox"
                            onChange = {() => {checkboxChange();}}
                            checked = {isChecked}
                        ></input>
                    </label>

                    <textarea class = "sigInput" value = {stores.jwt.secret} onChange = {(event) => 
                        {stores.jwt.secret = event.target.value; setIsValidSecret(false); checkSig();}}/>
                    {
                        isChecked ? 

                        <p class = "signatureWarning">Warning: Do not disclose secrets to untrusted sources, third party sources may be able to generate valid tokens for your applications</p>
                        : null
                    }
                </div >

                <div class = "col-xl-6">
                    <label class = "inputHeader">Pretty JWT</label>
                    {/** set lines to break and overwrite component's styling for sizing and add border color based on if the error condition is met */}
                    <SyntaxHighlighter customStyle = {styles.syntax_highlighter_style}
                    lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language = "json"  style = {dark}>{stores.jwt.prettyJWT} </SyntaxHighlighter>
                    {
                        //TODO: fix this hard to read nested ternary statements
                        isValidSecret ? 
                            isChecked ?
                                <p class = "validSecretText">Your Token is Valid</p> : null
                            :isChecked?
                                 <p class = "invalidSecretText">Your Token is not Valid</p> : null
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
            //format the JWT into JSON so it can be beautified in a JSON format for consistency 
            pretty_text = ("{\n\"header\":"+ header + ",\n\"payload\":"+ payload + ",\n\"signature\": \""+signature+ "\"\n}")
            pretty_text = JSON.parse(pretty_text)
            pretty_text = JSON.stringify(pretty_text, null, '\t')
            checkSig()
        }
        catch(JWTError){
            pretty_text = "invalid " + JWTError.message
            return
        
        }
        finally{
            
            return pretty_text
        }
    }
    function checkSig(){
        //if the secret is not empty and the "Validate Secret" checkbox IS checked attempt to validate the signature
        if(stores.jwt.secret !== ""  && isChecked === true){
            let base64_jwt = stores.jwt.JWT.split('.',3)
            let signature = base64_jwt[2]
            let signature_hmac = CryptoJS.HmacSHA256(base64_jwt[0] +"." + base64_jwt[1], stores.jwt.secret).toString(CryptoJS.enc.Base64)
            signature_hmac = base64urlEscape(signature_hmac)

            if(signature === signature_hmac){
                setIsValidSecret(true)
                console.log(isChecked)
            }
            else{
                console.log("they don't match")
                setIsValidSecret(false)
            }
        }
    }
    
    function checkboxChange(){
        //on checkbox change/click swap the value to the inverse of it's current state
        setIsChecked(!isChecked)  
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