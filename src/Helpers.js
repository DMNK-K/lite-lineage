const helpers = {
    getDaysInMonthOfYear(monthIntZeroBased, yearInt)
    {
        //month 0-based as in js Date obj .getMonth(), eg january is 0
        switch (monthIntZeroBased) {
            case 1 :
                return (yearInt % 4 == 0 && yearInt % 100 != 0) || yearInt % 400 == 0 ? 29 : 28;
            case 8 : case 3 : case 5 : case 10 :
                return 30;
            default :
                return 31
        }
    },

    isDateValid(yearInt, monthIntZeroBased, dayInt)
    {
        //this doesnt change if the year falls outside of the +/-271821 limit of Date()
        const maxDay = this.getDaysInMonthOfYear(monthIntZeroBased, yearInt)
        return monthIntZeroBased >= 0 && monthIntZeroBased < 12 && dayInt > 0 && dayInt <= maxDay;
    },

    clamp(n, min, max)
    {
        if (n < min){return min;}
        if (n > max){return max;}
        return n;
    }
};

export default helpers;