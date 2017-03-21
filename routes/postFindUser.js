module.exports = function (router, User) {
    router.post("/findbrugere", function(request, response){
        User.findOneAndUpdate({email: request.query.email},{"$set":{
            "admin":true,
        }},{},function(err){
            if(!err) {
                response.writeHead(302, {
                    "location": request.get("referer")
                });

                response.end();
            }
        });
    });
}
