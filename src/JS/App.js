import '../style/App.css';
import TextContainer  from './TextContainer';
import {useState} from 'react';



function beautify(text){
  let ugly_contents = text.uglyText;
  let ugly_json = JSON.parse(ugly_contents);
  let pretty_text = JSON.stringify(ugly_json, null, "\t");
  return pretty_text;
}

function App() {

    var [uglyText, setUglyText] = useState("");
    var [prettyText, setPrettyText] = useState("");
  
  return (
    <div className="App">
        <h1><b>Beaut</b></h1>

        <div>
          <form>
            <div className = "JSON_containers" style = {styles.ContainerRows}>
              <TextContainer title = "Ugly JSON" text = {uglyText} onChange = {(event) => setUglyText(event.target.value)}/>
              <TextContainer title = "Beautiful JSON" text = {prettyText}/>
            </div>
            <button style = {styles.button} onClick = {(event) => {
              setPrettyText(beautify({uglyText}));
              event.preventDefault();
            }}><p>Beautify</p></button>
          </form>
          
        </div>
    </div>
  );
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
  }
}