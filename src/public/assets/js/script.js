$('.carousel').carousel({
    interval: 4000,
    pause: true,
    wrap: true
});

function validar() {
    //obteniendo el valor que se puso en campo text del formulario
    nombre = document.getElementById("nombre").value;
    apellido = document.getElementById("apellidos").value;
    correo = document.getElementById("email").value;
    tlf = document.getElementById("phone").value;
    mensaje = document.getElementById("mensaje").value;
    valnum = new RegExp('^[6,7,9]{1}[0-9]{8}$');
    valletras = new RegExp('^[A-Z]*[a-z]+$');
    valmail = new RegExp ('^[a-z0-9-]+(.[a-z0-9]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$')
    //la condición
    if (nombre.length == 0 || apellido.length == 0 || correo.length == 0 || tlf.length == 0 || mensaje.length == 0) {
        return alert("Debe completar todos los campos");
    }
    if (valnum.test(tlf) == false){
        return alert("Teléfono incorrecto. Por favor, inténtalo de nuevo");
    }
    if (valletras.test(apellido) == false || valletras.test(nombre) == false){
        return alert("El nombre y apellido no puede contener números o carácteres extraños");
    }
    if (valmail.test(correo) == false){
        return alert("El correo electrónico no es correcto");
    }
    return alert("Gracias por contactarnos, su mensaje será contestado con la mayor brevedad posible");
}

function reservar() {

}

function pedirDomicilio() {
    
}

/* Script login */
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});