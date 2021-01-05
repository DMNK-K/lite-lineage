import Person from './Person';

class FamilyTree
{
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

    save()
    {
        localStorage.setItem(this.treeName, JSON.stringify(this));
    }

    getNumberOfNodes()
    {
        return this.family.length;
    }
}

export default FamilyTree;