// BOTON HAMBURGUESA
const btn = document.querySelector(".menu-toggle");

// Selecciona el menú horizontal
const menu = document.querySelector(".Menu-Horizontal");

// Al hacer clic en el botón de hamburguesa
btn.addEventListener("click", () => {
  // Alterna (agrega o quita) la clase "active" en el menú
  // Esto hace que se muestre o se oculte
    menu.classList.toggle("active");

  // (opcional) También puedes alternar una clase en el botón si quieres cambiar su apariencia
    btn.classList.toggle("boton-active");
});

// INICIO CAROUSEL
const inicio = document.querySelector(".Inicio")
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".carousel img");
const nextbtn = document.querySelector(".next");
const prevbtn = document.querySelector(".prev");

let index = 0;

function updateCarousel() {
  const width = inicio.offsetWidth; // simepre actualizado el tamaño (responsive)
  carousel.style.transform = `translateX(-${index * width}px)`;
}

nextbtn.addEventListener("click", () => {
    index = (index + 1) % images.length;
    updateCarousel();
});

prevbtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    updateCarousel();
})

window.addEventListener("resize", updateCarousel);  // clave para responsive

// Auto-Play
setInterval(() => {
    index = (index + 1) % images.length;
    updateCarousel()
}, 5000);

// HABITACION CAROUSEL
const carousels = document.querySelectorAll(".carousel-3d");

carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    const total = images.length;

    let angle = 0;
    let autoRotate;

    // Ángulo entre imágenes
    const theta = 360 / total;

    // Radio automático (círculo perfecto)
    const radius = (carousel.offsetWidth / 2) / Math.tan(Math.PI / total);

    // Posicionar imágenes en círculo
    images.forEach((img, i) => {
        const rotation = theta * i;
        img.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px)`;
    });

    function updateRotation() {
        carousel.style.transform = `rotateY(${angle}deg)`;
    }

    function rotate(deg) {
        angle += deg;
        updateRotation();
    }

    function startAutoRotate() {
        autoRotate = setInterval(() => {
            angle += theta;
            updateRotation();
        }, 5000);
    }

    function stopAutoRotate() {
        clearInterval(autoRotate);
    }

    // Mouse
    carousel.addEventListener("mouseenter", stopAutoRotate);
    carousel.addEventListener("mouseleave", startAutoRotate);

    // Touch
    let startX = 0;

    carousel.addEventListener("touchstart", (e) => {
        startX = e.touches[0].clientX;
        stopAutoRotate();
    });

    carousel.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        let diff = startX - endX;

        if (diff > 80) rotate(theta);
        else if (diff < -80) rotate(-theta);

        startAutoRotate();
    });

    startAutoRotate();
});


// SUITS VERTICAL PRO
document.querySelectorAll(".animation-suite").forEach((suite) => {
    const images = suite.querySelectorAll("img");

    let index = 0;
    let interval = null;

    function update() {
        suite.style.transform = `translateY(-${index * 100}%)`;
    }

    function start() {
        if (interval) return;

        interval = setInterval(() => {
            index = (index + 1) % images.length;
            update();
        }, 5000);
    }

    function stop() {
        clearInterval(interval);
        interval = null;
    }

    // solo corre cuando está visible (opcional pero recomendado)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                start();
            } 
        });
    }, { threshold: 0.3 });

    observer.observe(suite);

    // ajuste al redimensionar
    window.addEventListener("resize", update);

    update();
});

// RESERVA
const fromReserva = document.getElementById("formulario-reserva");

fromReserva.addEventListener("submit", function(e) {

    e.preventDefault();

    // obtener valores
    const name = document.getElementById("nombres").value.trim();
    const lastName = document.getElementById("apellidos").value.trim();
    const cellphone = document.getElementById("telefono").value.trim();
    const email = document.getElementById("correo").value.trim();
    const startDate = document.getElementById("fecha-inicio").value;
    const endDate = document.getElementById("fecha-fin").value;
    const country = document.getElementById("pais").value;

    // radio seleccionado
    const adultos = document.querySelector('input[name="adultos"]:checked');

    // regex
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexTelefono = /^[0-9]{9}$/;

    // validaciones
    if (name === "") {
        alert("Ingrese sus nombres");
        return;
    }

    if (lastName === "") {
        alert("Ingrese sus apellidos");
        return;
    }

    if (!regexTelefono.test(cellphone)) {
        alert("Ingrese un teléfono válido de 9 dígitos");
        return;
    }

    if (!regexCorreo.test(email)) {
        alert("Ingrese un correo válido");
        return;
    }

    if (!adultos) {
        alert("Seleccione número de adultos");
        return;
    }

    if (startDate === "" || endDate === "") {
        alert("Seleccione las fechas");
        return;
    }

    // validar fechas
    if (startDate > endDate) {
        alert("La fecha de inicio no puede ser mayor que la fecha final");
        return;
    }

    if (country === "") {
        alert("Seleccione un país");
        return;
    }

    // éxito
    alert("Reserva realizada correctamente");

    fromReserva.reset();
});

// CONTACTOS
const formulario = document.querySelector('form[name="frm"]');

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const fname = formulario.elements["name"].value;
    const femail = formulario.elements["email"].value;
    const fcellphone = formulario.elements["cellphone"].value;

    if (!fname || !femail || !fcellphone) {
        alert("Por favor, complete todos los campos del formulario");

    } else if (!validateEmail(femail)) {
        alert("Por favor ingrese un correo válido.");
    } else {
        const confirmation = confirm("Estas a punto de enviar el formulario, ¿Desea continuar?");

        if (confirmation) {
            alert("Formulario enviado correctamente.");
            formulario.reset();
        }
    }
});

// validateEmail
function validateEmail(femail) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(femail).toLowerCase());
}
