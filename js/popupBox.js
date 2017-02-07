$('.agree-link').click(function() {
    if(typeof(Storage) !== "undefined") {
        if(localStorage.WCDUserHasAgreedToTerms) {
            //localStorage.WCDUserHasAgreedToTerms = Number(localStorage.WCDUserHasAgreedToTerms)+1;
			
			if(localStorage.WCDUserHasAgreedToTerms == 1) {
				LoginPrompt();
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

function AgreeAlert() {
	
	var promptMessage = "By attempting to access any content on this site, you understand and agree that you are either a staff member of DigiPen Institute of Technology or a team member of W.C.D., Inc. You also understand that all assets/code hosted on the link you are attempting to access/visit is under copyright protection of DigiPen Institute of Technology. If you understand and agree to these terms, type \"I agree\" in the text box below exactly as shown. If you do not agree and/or are not a staff member of DigiPen Institute of Technology, or W.C.D., Inc., type anything else in the box below and leave this site immediately!";
	
	var agreePopup = window.prompt(promptMessage);
	
	if(agreePopup.toLowerCase() == "i agree") {
		localStorage.WCDUserHasAgreedToTerms = 1;
		LoginPrompt();
	} else {
		localStorage.WCDUserHasAgreedToTerms = 0;
	}
	
}

/**
** YES, I KNOW THIS INSECURE! GITHUB PAGES DOESN'T ALLOW PHP SO THIS IS THE BEST I CAN DO (TO MY KNOWLEDGE)! IT IS JUST TO GET RID OF THE MAJORITY OF PEOPLE
** SINCE THEY WILL EXPECT THIS TO BE SECURE. WE ARE HOPING THAT THE FEW WHO SEE THIS WON'T TRY TO EXPLOIT THIS. AGAIN, EVERYTHING THAT IS PASSWORD PROTECTED
** IS OWNED BY DIGIPEN AND IT IS ILLEGAL TO TAKE THESE FILES!
**/

var userAndPasswordMatch = false;

function LoginPrompt() {
	
	var username = window.prompt("Username");
	var password = window.prompt("Password");
	
	username = EncryptText(username);
	password = EncryptText(password);
	
	console.log(username);
	console.log(password);
	
	CheckForMatch(username, password);
	
	if(userAndPasswordMatch) {
		alert("Access Granted!");
	} else {
		alert("Error: Access Denied! (Make sure you typed in your login details correctly)");
	}
	
}

function EncryptText(input) {
	
	//var strVal = $('#txtValue').val();
	//dvValue
	
	if(input.length == 0) {
		alert("That's not how it works...");
	} else {
		
		var strMD5 = $().crypt({
			method: "md5",
			source: input
		});
		
		var keyword = window.prompt("Enter Keyword");
		
		//$('#dvValue').html("MD5 string of <b>" + input + "</b> is <b>" + strMD5 + "</b>");
		
		return KeywordEncrypt(strMD5, keyword);
		
	}
	
}

function CheckForMatch(user, pass) {
	
	var fileLocation = "unsecure/usr/0a744893951e0d1706ff74a7afccf561.40fe9ad4949331a12f5f19b477133924";
	
	jQuery.get(fileLocation, function(data) {
		console.log(data);
		//process text file line by line
		//$('#div').html(data.replace('n',''));
		
		var checkData = data;
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
			}
			
			username = "";
			password = "";
			
			charCount++;
			userCount++;
			
		}
		
		if(userAndPasswordMatch) {
			alert("true!");
			return true;
		} else {
			alert("false!");
			return false;
		}
		
	});
	
	if(userAndPasswordMatch) {
		alert("success!");
		return true;
	} else {
		alert(":(");
		return false;
	}
	
}

/* ENCRYPT ENCRYPTED TEXT */

function KeywordEncrypt(message, key) {
	
	return scramble(message, key);
	
}

var KWA = [];
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

function makeKWA(key) {

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

function scramble(message, key) {

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





