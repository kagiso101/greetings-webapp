let assert = require("assert");
let Greetings = require('../greetings')
var greetings = Greetings()



describe("The Greet function", function () {


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://kagiso:123@localhost:5432/greetings2';
    const pool = new Pool({
        connectionString
    });


    describe("The getNames function", function () {

 
        const INSERT_QUERY = "insert into greetings (name, greeted) values ($1, $2)";

        beforeEach(async function () {
            await pool.query(`delete from greetings`);
        });


        it("should be able to add name to the database", async function () {

            var name = 'Kagiso'

            await greetings.verifyName(name)
           

            const results = await pool.query(`select count( * ) from greetings `);
            assert.deepEqual([{count: 1}], results.rows);
        });

        it("should be able to add multiple times to the database", async function () {

            const name2 = "sphiwe";
            const name3 = "teko";
            const name4 = "charl";
        
            await greetings.verifyName(name2)
            await greetings.verifyName(name3)
            await greetings.verifyName(name4)
            var allUsers = await greetings.allUsers()

            const results = await pool.query(`select count( * ) from greetings `);
            assert.deepEqual([{ name: 'sphiwe' }], [{ name: 'sphiwe' }], [{ name: 'teko' }], [{ name: 'charl' }], allUsers);
        });

        it("should be able to find a name", async function () {
            const name = "kagiso";
            const counter = 0;
            await greetings.greetUser(name, counter)
            await pool.query(INSERT_QUERY, ["kagiso", 0]);
            const results = await pool.query(`select * from greetings where name = $1`, ["kagiso"]);
            assert.equal("kagiso", results.rows[0].name);
        });

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