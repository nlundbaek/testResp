module.exports = function (router, Feedback, Course) {
    router.post("/feedback/:id", function (request, response) {

        if(!request.session.user){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        }
        else{
            var success = false;
            var user = request.session.user.id;
            function formatDate(date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;

                return [year, month, day].join('-');
            };
            var date = formatDate(new Date());
            var newFeedback = new Feedback({
                courseId: request.params.id,
                userId: user,
                title: request.body.title,
                content: request.body.content,
                date: date

            });

            newFeedback.save(function (error) {


                if (!error) {
                    var findCourse = Course.findOne({_id: request.params.id});
                    var promisefindCourse = findCourse.exec();

                    promisefindCourse.then(function(course) {
                        success = true;
                        if (success === false) {
                            response.render("index", {
                                content: "../html/specificCourse.html",
                                title: "HK | Fejl",
                                error: "Error",
                                id: request.params.id,
                                user: request.session.user.id,
                                titleCourse: course.title,
                                desc: course.description,
                                lecturer: course.lecturer,
                                sector: course.department,
                                membersOnly: course.member,
                                status: course.status,
                                addressname: course.addressname,
                                address: course.address,
                                zip: course.zip,
                                date: course.date,
                                time: course.time,
                                admin: request.session.user.admin
                            });
                        } else {
                            response.render("index", {
                                id: request.params.id,
                                user: request.session.user.id,
                                titleCourse: course.title,
                                content: "../html/specificCourse.html",
                                title: "HK | " + course.title,
                                desc: course.description,
                                lecturer: course.lecturer,
                                sector: course.department,
                                membersOnly: course.member,
                                status: course.status,
                                addressname: course.addressname,
                                address: course.address,
                                zip: course.zip,
                                date: course.date,
                                time: course.time,
                                admin: request.session.user.admin,
                                success: "Din feedback er oprettet"
                            });
                        }

                    });

                }
            });

        }



    })};