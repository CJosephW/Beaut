import '../style/App.css';
import TextContainer  from './TextContainer';
import {useState} from 'react';
import { Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

function App() {


    var [uglyText, setUglyText] = useState("");
    var [prettyText, setPrettyText] = useState("");
    var [errorBool, setErrorBool] = useState(false)
  
  return (
    <div className="App">
        <h1><b>Beaut</b></h1>
        
        <div>
          <form>
            <div className = "JSON_containers" style = {styles.ContainerRows}>
              <TextContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>
              <SyntaxHighlighter customStyle = {errorBool ? styles.error_input : styles.input} 
              lineProps={{style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}wrapLines={true} language = "json">{prettyText}</SyntaxHighlighter> 
            </div>
            <button style = {styles.button} onClick = {(event) => {
              setPrettyText(beautify({uglyText}));
              event.preventDefault();
            }}><p>Beautify</p></button>
          </form>
          
        </div>
        
    </div>
    
  );

  
  function beautify(text){
    let pretty_text = ""

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
}

export default App;

const styles : StyleSheet = {
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

  }
  
}