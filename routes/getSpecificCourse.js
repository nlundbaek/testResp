/**
 * Created by kasper on 29-11-2016.
 */
module.exports = function(router, Course){
    router.get("/kursus/:id", function(request, response){
        if(!request.session.user){
            // HVIS MAN IKKE ER LOGGET PÅ
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else{

            var findCourse = Course.findOne({_id: request.params.id});
            var promisefindCourse = findCourse.exec();
            var asigned = false;
            promisefindCourse.then(function(course) {
                for(var i in course.registered){
                    if(course.registered[i] == request.session.user.id){
                        asigned = true;
                    }
                }
                console.log(asigned)
                    response.render("index", {
                        id: course._id,
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
                        asigned: asigned
                    });


            });
        }
    });
};