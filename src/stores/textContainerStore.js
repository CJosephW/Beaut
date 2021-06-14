import {nanoid} from 'nanoid';

export function createContainerStore(){
    return {
        containers: [],
        addContainer(text, type,id){
            this.containers.push({
                text:text,
                id: id,
                type: type
            })
        },
        removeContainer(id){
            this.containers = this.containers.filter(containerid => containerid.id !== id )
        },
        editNote(id, newText){
            let original_container = this.containers.find((p) => p.id === id);
            let new_container = original_container
            new_container.text = newText;

            this.containers = this.containers.map(container => container.id === id ? new_container : original_container)
        }
    }
}