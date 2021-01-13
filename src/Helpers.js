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

    /**
     * Force a value to be between min and max.
     * @param {Number} n, @param {Number} min, @param {Number} max
     */
    clamp(n, min, max)
    {
        if (n < min){return min;}
        if (n > max){return max;}
        return n;
    },

    getRelativeCoords (event, referenceElement)
    {
        const position = {
          x: event.pageX,
          y: event.pageY
        };
      
        const offset ={
          left: referenceElement.offsetLeft - referenceElement.scrollLeft,
          top: referenceElement.offsetTop - referenceElement.scrollTop
        };
      
        let reference = referenceElement.offsetParent;
      
        while(reference)
        {
          offset.left += reference.offsetLeft;
          offset.top += reference.offsetTop;
          reference = reference.offsetParent;
        }
      
        return { 
          x: position.x - offset.left,
          y: position.y - offset.top,
        }; 
    }

    
};

export default helpers;