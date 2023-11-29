import "./Navigation.scss"
import { useCalendar } from "../../contexts/CalendarContext"

export const Navigation = () => {
    const {
        view,
        ChangeView,
        GetLastCentury,
        GetLastYear,
        GetLastMonth,
        GetNextMonth,
        GetNextYear,
        GetNextCentury
    } = useCalendar()

    if (view.type === "month") {
        return (
            <div id="navigation">
                <button type="button" onClick={GetLastYear}>
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <button type="button" onClick={GetLastMonth}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="change-view-btn" type="button" onClick={ChangeView}>
                    {view.content}
                </button>
                <button type="button" onClick={GetNextMonth}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
                <button type="button" onClick={GetNextYear}>
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        )
    }
    else if (view.type === "year") {
        return (
            <div id="navigation">
                <button type="button" onClick={GetLastYear}>
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <button className="change-view-btn" type="button" onClick={ChangeView}>
                    {view.content}
                </button>
                <button type="button" onClick={GetNextYear}>
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        )
    }
    else {
        return (
            <div id="navigation">
                <button type="button" onClick={GetLastCentury}>
                    <i className="fa-solid fa-angles-left"></i>
                </button>
                <button className="change-view-btn" type="button" onClick={ChangeView}>
                    {view.content}
                </button>
                <button type="button" onClick={GetNextCentury}>
                    <i className="fa-solid fa-angles-right"></i>
                </button>
            </div>
        )
    }
}