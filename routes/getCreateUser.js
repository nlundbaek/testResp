module.exports = function (router) {
    router.get("/opret", function(request, response) {
        if(request.session.user){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else {

            response.render("index", {
                css: "css/loginUser.css",
                content: "../html/createUser.html",
                title: "HK | Opret bruger"
            });
        }
    });
}
