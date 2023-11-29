import { useState } from "react"
import { Calendar } from "./components/Calendar/Calendar"
import { Modal } from "./components/Modal/Modal"
import { Data } from "./components/Calendar/Data"
import { ModalProvider } from "./contexts/ModalContext"
import { CalendarProvider } from "./contexts/CalendarContext"

const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const App = () => {
    const [calendarData, setCalendarData] = useState(Data)

    const [time, setTime] = useState({
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    })

    const [chosenTime, setChosenTime] = useState({
        isActiveModal: false,
        day: "",
        month: "",
        year: ""
    })
    
    const [view, setView] = useState({
        type: "month",
        content: monthsOfYear[time.month - 1] + " " + time.year
    })

    const GetLastCentury = () => {
        let newYear = time.year >= 1700 ? (time.year - 100) : 1600
        setTime({ ...time, year: newYear })
        setView({ ...view, content: Math.floor(newYear / 100) * 100 + " - " + (Math.floor(newYear / 100) * 100 + 99) })
    }

    const GetLastYear = () => {
        let newYear = time.year !== 1600 ? (time.year - 1) : 1600
        setTime({ ...time, year: newYear })
        setView({ ...view, content: newYear })
    }

    const GetLastMonth = () => {
        let newMonth = time.month
        let newYear = time.year

        if (time.month !== 1) {
            newMonth = time.month - 1
        }
        else if (time.year !== 1600) {
            newMonth = 12
            newYear = time.year - 1
        }

        setTime({ ...time, month: newMonth, year: newYear })
        setView({ ...view, content: monthsOfYear[newMonth - 1] + " " + newYear })
    }

    const GetNextMonth = () => {
        let newMonth = time.month
        let newYear = time.year

        if (time.month !== 12) {
            newMonth = time.month + 1
        }
        else if (time.year !== 2099) {
            newMonth = 1
            newYear = time.year + 1
        }

        setTime({ ...time, month: newMonth, year: newYear })
        setView({ ...view, content: monthsOfYear[newMonth - 1] + " " + newYear })
    }

    const GetNextYear = () => {
        let newYear = time.year !== 2099 ? (time.year + 1) : 2099
        setTime({ ...time, year: newYear })
        setView({ ...view, content: newYear })
    }

    const GetNextCentury = () => {
        let newYear = time.year <= 1999 ? (time.year + 100) : 2099
        setTime({ ...time, year: newYear })
        setView({ ...view, content: Math.floor(newYear / 100) * 100 + " - " + (Math.floor(newYear / 100) * 100 + 99) })
    }

    const OpenModal = (time, day) => {
        setChosenTime({
            isActiveModal: true,
            day: day,
            month: time.month,
            year: time.year
        })
    }

    const CloseModal = () => {
        setChosenTime({ ...chosenTime, isActiveModal: false })
    }

    const HandleSubmit = (e, value) => {
        e.preventDefault()

        setChosenTime({ ...chosenTime, isActiveModal: false })

        setCalendarData({
            ...calendarData,
            monthView: calendarData.monthView.map((year, index) => {
                if (index + calendarData.beginYear === parseInt(chosenTime.year)) {
                    return year.map((month, ind) => {
                        if (ind === parseInt(chosenTime.month - 1)) {
                            return month.map(day => day.day === parseInt(chosenTime.day) ? { ...day, note: value } : day)
                        }
                        else {
                            return month
                        }
                    })
                }
                else {
                    return year
                }
            })
        })
    }

    const ChangeView = () => {
        setView(view.type === "month" ? {
            type: "year",
            content: time.year
        } : {
            type: "century",
            content: Math.floor(time.year / 100) * 100 + " - " + (Math.floor(time.year / 100) * 100 + 99)
        })
    }

    const OpenYearView = (index) => {
        setTime({ ...time, year: index + Math.floor(time.year / 100) * 100 })
        setView({
            type: "year",
            content: index + Math.floor(time.year / 100) * 100
        })
    }

    const OpenMonthView = (index) => {
        console.log(index)
        setTime({ ...time, month: index + 1 })
        setView({
            type: "month",
            content: monthsOfYear[index] + " " + time.year
        })
    }

    return (
        <>
            <h1>App</h1>
            <CalendarProvider value={{
                calendarData,
                time,
                view,
                OpenModal,
                ChangeView,
                GetLastCentury,
                GetLastYear,
                GetLastMonth,
                GetNextMonth,
                GetNextYear,
                GetNextCentury,
                OpenYearView,
                OpenMonthView
            }}>
                <Calendar />
            </CalendarProvider>
            <ModalProvider value={{ calendarData, chosenTime, HandleSubmit, CloseModal }}>
                <Modal />
            </ModalProvider>
        </>
    )
}