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
    causeOfDeath = "";
    dateBirth;
    dateDeath;
    useFullDateBirth = false;
    useFullDateDeath = false;
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
        this.dateBirth = new Date("1950/01/01");
        this.dateDeath = new Date("2000/01/01");
    }
    
    fillDataFromParsedJSON(parsedJsonObj)
    {
        for(let property in parsedJsonObj)
        {
            if (parsedJsonObj.hasOwnProperty(property) && this.hasOwnProperty(property))
            {
                //special case for dates since JSON.stringify() makes it into string
                //and then  JSON.parse() reads it as a string
                if (property == "dateBirth")
                {
                    this.dateBirth = new Date(parsedJsonObj[property]);
                }
                else if (property == "dateDeath")
                {
                    this.dateDeath = new Date(parsedJsonObj[property]);
                }
                else
                {
                    this[property] = parsedJsonObj[property];
                }
            }
        }
    }

    getDisplayName()
    {
        if (this.firstName === "" && this.secondName === "" && this.lastName === "")
        {
            return this.#signUnknown;
        }
        let displayName = (this.firstName.length > 0) ? this.firstName : this.#signUnknown;
        displayName += (this.secondName.length > 0) ? " " + this.secondName[0] + ". " : " ";
        displayName += (this.lastName.length > 0) ? this.lastName : this.#signUnknown;
        return displayName;
    }

    getDisplayDate(date, useFull, unsureOfYear)
    {
        let str = (useFull === true) ? date.getDate().toString().padStart(2, "0") + "." : "";
        str += (useFull === true) ? (date.getMonth() + 1).toString().padStart(2, "0") + "." : "";
        let year = date.getFullYear().toString();
        if (unsureOfYear === true)
        {
            year = year.slice(0, -1) + this.#signUnsure;
        }
        return str.toString() + year.toString();
    }

    getDisplayDateBirth()
    {
        return this.getDisplayDate(this.dateBirth, this.useFullDateBirth, this.unsurePreciseYearOfBirth);
    }

    getDisplayDateDeath()
    {
        return this.getDisplayDate(this.dateDeath, this.useFullDateDeath, this.unsurePreciseYearOfDeath);
    }

    static cloneFromOther(otherPerson)
    {
        const clone = new Person(otherPerson.id);
        for(let property in otherPerson)
        {
            if (clone.hasOwnProperty(property) && otherPerson.hasOwnProperty(property))
            {
                clone[property] = otherPerson[property];
            }
        }
        clone.childrenIds = [...otherPerson.childrenIds];
        clone.healthProblems = [...otherPerson.healthProblems];
        return clone;
    }
}

export default Person;