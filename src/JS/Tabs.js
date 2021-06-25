import JsonContainer  from './JsonContainer';
import {useState} from 'react';
import { useObserver } from 'mobx-react';
import JWTContainer from './JWTContainer';
import "../style/Tabs.scss"

function Tabs() {
    const [isJWT, setIsJWT] = useState(true); 

    return useObserver ( () => (
      <div class = "fill">
        { isJWT ?
            <JWTContainer onClick= {(event) => {event.preventDefault(); setIsJWT(false)} } title = "Ugly JWT" button_label = "JWT"/> : null 
        }
        {
        !isJWT ? 
        <JsonContainer onClick= {() => setIsJWT(true)} title = "Ugly JSON" button_label = "JSON" /> : null 
        }
      </div>
    ));
  } export default Tabs