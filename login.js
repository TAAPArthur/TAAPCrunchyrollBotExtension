var loginWindow = null;
var loginWindowName="TAAPLogin";
var homeWindow = window;
var credentials;

function loginToCrunchyroll() {
	loginWindow.document.getElementById('login_form_name').value = credentials[0];
	loginWindow.document.getElementById('login_form_password').value = credentials[1];
	loginWindow.document.getElementById('login_form_name').form.submit();
	console.log("submitting");	
	onSuccessfulLogin();
};

function getCredentials() {
	
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if (xmlhttp.responseText) {
				credentials = xmlhttp.responseText.split('\n');
				attemptToLogin();
			} else {
				alert("You need to be logged in to TAAPArthur.no-ip.org to use this extension. Please login");
				window.open('https://taaparthur.no-ip.org/login.html');
			}
		}
	};
	xmlhttp.open('GET', 'https://taaparthur.no-ip.org/CrunchyBot/getCredentials.php', false);
	xmlhttp.send();
}

function attemptToLogin() {
	console.log("attempting to login");
	if(loginWindow==null){
		
		if(window.name==loginWindowName)
			loginWindow=window;
		else {
			if (isOnCorrectDomain(window)&&!isNotLoggedIn(window)&&isLoggedInToCorrectAccount(window)){
				console.log("already logged into desired account");
				onSuccessfulLogin();
			}
			else {		
				console.log("creating new window");
				loginWindow=window.open("https://www.crunchyroll.com",loginWindowName);
			}
			return;
		}
	}
	if (isOnCorrectDomain(loginWindow)) {		
		if (loginWindow.document.location.href == "https://www.crunchyroll.com/login")
			loginToCrunchyroll();
		else if(isNotLoggedIn(loginWindow)){//if not logged in
			loginWindow.location='https://www.crunchyroll.com/login';
		}
		else if (isLoggedInToCorrectAccount(loginWindow)){
			console.log("already logged into desired account");
			onSuccessfulLogin();
		}
		else logout();
	} 
	else loginWindow.document.location.href="https://www.crunchyroll.com";
}
function isOnCorrectDomain(w){return w.document.domain=="www.crunchyroll.com";}
function isNotLoggedIn(w){return w.document.getElementsByClassName("userpanel-item login").length;}
function isLoggedInToCorrectAccount(w){return w.document.getElementsByClassName("username")&&credentials[0] == w.document.getElementsByClassName("username")[0].children[0].innerHTML.trim()}
function onSuccessfulLogin() {
	console.log("logged in");
	//loginWindow.close();
}
function logout() {
	console.log("logging out");	
	//loginWindow.onload = attemptToLogin;
	loginWindow. location='https://www.crunchyroll.com/logout';
	
}
