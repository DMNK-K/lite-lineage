import Helpers from './Helpers';

class Person
{
    id;
    locationInTreeX = 0;
    locationInTreeY = 0;
    firstName = "";
    secondName = "";
    lastName = "";

    parentId0 = null;
    parentId1 = null;

    isDead = false;
    causeOfDeath = "";
    dateBirth;
    dateDeath;
    unknownDateOfBirth = true;
    unknownDateOfDeath = true;

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
    healthProblems = [""];
    notes = "";

    #signUnknown = "?";
    #signUnsure = "X";
    constructor(id)
    {
        this.id = id;
        this.dateBirth = new Date(1950, 0, 1);
        this.dateDeath = new Date(2000, 0, 1);
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
        let str = (useFull) ? date.getDate().toString().padStart(2, "0") + "." : "";
        str += (useFull) ? (date.getMonth() + 1).toString().padStart(2, "0") + "." : "";
        let year = date.getFullYear().toString();
        if (unsureOfYear)
        {
            year = year.slice(0, -1) + this.#signUnsure;
        }
        return str.toString() + year.toString();
    }

    getDisplayDateBirth()
    {
        if (this.unknownDateOfBirth) {return this.#signUnknown;}
        return this.getDisplayDate(this.dateBirth, this.useFullDateBirth, this.unsurePreciseYearOfBirth);
    }

    getDisplayDateDeath()
    {
        if (this.unknownDateOfDeath) { return this.#signUnknown; }
        return this.getDisplayDate(this.dateDeath, this.useFullDateDeath, this.unsurePreciseYearOfDeath);
    }

    getValidPotentialParents(family, includeParent0 = false, includeParent1 = false)
    {
        //a person is valid as a parent when they are born earlier than this person, or when any of the 2 dates is unknown
        //and when they are not already a parent of this person, unless specified to include that parent in the result
        //and when they are not a child of this person

        //when exact years are unsure, then the most permissive scenario has to be considered, where the parent is the oldest possible
        //and the child is the youngest possible
        //we only compare just the years when one of the dates is marked as not full, then it is permitted for the 2 people to have the same year
        //even though those timeframes are unrealistic, someone might want to use this tool to make a family tree not for humans, but hamsters

        const potentialParents = [];
        const dateBirthThis = (this.unsurePreciseYearOfBirth) ? Helpers.floorDateYearTo(this.dateBirth, 10) : this.dateBirth;
        for(let i = 0; i < family.length; i++)
        {
            if (this.id == family[i].id || family[i].parentId0 == this.id || family[i].parentId1 == this.id) {continue;}
            if (family[i].id == this.parentId0 && !includeParent0){continue;}
            if (family[i].id == this.parentId1 && !includeParent1){continue;}

            const dateBirthParent = (family[i].unsurePreciseYearOfBirth) ? Helpers.ceilDateYearTo(family[i].dateBirth, 10) : family[i].dateBirth;
            const fullDatesInBoth = this.useFullDateBirth && family[i].useFullDateBirth;
            const someDateUnknown = this.unknownDateOfBirth || family[i].unknownDateOfBirth;
            if ((fullDatesInBoth && dateBirthThis > dateBirthParent) || dateBirthThis.getFullYear() >= dateBirthParent.getFullYear() || someDateUnknown)
            {
                potentialParents.push(family[i]);
            }
        }
        return potentialParents;
    }

    getCurrentParents(family)
    {
        const i0 = family.findIndex(item => item.id == this.parentId0);
        const i1 = family.findIndex(item => item.id == this.parentId1);
        const returnArray = [null, null];
        if (i0 >= 0) {returnArray[0] = family[i0];}
        if (i1 >= 0) {returnArray[1] = family[i1];}
        return returnArray;
    }

    /**
     * Adds parent id to a slot that is not full, if none found replaces parentId0.
     */
    addParentId(newId)
    {
        if (!this.parentId0) {this.parentId0 = newId;}
        else if (!this.parentId1) {this.parentId1 = newId;}
        else {this.parentId0 = newId;}
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
        clone.healthProblems = [...otherPerson.healthProblems];
        return clone;
    }
}

export default Person;