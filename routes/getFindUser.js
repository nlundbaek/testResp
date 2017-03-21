module.exports = function (router, User) {
    router.get("/findbrugere", function(request, response) {
        if(!(request.session.user && request.session.user.admin)){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else {
            if(request.query.email) {
                var findUser = User.findOne({email: request.query.email});
                var promisefindUser = findUser.exec();

                promisefindUser.then(function (user) {
                    response.render("index", {
                        user: request.session.user.id,
                        content: "../html/findbrugere.html",
                        title: "HK | Find brugere",
                        email: user.email,
                        id: user._id,
                        isAdmin: user.admin ? "true" : "false",
                        admin: request.session.user.admin
                    });
                });
            } else{
                response.render("index", {
                    user: request.session.user.id,
                    content: "../html/findbrugere.html",
                    title: "HK | Find brugere",
                    admin: request.session.user.admin
                });
            }


        }
    });
};