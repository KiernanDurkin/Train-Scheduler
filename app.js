
$(document).ready(function(){

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdyZDxTfSR48mWlPYAzkkvbtFE5_AhHeo",
    authDomain: "train-scheduler-1bc00.firebaseapp.com",
    databaseURL: "https://train-scheduler-1bc00.firebaseio.com",
    projectId: "train-scheduler-1bc00",
    storageBucket: "gs://train-scheduler-1bc00.appspot.com",
    messagingSenderId: "908309562784"
  };
  firebase.initializeApp(config);

  var database = firebase.database();


  $("#addTrain").on("click", function(event) {
    event.preventDefault();

    var name = $("#name").val().trim()
    var destination = $("#destination").val().trim()
    var firstTrain = $("#firstTrain").val().trim()
    var frequency = $("#frequency").val().trim()
  

      database.ref().push({
        name:name,
        destination:destination,
        firstTrain:firstTrain,
        frequency:frequency

      });
  });


  database.ref().on("child_added", function(snapshot){

      var newTrain = snapshot.val().name;
      var newDestination = snapshot.val().destination;
      var newFirstTrain = snapshot.val().firstTrain;
      var newFreq = snapshot.val().frequency;
  
     var firstTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

     var currentTime = moment();

     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

     var tRemainder = diffTime % newFreq;

     var tMinutesTillTrain = newFreq - tRemainder;

     var nextTrain = moment().add(tMinutesTillTrain, "minutes")
     var convertedTime = moment(nextTrain).format("HH:mm");

      $("#display-train").append(
        '<tr><td>' + newTrain + '</td><td>' +  newDestination + '</td><td>' + newFreq + '</td><td>' + convertedTime + '</td><td>' +tMinutesTillTrain + '</td><td>'
        
        );


  });



});