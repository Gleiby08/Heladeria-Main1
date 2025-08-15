// Espera a que todo el contenido de la página se cargue
document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const passwordModalOverlay = document.getElementById('password-modal-overlay');
    const passwordForm = document.getElementById('password-form');
    const passwordInput = document.getElementById('admin-password');
    const passwordError = document.getElementById('password-error');
    const adminPanel = document.querySelector('.admin-panel');
    const logoutButton = document.getElementById('logout-admin-btn');

    // --- Elementos del DOM para CRUD ---
    const flavorForm = document.querySelector('.flavor-form');
    const saveFlavorBtn = document.getElementById('save-flavor');
    const clearFormBtn = document.getElementById('clear-form-btn');
    const adminFlavorsList = document.getElementById('admin-flavors-list');
    const flavorNameInput = document.getElementById('flavor-name');
    const flavorTypeInput = document.getElementById('flavor-type');
    const flavorPriceInput = document.getElementById('flavor-price');
    const flavorDescInput = document.getElementById('flavor-desc');
    const flavorImageInput = document.getElementById('flavor-image');
    const flavorTagsInput = document.getElementById('flavor-tags');
    const imagePreview = document.getElementById('image-preview');
    const notification = document.getElementById('notification');

    // --- Lógica de la Clave Secreta ---
    const claveSecreta = 'helado123'; // ¡Puedes cambiar esta clave!

    // --- Estado de la aplicación ---
    let editingFlavorId = null;

    // Enfocar el campo de la contraseña al cargar
    if (passwordInput) {
        passwordInput.focus();
    }

    // Manejar el envío del formulario de contraseña
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const claveIngresada = passwordInput.value;

        if (claveIngresada === claveSecreta) {
            // Clave correcta: ocultar el modal y mostrar el panel
            passwordModalOverlay.style.display = 'none';
            adminPanel.style.display = 'block';
            fetchAndRenderFlavors(); // Cargar los sabores al entrar
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
            // Redirige a la página de inicio usando una ruta absoluta para mayor fiabilidad
            window.location.href = '/';
        });
    }

    // --- Funciones de la API ---

    // Obtener y renderizar todos los sabores
    const fetchAndRenderFlavors = async () => {
        try {
            const response = await fetch('/api/flavors');
            
            // Si la respuesta no es exitosa, intenta leer el mensaje de error del servidor
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error del servidor: ${response.status}`);
            }

            const flavors = await response.json();
            
            adminFlavorsList.innerHTML = ''; // Limpiar la lista
            
            if (flavors.length === 0) {
                adminFlavorsList.innerHTML = '<p>No hay sabores para mostrar. ¡Añade uno nuevo!</p>';
                return;
            }

            flavors.forEach(flavor => {
                const flavorItem = document.createElement('div');
                flavorItem.className = 'flavor-item';
                flavorItem.innerHTML = `
                    <div class="flavor-info">
                        <strong>${flavor.name}</strong> - $${flavor.price.toFixed(2)}
                    </div>
                    <div class="flavor-actions">
                        <button class="edit-btn" data-id="${flavor.id || flavor._id}">Editar</button>
                        <button class="delete-btn" data-id="${flavor.id || flavor._id}">Eliminar</button>
                    </div>
                `;
                adminFlavorsList.appendChild(flavorItem);
            });

            // Añadir event listeners a los nuevos botones
            document.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', handleEditFlavor));
            document.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDeleteFlavor));

        } catch (error) {
            // Ahora mostraremos un error más detallado
            console.error('Error al obtener los sabores:', error);
            adminFlavorsList.innerHTML = `<p style="color: red; font-weight: bold;">No se pudieron cargar los sabores.</p><p style="color: #c0392b; margin-top: 5px;">Motivo: ${error.message}</p>`;
        }
    };

    // --- Función para mostrar notificaciones ---
    let notificationTimeout;
    const showNotification = (message, type = 'success') => {
        if (notificationTimeout) {
            clearTimeout(notificationTimeout);
        }

        notification.textContent = message;
        notification.className = 'notification'; // Resetea las clases
        notification.classList.add(type); // Añade 'success' o 'error'
        notification.classList.add('show');

        notificationTimeout = setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // La notificación se oculta después de 3 segundos
    };

    // Limpiar el formulario y resetear el estado de edición
    const resetForm = () => {
        flavorForm.reset();
        imagePreview.style.display = 'none';
        imagePreview.src = '';
        editingFlavorId = null;
        saveFlavorBtn.textContent = 'Guardar Sabor';
        flavorNameInput.focus();
    };

    // Manejar el guardado (Crear o Actualizar)
    const handleSaveFlavor = async (e) => {
        e.preventDefault();

        const flavorData = {
            name: flavorNameInput.value,
            type: flavorTypeInput.value,
            price: parseFloat(flavorPriceInput.value),
            description: flavorDescInput.value,
            image: flavorImageInput.value,
            tags: flavorTagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag) // Limpia y filtra tags vacíos
        };

        if (!flavorData.name || !flavorData.price || !flavorData.type || !flavorData.description || !flavorData.image) {
            showNotification('Todos los campos son obligatorios para crear un sabor.', 'error');
            return;
        }

        try {
            const response = await fetch(editingFlavorId ? `/api/flavors/${editingFlavorId}` : '/api/flavors', {
                method: editingFlavorId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(flavorData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar el sabor');
            }

            showNotification(editingFlavorId ? 'Sabor actualizado con éxito' : 'Sabor creado con éxito');
            // El formulario ya no se limpia automáticamente. Se usa el botón "Limpiar".
            await fetchAndRenderFlavors();

        } catch (error) {
            console.error('Error al guardar:', error);
            showNotification(error.message, 'error');
        }
    };

    // Manejar la edición de un sabor
    const handleEditFlavor = async (e) => {
        // Busca el botón más cercano para asegurar que siempre obtenemos el ID
        const button = e.target.closest('.edit-btn');
        const id = button.dataset.id;
        try {
            const response = await fetch(`/api/flavors/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                // Usa el mensaje del servidor si está disponible, si no, uno genérico.
                throw new Error(errorData.message || 'No se pudo encontrar el sabor');
            }
            const flavor = await response.json();

            flavorNameInput.value = flavor.name;
            flavorTypeInput.value = flavor.type;
            flavorPriceInput.value = flavor.price;
            flavorDescInput.value = flavor.description;
            flavorImageInput.value = flavor.image;
            flavorTagsInput.value = flavor.tags.join(', ');
            
            imagePreview.src = flavor.image;
            imagePreview.style.display = flavor.image ? 'block' : 'none';

            editingFlavorId = id;
            saveFlavorBtn.textContent = 'Actualizar Sabor';
            window.scrollTo({ top: flavorForm.offsetTop - 20, behavior: 'smooth' });

        } catch (error) {
            console.error('Error al editar:', error);
            showNotification(error.message, 'error');
        }
    };

    // Manejar la eliminación de un sabor
    const handleDeleteFlavor = async (e) => {
        // Busca el botón más cercano para asegurar que siempre obtenemos el ID
        const button = e.target.closest('.delete-btn');
        const id = button.dataset.id;
        if (confirm('¿Estás seguro de que quieres eliminar este sabor?')) {
            try {
                const response = await fetch(`/api/flavors/${id}`, { method: 'DELETE' });
                if (!response.ok) throw new Error('Error al eliminar el sabor');
                showNotification('Sabor eliminado con éxito');
                await fetchAndRenderFlavors();
            } catch (error) {
                console.error('Error al eliminar:', error);
                showNotification(error.message, 'error');
            }
        }
    };

    // Previsualizar imagen y añadir listeners
    flavorImageInput.addEventListener('input', () => {
        imagePreview.src = flavorImageInput.value;
        imagePreview.style.display = flavorImageInput.value ? 'block' : 'none';
    });
    flavorForm.addEventListener('submit', handleSaveFlavor);
    clearFormBtn.addEventListener('click', resetForm);
});
