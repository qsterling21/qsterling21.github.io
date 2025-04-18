$(document).ready(function () {
    //  Validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    }

    //  Validate form input before submitting
    function validateForm() {
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const checkIn = $("#check-in").val();
        const checkOut = $("#check-out").val();

        if (!name || !validateEmail(email) || !checkIn || !checkOut) {
            return false;
        }

        if (new Date(checkIn) >= new Date(checkOut)) {
            alert("Check-out date must be after check-in date.");
            return false;
        }

        return true;
    }

    //  Helper: get query parameter value from URL
    function getQueryVariable(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split("&");

        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split("=");
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }

    //  Pre-fill hotel selection from query string
    const hotel = getQueryVariable("hotel");
    if (hotel) {
        $("#hotel-select").val(hotel);
    }

    //  Handle form submission
    $("#booking-form").submit(function (event) {
        event.preventDefault(); // Prevent reload

        if (validateForm()) {
            $(this).hide(); // Hide form on success

            $("main").append(`
                <div id="confirmation" style="padding: 10px; background-color: #f4f4f4; border: 1px solid #ccc; margin-top: 20px; text-align: center;">
                    <p>Booking complete! Your stay is booked from <strong>${$("#check-in").val()}</strong> to <strong>${$("#check-out").val()}</strong>.</p>
                    <button id="cancelBooking" style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; cursor: pointer;">Cancel</button>
                </div>
            `);

            //  Cancel button clears confirmation
            $("#cancelBooking").click(function () {
                $("#confirmation").remove();
                $("#booking-form").show();
                $("#booking-form")[0].reset();
            });
        } else {
            alert("Please fill in all required fields with valid information.");
        }
    });
});
