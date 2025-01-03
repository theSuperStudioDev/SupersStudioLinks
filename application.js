document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("hiring-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        const applicationId = generateApplicationId(); // Generate a unique application ID

        formData.forEach((value, key) => {
            data[key] = value;
        });

        data.applicationId = applicationId; // Include the application ID in the form data

        try {
            // Check if the application ID already exists
            const exists = await checkIfApplicationIdExists(applicationId);
            if (!exists) {
                // Send the application form data to Formspree
                const response = await fetch('https://formspree.io/f/mgejebnj', {
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
            } else {
                console.error('Application ID already used');
                // Handle the case where the application ID is already used (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error sending form data:', error);
            // Handle errors (e.g., show an error message)
        }

        form.reset();
    });

    function generateApplicationId() {
        // Generate a unique application ID (e.g., using a UUID library or a custom implementation)
        return 'app-' + Math.random().toString(36).substr(2, 9);
    }

    async function checkIfApplicationIdExists(applicationId) {
        try {
            const logResponse = await fetch('/path/to/your/logfile.json');
            if (logResponse.ok) {
                const logData = await logResponse.json();
                return logData.some(entry => entry.applicationId === applicationId);
            } else {
                console.error('Failed to check application ID:', logResponse.statusText);
                return false;
            }
        } catch (error) {
            console.error('Error checking application ID:', error);
            return false;
        }
    }
});