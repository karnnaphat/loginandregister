window.onload = loginLoad;
function loginLoad(){
	var myForm = document.getElementById("login");
	myForm.onsubmit = checkLogin;
}

function checkLogin(){
	//ถ้าตรวจสอบแล้วพบว่ามีการ login ไม่ถูกต้อง ให้ return false ด้วย
	const getURL = new URLSearchParams(window.location.search);
	const getID = getURL.get('username');
	console.log(getID);
	const getPass = getURL.get('password');
	console.log(getPass);

	var username = document.forms['login']['username'].value;
	var password = document.forms['login']['password'].value;	
	if((username == getID) && (password == getPass))
	{
       alert("Login successful!");
	   return false;
	}
	else
	{
      alert("Password incorrect, please try again.");
	  return false;
	}
}

			