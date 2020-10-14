module.exports = function greetingsRoutes(greetings) {

    async function home(req, res, next) {
        try {
            var greetCounter = await greetings.greetCount()
            res.render('home', {
                counter: greetCounter
            });
        } catch (err) {
            next(err)
        }
    }

    async function greeting(req, res, next) {
        var theName = req.body.nameInput
        var language = req.body.selector

        var greetCounter = await greetings.greetCount()
        try {

            if (theName === '' && language === undefined) {
                req.flash('error', 'please enter a name & select a language!')
                greetCounter
            }
            else if (theName === '') {
                req.flash('error', 'please enter a name!')
                greetCounter
            }
            else if (language === undefined) {
                req.flash('error', 'Please select a language')
                greetCounter
            }
            else {
                await greetings.verifyName(theName)
                var greetUser = await greetings.greetUser(theName, language)
                var greetCounter = await greetings.greetCount()
            }

            res.render("home", {
                greetDisplay: greetUser,
                counter: greetCounter
            });
        } catch (err) {
            next(err);
        }
    }



    async function greeted(req, res, next) {
        try {
            const users = await greetings.allUsers()
            res.render('greeted', {
                allUsers: users
            })
        } catch (err) {
            next(err)
        }
    }



    async function counter(req, res, next) {
        var user = req.params.user
        try {
            var times = await greetings.perPerson(user)
            res.render('times', {
                name: user,
                counter: times
            })
        } catch (err) {
            next(err)
        }
    }



    async function reset(req, res, next) {
        try {
            await greetings.reset()
            var greetCounter = await greetings.greetCount()
            res.render('home', {
                counter: greetCounter
            })
        } catch (err) {
            next(err)
        }
    }


    return {
        home,
        greeting,
        greeted,
        counter,
        reset
    }
}