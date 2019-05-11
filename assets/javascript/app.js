
var config = {
    apiKey: "AIzaSyBrUE-lFoUUOW8Qo2BAbzF4fmp4FUxrBo8",
    authDomain: "train-sch-38437.firebaseapp.com",
    databaseURL: "https://train-sch-38437.firebaseio.com",
    projectId: "train-sch-38437",
    storageBucket: "train-sch-38437.appspot.com",
    messagingSenderId: "691085765665",
    appId: "1:691085765665:web:abb79883d50a675e"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#addTrainBtn").on("click", function() {

    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    database.ref().push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
})

database.ref().on("child_added", function (snapshot) {
    var trainName = snapshot.val().trainName;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes") & frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td><tr>");

})

