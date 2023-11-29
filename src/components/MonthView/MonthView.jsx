import "./MonthView.scss"
import { useCalendar } from "../../contexts/CalendarContext"

export const MonthView = () => {
    const { calendarData, time, OpenModal } = useCalendar()
    
    const daysOfWeek = ["Sun", "Mon","Tue", "Wed", "Thu", "Fri", "Sat"]

    return (
        <div id="month-view">
            <ul className="days-of-week-section">
                {daysOfWeek.map((day, index) => (
                    <li key={index}>{day}</li>
                ))}
            </ul>
            <div className="days-section">
                <ul>
                    {calendarData.monthView[time.year - calendarData.beginYear][time.month - 1].map((day, index) => {
                        const today = new Date()
                        const isToday = time.year === today.getFullYear() && time.month === today.getMonth() + 1 && day.day === today.getDate()

                        return (
                            <li
                                key={index}
                                className={isToday ? "today" : ""}
                            >
                                <button
                                    type="button"
                                    disabled={day.day === ""}
                                    onClick={() => OpenModal(time, day.day)}
                                >
                                    {day.day}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}