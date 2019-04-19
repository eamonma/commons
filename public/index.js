"use strict";var m={get:function get(a){return"#"===a.charAt(0)?document.getElementById(a.substring(1,a.length)):"."===a.charAt(0)?document.getElementsByClassName(a.substring(1,a.length))[0]:document.getElementsByTagName(a)[0]},getS:function getS(a){return"#"===a.charAt(0)?[document.getElementById(a.substring(1,a.length))]:"."===a.charAt(0)?document.getElementsByClassName(a.substring(1,a.length)):document.getElementsByTagName(a)}};

var weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

var schedule = {
    utility: {
        // returns the days since the unix epoch
        daysSince: function (ms) {
            return Math.floor(ms / 8.64e7);
        },
        // returns the day no, being 1 or 2, depending on the day
        dayNo: function (days) {
            return (days % 2 === 1) ? (1) : (2);
        },
        // return the weekday, 0 being Sunday
        weekday: function (days) {
            return (days + 4) % 7;
        },
        // returns the week no, being 1 or 2, depending on the week
        weekNo: function (days) {
            return (((days + 4) % 14) < 7) ? (1) : (2);
        },
        gmtToLocal: function (time) {
            return time - (new Date().getTimezoneOffset()) * 60 * 1000;
        },
        localToGmt: function (time) {
            return time + (new Date().getTimezoneOffset()) * 60 * 1000;
        },
        queue: function (array) {
            var last = array.shift();
            array.push(last);
            return array;
        },
        unqueue: function (array) {
            var first = array.pop();
            array.unshift(first);
            return array;
        },
        getFourthBlock: function (day, courses) {
            return (day === 1) ? (courses[3]) : (courses[7]);
        },
        setCourses: function (courses, name) {
            name = name || "courses"
            return localStorage.setItem(name, JSON.stringify(courses));
        },
        getCourses: function (name) {
            name = name || "courses"
            return JSON.parse(localStorage.getItem(name));
        },
        promptCourses: function (length, list) {
            //list of items with input fields
            length = length ? length : 8;
            var result = [];
            for (var i = 0; i < 8; i++) {
                var course = list[i].value;
                // var course = prompt("What is your block " + (i + 1) + " ?");
                result.push({
                    name: course
                });
            }
            return result;
        },
        deleteCourses: function (name, cb) {
            name = name || "courses"
            localStorage.removeItem(name);
            cb()
        },
        coursesToArray: function (list) {
            if(Array.isArray(list)) {
                return list
            }
            var arr = [];
            list.forEach(function (course) {
                arr.push(course.name);
            });
            return arr;
        }
    },
    generate: function (courses) {
        var weeks = [];
        var weekOne = [];
        var weekTwo = [];
        var one = courses.slice(0, 4);
        var oneMorning = one.slice(0, 3);
        var two = courses.slice(4);
        var twoMorning = two.slice(0, 3);
        var _ = this.utility;

        var returnedOne = oneMorning.slice(0);

        var returnedTwo = twoMorning.slice(0);

        for (var i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                // if day 1
                if (i === 0) {
                    // if monday of 1
                    weeks.push(oneMorning);
                    continue;
                }
                var tempArr = returnedOne;                
                tempArr = _.queue(returnedOne);
                weeks.push(tempArr.slice(0));
            } else {
                // if day 2
                if (i === 1) {
                    // if tuesday of 1
                    weeks.push(twoMorning);
                    continue;
                }
                var tempArr = returnedTwo;
                tempArr = _.queue(returnedTwo);
                weeks.push(tempArr.slice(0));
            }
        }
        var j = 0;
        weeks.forEach(function(day) {
            var finalBlock = j % 2 === 0 ? courses[3] : courses[7]
            j++
            day.push(finalBlock)
        })

        weekOne = weeks.slice(0, 5);
        weekTwo = weeks.slice(5);
        
        return {
            weekOne: weekOne,
            weekTwo: weekTwo,
        }
    }
};
var _ = schedule.utility;
try {
    var alreadySetCourses = _.getCourses();
} catch (e) {
    var alreadySetCourses = null;
}
// console.log(alreadySetCourses);
var courses = (alreadySetCourses) ? (_.coursesToArray(alreadySetCourses)) : [1, 2, 3, 4, 5, 6, 7, 8];
// courses = alreadySetCourses

var date = new Date();
var ms = date.getTime();
ms = _.gmtToLocal(ms) + 2.88e7;
var dayOfMonth = date.getDate();
var days = _.daysSince(ms);
var dayNo = _.dayNo(days);
var weekNo = _.weekNo(days);
var weekday = date.getDay();
var hours = date.getHours();
var tomorrowOrNot = hours > 15 ? "(tomorrow)": "";
if(hours > 15) {
    weekday++
    dayNo++
}
var weekdayEnglish = weekdays[weekday];
var month = date.getMonth();
var monthEnglish = months[month];
var year = date.getYear() + 1900;
var dateEnglish = weekdayEnglish + " " + monthEnglish + " " + ((!tomorrowOrNot) ? (dayOfMonth) : (dayOfMonth + 1)) + ", " + year + " " + tomorrowOrNot;
if (weekday == 0 || weekday == 6) {
    dateEnglish = "";
}
var weekSchedule = schedule.generate(courses);

console.log(weekSchedule);

try {
    var rotationArray = weekSchedule[weekNo === 1 ? "weekOne" : "weekTwo"][weekday - 1];
} catch (e) {
    var rotationArray = [];
    console.log(e);
    
}

console.log("rotation:", rotationArray);

var rotation = "";
try {
    for (var i = 0; i < rotationArray.length; i++) {
        if(i < rotationArray.length - 1)
            rotation += rotationArray[i] + "-";
        else 
            rotation += rotationArray[i]
    }
} catch (e) {}
var notifDate = m.get("#date")
var notifBlock = m.get("#blockRotation");
notifDate.innerText = dateEnglish;
blockRotation.innerText = rotation;

if (weekday == 0 || weekday == 6) {
    document.getElementsByClassName("blocks")[0].innerText = "No school.";
}

var customizeButton = m.get("#customize")
var personalizeCourses = m.get(".personalizeCourses");

try {
    customizeButton.innerText = ((alreadySetCourses) ? ("Change courses") : ("Personalize"));
    customizeButton.onclick = function() {
        toggleSetCourses(1);
    }
} catch (e) {}

var carousel = new Flickity(m.get(".carousel"), {
    autoPlay: 2000,
    pauseAutoPlayOnHover: false,
    wrapAround: true,
    lazyLoad: 2
})

var preFillValues = function() {
    var courses = _.getCourses()
    try {
        if(courses[0]) {
            var form = m.get(".set-courses-form")
            for(var i = 0; i < 8; i++) {
                form["block-" + (i + 1)].value = courses[i]
            }
        }
    } catch(e) {
        console.log(e)
    }
}

var toggleSetCourses = function(status) {
    var form = m.get(".set-courses")
    preFillValues()
    form.style.top = status ? "0" : "-200%"
}

var getCourses = function() {
    var form = m.get(".set-courses-form")
    var courses = []
    var emptyCourses = []
    for(var i = 0; i < 8; i++) {
        var value = form["block-" + (i + 1)].value
        var pushValue = value.charAt(0).toUpperCase() + value.substring(1, value.length)
        courses.push(pushValue)
        if(!form["block-" + (i + 1)].value) {
            emptyCourses.push(i + 1)
        }
    }

    if(emptyCourses[0]) {
        return alert("You left some blocks empty!")
    }
    _.setCourses(courses)
    window.location.reload()
}

m.get(".set-courses-form").onsubmit = function(e) {
    e.preventDefault()
    getCourses()
}

m.get("#cancel").onclick = function(e) {
    e.preventDefault()
    if(!_.getCourses()) {
        alert("You must set courses!")
    } else {
        toggleSetCourses()
    }
}

m.get("#clear-all").onclick = function() {
    if(confirm("Are you sure?")) {
        _.deleteCourses(function() {
            console.log("Deleted courses");
            
            window.location.reload()
        })
    }
}