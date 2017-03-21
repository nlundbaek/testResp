module.exports = function(router, User, Course){
    router.get("/profil", function(request, response){
        if(!request.session.user){
            // HVIS MAN IKKE ER LOGGET PÅ
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else{
            Date.prototype.yyyymmdd = function() {
                var today = new Date();
                var mm = today.getMonth() + 1;
                var dd = today.getDate();

                var day = (dd < 10) ? ("0" + dd) : dd;
                return ([this.getFullYear(), !mm[1] && '-', mm, !dd[1] && '-', day].join('')) + "";
            };

            var startdate = new Date();
            var todayDate = startdate.yyyymmdd();
            // HVIS MAN ER LOGGET PÅ
            var findUser = User.findOne({_id: request.session.user.id});
            var promisefindUser = findUser.exec();

            promisefindUser.then(function(user){
                var arr = user.courses;
                var findCourses = Course.find({
                    _id: {$in: arr},
                    date: {$gt: todayDate}
                }).sort("date").limit(3).exec();
                findCourses.then(function(courses){
                    response.render("index", {
                        user: request.session.user.id,
                        admin: request.session.user.admin,
                        content: "../html/profil.html",
                        js: "../js/profil.js",
                        title: "HK | Min profil",
                        name: user.name,
                        age: user.age,
                        zip: user.zip,
                        status: user.status,
                        subject: user.subject,
                        email: user.email,
                        born: user.born,
                        courses: courses
                    });
                });
            });

        }
    });
};