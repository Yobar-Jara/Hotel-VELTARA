// La función que maneja la lógica de inicio de sesión
function validarLogin(event) {
  // Previene el envío del formulario por defecto (evita la recarga)
  event.preventDefault();

  // Clave estática para la demo
  const CLAVE_SECRETA = "veltara";
  const passwordInput = document.getElementById("password").value;

  // 2. Realizar la verificación
  if (passwordInput.toLowerCase() === CLAVE_SECRETA) {
    alert("¡Acceso concedido! Bienvenido a VELTARA.");
    // Redirige a tu página principal
    window.location.href = "./pages/ladingpage.html";
  } else {
    alert("Clave incorrecta. Inténtalo de nuevo.");
    document.getElementById("password").value = "";
  }

  return false;
}
