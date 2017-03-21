module.exports = function (router, User, Course) {
    router.post("/kursus/:id", function (request, response) {

        if(!request.session.user){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        }
        else{
            var courseid =request.params.id;
            var userid = request.session.user.id;
            var success = false;
            var found = false;
            var findCourse = Course.findOne({_id: courseid});
            var promisefindCourse = findCourse.exec();
            var onError = "Kurset er fyldt";

            promisefindCourse.then(function(course) {
                    for(var i = 0; i<course.registered.length;i++){
                        if(course.registered[i] == userid){
                            found=true;
                            onError="Du er allerede tilmeldt dette kursus";
                        }
                    }
                if(course.registered.length < course.maxattend && found ==false) {
                    if(found===false) {
                        Course.findOneAndUpdate({_id: courseid}, {
                            $push: {registered: userid}
                        }, function (err) {
                            if (err) {
                                console.log(err);
                                res.status(500).send(err);
                            }

                        });

                        User.findOneAndUpdate({_id: userid}, {$push: {courses: courseid}}, function (err) {
                            if (err) {
                                console.log(err);
                                res.status(500).send(err);
                            }

                        });
                        success = true;
                    };



                    if (success===true && found=== false){
                        response.render("index", {
                            content: "../html/specificCourse.html",
                            id: request.params.id,
                            title: "HK | Bruger oprettet",
                            success: "Du er tilmeldt Kurset",
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
                            admin: request.session.user.admin,
                            asigned:true
                        });
                    }
                }
                if(success==false || found == true){
                    response.render("index", {
                        content: "../html/specificCourse.html",
                        title: "HK | Fejl",
                        error: onError,
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
                }


            });


        }



    })};

