import "./Form.scss"
import { useState } from "react"
import { useModal } from "../../contexts/ModalContext"
import { CalculateDayOfWeekForADate } from "../Calendar/Data"

export const Form = () => {
    const { calendarData, chosenTime, HandleSubmit } = useModal()

    const numberOfBlankBefore = CalculateDayOfWeekForADate(1, chosenTime.month, chosenTime.year)

    const indexes = {
        yearIndex: chosenTime.year - parseInt(calendarData.beginYear),
        monthIndex: chosenTime.month - 1,
        dayIndex: chosenTime.day + numberOfBlankBefore - 1
    }
    
    const note = calendarData.monthView[indexes.yearIndex][indexes.monthIndex][indexes.dayIndex].note

    const [inputValue, setInputValue] = useState(note ? note : "")

    const HandleChange = (e) => setInputValue(e.target.value)

    return (
        <form onSubmit={e => HandleSubmit(e, inputValue)}>
            <input type="text" value={inputValue} onChange={HandleChange} />
            <input type="submit" />
        </form>
    )
}