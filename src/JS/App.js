import '../style/App.css';
import TextContainer  from './TextContainer';

function App() {
  return (
    <div className="App">
        <h1><b>Beaut</b></h1>

        <div>
          <form>
            <div className = "JSON_containers" style = {styles.ContainerRows}>
              <TextContainer title = "Ugly JSON" default_text = "paste ugly JSON here"/>
              <TextContainer title = "Beautiful JSON" default_text = "Output..."/>
            </div>
            <input type = "submit" value = "Beautify!"></input>
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
    
  }
}