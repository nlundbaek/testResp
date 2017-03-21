/**
 * Created by Michael on 22-11-2016.
 */
module.exports = function(router, Course){
    router.get("/findkursus", function(request, response){
        if(!request.session.user){
            // HVIS MAN IKKE ER LOGGET PÅ
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else{
            // HVIS MAN ER LOGGET PÅ


            Date.prototype.yyyymmdd = function() {
                var today = new Date();
                var mm = today.getMonth() + 1;
                var dd = today.getDate();

                var month = (mm < 10) ? ("0" + mm) : mm;
                var day = (dd < 10) ? ("0" + dd) : dd;
                return [this.getFullYear(), !mm[1] && '-', month, !dd[1] && '-', day].join('');
            };

            var startdate = new Date();
            var todayDate = startdate.yyyymmdd();
            var findCoursesBasedOnTitle = Course.find({
                    "date": {$gt: todayDate}
            }).sort("-date");

            var promiseFindCoursesBasedOnTitle = findCoursesBasedOnTitle.exec();

            promiseFindCoursesBasedOnTitle.then(function(course) {
                var courses = [];

                for(var i in course){
                    courses.push({
                        id: course[i]._id,
                        title: course[i].title,
                        description: course[i].description,
                        date: course[i].date,
                        department: course[i].department,
                        administration: course[i].chk_administration,
                        grafisk: course[i].chk_grafisk,
                        hr: course[i].chk_hr,
                        it: course[i].chk_it,
                        kommunikation: course[i].chk_kommunikation,
                        kundeservice: course[i].chk_kundeservice,
                        laboratorie: course[i].chk_laboratorie,
                        ledelse: course[i].chk_ledelse,
                        logistik: course[i].chk_logistik,
                        raadgivning: course[i].chk_raadgivning,
                        salg: course[i].chk_salg,
                        sundhed: course[i].chk_sundhed,
                        oekonomi: course[i].chk_oekonomi
                    });
                }

                response.render("index", {
                    user: request.session.user.id,
                    content: "../html/findCourseAdv.html",
                    js: "../js/findCourseAdv.js",
                    title: "HK | Kursus søg",
                    results: courses,
                    name: request.session.user.name,
                    admin: request.session.user.admin
                });
            });
        }
    });
};