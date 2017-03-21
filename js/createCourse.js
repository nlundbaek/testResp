//prototype
Date.prototype.yyyymmdd = function() {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    var mm = tomorrow.getMonth() + 1;
    var dd = tomorrow.getDate();

    return [this.getFullYear(), !mm[1] && '-', mm, !dd[1] && '-', dd].join('');
};


var date = new Date();

$(function(){
    $("#dato").val(date.yyyymmdd()).attr("min", date.yyyymmdd());
    $("#time").val("14:00");
});

function getCity(zip){
    $.getJSON("https://dawa.aws.dk/postnumre?nr=" + zip, function(data){
        $("#city").val(data[0].navn);
    });
}

if($("#zip").val() > "0"){
    getCity($("#zip").val());
}

$("#zip").keyup(function(e){
    var zip = $(this).val();

    if(zip.length ===4){
        e.preventDefault();
        getCity(zip);
    } else{
        $("#city").val("");
    }
});
