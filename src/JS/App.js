import '../style/App.css';
import TextContainer  from './TextContainer';

function App() {
  return (
    <div className="App">
        <h1><b>Beaut</b></h1>

        <div>
          <form style = {styles.ContainerRows}>
            <TextContainer title = "Ugly JSON" default_text = "paste ugly JSON here"/>
            <TextContainer title = "Beautiful JSON" default_text = "Output..."/>
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
    textAlign: 'center'
  }
}