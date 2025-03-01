document.getElementById('email-button').addEventListener('click', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    var emailBody = `Hello Azhar,\n\nMy Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`;

    var gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=veritasstudiocreative@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(gmailLink, '_blank');
});

document.getElementById('cancel-button').addEventListener('click', function() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
});