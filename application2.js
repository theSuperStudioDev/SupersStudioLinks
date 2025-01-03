document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("hiring-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            // Fetch the user's IP address from ipify
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            if (ipResponse.ok) {
                const ipData = await ipResponse.json();
                data.ip = ipData.ip; // Include the IP address in the form data
            } else {
                console.error('Failed to get IP address:', ipResponse.statusText);
            }

            const response = await fetch('https://formspree.io/f/mgvwwjab', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Formspree response:', responseData);
                // Do something with the response (e.g., show a success message)
            } else {
                console.error('Formspree submission failed:', response.statusText);
                // Handle submission failure (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error sending form data:', error);
            // Handle errors (e.g., show an error message)
        }

        form.reset();
    });
});