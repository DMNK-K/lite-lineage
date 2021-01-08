class Person
{
    id;
    locationInTreeX;
    locationInTreeY;
    firstName = "";
    secondName = "";
    lastName = "";

    parentId0;
    parentId1;
    childrenIds = [];

    isDead = false;
    dateBirth;
    dateDeath;
    useDayOfBirth = true;
    useDayOfDeath = true;
    useMonthOfBirth = true;
    useMonthOfDeath = true;
    unsurePreciseYearOfBirth = false;
    unsurePreciseYearOfDeath = false;

    placeBirth = "";
    placeDeath = "";
    coordsBirthLat;
    coordsBirthLong;
    coordsDeathLat;
    coordsDeathLong;

    colorEyes = "";
    colorHair = "";
    healthProblems = [];
    notes = "";

    #signUnknown = "?";
    #signUnsure = "X";
    constructor(id)
    {
        this.id = id;
        this.dateBirth = new Date("2000/01/01");
    }
    
    fillDataFromParsedJSON(parsedJsonObj)
    {

    }

    getDisplayName()
    {
        if (this.firstName === "" && this.secondName === "" && this.lastName === "")
        {
            return this.#signUnknown;
        }
        let displayName = (this.firstName.length > 0) ? this.firstName : this.#signUnknown;
        displayName += (this.secondName.length > 0) ? " " + this.secondName[0] + "." : "";
        displayName += " " + (this.lastName.length > 0) ? this.lastName : this.#signUnknown;
        return displayName;
    }

    getDisplayDate(date, useDay, useMonth, unsureOfYear)
    {
        let str = (useDay === true && useMonth === true) ? date.getDate().toString().padStart(2, "0") + "." : "";
        str += (useMonth === true) ? (date.getMonth() + 1).toString().padStart(2, "0") + "." : "";
        let year = date.getFullYear().toString();
        if (unsureOfYear === true)
        {
            year = year.slice(0, -1) + this.#signUnsure;
        }
        return str.toString() + year.toString();
    }

    getDisplayDateBirth()
    {
        return this.getDisplayDate(this.dateBirth, this.useDayOfBirth, this.useMonthOfBirth, this.unsurePreciseYearOfBirth);
    }

    getDisplayDateDeath()
    {
        return this.getDisplayDate(this.dateDeath, this.useDayOfDeath, this.useMonthOfDeath, this.unsurePreciseYearOfDeath);
    }
}

export default Person;