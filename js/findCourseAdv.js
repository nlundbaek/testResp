Date.prototype.yyyymmdd = function() {
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    var mm = tomorrow.getMonth() + 1;
    var dd = tomorrow.getDate();

    var month = (mm < 10) ? ("0" + mm) : mm;
    var day = (dd < 10) ? ("0" + dd) : dd;
    return ([this.getFullYear(), !mm[1] && '-', month, !dd[1] && '-', day].join('')) + "";
};

var date = new Date();
var courses = JSON.parse(
    htmlDecode("<%= JSON.stringify(results) %>")
);


function getCourses(courses){
    var results = $("#results");
    results.empty();

    for(var i in courses){
        var course = '<div class="panel panel-default">' +
            '<div class="panel-heading">' +
            '<b>{{title}}</b>' +
            '<div class="pull-right">' +
            '<i>d. {{date}}</i>' +
            '</div>' +
            '</div>' +
            '<div class="panel-body">' +
            '{{description}}' +
            '<p>' +
            '<span class="pull-right">' +
            '<a href="/kursus/{{id}}" target="_blank">Gå til kursus</a>' +
            '</span>' +
            '</p>' +
            '</div>' +
            '</div>';


        var courseTemplate = Handlebars.compile(course);
        var courseData = courseTemplate({
            title: courses[i].title,
            id: courses[i].id,
            description: courses[i].description,
            date: courses[i].date
        });

        results.prepend(courseData);
    }
}

function filterCourses(courses){
    var filteredCourses = [];
    var search = $("#search").val();
    var from = $("#from").val();
    var to = $("#to").val() === "" ? "9999-09-29" : $("#to").val();
    var sector = $("#sector").val();
    var checks = [];
    var queryRegEx = new RegExp(search, "i");

    $("input[type=checkbox]").each(function(){
        if($(this).is(":checked")) {
            checks.push($(this).attr("name"));
        }
    });

    for(var i in courses){

        var success = 0;

        for(var j in checks){
            if(courses[i][checks[j]] === true){
                success++;
            }
        }

        if(success === checks.length
            && courses[i]["date"] >= from
            && courses[i]["date"] <= to
            && (courses[i]["department"] === sector || sector === "")
            && (courses[i]["title"].match(queryRegEx) || courses[i]["description"].match(queryRegEx))) {
            filteredCourses.push(courses[i]);
        }

        success = 0;
    }

    getCourses(filteredCourses);
}

function htmlDecode(value){
    return $('<div/>').html(value).text();
}

$(function(){
    $("#from").val(date.yyyymmdd()).attr("min", date.yyyymmdd());
    $("#to").attr("min", date.yyyymmdd());

    $("input[type=checkbox]").click(function(){
        filterCourses(courses.slice(0));
    });

    $("input[type=date]").change(function(){
        filterCourses(courses.slice(0));
    });

    $("#sector").change(function(){
        filterCourses(courses.slice(0));
    });

    $("#search").keyup(function(){
        filterCourses(courses.slice(0));
    });

    getCourses(courses);
});

