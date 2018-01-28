var tracks;
var currentTrack = 0;
var soundCloud;

$(document).ready(function(){

SC.initialize({
   client_id: '833c3bb743118dcc480fb7ba93dadcf0'
});

//Search Form
$("#searchbutton").click(function(event){
$("#searchform").submit(function(event){
		event.preventDefault();
		$("#song").html("");
		spotifySearch( $("#search").val() );
});
});
function spotifySearch(term) {
	SC.get('/tracks', {
  		q: term
}).then(function(response) {
		tracks = response;
		playNext();
	});
};

function playNext() {
	SC.stream( '/tracks/' + tracks[currentTrack].id ).then(function(player){     
 		player.play();
		$("#artwork").attr("src", tracks[currentTrack].artwork_url);
		$("#title").html("Current Song: " + tracks[currentTrack].title);
 		player.on("finish",function(){
 			currentTrack += 1;
			player.play()
		});
	});
};
 


// SC.get("/tracks",{
// 	q: "fish"
// }).then(function(response){
// 	//get only tracks less than 5 minutes long
// 	tracks = response.filter(function(track){
// 		return track.duration <= 300000;
// 	}); 
// 	console.log(tracks);
// for (var i = 0; i < tracks.length; i++) {
// 	$("ul").append("<li>" + tracks[i].title + "</li>");
// }
// }).then(function(){
// 	playNext();
// });

//Song control buttons

$("#stop").click(function(event){
	// console.log(event);
	stopPlay();
});

$("#start").click(function(event){
	startPlay();
});

$("#next").click(function(event){
	nextPlay();
});

$("#previous").click(function(event){
	previousPlay();
});

$("#shuffle").click(function(event){
	shufflePlay();
});

});

// function playNext() {
// 	SC.stream( "/tracks/" + tracks[currentTrack].id ).then(function(player) {
// 		player.play();
// 		player.on("finish", function(){
// 			currentTrack += 1;
// 			player.play()
// 		});
// 	});
// }

function stopPlay() {
	soundCloud.pause();
}
function startPlay() {
	soundCloud.play();
}

function nextPlay() {
	SC.stream( "/tracks/" + tracks[currentTrack].id ).
		then(function(player) {
		soundCloud = player;
			if (currentTrack == tracks.length -1 ) {
				currentTrack = 0
				soundCloud.play()
			} else {
				currentTrack += 1;
				soundCloud.play()
			}
			$("#artwork").attr("src", tracks[currentTrack].artwork_url);
			$("#title").html("Current Song: " + tracks[currentTrack].title);
		});
}

function previousPlay() {
	SC.stream( "/tracks/" + tracks[currentTrack].id ).then(function(player) {
		soundCloud = player;
		if (currentTrack == 0 ) {
				currentTrack = 0
				soundCloud.play()
			} else {
				currentTrack -= 1;
				soundCloud.play()
			}
			$("#artwork").attr("src", tracks[currentTrack].artwork_url);
			$("#title").html("Current Song: " + tracks[currentTrack].title);
		});
}


// function shufflePlay() {
// 	var obj = currentTrack == Math.floor((Math.random()* 10 )+ 1);
// 	 SC.stream("/tracks/" + tracks[obj].id ).then(function(player){
//       console.log(player);
//       player.play();

// 		});
// 	};



// SC.initialize({
//   client_id: '833c3bb743118dcc480fb7ba93dadcf0'
// });

// // SC.oEmbed( 'http://soundcloud.com/forss/flickermood', {
// // 	auto_play: true,
// // 	show_comments: true
// // }).then(function(data) {
// // 	$("body").append(data.html);
// //   	console.log('oEmbed response: ', data);
// // });

// // $("#search_form").submit(function(event){
// // 		event.preventDefault();
// // 		//clear search results
// // 		$("#songs").html("");
// // 		//search for submitted term
// // 		omdbSearch( $("#search").val() );


// // 		//$(...).val() gets us element.value
// // 	});

// //assuming a "track" obj is captured, we want:
// //track.stream_url
// //track.artwork_url OR track.user.avatar_url
// //track.duration

// SC.get('/tracks').then(function(response) {
//   console.log(tracks);
// for (var i = 0; i < response.length; i++ ) {
// 		var art = response[i].artwork_url;
//  		if( !art ) art = response[i].user.avatar_url
// 	$("ul").append("<li data-stream='"+ response[i].stream_url.match(/\/tracks\/[0-9]+/)[0] + "' data-duration='" + response[i].duration + "'>" + response[i].title + "<img src='"+ art +"' /></li>");
// }

// }).then(function(event){
// 	$("ul li").click(function(event){
// 		console.log(event);
// 		SC.stream( $(event.target).attr('data-stream')).then(function(player){
// 			player.play();
// 		});
// 	});
// });

// });


//Instruction

//To use the SC object and make requests, we must first initialize it with our client_id:

// SC.initialize({
//    client_id: '[YOUR_CLIENT_ID_HERE]'
// });

// //To search for songs, we can use the .get method that SoundCloud has provided to us. ".get is specific to Soundcloud":

// SC.get("/tracks").then(function(response) {
//     // things to do after the tracks load...
//     console.log( response );
// });

// //o specify a specific search term, we can pass through a q option("q" is built into their API, must use "q" in this case:

// SC.get("/tracks",{
//   q: "fish"
// }).then(function(response) {
//   // things to do after the tracks load...
//   console.log( response );
// });

// //"then"/"promise": then is a JavaScript method for a Promise object. A Promise is a placeholder for the return value of a function that we want to do something with immediately after it finishes...
// //We need to wait until this value is available and then allows us to continue with our code after the Promise operation completes.
// //We use then here because we need to wait for the SoundCloud get method to finish loading the tracks before we do anything with the response.

// //The callback receives as its argument, the return value from the function we were waiting for. Here, we've called that return value from SC.get, response.

//  SC.get("/tracks").then(function(response) {
//    // things to do after the tracks load...
//    console.log( response );
// });

// //Streaming a song. Can get the id though .id

// SC.stream( '/tracks/216847995' ).then(function(player){
//    console.log(player);
//    player.play();
// });

// //example... track.id will pull the track id

//  SC.stream( '/tracks/' + track.id ).then(function( player){
//     console.log(player);
//     player.play();
// });










// function playNext(){
// 	SC.stream( "/tracks/" + songs[currentSong].id, {
// 		$("#start").click(function(e){
// 			e.preventDefault();
// 			sound.start();
// 		});
// 		$("#stop").click(function(e){
// 			e.preventDefault();
// 			sound.stop();

// 		});


