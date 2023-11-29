// E for Explorer’s calendar algorithm. Link: https://www.notion.so/nhan-pham-1201/E-for-Explorer-s-algorithm-ca271626a4a14ceba867995ef63acfbd?pvs=4
// This is applied for years after 1600
const beginYear = 1600
const endYear = 2099

const monthTable = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]

// Day of week of a date
export const CalculateDayOfWeekForADate = (d, m, y) => {
    const monthNumber = monthTable[m - 1]
    const yearNumber = y % 100
    let centuryNumber = 0

    if (Math.floor(y / 100) % 4 === 0) {
        centuryNumber = 6
    }
    else if (Math.floor(y / 100) % 4 === 1) {
        centuryNumber = 4
    }
    else if (Math.floor(y / 100) % 4 === 2) {
        centuryNumber = 2        
    }
    else {
        centuryNumber = 0        
    }

    const quotient = Math.floor(yearNumber / 4)

    const dayOfWeek = (d + monthNumber + centuryNumber + yearNumber + quotient) % 7

    if (new Date(y, 1, 29).getDate() === 29 && (m - 1 === 0 || m - 1 === 1)) {
        return dayOfWeek > 0 ? dayOfWeek - 1 : 6
    }
    else {
        return dayOfWeek
    }
}

// Get number of days in a month
const GetNumberOfDaysInMonth = (m, y) => {
    const monthWith31Days = [1, 3, 5, 7, 8, 10, 12]
    if (monthWith31Days.includes(m)) {
        return 31
    }
    else {
        return m === 2 ? (new Date(y, 1, 29).getDate() === 29 ? 29 : 28) : 30
    }
}

const CreateMonth = (m, y) => {
    let list = []

    let numberOfBlankBefore = CalculateDayOfWeekForADate(1, m, y)
    let numberOfBlankAfter = 0

    if ((numberOfBlankBefore + GetNumberOfDaysInMonth(m, y)) % 7 !== 0) {
        numberOfBlankAfter = 7 - (numberOfBlankBefore + GetNumberOfDaysInMonth(m, y)) % 7
    }

    const numberOfCellsInAMonth = numberOfBlankBefore + GetNumberOfDaysInMonth(m, y) + numberOfBlankAfter

    for (let i = 0; i < numberOfCellsInAMonth; i++) {
        const checkBlankCellCondition = i < CalculateDayOfWeekForADate(1, m, y) || i >= CalculateDayOfWeekForADate(1, m, y) + GetNumberOfDaysInMonth(m, y)
        list.push({ day: checkBlankCellCondition ? "" : (i - CalculateDayOfWeekForADate(1, m, y) + 1) })
    }

    return list
}

const CreateYear = (y) => {
    let list = []

    for (let i = 1; i <= 12; i++) {
        list.push(CreateMonth(i, y))
    }

    return list
}

const CreateCalendar = () => {
    let list = []

    for (let i = 1600; i < 2100; i++) {
        list.push(CreateYear(i))
    }

    return list
}

const CreateCenturyView = () => {
    let list = []

    for (let i = 1600; i < 2100; i += 100) {
        let l = []

        for (let j = i; j < i + 100; j++) {
            l.push(j)
        }

        list.push([[i + " - " + (i + 99)], l])
    }

    return list
}

export const Data = {
    beginYear: beginYear,
    endYear: endYear,
    monthView: CreateCalendar(),
    yearView: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "", "", ""],
    centuryView: CreateCenturyView(),
}