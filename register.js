window.onload = pageLoad;
function pageLoad(){
    var summitButton = document.getElementById("register");
    summitButton.onsubmit = ValidateForm;
}

function ValidateForm() {
    //ถ้าตรวจสอบแล้วว่ามีการ register ไม่ถูกต้องให้ return false ด้วย
    var password = document.forms['register']['password'].value;
    console.log(password);
    var retypePassword = document.forms['register']['repassword'].value;
    console.log(retypePassword);

    if(password == retypePassword)
    {             
        alert("Register successful!");        
    }
}