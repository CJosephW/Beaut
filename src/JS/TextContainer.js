import React from "react"

function TextContainer(props){

    return <div style = {styles.div}>
        <label>{props.title}</label>
        <br></br>
        <textarea style = {styles.input} type = "text" value = {props.text} onChange = {props.onChange}/>
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
