$(function() {
  var listOfStreamers = ["theezay", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var $container = $("#container");
  var $channels = $("#channels");
  var channelsAPI = "https://wind-bow.gomix.me/twitch-api/channels/";
  var streamsAPI = "https://wind-bow.gomix.me/twitch-api/streams/";

  var numberOfStreamers = listOfStreamers.length;
  var online = [];
  var offline = [];

  listOfStreamers.forEach(function(streamer) {
    var finalURL = createStreamsAPIURL(streamer);
    var onAir = "";
    $.ajax({
    type: "GET",
      url: finalURL,
      dataType: "jsonp",
      timeout: 3000,
      success: function(data) {
        if (data.stream === null) {
          onAir = "offline";
          createOfflineEntry(streamer);
        } else {
          onAir = "online";
          createOnlineEntry(data);
        }
      },
      error: function() {
        $channels.html('<div class="container">Something went wrong. Please try again soon.</div>');
        console.log("error");
      }
    });
  });

  function createStreamsAPIURL (streamer) {
    var apiPt1 = "https://wind-bow.gomix.me/twitch-api/streams/";
    var finalURL = apiPt1 + streamer + "?callback=?";
    return finalURL;
  }

  function createChannelsAPIURL(streamer) {
    var apiPt1 = "https://wind-bow.gomix.me/twitch-api/channels/";
    var finalURL = apiPt1 + streamer + "?callback=?";
    return finalURL;
  }

  function createOnlineEntry (data) {
    var game = data.stream.game;
    var status = data.stream.channel.status;
    var displayName = data.stream.channel.display_name;
    var logo = data.stream.channel.logo;
    if(logo === null) {
      logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/twitch-profile_image-8a8c5be2e3b64a9a-300x300.png";
    }
    var url = data.stream.channel.url;
    var onlineEntry = '<a href="' +url+ '">' + '<div class="online">' ;
        onlineEntry += "<img src=" + logo + ' class="logo">';
        onlineEntry += '<div class="text-container"><p>' + displayName
        onlineEntry += " is playing " + game + '</p>';
        onlineEntry += "<p>" + status + "</p></div></div></a>";
    $channels.append(onlineEntry);
  }

  function createOfflineEntry (streamer) {
    $.ajax({
    type: "GET",
      url: createChannelsAPIURL(streamer),
      dataType: "jsonp",
      timeout: 3000,
      success: function(data) {
        var displayName = data.display_name;
        var logo = data.logo;
        if(logo === null) {
          logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/twitch-profile_image-8a8c5be2e3b64a9a-300x300.png";
        }
        var url = data.url;
        var offlineEntry = '<a href="' +url+ '">' + '<div class="offline">' ;
        offlineEntry += "<img src=" + logo + ' class="logo">';
        offlineEntry += '<div class="text-container"><div class="text">' + displayName ;
        offlineEntry += " is offline </div></div></div></a>";
        $channels.append(offlineEntry);
      },
      error: function() {
        $channels.html('<div class="container">Something went wrong. Please try again soon.</div>');
        console.log("error");
      }
    });
  }

  $("#all").on('click', function() {
    $(".online,.offline").removeClass("hidden");
  });
  $('#offline-btn').on('click', function() {
    $(".online").addClass("hidden");
    $(".offline").removeClass("hidden");
  });
  $('#online-btn').on('click', function() {
    $(".offline").addClass("hidden");
    $(".online").removeClass("hidden");
  });



});
