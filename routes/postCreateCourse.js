module.exports = function (router,Course) {
    router.post("/opretKursus", function(request, response) {

        if(!request.session.user){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        }

        var success = true;
        var errorOnCreation = "";
        var title =request.body.title;
        var description =request.body.description;
        var lecturer = request.body.lecturer;
        var zip = request.body.zip;
        var date=request.body.date;
        var dateArray = date.split("T");
        date = dateArray[0];
        var maxAttend = request.body.maxDeltagere;
        var time = request.body.time;
        var department = request.body.department;
        var addressname =request.body.addressname;
        var address = request.body.address;
        var status = request.body.status;
        var capacity = request.body.maxDeltagere;
        var member=request.body.member === "on";
        var administration = request.body.chk_administration === "on";
        var grafisk=request.body.chk_grafisk === "on";
        var hr = request.body.chk_hr === "on";
        var it = request.body.chk_it === "on";
        var kommunikation = request.body.chk_kommunikation === "on";
        var kundeservice = request.body.chk_kundeservice === "on";
        var laboratorie = request.body.chk_laboratorie === "on";
        var ledelse = request.body.chk_ledelse === "on";
        var logistik = request.body.chk_logistik === "on";
        var raadgivning =  request.body.chk_raadgivning === "on";
        var salg = request.body.chk_salg === "on";
        var sundhed = request.body.chk_sundhed === "on";
        var oekonomi = request.body.chk_oekonomi === "on";

        if(title.length<= 0){
            success = false;
            errorOnCreation = "Du skal angive en titel"
        }
        else if(description.length <=0){
            success = false;
            errorOnCreation ="Du skal angive en beskrivelse"
        }
        else if(maxAttend <=0){
            success=false;
            errorOnCreation = "Du skal angive max antal deltagere"
        }

        else if(lecturer.length <= 0){
            success = false;
            errorOnCreation ="Du skal angive en underviser"
        }
        else if(date.length<=0){
            success = false;
            errorOnCreation ="Du skal angive en dato"
        }
        else if(department.length <=0){
            success = false;
            errorOnCreation="Du skal angive en afdeling"
        }
        else if(status.length <= 0){
            success = false;
            errorOnCreation="Du skal angive beskæftigelsestype"
        }
        else if(capacity.length <= 0){
            success = false;
            errorOnCreation = "Du skal angive et max antal deltagere"
        }
        else if(addressname <=0){
            success = false;
            errorOnCreation="Du skal angive navn på institutionen/organisationen"
        }
        else if(address <=0){
            success = false;
            errorOnCreation="Du skal angive en adresse"
        }

        else if(!zip.length === 4){
            success = false;
            errorOnCreation ="Du skal angive et gyldigt postnummer"
        }

        var chks = [administration, grafisk, hr, it, kommunikation, kundeservice, laboratorie, ledelse, logistik, raadgivning, salg, sundhed, oekonomi];
        var anythingIsChecked = false;

        for(var chk in chks)
        {
            console.log(chks[chk]);
           if (chks[chk])
           {
               anythingIsChecked = true;
           }
        }

        if(!anythingIsChecked){
            success = false;
            errorOnCreation = "Du skal angive mindst ét fagområde"
        }
var addedCourse = null;

        if(success === true){
            var newCourse = new Course({
                title:title.replace(/\r?\n|\r/g, " ").replace(/\//g, "-"),
                description:description.replace(/\r?\n|\r/g, "<br>").replace(/\//g, "-"),
                zip:zip,
                maxattend:maxAttend,
                lecturer:lecturer.replace(/\r?\n|\r/g, " ").replace(/\//g, "-"),
                date:date,
                time: time,
                department:department.replace(/\r?\n|\r/g, " ").replace(/\//g, "-"),
                status:status,
                capacity:capacity,
                addressname:addressname.replace(/\r?\n|\r/g, " ").replace(/\//g, "-"),
                address:address.replace(/\r?\n|\r/g, " ").replace(/\//g, "-"),
                member:member,
                chk_administration:administration,
                chk_grafisk:grafisk,
                chk_hr:hr,
                chk_it:it,
                chk_kommunikation:kommunikation,
                chk_kundeservice:kundeservice,
                chk_laboratorie:laboratorie,
                chk_ledelse:ledelse,
                chk_logistik:logistik,
                chk_raadgivning:raadgivning,
                chk_salg:salg,
                chk_sundhed:sundhed,
                chk_oekonomi:oekonomi
            });
            newCourse.save(function (error) {
                if (!error) {
                    console.log("A course has been created");

                    var findCourse = Course.findOne().sort({_id:-1}).limit(1);
                    var promisefindCourse = findCourse.exec();

                    promisefindCourse.then(function(course) {


                            response.writeHead(302, {
                                "location": "/kursus/" + course._id
                            });

                            response.end();

                    });
                }
                else{
                    console.log(error)
                }
            });
        }
        if (success === false) {
            response.render("index", {
                content: "../html/opretKursus.html",
                title: "HK | Fejl",
                error: errorOnCreation,
                user: request.session.user.id,
                js: "../js/createCourse.js",
                admin: request.session.user.admin
            });
        }
        });




    };
