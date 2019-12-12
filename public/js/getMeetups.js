$.ajax({
    dataType: "jsonp",
    url: "https://api.meetup.com/monitoring-syd/events?&sign=true&photo-host=public&page=20&status=upcoming",
    success: function( result ) {
        var data = result.data[0];
        var venue = data.venue;
        var meetupName = data.name;
        var meetupDate = data.local_date;
        var meetupTime = data.local_time;
        var attending = data.yes_rsvp_count;
        var venueName = venue.name;
        var venueAddress = venue.address_1 + ', ' + venue.city;
        $("#meetupName").text(meetupName);
        $("#meetupDataTime").text(meetupDate + ' @ ' + meetupTime + 'pm');
        $('#venueInfo').text(venueName + ', ' + venueAddress);
        $('#attendance').text(attending + ' attending.');
    }
});
