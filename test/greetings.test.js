let assert = require("assert");
let GreetFactory = require('../greetings')
var greetings = GreetFactory()

describe("The Greet function", function () {


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://kagiso:123@localhost:5432/greetings';
    const pool = new Pool({
        connectionString
    });
    const INSERT_QUERY = "insert into greetings (name, greeted_in) values ($1, $2)";

    beforeEach(async function () {
        await pool.query("delete from greetings");
    });


    //greet in english
    it("should greet Charl in English", async function () {
        await greetings.greetUser(name, language)

        await pool.query(INSERT_QUERY, ["Charl", "English"]);

        const results = await pool.query("select count(*) from greetings");

        assert.equal(1, results.rows[0].count);

    });
    //greet in mandrin
    it("should greet Kagiso in French", async function () {

        await pool.query(INSERT_QUERY, ["kagiso", "French"])

        const results = await pool.query("select count(*) from greetings");

        assert.equal(1, results.rows[0].count)
    });
    //greet in spanish
    it("should greet Sphiwe in Spanish", async function () {

        await pool.query(INSERT_QUERY, ["kagiso", "Spanish"])

        const results = await pool.query("select count(*) from greetings");

        assert.equal(1, results.rows[0].count)
    });
    it("should be able to find all names greeted ", async function () {

        await pool.query(INSERT_QUERY, ["Charl", "English"]);
        await pool.query(INSERT_QUERY, ["Kagiso", "French"]);
        await pool.query(INSERT_QUERY, ["Sphiwe", "Spanish"]);

        const results = await pool.query("select count(*) from greetings");

        assert.equal(3, results.rows[0].count);

    });
    it("should be able to find the user greeted ", async function () {

        await pool.query(INSERT_QUERY, ["Kagiso", "French"]);

        const results = await pool.query("select * from greetings where name = $1", ["Kagiso"]);

        assert.equal("Kagiso", results.rows[0].name);
        assert.equal("French", results.rows[0].greeted_in);

    });

    it("should be able to find the language the user is greeted in", async function () {

        await pool.query(INSERT_QUERY, ["Kagiso", "French"]);

        const results = await pool.query("select * from greetings where greeted_in = $1", ["French"]);

        assert.equal("Kagiso", results.rows[0].name);
        assert.equal("French", results.rows[0].greeted_in);

    });


    after(function () {
        pool.end();
    })

});