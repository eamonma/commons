var schedule = {
  utility: {
    // returns the days since the unix epoch
    daysSince: function(ms) {
      return Math.floor(ms / 8.64e7);
    },
    // returns the day no, being 1 or 2, depending on the day
    dayNo: function(days) {
      return (days % 2 === 1) ? (1) : (2);
    },
    // return the weekday, 0 being Sunday
    weekday: function(days) {
      return (days + 4) % 7;
    },
    // returns the week no, being 1 or 2, depending on the week
    weekNo: function(days) {
      return (((days + 4) % 14) < 7) ? (1) : (2);
    },
    queue: function(array) {
      var last = array.shift();
      array.push(last);
      return array;
    },
    unqueue: function(array) {
      var first = array.pop();
      array.unshift(first);
      return array;
    },
    getFourthBlock: function(day, courses) {
      return (day === 1) ? (courses[3]) : (courses[7]);
    }
  },
  generate: function(weekNo, courses) {
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
var courses = [1,2,3,4,5,6,7,8];
console.log(schedule.utility.weekNo(12678));
schedule.generate(1, courses);
