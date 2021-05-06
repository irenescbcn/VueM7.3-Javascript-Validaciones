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

    if(userText == "") {
		inputSearch.classList.add("is-invalid");
        searchResult.classList.remove("correct");
        searchResult.classList.remove("d-none");
        document.getElementById("searchResult").textContent = "Es campo es obligatorio";
    }else if (!validateSearch(userText)){
        inputSearch.classList.add("is-invalid");
        searchResult.classList.remove("correct");
        searchResult.classList.remove("d-none");
		document.getElementById("searchResult").textContent = "El texto ha de contener mínimo 3 carácteres";
    }else{
        inputSearch.classList.remove("is-invalid");
        document.getElementById("searchResult").textContent = "";
        for(let i=0; i<searchOptions.length; i++){
            let option = searchOptions[i].toLowerCase();
            if (option.indexOf(userText) !== -1){
                result += searchOptions[i];
                inputSearch.classList.add("is-valid");
                inputSearch.classList.remove("is-invalid");
                searchResult.classList.remove("d-none");
                document.getElementById("searchResult").innerHTML = result;
                searchResult.classList.add("correct");
            }
        }
        if(result === ""){
            inputSearch.classList.add("is-invalid");
            searchResult.classList.remove("d-none");
            searchResult.classList.remove("correct");
            searchResult.innerHTML = "No se encontró nada con estos términos de búsqueda";
        }
    }
      
}


inputSearch.addEventListener("keyup", search);





//-------------------------------- LOGIN / REGISTER FORM --------------------------------

let arrayEmails = [];
let arrayPasswords = [];
var acumErrores = 0;

let loginForm = document.getElementById('loginForm');
let registerForm = document.getElementById("registerForm");


//VALIDATE FUNCTIONS
function inputValidate(field, inputName){
    if(field.value == ""){
		field.classList.add("is-invalid");
		document.getElementById(inputName).textContent = "Este campo es obligatorio";  
    }else{
        field.classList.add("is-valid");
        field.classList.remove("is-invalid");
        document.getElementById(inputName).textContent = "";
        fieldForms=true;  
    }
}

function password2InputValidate(){
    let registerPassword1 = password.value;
    let registerPassword2 = password2.value;

    if(registerPassword1 !== registerPassword2){
        password2.classList.add("is-invalid");
        document.getElementById("errorPassword2").textContent = "Ambas contraseñas deben ser iguales";
         
    }else{
        password2.classList.add("is-valid");
        password2.classList.remove("is-invalid");
        document.getElementById("errorPassword2").textContent = "";
        password2Field=true;
    }
}



//--------------- LOGIN ---------------

let correctorEmail = false;
let correctorPassword= false;

function loginValidate() {

	loginForm.classList.remove('is-invalid');
	
	var emailLogin = document.forms["loginForm"]["emailLogin"];
	var emailLogin = document.getElementById('emailLogin');
	var passwordLogin = document.forms["loginForm"]["passwordLogin"];

    //VALIDATE EMAIL WHEN LOGIN
	if(emailLogin.value == "") {
		emailLogin.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "Este campo es obligatorio";
        
    }else if(!validateEmail(emailLogin.value)){
		emailLogin.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "El email no cumple el formato";
		
	}else{
        if(arrayEmails.length !== 0){
            for(let i=0; i<arrayEmails.length; i++){
                if(emailLogin.value == arrayEmails[i]){
                    emailLogin.classList.add("is-valid");
                    emailLogin.classList.remove("is-invalid");
                    document.getElementById("errorEmailLogin").textContent = "";
                    correctorEmail = true;
                }else{
                    emailLogin.classList.add("is-invalid");
                    document.getElementById("errorEmailLogin").textContent = "No consta registrado. Primero debe registrarse."
                    
                }
            }
        }else{
            emailLogin.classList.add("is-invalid");
            document.getElementById("errorEmailLogin").textContent = "No consta registrado. Primero debe registrarse.";
            
        }
    }
    
    //VALIDATE PASSWORD WHEN LOGIN
    if(passwordLogin.value == "") {
		passwordLogin.classList.add("is-invalid");
		document.getElementById("errorPasswordLogin").textContent = "Este campo es obligatorio";
		acumErrores ++;
	}else{
        if(arrayPasswords.length !== 0){
            for(let i=0; i<arrayPasswords.length; i++){
                if(passwordLogin.value == arrayPasswords[i]){
                    passwordLogin.classList.add("is-valid");
                    passwordLogin.classList.remove("is-invalid");
                    document.getElementById("errorPasswordLogin").textContent = "";
                    correctorPassword=true;
                }else{
                    passwordLogin.classList.add("is-invalid");
                    document.getElementById("errorPasswordLogin").textContent = "La contraseña no es correcta."
                          
                }
            }
        }
    }
}



//--------------- REGISTRATION ---------------

//REGISTRATION VARIABLES
let inputsRegister = document.querySelectorAll("#registerForm input");
let selectRegister = document.querySelectorAll("#registerForm select");

let inputUser=document.getElementById("user");
let inputProvince=document.getElementById("province");
let inputCity=document.getElementById("city");
let inputZip=document.getElementById("zip");
let inputEmail=document.getElementById("email");
let inputPassword=document.getElementById("password");

let fieldForms;

let userField = false;
let provinceField = false;
let cityField = false;
let zipField = false;
let emailField = false;
let passwordField = false;
let password2Field = false;

//VALIDATE REGISTRATION FUNCTION 
function validateRegistration(e){
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
            }
            for(let i=0; i<arrayEmails.length; i++){
                if(email.value == arrayEmails[i]){
                    document.getElementById("errorEmailRegister").textContent = "Este email ya consta en nuestra base de datos."
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
            
            while(fieldForms == true){
                passwordField = true;
                break;
            }
            password2InputValidate();
        break; 
        case "password2":
            password2InputValidate();
            
        break;
    }
}



//REGEX FUNCTIONS
function validateEmail(email){
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email) ? true : false;
}

function validatePassword(password){
    var regexPass = /^(?=[a-zA-Z]*\d)(?=[a-z0-9]*[A-Z])(?=[A-Z0-9]*[a-z])\S{8,}$/;
    return regexPass.test(password) ? true : false;
}



//EVENT LISTENER 
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
	console.log(event);

    if(correctorEmail && correctorPassword){
        $('#loginRegisterModal').modal('hide');
    }
    
});


inputsRegister.forEach((input) => {
    // input.addEventListener("keyup", validateRegistration);
    input.addEventListener("blur", validateRegistration);
});

selectRegister.forEach((input) => {
    // input.addEventListener("keyup", validateRegistration);
    input.addEventListener("blur", validateRegistration);
});


registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(userField && provinceField && cityField && zipField && emailField && passwordField && password2Field){
        document.getElementById("errorRegister").innerHTML= "";
        
        arrayEmails.push(email.value);
        arrayPasswords.push(password.value)
        console.log(arrayEmails);
        console.log(arrayPasswords);
        
        document.getElementById("nameResultModal").innerHTML= "Nombre de usuario: " + inputUser.value;
        document.getElementById("provinceResultModal").innerHTML= "Provincia: " + inputProvince.value;
        document.getElementById("cityResultModal").innerHTML= "Ciudad: " + inputCity.value;
        document.getElementById("zipResultModal").innerHTML= "Código Postal: " + inputZip.value;
        document.getElementById("emailResultModal").innerHTML= "Email: " + inputEmail.value;
        document.getElementById("passwordResultModal").innerHTML= "Contraseña: " + inputPassword.value;
        
        $("#firstModal").click(() =>{          
            $('#loginRegisterModal').modal('hide');
            $('#resultModal').modal('show');
        })

        $("#firstModal").click();

        $("#secondModalBtn").click(() =>{
            $('#resultModal').modal('hide');
            $('#loginRegisterModal').modal('show');
        })

        $("#secondModalBtn").click();
        
    }else{
        document.getElementById("errorRegister").innerHTML= "Todos los campos deben estar rellenados correctamente."
    }
});

