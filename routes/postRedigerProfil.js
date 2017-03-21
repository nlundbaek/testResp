module.exports = function (router,User) {
    router.post("/redigerprofil", function(request, response) {

        if(!request.session.user){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        }
        var name =request.body.name;
        var born =request.body.day+"-"+request.body.month+"-"+request.body.year;
        var sex = request.body.sex;
        var zip = request.body.zip;
        var status = request.body.status;
        var subject = request.body.subject;
        var member=request.body.member=== "on";
        var administration = request.body.administration=== "on";
        var grafisk=request.body.grafisk=== "on";
        var hr = request.body.hr=== "on";
        var it = request.body.it=== "on";
        var kommunikation = request.body.kommunikation=== "on";
        var kundeservice= request.body.kundeservice=== "on";
        var laboratorie = request.body.laboratorie=== "on";
        var ledelse =request.body.ledelse=== "on";
        var logistik=request.body.logistik=== "on";
        var raadgivning=  request.body.raadgivning=== "on";
        var salg = request.body.salg=== "on";
        var sundhed=request.body.sundhed=== "on";
        var oekonomi=request.body.oekonomi=== "on";
        var newsletter = request.body.newsletter === "on";



        User.findOneAndUpdate({_id :request.session.user.id},{"$set":{
            "name":name,
            "sex":sex,
            "zip":zip,
            "born":born,
            "status":status,
            "subject":subject,
            "member":member,
            "chk_administration":administration,
            "chk_grafisk":grafisk,
            "chk_hr":hr,
            "chk_it":it,
            "chk_kommunikation":kommunikation,
            "chk_kundeservice":kundeservice,
            "chk_laboratorie" :laboratorie,
            "chk_ledelse ":ledelse,
            "chk_logistik":logistik,
            "chk_raadgivning":raadgivning,
            "chk_salg" :salg,
            "chk_sundhed":sundhed,
            "chk_oekonomi":oekonomi,
            "chk_newsletter":newsletter




        }},{multi:true},function(err){

            if(err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                response.writeHead(302, {
                    "location": "/profil"
                });

                response.end();
            }
        });







})};
