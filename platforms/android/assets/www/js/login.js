// when login button was clicked
$('#login_submit') .click(function()
{
	// get username and password from 
	// var username = $('#login_username').val();
	// var password = $('#login_password').val();
	
	var username = "123@123.com";
	var password = "123";

	// check whether username or password is empty
	if(!username.trim() || !password.trim())
	{
		alert("Username and Password cannot be empty");
	}
	else
	{
		var loginData = {username: username, password: password}; 
		$.ajax(
		{
    		url : login_url,
    		type: "POST",
    		data : loginData,
    		dataType: 'json',
    		success: function(response)
    		{
    			// login failed (Wrong username or password)
    			if(response.status == "403")
    			{
    				alert(response.message);	
    			}

    			// login successful
    			if(response.status == "1")
    			{
    				//navigate to main page
    				api_key = response.api_key;

    				$.mobile.changePage("#main_page", 
    				{
    					transition: "pop",
    					reverse: false,
   						changeHash: true
    				});

    				// delete username and password data
    				$('#login_username').val('');
    				$('#login_password').val('');
    			}
    		},
    		error: function (error)
    		{
    			alert("Sorry, please check your network and try again later");
    		}
		});

	}
})

// when sign up button was clicked 
$('#signup_submit').click(function()
{
	// get user sign up info from input text fields
	var fullname = $('#signup_fullname').val();
	var email = $('#signup_email').val();
	var password = $('#signup_password').val();
	var password_confirm = $('#signup_password_confirm').val();
	var dateOfBirth = $('#signup_birthday').val()
	var contactNumber = $('#signup_contact_number').val();
	var hospital = $('#signup_hospital').val();
	var jobTitle = $('#signup_job_title').val();
	var registrationNumber = $('#signup_registration_number').val();
	var medical_insurance = $('#signup_medical_insurance').val();

	if(!fullname.trim())
	{
		alert("Please input your fullname");
		return;
	}

	if(!email.trim())
	{
		alert("Please input your Email address");
		return;
	}

	if(!IsEmail(email))
	{
		alert("Invalidate Email address");
		return;
	}

	if(!password.trim())
	{
		alert("Please input your password");
		return;
	}

	if(!password_confirm.trim())
	{
		alert("Please confirm your password");
		return;
	}

	if(password != password_confirm)
	{
		alert("Password doesn't match");
		return;
	}

	if(!dateOfBirth.trim())
	{
		alert("Please input your birthday");
		return;
	}

	if(!contactNumber.trim())
	{
		alert("Please input your contact number");
		return;
	}

	if(isNaN(contactNumber))
	{
		alert("Invalidate contact number");
		return;
	}

	if(!hospital.trim())
	{
		alert("Please input hospital name");
		return;
	}

	if(!jobTitle.trim())
	{
		alert("Please input your job title");
		return;
	}

	if(!registrationNumber.trim())
	{
		alert("Please input your ABA registration number");
		return;
	}

	if(medical_insurance === "1")
	{
		alert("Please choose whether you have medical indemnity insurance or not");
		return;
	}

	else
	{
		// dateOfBirth = convertDateFormat(dateOfBirth);

		var registerData = {full_name: fullname, email: email, password: password, password_confirm: password_confirm, 
							date_of_birth: dateOfBirth, telephone: contactNumber, hospital: hospital, job_title: jobTitle, 
							registration_number: registrationNumber, medical_insurance: medical_insurance}; 
		$.ajax(
		{
    		url : register_url,
    		type: "POST",
    		data : registerData,
    		dataType: 'json',
    		success: function(response)
    		{
    			// registration successful
    			if(response.status == "1")
    			{
    				alert(response.message);

    				// clean the register form 
    				$('#signup_fullname').val('');
					$('#signup_email').val('');
					$('#signup_password').val('');
					$('#signup_password_confirm').val('');
					$('#signup_birthday').val('')
					$('#signup_contact_number').val('');
					$('#signup_hospital').val('');
					$('#signup_job_title').val('');
					$('#signup_registration_number').val('');
					$('#signup_medical_insurance').val('');

					// back to login page
					$("#signup_content").slideUp();
    			}
    			else
    			{
    				alert(response.message);
    				return;
    			}
    		},
    		error: function (error)
    		{
    			alert("Sorry, please check your network and try again later");
    		}
		});

	}

})

function IsEmail(email) 
{
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// function convertDateFormat(current_date)
// {
// 	var date = new Date(current_date);
// 	var year = date.getFullYear();
// 	var month = date.getMonth();
// 	var day = date.getDate();

// 	var monthsArray = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JULY", "AUG", "SEP", "OCT", "NOV", "DEC"];
// 	month = monthsArray[month];

// 	var correct_date_format = ('0' + day).slice(-2) + '-'
//              + month + '-'
//              + year;
    
//     return correct_date_format;
// }


