//-------------------------------- SEARCH FORM --------------------------------

let inputSearch= document.getElementById("inputSearch");
let buttonSearch = document.getElementById("buttonSearch");
let searchResult = document.getElementById("searchResult");

let searchOptions = ["Álbums", "Collages", "Fotos", "Cuadros"];



function validateSearch(text) {
	var regex = /^[a-z]{3,}$/ig;
	return regex.test(text) ? true : false;
}


function search(){

    let userText = inputSearch.value.toLowerCase();
    let result = "";

    if(userText.value == "") {
		inputSearch.classList.add("is-invalid");
        document.getElementById("errorSearch").textContent = "Es campo es obligatorio";
        searchResult.innerHTML="";
    }else if (!validateSearch(userText)){
        inputSearch.classList.add("is-invalid");
		document.getElementById("errorSearch").textContent = "El texto ha de contener mínimo 3 carácteres";
        searchResult.innerHTML="";
    }else{
        inputSearch.classList.remove("is-invalid");
        document.getElementById("errorSearch").textContent = "";
        for(let i=0; i<searchOptions.length; i++){
            let option = searchOptions[i].toLowerCase();
            if (option.indexOf(userText) !== -1){
                result += searchOptions[i];
                document.getElementById("searchResult").innerHTML = result;
            }
        }
        if(result === ""){
            searchResult.innerHTML = "No se encontró nada con estos términos de búsqueda";
        }
    }
      
}

inputSearch.addEventListener("keyup", search);





//-------------------------------- LOGIN / REGISTER FORM --------------------------------

let loginForm = document.getElementById("loginForm");
let inputs = document.querySelectorAll("#loginForm input");


let emailLogin= document.getElementById("emailLogin");
let passwordLogin = document.getElementById("passwordLogin");

let arrayEmails = [];


function loginValidate(){
    let emptyFormsLogin = 0;

    //Validate Email
    if(emailLogin.value == "") {
		emailLogin.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "Este campo es obligatorio";
        emptyFormsLogin ++;
    }else if(!validateEmail(emailLogin.value)){
		emailLogin.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "El email no cumple el formato";
		emptyFormsLogin ++;
	}else{
        emailLogin.classList.add("is-valid");
        emailLogin.classList.remove("is-invalid");
        document.getElementById("errorEmailLogin").textContent = "";
    }
    if(arrayEmails !== undefined){
        for(let i=0; i<arrayEmails.length; i++){
            if(emailLogin == arrayEmails[i]){
                document.getElementById("errorEmailLogin").textContent = ""
            }else{
                document.getElementById("errorEmailLogin").textContent = "No consta registrado. Primero debe registrarse."
            }
        }
    }
    

    //Validate Password
    if(passwordLogin.value == "") {
		passwordLogin.classList.add("is-invalid");
		document.getElementById("errorPasswordLogin").textContent = "Este campo es obligatorio";
		emptyFormsLogin ++;
	}else{
        passwordLogin.classList.add("is-valid");
        passwordLogin.classList.remove("is-invalid");
        document.getElementById("errorPasswordLogin").textContent = "";
    }


    if (emptyFormsLogin > 0){
        return false;
    }else{
		return true;
	}
   
}

loginForm.addEventListener("submit", function(event){
    event.preventDefault();
});


inputs.forEach((input) => {
    input.addEventListener("keyup", loginValidate);
    input.addEventListener("blur", loginValidate);
});


//---------------
let registerFormFinal = document.getElementById("registerForm");
// let registerInputs = document.querySelectorAll("#registerForm input");


let inputsRegister = document.querySelectorAll("#registerForm input");
let selectRegister = document.querySelectorAll("#registerForm select");

let fieldForms;



function validateEmail(email){
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email) ? true : false;
}


function registerValidate(e){
    

    switch(e.target.name){
        case "user":
            inputValidate(user, "errorUser");
            while(fieldForms == true){
                userField = true;
                break;
            }
        break;
        case "province":
            inputValidate(province, "errorProvince");
            while(fieldForms == true){
                provinceField = true;
                break;
            }
        break;
        case "city":
            inputValidate(city, "errorCity");
            while(fieldForms == true){
                cityField = true;
                break;
            }
        break;
        case "zip":
            inputValidate(zip, "errorZip");
            while(fieldForms == true){
                zipField = true;
                break;
            }
        break;
        case "email":
            inputValidate(email, "errorEmailRegister");
            
            if(!validateEmail(email.value)){
                email.classList.add("is-invalid");
                document.getElementById("errorEmailRegister").textContent = "El email no cumple el formato";  
                fieldForms=false;
            }else{
                arrayEmails.push(email.value);
                console.log(arrayEmails);
            }
            for(let i=0; i<arrayEmails.length; i++){
                if(email.value == arrayEmails[i]){
                    document.getElementById("errorEmailLogin").textContent = "Este email ya consta en nuestra base de datos."
                }
            }

            while(fieldForms == true){
                emailField = true;
                break;
            }
            
        break;
        case "password":
            inputValidate(password, "errorPassword");
            if(!validatePassword(password.value)){
                password.classList.add("is-invalid");
                document.getElementById("errorPassword").textContent = "Debe contener mínimo 8 carácteres, entre los cuales, mínimo uno ha de ser mayúscula y otro un número.";
                fieldForms=false;
            }
            validatePassword2();
            while(fieldForms == true){
                passwordField = true;
                break;
            }
        break; 
        case "password2":
            validatePassword2();
            while(fieldForms == true){
                password2Field = true;
                break;
            }
        break;
    }
}

function validatePassword(password){
    var regexPass = /^(?=[a-zA-Z]*\d)(?=[a-z0-9]*[A-Z])(?=[A-Z0-9]*[a-z])\S{8,}$/;
    return regexPass.test(password) ? true : false;
}


function validatePassword2(){
    let registerPassword1 = password.value;
    let registerPassword2 = password2.value;

    if(registerPassword1 !== registerPassword2){
        password2.classList.add("is-invalid");
        document.getElementById("errorPassword2").textContent = "Ambas contraseñas deben ser iguales";
        fieldForms=false;
    }else{
        password2.classList.add("is-valid");
        password2.classList.remove("is-invalid");
        document.getElementById("errorPassword2").textContent = "";
        fieldForms=true;
    }
}



function inputValidate(field, inputName){
    if(field.value == ""){
		field.classList.add("is-invalid");
		document.getElementById(inputName).textContent = "Este campo es obligatorio";
        fieldForms=false;
    }else{
        field.classList.add("is-valid");
        field.classList.remove("is-invalid");
        document.getElementById(inputName).textContent = "";
        fieldForms=true;
        
    }
}




inputsRegister.forEach((input) => {
    input.addEventListener("keyup", registerValidate);
    input.addEventListener("blur", registerValidate);
});


selectRegister.forEach((input) => {
    input.addEventListener("keyup", registerValidate);
    input.addEventListener("blur", registerValidate);
});



registerFormFinal.addEventListener('submit', (event) =>{
    event.preventDefault();
    if(userField && provinceField && cityField && zipField && emailField && passwordField && password2Field){
        console.log("funciona");
    }
});

