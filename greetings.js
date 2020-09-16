module.exports = function () {


    const pg = require("pg");
    const Pool = pg.Pool;
    const connectionString = process.env.DATABASE_URL || 'postgresql://kagiso:123@localhost:5432/greetings';
    const pool = new Pool({
        connectionString
    });


    async function greetUser(name, language) {
    
        switch (language) {

            case "english":
                return "Hello, " + name;
            case "Spanish":
                return "Hola, " + name;

            case "French":
                return "Bonjour , " + name;

        }
    }
 

    async function verifyName(name) {
        var regularExpression = /[^A-Za-z]/g;
        var lettersOnly = name.replace(regularExpression, "")
        var fixedName = lettersOnly.charAt(0).toUpperCase() + lettersOnly.slice(1).toLowerCase()

        const checking = await pool.query(`select id from greetings where name = $1`, [fixedName])
        if (checking.rowCount === 0) {
            await pool.query(`insert into greetings (name, greeted) values ($1, 0)`, [fixedName]);
        }
        await pool.query(`update greetings set greeted = greeted+1 where name = $1`, [fixedName])
    }

    async function getGreetings() {

        const greetings = await pool.query(`select name from greeted`);  
        return greetings.rows;
    }


    async function greetCount() {
        const counter = await pool.query(`select count(*) as counter from greetings`)
        return counter.rows[0].counter;
    }

    return {
      
        getGreetings,
        verifyName,
        greetCount,
        greetUser

    }
}