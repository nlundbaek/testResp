module.exports = function (router, User, Course, Feedback) {
    router.get("/", function(request, response){
        if(!request.session.user){
            // HVIS MAN IKKE ER LOGGET PÅ
            response.render("index", {
                css: "css/loginUser.css",
                content: "../html/loginUser.html",
                title: "HK | Velkommen"
            });
        } else{


//prototype
                Date.prototype.yyyymmdd = function() {
                    var today = new Date();
                    var tomorrow = new Date();
                    tomorrow.setDate(today.getDate());

                    var mm = tomorrow.getMonth() + 1;
                    var dd = tomorrow.getDate();

                    var month = (mm < 10) ? ("0" + mm) : mm;
                    var day = (dd < 10) ? ("0" + dd) : dd;
                    return ([this.getFullYear(), !mm[1] && '-', month, !dd[1] && '-', day].join('')) + "";
                };

                var feedbackArray = [];
                var courseArray= [];
                var startdate = new Date();
                var todayDate = startdate.yyyymmdd();
                var findCourse = Course.find({}).sort({date:-1});
                var findFeedback = Feedback.find({}).sort({date:-1});
                var promisefindCourse = findCourse.exec();
                var promisefindFeedback = findFeedback.exec();


                var p1 = promisefindCourse.then(function(course) {
                    for (var i = 0; i < course.length; i++) {
                        if (course[i].date < todayDate && courseArray.length <3) {
                            courseArray.push(course[i-1]);
                            courseArray.push(course[i-2]);
                            courseArray.push(course[i-3]);

                        }
                    }
                    });

                var p2 = promisefindFeedback.then(function (Feedback) {

                            feedbackArray.push(Feedback[0]);
                            feedbackArray.push(Feedback[1]);
                            feedbackArray.push(Feedback[2]);




                });

                Promise.all([p1, p2]).then(function(){
                    // HVIS MAN ER LOGGET PÅ
                    response.render("index", {
                        user: request.session.user.id,
                        content: "../html/frontpage.html",
                        title: "HK | Forside",
                        email: request.session.user.email,
                        admin: request.session.user.admin,
                        courseArray:courseArray,
                        feedbackArray:feedbackArray

                     });



            });



    };


    });
}
