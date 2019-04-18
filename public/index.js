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
        setCourses: function (courses) {
            return localStorage.setItem("courses", JSON.stringify(courses));
        },
        getCourses: function () {
            return JSON.parse(localStorage.getItem("courses"));
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
        deleteCourses: function () {
            localStorage.removeItem("courses");
        },
        coursesToArray: function (list) {
            var arr = [];
            list.forEach(function (course) {
                arr.push(course.name);
            });
            return arr;
        }
    },
    generate: function (weekNo, courses) {
        var weeks = [];
        var weekOne = [];
        var weekTwo = [];
        var one = courses.slice(0, 4);
        var oneMorning = one.slice(0, 3);
        var two = courses.slice(4);
        var twoMorning = two.slice(0, 3);
        var _ = this.utility;

        var returnedOne = [];
        returnedOne = oneMorning.slice(0);

        var returnedTwo = [];
        returnedTwo = twoMorning.slice(0);

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

        weekOne = weeks.slice(0, 5);
        weekTwo = weeks.slice(5);
        // returns weekOne for week 1
        return (weekNo === 1) ? (weekOne) : (weekTwo);
    }
};
var _ = schedule.utility;
try {
    var alreadySetCourses = _.getCourses();
} catch (e) {
    var alreadySetCourses = null;
}
console.log(alreadySetCourses);
var courses = (alreadySetCourses) ? (_.coursesToArray(alreadySetCourses)) : [1, 2, 3, 4, 5, 6, 7, 8];
var date = new Date();
var ms = date.getTime();
ms = _.gmtToLocal(ms) + 2.88e7;
var dayOfMonth = date.getDate();
var days = _.daysSince(ms);
var dayNo = _.dayNo(days);
var weekNo = _.weekNo(days);
var weekday = _.weekday(days);
var hours = date.getHours();
var tomorrowOrNot = hours > 15 ? "(tomorrow)" : "";
var weekdayEnglish = weekdays[weekday];
var month = date.getMonth();
var monthEnglish = months[month];
var year = date.getYear() + 1900;
var dateEnglish = weekdayEnglish + " " + monthEnglish + " " + ((!tomorrowOrNot) ? (dayOfMonth) : (dayOfMonth + 1)) + ", " + year + " " + tomorrowOrNot;
if (weekday == 0 || weekday == 6) {
    dateEnglish = "";
}
var weekSchedule = schedule.generate(weekNo, courses);
try {
    var rotationArray = weekSchedule[weekday - 1];
} catch (e) {
    var rotationArray = [];
}
var rotation = "";
try {
    for (var i = 0; i < rotationArray.length; i++) {
        rotation += rotationArray[i] + "-";
    }
} catch (e) {}
rotation += _.getFourthBlock(dayNo, courses);
var notifDate = document.getElementById("date");
var notifBlock = document.getElementById("blockRotation");
notifDate.innerText = dateEnglish;
blockRotation.innerText = rotation;

if (weekday == 0 || weekday == 6) {
    document.getElementsByClassName("blocks")[0].innerText = "No school.";
}

var customizeButton = document.getElementById("customize");
var confirmCourses = document.getElementById("confirmCourses");
var personalizeCourses = document.getElementsByClassName("personalizeCourses")[0];
var deleteCourses = document.getElementById("deleteCourses");
var cancelChange = document.getElementById("cancelChange");
try {
    customizeButton.innerText = ((alreadySetCourses) ? ("Change courses") : ("Personalize"));
    customizeButton.onclick = function () {
        personalizeCourses.classList.add("show");
    }

} catch (e) {}

confirmCourses.onclick = function () {
    _.deleteCourses();
    var userCourses = document.getElementsByClassName("block");
    var courses = _.promptCourses(8, userCourses);
    _.setCourses(courses);
    console.log(userCourses);
    personalizeCourses.classList.remove("show");
    console.log(courses);
    window.location.reload();
}

deleteCourses.onclick = function () {
    _.deleteCourses();
    window.location.reload();
}

cancelChange.onclick = function () {
    personalizeCourses.classList.remove("show");
}

var carousel = new Flickity(".carousel", {
    autoPlay: 2000,
    pauseAutoPlayOnHover: false,
    wrapAround: true,
    lazyLoad: 2
})
