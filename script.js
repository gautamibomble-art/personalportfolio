document.getElementById("feedbackForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let formMessage = document.getElementById("formMessage");

    // Validation
    if (name === "") {
        formMessage.textContent = "Name cannot be empty!";
        formMessage.style.color = "red";
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        formMessage.textContent = "Please enter a valid email!";
        formMessage.style.color = "red";
        return;
    }

    // Store in localStorage
    let feedback = {
        name: name,
        email: email,
        message: message
    };

    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    formMessage.textContent = "Feedback submitted successfully!";
    formMessage.style.color = "lightgreen";

    displayFeedback();
    document.getElementById("feedbackForm").reset();
});

// Display feedback
function displayFeedback() {
    let feedbackList = document.getElementById("feedbackList");
    let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

    feedbackList.innerHTML = "<h3>Submitted Feedback:</h3>";

    feedbacks.forEach(function(item) {
        let div = document.createElement("div");
        div.innerHTML = `<p><strong>${item.name}</strong> (${item.email})<br>${item.message}</p>`;
        feedbackList.appendChild(div);
    });
}

// Load feedback on page load
window.onload = displayFeedback;