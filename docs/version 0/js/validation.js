// Validate Email Address
function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

//Validate Name
function validateName() {
    let x = document.forms["contactForm"]["name"].value;
    if (x.length<3) {
        alert("Name should contain at least 3 characters");
        // let nameError = document.getElementById('name-error');
        // nameError.innerHTML("Name should contain at least 3 characters");
      return false;
    }
  }