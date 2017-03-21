module.exports = function(router, Course){
    router.get("/soeg", function(request, response){
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
            var query = request.query.q;
            var queryRegEx = new RegExp(query, "i");
            var queryZip = query.length === 4 ? query : null;
            var findCoursesBasedOnTitle = Course.find({
                $or:[
                    {"title": queryRegEx},
                    {"description": queryRegEx},
                    {"zip": queryZip},
                    {"lecturer": queryRegEx}
                ],
                $and: [
                    {"date": {$gt: todayDate}}
                ]
            });

            var promiseFindCoursesBasedOnTitle = findCoursesBasedOnTitle.exec();

            promiseFindCoursesBasedOnTitle.then(function(course) {
                var courses = [];

                for(var i in course){
                    courses.push({
                        id: course[i]._id,
                        title: course[i].title,
                        description: course[i].description,
                        date: course[i].date
                    });
                }

                response.render("index", {
                    user: request.session.user.id,
                    admin: request.session.user.admin,
                    content: "../html/search.html",
                    query: query,
                    results: courses,
                    title: "HK | Søgeresultater"
                });
            });
        }
    });
};