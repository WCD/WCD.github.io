$(function() {
	if(sessionStorage.getItem('WCD_login_access_token_key_session_is_logged_in') != null) {
		document.getElementById('user-id').innerHTML = "UserHasLoggedIn: " + sessionStorage.getItem('WCD_login_access_token_key_session_is_logged_in');
		document.getElementById('username-id').innerHTML = "Username: " + sessionStorage.getItem('WCD_login_access_token_key_session_raw');
		document.getElementById("result").innerHTML = "UserHasAgreed: " + sessionStorage.getItem('WCD_login_access_token_key_session_raw');
		document.getElementById("username-navbar").innerHTML = localStorage.WCDUserHasAgreedToTerms;
	} else {
		document.getElementById('user-id').innerHTML = "UserHasLoggedIn: " + localStorage.WCD_login_access_token_key_local_is_logged_in;
		document.getElementById('username-id').innerHTML = "Username: " + localStorage.WCD_login_access_token_key_local_raw;
		document.getElementById("result").innerHTML = "UserHasAgreed: " + localStorage.WCDUserHasAgreedToTerms;
		document.getElementById("username-navbar").innerHTML = localStorage.WCD_login_access_token_key_local_raw;
	}
	
	if(document.getElementById("username-navbar").innerHTML == "undefined") {
		document.getElementById("username-navbar").innerHTML = "Guest";
	}
	
	if(localStorage.WCD_login_access_token_key_local_is_logged_in == true || sessionStorage.getItem('WCD_login_access_token_key_session_is_logged_in') == true) {
		$('.signin-btn').parent().append('<button type="button" class="btn btn-inverse navbar-btn signout-btn" style="right: 10px; position: absolute;" onclick="SignOut()">Sign out</button>');
		
	}
	
});

SignOut = function() {
	sessionStorage.clear();
	localStorage.WCD_login_access_token_key_local_raw = undefined;
	localStorage.WCD_login_access_token_key_local_encrypted = undefined;
	localStorage.WCD_login_access_token_key_local_is_logged_in = false;
}

$('.agree-link').click(function() {
    if(typeof(Storage) !== "undefined") {
        if(localStorage.WCDUserHasAgreedToTerms) {
            //localStorage.WCDUserHasAgreedToTerms = Number(localStorage.WCDUserHasAgreedToTerms)+1;
			
			if(localStorage.WCDUserHasAgreedToTerms == 1) {
				//LoginPrompt(false, false, "", "");
				LoginPopup();
			} else if(localStorage.WCDUserHasAgreedToTerms == 0) {
				AgreeAlert();
			} else if(localStorage.WCDUserHasAgreedToTerms != 0 || localStorage.WCDUserHasAgreedToTerms != 1) {
				localStorage.WCDUserHasAgreedToTerms = 0;
			}
			
        } else {
            localStorage.WCDUserHasAgreedToTerms = 0;
			AgreeAlert();
        }
        document.getElementById("result").innerHTML = "UserHasAgreed: " + localStorage.WCDUserHasAgreedToTerms;
    } else {
        document.getElementById("result").innerHTML = "Unable to agree! Please update your browser";
        alert("Unable to agree! Please update your browser");
    }
	
});

var invalidUser;

$('.popup').click(function() {
	
	var user = $('#usrname');
	var pass = $('#psword');
	var userKey = $('#usr_key');
	var passKey = $('#psw_key');
	
	user.on("input", function() {
		if(user.hasClass('invalid')) {
			user.removeClass('invalid');
		}
	});
	
	pass.on("input", function() {
		if(pass.hasClass('invalid')) {
			pass.removeClass('invalid');
		}
	});
	
	userKey.on("input", function() {
		if(userKey.hasClass('invalid')) {
			userKey.removeClass('invalid');
		}
	});
	
	passKey.on("input", function() {
		if(passKey.hasClass('invalid')) {
			passKey.removeClass('invalid');
		}
	});
	
});

AgreeAlert = function() {
	
	var promptMessage = "By attempting to access any content on this site, you understand and agree that you are either a staff member of DigiPen Institute of Technology or a team member of W.C.D., Inc. You also understand that all assets/code hosted on the link you are attempting to access/visit is under copyright protection of DigiPen Institute of Technology. If you understand and agree to these terms, type \"I agree\" in the text box below exactly as shown. If you do not agree and/or are not a staff member of DigiPen Institute of Technology, or W.C.D., Inc., type anything else in the box below and leave this site immediately!";
	
	var agreePopup = window.prompt(promptMessage);
	
	if(agreePopup.toLowerCase() == "i agree") {
		localStorage.WCDUserHasAgreedToTerms = 1;
		//LoginPrompt(false, false, "", "");
		LoginPopup();
	} else {
		localStorage.WCDUserHasAgreedToTerms = 0;
	}
	
}

LoginPopup = function() {
	$('#login_popup').modal();
}

LoginPopupSubmit = function() {
	
	var user = $('#usrname').val();
	var pass = $('#psword').val();
	var userKey = $('#usr_key').val();
	var passKey = $('#psw_key').val();
	var rmbr = $('#remember_login');
	var ckbx = false;
	var isInvalid = false;
	
	if(rmbr.is(':checked')) {
		ckbx = true;
	}
	
	if(user == "") {
		$('#usrname').addClass('invalid');
		invalidUser = $('#usrname').val();
		isInvalid = true;
	}
	
	if(pass == "") {
		$('#psword').addClass('invalid');
		invalidUser = $('#usrname').val();
		isInvalid = true;
	}
	
	if(userKey == "") {
		$('#usr_key').addClass('invalid');
		invalidUser = $('#usrname').val();
		isInvalid = true;
	}
	
	if(passKey == "") {
		$('#psw_key').addClass('invalid');
		invalidUser = $('#usrname').val();
		isInvalid = true;
	}
	
	if(isInvalid) {
		$('#login_popup').shake('fast');
		isInvalid = false;
	}
	
	LoginPrompt(ckbx, true, user, pass, userKey, passKey);
	
	//alert("Username: " + user + " UserKey: " + userKey + " Password: " + pass + " PassKey: " + passKey + " Remember Me: " + ckbx);
	
}

/**
** YES, I KNOW THIS INSECURE! GITHUB PAGES DOESN'T ALLOW PHP SO THIS IS THE BEST I CAN DO (TO MY KNOWLEDGE)! IT IS JUST TO GET RID OF THE MAJORITY OF PEOPLE
** SINCE THEY WILL EXPECT THIS TO BE SECURE. WE ARE HOPING THAT THE FEW WHO SEE THIS WON'T TRY TO EXPLOIT THIS. AGAIN, EVERYTHING THAT IS PASSWORD PROTECTED
** IS OWNED BY DIGIPEN AND IT IS ILLEGAL TO TAKE THESE FILES!
**/

var userAndPasswordMatch;
var funcDone;

LoginPrompt = function(rememberUser, popupBox, user, pass, key1, key2) {
	
	var storedLogin = sessionStorage.getItem('WCD_login_access_token_key_session_encrypted');
	var userOne = 'l7i19129i924czic68h0aaal5571z666';
	var userTwo = '21232b297z57z5z743894z0a4z801br3';
	
	if(storedLogin != userOne || storedLogin != userTwo || storedLogin == null) {
		
		var username;
		var password;
		var rawUsername;
		
		if(!popupBox) {
			
			username = window.prompt("Username");
			password = window.prompt("Password");
			
			rawUsername = username;
			
			username = EncryptText(username, false);
			password = EncryptText(password, false);
			
		} else if(popupBox) {
			
			username = user;
			password = pass;
			
			rawUsername = username;
			
			username = EncryptText(username, true, key1);
			password = EncryptText(password, true, key2);
			
		}
		
		console.log(username);
		console.log(password);
		
		//$.when(CheckForMatch(username, password)).done(CheckLogin());
		
		CheckForMatch(username, password, function() {
			CheckLogin(rawUsername, username, rememberUser);
		});
		
	}
	
}

CheckLogin = function(unencryptedUsername, encryptedUsername, rememberUser) {
	
	if(userAndPasswordMatch) {
		console.log("Access Granted!");
		if(!rememberUser) {
			sessionStorage.setItem('WCD_login_access_token_key_session_raw', unencryptedUsername);
			sessionStorage.setItem('WCD_login_access_token_key_session_encrypted', encryptedUsername);
			sessionStorage.setItem('WCD_login_access_token_key_session_is_logged_in', true);
		} else if(rememberUser) {
			localStorage.WCD_login_access_token_key_local_raw = unencryptedUsername;
			localStorage.WCD_login_access_token_key_local_encrypted = encryptedUsername;
			localStorage.WCD_login_access_token_key_local_is_logged_in = true;
		}
	} else {
		alert("Error: Access Denied! (Make sure you typed in your login details correctly)");
		sessionStorage.clear();
		localStorage.WCDUserHasAgreedToTerms = 0;
		localStorage.WCD_login_access_token_key_local_raw = null;
		localStorage.WCD_login_access_token_key_local_encrypted = null;
		localStorage.WCD_login_access_token_key_local_is_logged_in = false;
	}
}

EncryptText = function(input, enabled, keyw) {
	
	//var strVal = $('#txtValue').val();
	//dvValue
	
	if(input.length == 0) {
		console.log("That's not how it works...");
	} else {
		
		var strMD5 = $().crypt({
			method: "md5",
			source: input
		});
		
		var keyword = keyw;
		
		if(!enabled) {
			keyword = window.prompt("Enter Keyword");
		}
		
		//$('#dvValue').html("MD5 string of <b>" + input + "</b> is <b>" + strMD5 + "</b>");
		
		return KeywordEncrypt(strMD5, keyword);
		
	}
	
}

CheckForMatch = function(user, pass, callback) {
	
	var fileLocation = "unsecure/usr/0a744893951e0d1706ff74a7afccf561.40fe9ad4949331a12f5f19b477133924";
	var checkData;
	
	var file = $.get(fileLocation, function(data) {
		console.log(data);
		checkData = data;
		//process text file line by line
		//$('#div').html(data.replace('n',''));
	});
	
	$.when(file).done(function() {
		
		var username = "";
		var password = "";
		var usernameIsCorrect = false;
		var passwordIsCorrect = false;
		var charCount = 0;
		var userCount = 0;
		var selectedChar0 = "";
		var selectedChar1 = "";
		
		while(userCount < 2 && !userAndPasswordMatch) {
			
			usernameIsCorrect = false;
			passwordIsCorrect = false;
			
			for(var i = charCount; i < checkData.toString().length; i++) {
				
				var selectedChar2 = checkData.charAt(i + 2);
				var selectedChar3 = checkData.charAt(i + 3);
				
				selectedChar0 = checkData.charAt(i);
				selectedChar1 = checkData.charAt(i + 1);
				
				username += checkData.charAt(i);
				
				if(selectedChar1 == " " && selectedChar2 == ":" && selectedChar3 == " ") {
					
					console.log(selectedChar1);
					console.log(selectedChar2);
					console.log(selectedChar3);
					
					console.log(username);
					
					if(username == user) {
						console.log("Username Match!");
						usernameIsCorrect = true;
					} else if(username != user) {
						console.log("Username Invalid!");
						usernameIsCorrect = false;
					} else {
						console.log("Error: Check Failed!");
						usernameIsCorrect = false;
					}
					
					break;
					
				}
				
			}
			
			for(var i = charCount + username.length + 3; i < checkData.toString().length; i++) {
				
				selectedChar0 = checkData.charAt(i);
				selectedChar1 = checkData.charAt(i + 1);
				
				password += checkData.charAt(i);
				
				if(selectedChar1 == "]") {
					
					console.log(selectedChar1);
					
					console.log(password);
					
					if(password == pass) {
						console.log("Password Match!");
						passwordIsCorrect = true;
					} else if(password != pass) {
						console.log("Password Invalid!");
						passwordIsCorrect = false;
					} else {
						console.log("Error: Check Failed!");
						passwordIsCorrect = false;
					}
					
					charCount = i + 1;
					
					break;
					
				}
				
			}
			
			if(usernameIsCorrect && passwordIsCorrect) {
				userAndPasswordMatch = true;
				funcDone = true;
				console.log("i work");
				callback.call(this);
				return;
				break;
			}
			
			username = "";
			password = "";
			
			charCount++;
			userCount++;
			
		}
		
	});
	
}

/* ENCRYPT ENCRYPTED TEXT */

KeywordEncrypt = function(message, key) {
	
	return scramble(message, key);
	
}

var KWA = [];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

makeKWA = function(key) {

	var keyword = key.toLowerCase();
	KWA = [];
	
	for(var i = 0; i < keyword.length; i++) {
		var newChar = keyword.charAt(i);
		KWA.push(newChar);
	}
	
	for(var j = 0; j < alphabet.length; j++) {
		var letter = alphabet[j];
		if(KWA.indexOf(letter) == -1) {
			KWA.push(letter);
		}
	}
	
	console.log(KWA);
	
}

scramble = function(message, key) {

	makeKWA(key);
	
	var result = "";
	
	var word = message;
	
	for(k = 0; k < word.length; k++) {
		
		var letter = word.charAt(k);
		
		if($.isNumeric(letter)) {
			result += letter;
			continue;
		}
		
		var AAindex = alphabet.indexOf(letter);
		var newLetter = KWA[AAindex];
		
		result += newLetter;
		
	}
	
	//alert(result);
	
	return result;
	
	KWA = [];
}
