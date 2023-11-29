import { useCalendar } from "../../contexts/CalendarContext"
import "./CenturyView.scss"

export const CenturyView = () => {
    const { calendarData, time, OpenYearView } = useCalendar()

    return (
        <div id="century-view">
            <ul>
                {calendarData.centuryView[Math.floor(time.year / 100) - 16][1].map((year, index) => (
                    <li key={index}>
                        <button type="button" onClick={() => OpenYearView(index)}>{year}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}