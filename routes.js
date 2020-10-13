module.exports = function greetingsRoutes(greetings) {

    async function home(req, res, next) {
        try {
            res.render('home');
        } catch (err) {
            next(err)
        }
    }

    async function greeting(req, res, next) {
        var theName = req.body.nameInput
        var language = req.body.selector

        try {
            if (theName === '' && language === undefined) {
                req.flash('error', 'please enter a name & select a language!')
            }
            else if (theName === '') {
                req.flash('error', 'please enter a name!')
            }
            else if (language === undefined) {
                req.flash('error', 'Please select a language')
            }
            else{
                await greetings.verifyName(theName)
                var greetCounter = await greetings.greetCount()
            }

            var greetUser = await greetings.greetUser(theName, language)
            

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
                allUsers:  users
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
            const reset = greetings.reset()
            res.render('home')
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