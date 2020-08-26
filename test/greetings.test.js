let assert = require("assert");
let GreetFactory = require('../greetings')


describe("The Greet function", function () {
    //greet in english
    it("should greet Kagiso in English", function () {
        var greet = GreetFactory()
        //takes 2 parameters langauge and name
        assert.equal("Hello, Kagiso", greet.greetUser("Kagiso", "English"));
    });
    //greet in mandrin
    it("should greet Kagiso in French", function () {
        var greet = GreetFactory()

        assert.equal("Bonjour , Kagiso", greet.greetUser("Kagiso", "French"));
    });
    //greet in spanish
    it("should greet Kagiso in Spanish", function () {
        var greet = GreetFactory()

        assert.equal("Hola, Kagiso", greet.greetUser("Kagiso", "Spanish"));
    });
});
describe("The GreetCounter function", function () {
    it("should return the total number of users greeted starting from 0", function () {
        var greet = GreetFactory();
        //counter should be 0 since no name is greeted
        assert.equal(0, greet.getGreetCounter());
    });
    it("should return the total number of users greeted in English", function () {
        var greet = GreetFactory();

        greet.greetUser("Josh", "English")//takes 2 parameters name and language
        greet.greetUser("Kagiso", "English")

        assert.equal(2, greet.getGreetCounter());//how many times the greetUser function occoured
    });
    it("should return the total number of users greeted in Spanish", function () {
        var greet = GreetFactory();

        greet.greetUser("Joe", "Spanish")
        greet.greetUser("Kagiso", "Spanish")
        greet.greetUser("Josh", "Spanish")
        greet.greetUser("Jill", "Spanish")

        assert.equal(4, greet.getGreetCounter());
    });
    it("should return the total number of users greeted in French", function () {
        var greet = GreetFactory();

        greet.greetUser("Joe", "French")

        assert.equal(1, greet.getGreetCounter());
    });
});
describe("The getAllUsers function", function () {
    it("should return the object of all users greeted on local storage", function () {
        var greet = GreetFactory();

        greet.greetUser("joe", "zulu");
        greet.greetUser("Kagiso", "english");

        assert.deepEqual({ "joe": 0, "Kagiso": 0 }, greet.getAllUsers());
    });

    it("should return one if clicked one for kagiso in english", function () {
        var greet = GreetFactory();

        greet.greetUser("Kagiso", "english")

        assert.equal(1, greet.getGreetCounter());
    });

    it("should return one if clicked one for Max in French", function () {
        var greet = GreetFactory();

        greet.greetUser("Max", "French")

        assert.equal(1, greet.getGreetCounter());
    });
});
describe("The getNameFromInput function", function () {
    it("should return a name without special characters", function () {
        var greet = GreetFactory()
        //uses  reguar expression to remove numbers from string
        assert.equal("Kagiso", greet.getNameFromInput("k655a6#$^()456g64i53s35o6"));
        assert.equal("Sean", greet.getNameFromInput("s453e8!@#$%^&*(67a754n86475"));

        assert.equal("", greet.getNameFromInput(""));
    });
    it("should return a name without number characters", function () {
        var greet = GreetFactory()
        //uses  reguar expression to remove numbers from string
        assert.equal("Kagiso", greet.getNameFromInput("k655a6456g64i53s35o6"));
        assert.equal("Sean", greet.getNameFromInput("s453e867a754n86475"));

        assert.equal("", greet.getNameFromInput(""));
    });
    it("should return a name without numbers or special characters", function () {
        var greet = GreetFactory()
        //uses  reguar expression to remove numbers from string
        assert.equal("Kagiso", greet.getNameFromInput("k655a645@#$%^6g64i53s35o6"));
        assert.equal("Sean", greet.getNameFromInput("s453e867a75@#$%^&*4n86475"));

        assert.equal("", greet.getNameFromInput(""));
    });
});