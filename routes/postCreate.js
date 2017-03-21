module.exports = function (router, User, crypto) {
    router.post("/opret", function (request, response) {
        var success = true;
        var errorOnCreation = "";
        var email = request.body.email;
        var password = request.body.password;
        var password_repeat = request.body.password_repeat;
        var checkEmail = User.findOne({email: email});
        var promiseCheckEmail = checkEmail.exec();

        promiseCheckEmail.then(function (user) {
            if (user) {
                success = false;
                errorOnCreation = "E-mail adressen eksisterer allerede";
            } else {
                if(!email.match(/^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/i)){
                    success =false;
                    errorOnCreation = "Du skal bruge en gyldig E-mail adresse"
                }

                else{

                if(!password.match(/(?=.*[0-9])(?=.*[a-z])([^\s?]){8}/i)){
                    success = false;
                    errorOnCreation = "Adgangskoden skal indeholde mindst 8 karaktere, 1 tal, 1 bogstav og ingen mellemrum!";
                }else{
                    if (password !== password_repeat) {
                        success = false;
                        errorOnCreation = "Adgangskoderne er ikke ens";
                    } else {
                        var md5 = crypto.createHash("md5");
                        var newUser = new User({
                            email: email,
                            password: md5.update(password).digest('hex')

                        });


                        newUser.save(function (error) {
                            if (!error) {
                                console.log("A user has been created");
                            }
                        });
                    }
                }

            }
            }

            if (success === false) {
                response.render("index", {
                    css: "css/loginUser.css",
                    content: "../html/createUser.html",
                    title: "HK | Fejl",
                    error: errorOnCreation
                });
            } else {
                response.render("index", {
                    css: "css/loginUser.css",
                    content: "../html/createUser.html",
                    title: "HK | Bruger oprettet",
                    success: "Din bruger er oprettet"
                });
            }
        });
    });
}
