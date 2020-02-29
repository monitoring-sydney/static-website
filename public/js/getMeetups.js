var tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

function dateParser(date) {
    var formattedDate = new Date(date);
    return formattedDate.toLocaleDateString('en-GB', tz);
}

function timeParser(time) {
    var timeArray = time.split(':');
    var hours = timeArray[0];
    var minutes = timeArray[1];
    //it is pm if hours from 12 onwards
    var suffix = (hours >= 12)? 'pm' : 'am';
    //only -12 from hours if it is greater than 12 (if not back at mid night)
    hours = (hours > 12)? hours -12 : hours;
    //if 00 then it is 12 am
    hours = (hours == '00')? 12 : hours;
    return `${hours}:${minutes}${suffix}`;
}

$.ajax({
    dataType: "jsonp",
    url: "https://api.meetup.com/monitoring-syd/events?&sign=true&photo-host=public&page=20&status=upcoming",
    success: function( result ) {
        var data = result.data[0];
        var venue = data.venue;
        var meetupName = data.name;
        var meetupDate = dateParser(data.local_date);
        var meetupTime = timeParser(data.local_time);
        var attending = data.yes_rsvp_count;
        var venueName = venue.name;
        var venueAddress = `${venue.address_1}, ${venue.city}`;
        $("#meetupName").text(meetupName);
        $("#meetupDatetime").text(`${meetupDate} @ ${meetupTime}`);
        $('#venueInfo').text(`${venueName}, ${venueAddress}`);
        $('#attendance').text(`${attending} attending.`);
    }
});
