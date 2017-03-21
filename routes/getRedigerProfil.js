module.exports = function (router,User) {
    router.get("/redigerprofil", function(request, response) {
        if(!request.session.user){
            response.writeHead(302, {
                "location": "/"
            });

            response.end();
        } else {


            var findUser = User.findOne({_id: request.session.user.id});
            var promisefindUser = findUser.exec();

            promisefindUser.then(function (user) {
                response.render("index", {
                    user: request.session.user.id,
                    admin: request.session.user.admin,
                    content: "../html/redigerprofil.html",
                    js: "../js/redigerprofil.js",
                    title: "HK | Rediger profil",
                    email: user.email,
                    name: user.name,
                    born: user.born,
                    sex: user.sex,
                    zip: user.zip,
                    status: user.status,
                    subject: user.subject,
                    member: user.member,
                    chk_administration: user.chk_administration,
                    chk_grafisk: user.chk_grafisk,
                    chk_hr: user.chk_hr,
                    chk_it: user.chk_it,
                    chk_kommunikation: user.chk_kommunikation,
                    chk_kundeservice: user.chk_kundeservice,
                    chk_laboratorie: user.chk_laboratorie,
                    chk_ledelse: user.chk_ledelse,
                    chk_logistik: user.chk_logistik,
                    chk_raadgivning: user.chk_raadgivning,
                    chk_salg: user.chk_salg,
                    chk_sundhed: user.chk_sundhed,
                    chk_oekonomi: user.chk_oekonomi,
                    chk_newsletter: user.chk_newsletter,


                });
            });

        }
    });
}