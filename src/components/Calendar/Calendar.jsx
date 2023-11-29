import "./Calendar.scss"
import { useCalendar } from "../../contexts/CalendarContext"
import { Navigation } from "../Navigation/Navigation"
import { MonthView } from "../MonthView/MonthView"
import { YearView } from "../YearView/YearView"
import { CenturyView } from "../CenturyView/CenturyView"

export const Calendar = () => {
    const { view } = useCalendar()

    const CalendarView = () => {
        if (view.type === "month") {
            return (
                <MonthView />
            )
        }
        else if (view.type === "year") {
            return (
                <YearView />
            )
        }
        else {
            return (
                <CenturyView />
            )
        }
    }

    return (
        <div id="calendar">
            <Navigation />
            <div className="calendar-content">
                <CalendarView />
            </div>
        </div>
    )
}