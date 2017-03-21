$(function(){
    $("select[name=sex] option").filter(function(){
        return this.text === "<%=sex%>";
    }).prop("selected", true);
    $("select[name=status] option").filter(function(){
        return this.text === "<%=status%>";
    }).prop("selected", true);
    $("select[name=subject] option").filter(function(){
        return this.text === "<%=subject%>";
    }).prop("selected", true);
    var born = "<%=born%>";
    var bornArray = born.split("-");
    $("select[name=day] option").filter(function(){
        return this.text === bornArray[0];
    }).prop("selected", true);
    $("select[name=month] option").filter(function(){
        return this.text === bornArray[1];
    }).prop("selected", true);
    $("select[name=year] option").filter(function(){
        return this.text === bornArray[2];
    }).prop("selected", true);
    $("#zip").val("<%=zip%>");

    function getCity(zip){
        $.getJSON("https://dawa.aws.dk/postnumre?nr=" + zip, function(data){
            $("#city").val(data[0].navn);
        });
    }

    if($("#zip").val() > "0"){
        getCity($("#zip").val());
    }

    $("input[name=member]").prop("checked", "<%=member%>" === "true");
    $("input[name=administration]").prop("checked", "<%=chk_administration%>" === "true");
    $("input[name=grafisk]").prop("checked", "<%=chk_grafisk%>" === "true");
    $("input[name=hr]").prop("checked", "<%=chk_hr%>" === "true");
    $("input[name=it]").prop("checked", "<%=chk_it%>" === "true");
    $("input[name=kommunikation]").prop("checked", "<%=chk_kommunikation%>" === "true");
    $("input[name=laboratorie]").prop("checked", "<%=chk_laboratorie%>" === "true");
    $("input[name=kundeservice]").prop("checked", "<%=chk_kundeservice%>" === "true");
    $("input[name=ledelse]").prop("checked", "<%=chk_ledelse%>" === "true");
    $("input[name=logistik]").prop("checked", "<%=chk_logistik%>" === "true");
    $("input[name=raadgivning]").prop("checked", "<%=chk_raadgivning%>" === "true");
    $("input[name=salg]").prop("checked", "<%=chk_salg%>" === "true");
    $("input[name=sundhed]").prop("checked", "<%=chk_sundhed%>" === "true");
    $("input[name=oekonomi]").prop("checked", "<%=chk_oekonomi%>" === "true");
    $("input[name=newsletter]").prop("checked","<%=chk_newsletter%>" === "true");

    $("#zip").keyup(function(e){
        var zip = $(this).val();

        if(zip.length ===4){
            e.preventDefault();
            getCity(zip);
        } else{
            $("#city").val("");
        }
    });
});