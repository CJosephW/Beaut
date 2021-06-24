import JsonContainer  from './JsonContainer';
import {useState} from 'react';
import { useAppStore } from '../stores/AppContext';
import { useObserver } from 'mobx-react';
import JWTContainer from './JWTContainer';
import "../style/Tabs.scss"

function Tabs() {
    /**containerStore.containers.find((container) => container.type === "JWT" != undefined) */
    const stores = useAppStore()
    var [isJWT, setIsJWT] = useState(true); 
    var [JWTID, setJWTID] = useState(null);
    var [jsonID, setJsonID] = useState(null);
    var [jsonText, setJsonText] = useState("")
    var [jwtText, setJwtText] = useState("")

    return useObserver ( () => (
      <div class = "fill">
        { isJWT ?
            <JWTContainer onClick= {(event) => {event.preventDefault(); setIsJWT(false)} } title = "Ugly JWT" button_label = "JWT" value = {jwtText} id = {jsonID}
                
                onChange ={(e) => {
                    
                    e.preventDefault();
                    stores.jwt.JWT = e.target.value;
                    setJwtText(stores.jwt.JWT)

                }    
                }/> : null 
        }

        
        {
            !isJWT ? 
            <JsonContainer onClick= {() => setIsJWT(true)} title = "Ugly JSON" button_label = "JSON" value = {jsonText} 
            
            onChange ={(e) => {

                e.preventDefault()
                stores.json.JSON = e.target.value
                setJsonText(stores.json.JSON)

                }    

            }/> : null 
        }
      </div>
    ));
  } export default Tabs