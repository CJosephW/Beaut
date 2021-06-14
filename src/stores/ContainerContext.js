import React from 'react';
import { createContainerStore } from './textContainerStore';
import {useLocalStore} from 'mobx-react'

const ContainerContext = React.createContext(null)

export const ContainerProvider = ({children}) => {
    const containerStore = useLocalStore(createContainerStore)

    return <ContainerContext.Provider value = {containerStore}>
        {children}
    </ContainerContext.Provider>
}

export const useContainerStore = () => React.useContext(ContainerContext)