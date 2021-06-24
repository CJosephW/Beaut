import React from 'react';
import { createJSONStore } from './JSONStore';
import { createJWTStore } from './JWTStore'
import {useLocalStore} from 'mobx-react'

const AppContext = React.createContext(null)

export const AppProvider = ({children}) => {
    const jsonContainerStore = useLocalStore(createJSONStore)
    const jwtStore = useLocalStore(createJWTStore)
    const stores = {
        jwt: jwtStore,
        json: jsonContainerStore
    }
    return <AppContext.Provider value = {stores}>
        {children}
    </AppContext.Provider>
}

export const useAppStore = () => React.useContext(AppContext)