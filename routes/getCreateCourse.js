module.exports = function (router) {
    router.get("/opretkursus", function(request, response) {
        if(!(request.session.user && request.session.user.admin)){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else {
            response.render("index", {
                user: request.session.user.id,
                content: "../html/opretKursus.html",
                title: "HK | Opret kursus",
                js: "../js/createCourse.js",
                admin: request.session.user.admin
            });
        }
    });
};