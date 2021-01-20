import Person from './Person';

class FamilyTree
{
    static minFamilyMemberLocation = {x: 1, y: 1};

    treeName;
    creationDate;
    family = []; //array of instances of Person class

    constructor(treeName, creationDate, family)
    {
        this.treeName = treeName;
        this.creationDate = creationDate;
        this.family = family;
    }

    static makeNewName(takenNames)
    {
        let newName = "My Tree 1";
        let i = 1;
        while (takenNames.includes(newName))
        {
            i++;
            newName = "My Tree " + i;
        }
        return newName;
    }

    static isFamilyMemberLocationBelowMin(location)
    {
        return (location.x < this.minFamilyMemberLocation.x || location.y < this.minFamilyMemberLocation.y);
    }

    static getShiftVector(location)
    {
        const x = (location.x < this.minFamilyMemberLocation.x) ? this.minFamilyMemberLocation.x - location.x : 0;
        const y = (location.y < this.minFamilyMemberLocation.y) ? this.minFamilyMemberLocation.y - location.y : 0;
        return {x: x, y: y};
    }

    static shiftFamily(family, vector)
    {
        for(let i = 0; i < family.length; i++)
        {
            family[i].locationInTreeX += vector.x;
            family[i].locationInTreeY += vector.y;
        }
    }

    /**
     * Shifts location of all members of a provided family by a vector.
     * This returns a new array and also its contents are clones, to provide immutability for react.
     */
    static shiftFamilyImmutably(family, vector)
    {
        const newFam = [];
        let draft;
        for(let i = 0; i < family.length; i++)
        {
            draft = Person.cloneFromOther(family[i]);
            draft.locationInTreeX += vector.x;
            draft.locationInTreeY += vector.y;
            newFam.push(draft);
        }
        return newFam;
    }

    fillDataFromJSON(unparsedJson)
    {
        this.fillDataFromParsedJSON(JSON.parse(unparsedJson));
    }

    fillDataFromParsedJSON(parsedJsonObj)
    {
        //used for loading family trees from JSON files
        //the way you would use it is you first create an instance of FamilyTree,
        //then you call this to fill in data, where parsedJsonObj is something JSON.parse() returns
        //this is done (instead of only using the constructor) to preserve instance functions,
        //since JSON.stringify() drops them
        this.treeName = parsedJsonObj.treeName;
        this.creationDate = parsedJsonObj.creationDate;
        this.family.length = 0;
        for(let i = 0; i < parsedJsonObj.family.length; i++)
        {
            const personObj = new Person(parsedJsonObj.family[i].id);
            personObj.fillDataFromParsedJSON(parsedJsonObj.family[i]);
            this.family.push(personObj);
        }
    }

    fillDataFromOther(otherTree)
    {
        this.treeName = otherTree.treeName;
        this.creationDate = otherTree.creationDate;
        this.family = otherTree.family;
    }

    findLowestUnusedFamilyMemberId()
    {
        let newId = -1;
        let idExists = true;
        while (idExists)
        {
            newId++;
            idExists = false;
            for(let i = 0; i < this.family.length; i++)
            {
                if (newId == this.family[i].id) {idExists = true;}
            }
        }
        return newId;
    }

    static cloneFromOther(otherTree)
    {
        return new FamilyTree(otherTree.treeName, otherTree.creationDate, [...otherTree.family]);
    }

    save()
    {
        localStorage.setItem(this.treeName, JSON.stringify(this));
    }

    findFreeLocationUpwards(idOfRefPerson, marginX, marginY)
    {
        //upwards dir is -1 since coords are counted from top
        return this.findFreeLocationVertically(idOfRefPerson, marginX, marginY, -1, true, marginX + 1);
    }

    findFreeLocationDownwards(idOfRefPerson, marginX, marginY)
    {
        return this.findFreeLocationVertically(idOfRefPerson, marginX, marginY, 1, true, marginX + 1);
    }

    findFreeLocationVertically(idOfRefPerson, marginX, marginY, dir, checkPerifery, periferyRange)
    {
        const i = this.family.findIndex(item => item.id == idOfRefPerson);
        if (i < 0) {return null;}
        const refPerson =  this.family[i];
        const searchRangeY = 100 + marginY;
        for(let i = marginY + 1; i < searchRangeY; i++)
        {
            const y = (dir > 0) ? refPerson.locationInTreeY + i : refPerson.locationInTreeY - i;
            if (this.isLocationFree(refPerson.locationInTreeX, y, marginX, marginY))
            {
                return {x: refPerson.locationInTreeX, y: y};
            }
            //now check perifery a bit to left and right
            if (checkPerifery)
            {
                if (this.isLocationFree(refPerson.locationInTreeX - periferyRange, y, marginX, marginY))
                {
                    return {x: refPerson.locationInTreeX - periferyRange, y: y};
                }
                if (this.isLocationFree(refPerson.locationInTreeX + periferyRange, y, marginX, marginY))
                {
                    return {x: refPerson.locationInTreeX + periferyRange, y: y};
                }
            }
        }
        return {x: 0, y: 0}; //fallback
    }

    findFreeLocationNearby(idOfRefPerson, marginX, marginY, rangeX, rangeY)
    {
        //searches first to the sides, then moves up or down, first favouring down
        const i = this.family.findIndex(item => item.id == idOfRefPerson);
        if (i < 0) {return null;}
        const refPerson =  this.family[i];
        const searchRangeX = rangeX + marginX;
        const searchRangeY = rangeY + marginY;
        let x;
        //to the sides:
        for(let i = marginX + 1; i < searchRangeX; i++)
        {
            x = refPerson.locationInTreeX - i;
            if (this.isLocationFree(x, refPerson.locationInTreeY, marginX, marginY))
            {
                return {x: x, y: refPerson.locationInTreeY};
            }
            x = refPerson.locationInTreeX + i;
            if (this.isLocationFree(x, refPerson.locationInTreeY, marginX, marginY))
            {
                return {x: x, y: refPerson.locationInTreeY};
            }
        }
        //up and down alternating, with down first, to the sides, proioritizing left
        let y;
        for(let i = marginY + 1; i < searchRangeY; i++)
        {
            for(let q = marginX + 1; q < searchRangeX; q++)
            {
                y = refPerson.locationInTreeY + i;
                x = refPerson.locationInTreeX - q;
                if (this.isLocationFree(x, y, marginX, marginY)) { return {x: x, y: y};}
                x = refPerson.locationInTreeX + q;
                if (this.isLocationFree(x, y, marginX, marginY)) { return {x: x, y: y};}
                y = refPerson.locationInTreeY - i;
                x = refPerson.locationInTreeX - q;
                if (this.isLocationFree(x, y, marginX, marginY)) { return {x: x, y: y};}
                x = refPerson.locationInTreeX + q;
                if (this.isLocationFree(x, y, marginX, marginY)) { return {x: x, y: y};}
            }
        }
        return {x: 0, y: 0}; //fallback
    }

    isLocationFree(x, y, marginX, marginY)
    {
        const minX = x - marginX;
        const minY = y - marginY;
        const maxX = x + marginX;
        const maxY = y + marginY;
        for(let i = 0; i < this.family.length; i++)
        {
            if (this.family[i].locationInTreeX >= minX && this.family[i].locationInTreeX <= maxX && this.family[i].locationInTreeY >= minY && this.family[i].locationInTreeY <= maxY)
            {
                return false;
            }
        }
        return true;
    }

    /**
     * Get maximal locations of family members in this tree, both in x and y axis. Can be stretched by overhead.
     */
    getBounds(overheadX = 0, overheadY = 0)
    {
        const bounds = {x: 0, y: 0};
        for(let i = 0; i < this.family.length; i++)
        {
            if (this.family[i].locationInTreeX > bounds.x) {bounds.x = this.family[i].locationInTreeX;}
            if (this.family[i].locationInTreeY > bounds.y) {bounds.y = this.family[i].locationInTreeY;}
        }
        bounds.x += overheadX;
        bounds.y += overheadY;
        return bounds;
    }
}

export default FamilyTree;