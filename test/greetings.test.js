let assert = require("assert");
let Greetings = require('../greetings')



describe("The Greet function", function () {


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://kagiso:123@localhost:5432/greetings2';
    const pool = new Pool({
        connectionString
    });


    var greetings = Greetings(pool)


    describe("The getNames function", function () {

 
        const INSERT_QUERY = "insert into greetings (name, greeted) values ($1, $2)";

        beforeEach(async function () {
            await pool.query(`delete from greetings`);
        });


        it("should be able to add name to the database", async function () {

            var name = "Kagiso"

            await greetings.verifyName(name)
            const allUsers = await greetings.allUsers()

            assert.deepEqual([{ name: "Kagiso" }], allUsers);
        });

        it("should be able to add multiple times to the database", async function () {

            const name2 = "sphiwe";name4
            const name3 = "teko";
            const name4 = "charl";

            await greetings.verifyName(name2)
            await greetings.verifyName(name3)
            await greetings.verifyName(name4)
            const allUsers = await greetings.allUsers()

            assert.deepEqual([{ name: 'sphiwe' }], [{ name: 'sphiwe' }], [{ name: 'teko' }], [{ name: 'charl' }], allUsers);
        });

        it("should be able to find counter for times a person was greeted ", async function () {

            var name = "Kagiso"

            await greetings.verifyName(name)


            assert.deepEqual(1, await greetings.perPerson(name));
        });

        it("should be able to get counter for all greeted users", async function () {

            const name2 = "sphiwe";
            const name3 = "teko";
            const name4 = "charl";
            const name5 = "Mecayle";

            await greetings.verifyName(name5)
            await greetings.verifyName(name2)
            await greetings.verifyName(name3)
            await greetings.verifyName(name4)

            const allUsers = await greetings.allUsers()

            assert.deepEqual(4, await greetings.greetCount());
        });

        it("should be able to reset the dataBase", async function () {

            await greetings.verifyName('siya')
            await greetings.verifyName('Ayanda')

            const allUsers = await greetings.allUsers()

            assert.deepEqual([], await greetings.reset());
        });

        after(function () {
            pool.end();
        })
    });
})