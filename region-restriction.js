// Function to check if the user's region is allowed
function checkRegion() {
    // Use a GeoIP service to get the user's location based on their IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            var userIP = data.ip;
            fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=2ce8ddaf59a0446ba332e3c9236f0c4d&ip=${userIP}`)
                .then(response => response.json())
                .then(data => {
                    var userCountry = data.country_name;
                    // List of allowed countries
                    var allowedCountries = ['United States', 'Canada', 'United Kingdom', 'India'];
                    if (!allowedCountries.includes(userCountry)) {
                        // If the user's country is not in the allowed list, restrict access
                        document.body.innerHTML = '<h1>Access Denied</h1><p>We apologize, but access to this content is restricted in your region.</p>';
                    }
                });
        })
        .catch(error => console.error('Error:', error));
}

// Call the checkRegion function when the page loads
checkRegion();
