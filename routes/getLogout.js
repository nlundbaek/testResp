module.exports = function (router) {
    router.get("/logud", function(request, response) {
        if(!request.session.user){
            // HVIS MAN IKKE ER LOGGET PÅ
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else{
            request.session.destroy();

            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        }
    });
}
