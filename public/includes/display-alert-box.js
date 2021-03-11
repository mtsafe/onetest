//
//  display-alert-box.js - displays an alert box in the browser window
//

function alertBox() {
  text = '\nWe are sorry but your request "blew up" on the webserver and was not correctly processed.\n\n';
  text += 'If you encounter this error again, please contact us via phone or email.\n';
  text += '________________________________________________________________________\n\n';
  text += 'Error Message - function mail() return value was false in file "mswd-contact-script.html" \n';
  alert(text);
}

alertBox();
