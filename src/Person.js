class Person
{
    id;
    firstName = "";
    secondName = "";
    lastName = "";

    isDead = false;
    dateBirth;
    dateDeath;
    useDayOfBirth;
    useDayOfDeath;
    useMonthOfBirth;
    useMonthOfDeath;
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

    getDisplayDateBirth()
    {
        
    }

    getDisplayDateDeath()
    {

    }
}

export default Person;