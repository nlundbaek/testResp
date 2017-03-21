module.exports = function (router, User, crypto) {
    router.post("/", function(request, response){
        var email = request.body.email;
        var password = request.body.password;
        var md5 = crypto.createHash("md5");
        var checkUser = User.findOne({email: email, password: md5.update(password).digest('hex')});
        var promiseCheckUser = checkUser.exec();

        promiseCheckUser.then(function(user){
            if(user){
                request.session.user = {
                    id: user._id,
                    email: user.email,
                    admin: user.admin
                };

                response.writeHead(302, {
                    "location": "/"
                });

                response.end();
            } else{
                response.render("index", {
                    css: "css/loginUser.css",
                    content: "../html/loginUser.html",
                    title: "HK | Log ind fejl",
                    error: "Fejl i email eller adgangskode"
                });
            }
        });
    });
}
