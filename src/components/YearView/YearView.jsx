import "./YearView.scss"
import { useCalendar } from "../../contexts/CalendarContext"

export const YearView = () => {
    const { calendarData, OpenMonthView } = useCalendar()

    return (
        <div id="year-view">
            <ul>
                {calendarData.yearView.map((month, index) => (
                    <li key={index}>
                        <button type="button" onClick={() => OpenMonthView(index)}>{month}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}