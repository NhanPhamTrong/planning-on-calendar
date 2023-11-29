import { createContext, useContext } from "react";

const CalendarContext = createContext()

export const useCalendar = () => {
    return useContext(CalendarContext)
}

export const CalendarProvider = ({ children, value }) => {
    return (
        <CalendarContext.Provider value={value}>
            {children}
        </CalendarContext.Provider>
    )
}