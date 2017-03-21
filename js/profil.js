function getAge(str) { // birthday is a date
    var d = new Date();
    var bits = str.split('-')
    d.setHours(0,0,0,0); //normalise
    d.setFullYear(bits[2])
    d.setMonth(bits[1]-1)
    d.setDate(bits[0])
    var now = new Date();
    now.setHours(0,0,0,0); //normalise
    var years = now.getFullYear()-d.getFullYear();
    d.setFullYear(now.getFullYear())
    var diff = now.getTime()-d.getTime()
    if ( diff <0) years--;
    return years
}

function getCity(zip){
    var Promise = $.getJSON("https://dawa.aws.dk/postnumre?nr=" + zip);

    Promise.done(function(res){
        if(res[0] != undefined) {
            $("#panelbopael").append(res[0].navn);
        }
    });
}

$(function(){
    $("#panelalder").append(getAge("<%=born%>"));
    getCity("<%=zip%>");
});



