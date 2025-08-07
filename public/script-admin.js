// Espera a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const passwordModalOverlay = document.getElementById('password-modal-overlay');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('admin-password');
    const passwordError = document.getElementById('password-error');
    const adminPanel = document.querySelector('.admin-panel');
    const logoutButton = document.getElementById('logout-admin-btn');

    // --- Lógica de la Clave Secreta ---
    const claveSecreta = 'helado123'; // ¡Puedes cambiar esta clave!

    // Enfocar el campo de la contraseña al cargar
    passwordInput.focus();

    // Manejar el envío del formulario de contraseña
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const claveIngresada = passwordInput.value;

        if (claveIngresada === claveSecreta) {
            // Clave correcta: ocultar el modal y mostrar el panel
            passwordModalOverlay.style.display = 'none';
            adminPanel.style.display = 'block';
        } else {
            // Clave incorrecta: mostrar mensaje de error
            passwordError.textContent = 'Clave incorrecta. Inténtalo de nuevo.';
            passwordInput.value = ''; // Limpiar el campo
            passwordInput.focus(); // Volver a enfocar

            // Hacer que el modal tiemble para un efecto visual
            const modal = document.querySelector('.password-modal');
            modal.style.animation = 'shake 0.5s';
            setTimeout(() => {
                modal.style.animation = '';
            }, 500);
        }
    });

    // --- Lógica del Botón de Cerrar Sesión ---
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            // Redirige a la página de inicio
            window.location.href = 'index.html';
        });
    }
});// En tu archivo public/script.js (CORREGIDO)

document.addEventListener('DOMContentLoaded', () => {
    // ... otro código para animaciones, etc. ...

    /* // Comentamos la función entera, ya no se necesita.
    function updateAuthUI() {
        const userGreetingElement = document.getElementById('user-greeting'); 
        userGreetingElement.textContent = 'Hola, Usuario!';
        // ...más lógica...
    }
    */

    // Y también comentamos la línea que la llama.
    // updateAuthUI();
});
