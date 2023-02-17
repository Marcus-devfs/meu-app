import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {

    const [loading, setLoading] = useState(null)
    const [alert, setAlert] = useState()
    const [alertMessage, setAlertMessage] = useState(null)

    const startLoading = async (loading = { msg: 'Carregando...' }) => {
        setLoading(loading)
        return
    }

    const startMessage = async (alertMessage = { msg: 'Vamos lá!' }) => {
        setAlertMessage(alertMessage)
        return
    }

    const stopMessage = async () => {
        setAlertMessage(null)
        return
    }

    const stopLoading = async () => {
        setLoading(null)
        return
    }

    return (
        <AppContext.Provider value={{
            loading,
            startLoading,
            stopLoading,
            setAlert,
            alert,
            startMessage,
            stopMessage,
            alertMessage,
            setAlertMessage
        }}>
            {children}
        </AppContext.Provider>
    )
};