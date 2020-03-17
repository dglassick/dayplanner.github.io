var currentDate = moment().format("MMMM Do YYYY");
var dateHeaderElement = $("#currentDay");
var Hourdisplay = 0;
var test = false;
var $dayPlannerEl = $("#dayPlannerContainer");

dateHeaderElement.text(currentDate);
console.log(currentDate);

var hour24 = 13;
var hour12 = 1;

var hour24 = moment().format("H");
var hour12 = moment().format("h");

// this function will create divs based on the hour
function createBoxes() {
  // for loop will have divs start at 9 and end at 5
  for (var time = 9; time <= 17; time++) {
    var workHour = time - 9;
    // creating the row for each time slot
    var $rowGrid = $("<div>");
    $rowGrid.addClass("row");
    $rowGrid.addClass("scheduleRow");
    $rowGrid.attr("time-index", time);

    // creating columns starting with col-md-2
    var $column2 = $("<div>");
    $column2.addClass("col-md-2");
    // creates span in column for the time display
    $hourDisplay = $("<span>");
    $hourDisplay.attr("class", "timeDisplay");

    // if statements below allow the hour to be displayed and also puts the correct merirdiem
    var timeBox = 0;
    var meridiem = "";
    if (time > 12) {
      timeBox = time - 12;
      meridiem = "pm";
    } else {
      timeBox = time;
      meridiem = "am";
    }
    // adds the variables timeBox and meridiem together in the span
    $hourDisplay.text(timeBox + " " + meridiem);
    console.log($hourDisplay.value);

    $rowGrid.append($column2);
    $column2.append($hourDisplay);

    // 2nd column that allows you to input what you're going to do at a particular time
    var $hourlyPlan = $("<input>");

    $hourlyPlan.attr("id", `input-${workHour}`);
    $hourlyPlan.attr("time-index", workHour);
    $hourlyPlan.attr("type", "text");
    $hourlyPlan.attr("class", "dailyPlan");

    // access index from data array for hour
    $hourlyPlan.val(planArr[workHour]);

    //creates the middle column
    var $column9 = $("<div>");
    $column9.addClass("col-md-9");

    $rowGrid.append($column9);
    $column9.append($hourlyPlan);

    // creates the final column
    var $column1 = $("<div>");
    $column1.addClass("col-md-1");

    var $saveButton = $("<i>");
    $saveButton.attr("id", `saveid-${workHour}`);
    $saveButton.attr("save-id", workHour);
    $saveButton.attr("class", "far fa-save saveIcon");

    $rowGrid.append($column1);
    $column1.append($saveButton);

    colorChanger($rowGrid, time);

    $dayPlannerEl.append($rowGrid);
  }
}

function colorChanger($rowColor, time) {
  if (time < hour24) {
    $rowColor.css("background-color", "lightgrey");
  } else if (time > hour24) {
    $rowColor.css("background-color", "lightblue");
  } else {
    $rowColor.css("background-color", "coral");
  }
}

function savePlans() {
  var savedPlans = JSON.parse(localStorage.getItem("savedPlans"));
  if (test) {
    console.log(storedPlans);
  }

  if (savedPlans !== null) {
    planArr = savedPlans;
  } else {
    planArr = new Array(9);
    planArr[3] = "Lunch time!";
  }
  console.log(planArr);
  console.log(savedPlans);
}

$(document).on("click", "i", function(event) {
  event.preventDefault();

  var $index = $(this).attr("save-id");

  var inputText = "#input-" + $index;
  var $value = $(inputText).val();

  planArr[$index] = $value;

  $(`#saveid-${$index}`).removeClass("zoomIn");
  localStorage.setItem("savedPlans", JSON.stringify(planArr));
});

$(document).on("change", "input", function(event) {
  event.preventDefault();

  let i = $(this).attr("time-index");

  $(`#saveid-${i}`).addClass("zoomIn");
});

savePlans();
createBoxes();
