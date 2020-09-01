module.exports = function (stored) {

    var greetedUsers = {};

    function greetUser(name, language) {//greting the user takes 2 parameters (name and language)

        var regularExpression = /[^A-Za-z]/g;
            var lettersOnly = name.replace(regularExpression, "")
            var fixedName = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()

        addedUser(fixedName);

        switch (language) {//if language

            case "english"://in the case of english
                return "Hello, " + fixedName;//return hello & name entered

            case "Spanish"://case of spanish
                return "Hola, " + fixedName;// return hola & name entered 

            case "French"://case of mandrin
                return "Bonjour , " + fixedName;//return ni hao & name entered 

            default:
                return "Hello, " + fixedName;
        }
    }
    function addedUser(userName) {
        if (greetedUsers[userName] === undefined) {
            greetedUsers[userName] = 0;
        }
    }
    //the counter to tell us how many users have been greeted
    function getGreetCounter() {
        return Object.keys(greetedUsers).length;//gets length of local storage object
    }

    
    function getNameFromInput(textBoxValue) {
        var regularExpression = /[^A-Za-z]/g;
        if (textBoxValue !== "") {
            var lettersOnly = textBoxValue.replace(regularExpression, "")
            var name = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()
            return name;
        }
        return "";
    }


    function getAllUsers() {
        // this is for local storage
        return greetedUsers;//no of people greeted
    }
    function resetBtn() {
        userMappedData = {};
        
    }

    return {
        greetUser,
        getGreetCounter,
        getAllUsers,
        resetBtn,
        getNameFromInput
    }
}


