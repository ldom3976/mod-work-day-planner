// added global variables
var timeEl = $('#time-display');
var currentTime = getHour();
var tasks = [];

function displayTime () {
    var current = moment().format("MMMM Do YYYY, h:mm:ss a");
    timeEl.text(current);
}

setInterval(displayTime, 1000);

//gets the current number of hours
function getHour () {
    return moment().hour();
}

$(document).ready(function () {
    // the event listener for the save button
    $(".saveBtn").on("click", function () {
        var task = $(this).prev().val();
        var time = $(this).parent().attr("id");
        var completed = {
            task: task,
            time: time,
        }   
        populateStorage(completed); 
    })

    //saves to local storage
    function populateStorage(completed) {
        tasks.push(completed);
        localStorage.setItem("completed", JSON.stringify(tasks));
        getStorage();
    }
    //get from local storage.
    function getStorage() {
        if (localStorage.getItem("completed")) {
            tasks = JSON.parse(localStorage.getItem("completed"));
        }
    }

    getStorage();

    $(".time-block").each(function () {
        const currentElement = $(this).attr("id");

        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].time === currentElement) {
                console.log(tasks[i], currentElement);
            }
        }

        var toDoTime = currentElement;
        //sets formatting
        if (toDoTime == currentTime) {
            $(this).addClass("present");
            $(this).removeClass("past");
            $(this).removeClass("future");
        } else if (toDoTime < currentTime) {
            $(this).addClass("past");
            $(this).removeClass("present");
            $(this).removeClass("future");
        } else {
            $(this).addClass("future");
            $(this).removeClass("present");
            $(this).removeClass("past");
        }
    })
});