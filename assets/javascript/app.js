// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCub0rY9jJfPV7_M0hR8HDby2zg34od4oE",
  authDomain: "spectator-b36b8.firebaseapp.com",
  databaseURL: "https://spectator-b36b8.firebaseio.com",
  projectId: "spectator-b36b8",
  storageBucket: "spectator-b36b8.appspot.com",
  messagingSenderId: "452594229506",
  appId: "1:452594229506:web:a1d9ed18a9eaf03208621b",
  measurementId: "G-3ZRD15YJRY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//child_added event for firebase (runs as soon as page is loaded)
database.ref().on("child_added", function (childSnapshot) {

  //create the div card
  var newCard = $("<div class='card' style='width: 18rem;'>");
  var cardImage = $("<img class='card-img-top' alt='Card image cap'>");
  movieImage.attr("src", childSnapshot.posterUrl);
  var cardBody = $("<div class='card-body'>");
  cardBody.append($("<h5>").attr("class", "card-class").text(childSnapshot.title));
  cardBody.append($("<p class='card-text'>").text(childSnapshot.userComment));
  newCard.append(cardImage);
  newCard.append(cardBody);

  //append the newCard to #userBucket
  $("#userBucket").append(newCard);
});

//OMDB API
var omdbApiKey = "&apikey=" + "trilogy";
var omdbQueryURL = "http://www.omdbapi.com/?t=";

//MovieDatabase API (for trending movies)
var mdApiKey = "fa775e9fe9e1075f6a2bc9dbdb7d79b7";
var mdQueryURL = "https://api.themoviedb.org/3/trending/all/week?api_key=";

//MovieDatabase AJAX CALL
$.ajax({
  url: mdQueryURL + mdApiKey,
  method: "GET"
}).then(function (outerResponse) {

  console.log(outerResponse);

  //append 4 movie images to the trending movies carousel
  for (var i = 0; i < 4; i++) {

    //retrieve the movie year for each trending movie
    var movieYear = outerResponse.results[i].release_date;
    movieYear = movieYear.split("-");
    movieYear = "&y=" + movieYear[0];

    //inner AJAX call to OMDB API
    $.ajax({
      url: omdbQueryURL + outerResponse.results[i].title + movieYear + omdbApiKey,
      method: "GET"
    }).then(function (innerResponse) {

      $("#trending" + (i + 1)).attr("src", innerResponse.Poster);

    });
  }
});



//onClick event for the search button
$("#button-addon2").on("click", function (event) {

  //prevent the event from refreshing the page
  event.preventDefault();

  //store the movie title in a variable
  var movieTitle = $(".form-control").val().trim();

  //OMDB AJAX CALL
  $.ajax({
    url: omdbQueryURL + movieTitle + omdbApiKey,
    method: "GET"
  }).then(function (response) {

    //retrieve the title of the movie
    $("#movieTitle").text(response.Title);

    //retrieve the image of the movie
    $("#movieImage").attr("src", response.Poster);

  });
});


//onClick event for the "Add to Bucket" button
$("#addBucket").on("click", function (event) {

  //prevent the button from refreshing the page
  event.preventDefault();

  //create an object for each movie
  var addMovie = {
    title: $("#movieTitle").text(),
    posterUrl: $("#movieImage").attr("src"),
    userComment: $("#userComment").val()
  }

  //upload the movie object to firebase
  database.ref().push(addMovie);
});
// This is where the EMOJI API logic starts
emojiID = ["cNEkiz27tOidqUBuoR", "2fIbmaiOnI3VlQFZEq", "yN4RUYrRRrKVRoGqQm", "TgGWZwWlsODxFPA21A", "3OsFzorSZSUZcvo6UC"];

function emojiDisplay() {
  $("#emojiBtn").empty();
  var emojis = $(this).attr("data-emoji");
  for (i = 0; i < emojiID.length; i++) {
    emojiqueryURL = "https://api.giphy.com/v1/gifs/" + emojiID[i] + "?api_key=tuHOptJN3WWLtwMil1BWJF8fU18JA1f5";
    $.ajax({
      url: emojiqueryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      var emojiDiv = $("<span>");
      $("#emojiBtn").append(giphyDiv);
      var emojiImage = $("<img onclick=imgClick('" + response.data.images.downsized_medium.url + "')>")
        .attr("class", 'emoji_images')
        .attr("src", response.data.images.downsized_medium.url)

      $(emojiDiv).append(emojiImage);
    });
  }
}

function imgClick(id) {
  console.log("click - " + id)
  $("#showEmoji").html("");
  $("#showEmoji").append('<img src = "' + id + '" height = 50px width = 50px>');
}
