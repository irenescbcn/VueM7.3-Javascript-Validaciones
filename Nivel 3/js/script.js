//REGEX FUNCTIONS
regex = {
    word: /^[a-z]{3,}$/i,
    user: /^\w{3,}$/,
    zip: /^\d{4,8}$/,
    email: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    pass: /^(?=[a-zA-Z]*\d)(?=[a-z0-9]*[A-Z])(?=[A-Z0-9]*[a-z])\S{8,}$/,
}

message = {
    required: "Este campo es obligatorio",
    conditions: "El texto ha de contener mínimo 3 carácteres",
    failSearch: "No se encontró nada con estos términos de búsqueda",
    userCondition: "Debe contener mínimo 3 carácteres que pueden ser letras, números o guión bajo",
    cityCondition: "Debe contener mínimo 3 letras",
    zipCondition: "Debe contener entre 4 y 8 dígitos",
    noRegister: "No consta registrado. Primero debe registrarse.",
    emailFormat: "El email no cumple el formato",
    passFormat: "Debe contener mínimo 8 carácteres, entre los cuales, mínimo uno ha de ser mayúscula y otro un número.",
    errorPass: "La contraseña no es correcta.",
    emptyField: "",
}

function Validate(type, value)
{
    var reg; 
    switch (type){
        case "word": reg = regex.word; break;
        case "user": reg = regex.user; break;
        case "zip": reg = regex.zip; break;
        case "email": reg = regex.email; break;
        case "pass": reg = regex.pass; break;     
    }
    return reg.test(value) ? true : false
}


//-------------------------------- SEARCH FORM --------------------------------

let inputSearch= document.getElementById("inputSearch");
let buttonSearch = document.getElementById("buttonSearch");
let searchResult = document.getElementById("searchResult");

let searchOptions = ["Álbums", "Collages", "Fotos", "Cuadros"];


function GetClass(value){
    inputSearch.classList.add("is-invalid");
    searchResult.classList.remove("correct");
    searchResult.classList.remove("d-none");
    searchResult.textContent = value;
}

function search(){
    let userText = inputSearch.value.toLowerCase();
    let result = "";

    if(userText == "") {
		GetClass(message.required);
    }else if (!Validate("word", userText)){
        GetClass(message.conditions);
    }else{
        inputSearch.classList.remove("is-invalid");
        document.getElementById("searchResult").textContent = "";
        for(let i=0; i<searchOptions.length; i++){
            let option = searchOptions[i].toLowerCase();
            if (option.indexOf(userText) !== -1){
                result += searchOptions[i];
                GetClass(result);
                inputSearch.classList.remove("is-invalid")
                inputSearch.classList.add("is-valid");
                searchResult.classList.add("correct");
            }
        }
        if(result === ""){
            GetClass(message.failSearch);
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

function fieldValidate(inputField){
    while(fieldForms == true){
        inputField = true;
        break;
    }
    return inputField;
}


function password2InputValidate(){
    let registerPassword1 = password.value;
    let registerPassword2 = password2.value;

    if(registerPassword1 !== registerPassword2){
        password2.classList.add("is-invalid");
        errorPassword2.textContent = "Ambas contraseñas deben ser iguales";
         
    }else{
        password2.classList.add("is-valid");
        password2.classList.remove("is-invalid");
        errorPassword2.textContent = "";
        password2Field=true;
    }
}


function getClassRegistration(idInput, idDiv, value){
    idInput.classList.add("is-invalid");
    idDiv.textContent = value;
}



//--------------- LOGIN ---------------
let correctorEmail = false;
let correctorPassword = false;

function loginValidate() {
	loginForm.classList.remove('is-invalid');
	
	var emailLogin = document.forms["loginForm"]["emailLogin"];
	var emailLogin = document.getElementById('emailLogin');
	var passwordLogin = document.forms["loginForm"]["passwordLogin"];

    //VALIDATE EMAIL WHEN LOGIN
	if(emailLogin.value == "") getClassRegistration(emailLogin, errorEmailLogin, message.required);
    else if(!Validate("email", emailLogin.value)) getClassRegistration(emailLogin, errorEmailLogin, message.emailFormat);
    else{
        if(arrayEmails.length !== 0){
            for(let i=0; i<arrayEmails.length; i++){
                if(emailLogin.value == arrayEmails[i]){
                    emailLogin.classList.add("is-valid");
                    emailLogin.classList.remove("is-invalid");
                    errorEmailLogin.textContent = "";
                    correctorEmail = true;
                }else getClassRegistration(emailLogin, errorEmailLogin, message.noRegister);
            }
        }else getClassRegistration(emailLogin, errorEmailLogin, message.noRegister); 
    }
    
    //VALIDATE PASSWORD WHEN LOGIN
    if(passwordLogin.value == "") {
        getClassRegistration(passwordLogin, errorPasswordLogin, message.required)
		acumErrores ++;
	}else{
        if(arrayPasswords.length !== 0){
            for(let i=0; i<arrayPasswords.length; i++){
                if(passwordLogin.value == arrayPasswords[i]){
                    passwordLogin.classList.add("is-valid");
                    passwordLogin.classList.remove("is-invalid");
                    errorPasswordLogin.textContent = "";
                    correctorPassword=true;
                }else getClassRegistration(passwordLogin, errorPasswordLogin, message.errorPass)
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
            if (user.value !== ""){
                if(!Validate ("user", user.value)){
                    getClassRegistration(user, errorUser, message.userCondition);
                    fieldForms=false;
                } 
            }
            userField = fieldValidate(userField);
        break;

        case "province":
            inputValidate(province, "errorProvince");
            provinceField = fieldValidate(provinceField);
        break;

        case "city":
            inputValidate(city, "errorCity");
            if (city.value !== ""){
                if(!Validate("word", city.value)){
                    getClassRegistration(city, errorCity, message.cityCondition)
                    fieldForms=false;
                }
            }
            cityField = fieldValidate(cityField);
        break;

        case "zip":
            inputValidate(zip, "errorZip");
            if (zip.value !== ""){
                if(!Validate("zip", zip.value)){
                    getClassRegistration(zip, errorZip, message.zipCondition);
                    fieldForms=false;
                }
            }
            zipField = fieldValidate(zipField);
        break;

        case "email":
            inputValidate(email, "errorEmailRegister");
            if  (email.value !== ""){
                if(!Validate("email", email.value)){
                    getClassRegistration(email, errorEmailRegister, message.emailFormat); 
                    fieldForms=false;
                }
            }
            for(let i=0; i<arrayEmails.length; i++){
                if(email.value == arrayEmails[i]){
                    email.classList.add("is-invalid");
                    errorEmailRegister.textContent = "Este email ya consta en nuestra base de datos."
                }
            }
            emailField = fieldValidate(emailField);
        break;
        
        case "password":
            inputValidate(password, "errorPassword");
            if (password.value !== ""){
                if(!Validate("pass", password.value)){
                    getClassRegistration(password, errorPassword, message.passFormat)
                    fieldForms=false;
                }
            }
            passwordField = fieldValidate(passwordField);
            password2InputValidate();
        break; 

        case "password2":
            password2InputValidate();
        break;
    }
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
    input.addEventListener("blur", validateRegistration);
});

selectRegister.forEach((input) => {
    input.addEventListener("blur", validateRegistration);
});


registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if(userField && provinceField && cityField && zipField && emailField && passwordField && password2Field){
        errorRegister.innerHTML= "";
        
        arrayEmails.push(email.value);
        arrayPasswords.push(password.value)
        console.log(arrayEmails);
        console.log(arrayPasswords);
        
        nameResultModal.innerHTML= "Nombre de usuario: " + inputUser.value;
        provinceResultModal.innerHTML= "Provincia: " + inputProvince.value;
        cityResultModal.innerHTML= "Ciudad: " + inputCity.value;
        zipResultModal.innerHTML= "Código Postal: " + inputZip.value;
        emailResultModal.innerHTML= "Email: " + inputEmail.value;
        passwordResultModal.innerHTML= "Contraseña: " + inputPassword.value;
        
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
        errorRegister.innerHTML= "Todos los campos deben estar rellenados correctamente."
    }
});

