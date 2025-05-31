// Initialize EmailJS
emailjs.init("jFwAeJTJoFDbT2VOe"); // Replace with your EmailJS user ID

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm("service_inwb7xf", "template_8uysc8c", this)
    .then(() => {
      alert("Message sent successfully!");
      this.reset();
    }, (error) => {
      alert("Failed to send message: " + error.text);
    });
});
