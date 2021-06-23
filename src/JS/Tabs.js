import JsonContainer  from './JsonContainer';
import {useState} from 'react';
import { useContainerStore } from '../stores/ContainerContext';
import { useObserver } from 'mobx-react';
import JWTContainer from './JWTContainer';
import "../style/Tabs.scss"

function Tabs() {
    /**containerStore.containers.find((container) => container.type === "JWT" != undefined) */
    const containerStore = useContainerStore()
    var [isJWT, setIsJWT] = useState(true); 
    var [JWTID, setJWTID] = useState(null);
    var [jsonID, setJsonID] = useState(null);
    var [jsonText, setJsonText] = useState("")
    var [jwtText, setJwtText] = useState("")

    return useObserver ( () => (
      <div class = "fill">
        { isJWT ?
            <JWTContainer onClick= {(event) => {event.preventDefault(); setIsJWT(false)} } title = "UglyJWT" button_label = "JWT" value = {jwtText} id = {jsonID}
            
                onChange ={(e) => {
                    if(JWTID !== null){
                        e.preventDefault();
                        containerStore.containers[JWTID].text = e.target.value;
                        setJwtText(containerStore.containers[JWTID].text)

                        }
                    else{
                        containerStore.addContainer(" ", "JWT", 0)
                        const jwtContainer = containerStore.containers.find(container => container.type === "JWT");
                        setJWTID(jwtContainer.id)
                        }
                    }    
                }/> : null 
        }

        {
            !isJWT ? 
            <JsonContainer onClick= {() => setIsJWT(true)} title = "UglyJson" button_label = "JSON" value = {jsonText} 
            
            onChange ={(e) => {
                if(jsonID !== null){
                    e.preventDefault()
                    containerStore.containers[jsonID].text = e.target.value
                    setJsonText(containerStore.containers[jsonID].text)
                    }
                else{
                    containerStore.addContainer(" ", "JSON", 1)
                    const jsonContainer = containerStore.containers.find(container => container.type === "JSON");
                    setJsonID(jsonContainer.id)
                    }
                }    

            }/> : null 
        }
      </div>
    ));
  } export default Tabs