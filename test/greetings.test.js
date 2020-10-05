let assert = require("assert");
let Greetings = require('../greetings')
var greetings = Greetings()



describe("The Greet function", function () {


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://kagiso:123@localhost:5432/greetings';
    const pool = new Pool({
        connectionString
    });


    describe("The getNames function", function () {
  

        const INSERT_QUERY = "insert into greetings (name, greeted) values ($1, $2)";

        beforeEach(async function () {
            await pool.query("delete from greetings");
        });


        it("should be able to greet kagiso once", async function () {


            const name = "kagiso";
            const counter = 1;
            await greetings.greetUser(name, counter)
            await pool.query(INSERT_QUERY, ["kagiso", 1]);
            const results = await pool.query(`select count( * ) from greetings `);
            assert.equal(1, results.rows[0].count);
        });

        it("should be able to greet kagiso multiple times", async function () {
            const name = "kagiso";
            const counter = 0;
            await greetings.greetUser(name, counter)
            await pool.query(INSERT_QUERY, ["kagiso", 1]);
            await pool.query(INSERT_QUERY, ["kagiso", 2]);
            await pool.query(INSERT_QUERY, ["kagiso", 3]);
            const results = await pool.query(`select count( * ) from greetings `);
            assert.equal(3, results.rows[0].count);
        });

        it("should be able to find a name", async function () {
            const name = "kagiso";
            const counter = 0;
            await greetings.greetUser(name, counter)
            await pool.query(INSERT_QUERY, ["kagiso", 0]);
            const results = await pool.query(`select * from greetings where name = $1`, ["kagiso"]);
            assert.equal("kagiso", results.rows[0].name);
        });


        // it("Should be able to reset the database table", async function () {
        //     const reset = await pool.query("delete from greetings")
        //     assert.equal(rows[0]);
        // })

        it("should be able to count", async function () {
            const name = "kagiso";
            const counter = 0;
            await pool.query(INSERT_QUERY, ["kagiso", 3]);
            const results = await pool.query("select * from greetings where name = $1", ["kagiso"]);
            assert.equal("kagiso", results.rows[0].name);
            assert.equal(3, results.rows[0].greeted);
        });

        it("should be able to update a counter", async function () {
            const name = "kagiso";
            const counter = 7;
            await greetings.greetCount(name)
            await pool.query(INSERT_QUERY, ["kagiso", 7]);
            let results = await pool.query("select * from greetings where name = $1", ["kagiso"]);
            //checking initial values
            assert.equal("kagiso", results.rows[0].name);
            assert.equal(7, results.rows[0].greeted);
            //updating to new values
            await pool.query("update greetings set greeted = $2  where name = $1", ["kagiso", 5]);
            results = await pool.query("select * from greetings where name = $1", ["kagiso"]);
            //new values should have been found
            assert.equal("kagiso", results.rows[0].name);
            assert.equal(5, results.rows[0].greeted);
        });
        after(function () {
            pool.end();
        })
    });
})
