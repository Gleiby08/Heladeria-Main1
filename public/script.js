// ====================


// ESTADO DE LA APLICACIÓN
// ====================
let currentUser = null;
let flavors = []; // Los sabores se cargarán desde la API
let currentFilter = 'all'; // Estado para el filtro actual

// ====================
// DOM ELEMENTS
// ====================
const flavorsList = document.getElementById('flavors-list');

// ====================
// FUNCIONES DE RENDERIZADO
// ====================
function renderFlavors() {
    if (!flavorsList) return;

    // Filtrar los sabores según el estado actual del filtro
    const filteredFlavors = flavors.filter(flavor => {
        if (currentFilter === 'all') {
            return true; // Mostrar todos si el filtro es 'all'
        }
        return flavor.type === currentFilter;
    });

    flavorsList.innerHTML = '';
    if (filteredFlavors.length === 0) {
        flavorsList.innerHTML = `<p class="no-flavors-message">No hay sabores de este tipo disponibles por el momento.</p>`;
        return;
    }
    filteredFlavors.forEach(flavor => {
        const flavorCard = document.createElement('div');
        flavorCard.className = 'flavor-card fade-in';
        flavorCard.innerHTML = ` 
            <div class="flavor-img-container">
                <img src="${flavor.image}" alt="${flavor.name}" class="flavor-image" loading="lazy" decoding="async">
            </div>
            <div class="flavor-content">
                <h3>${flavor.name}</h3>
                <p>${flavor.description}</p>
                <div class="flavor-tags">
                    ${flavor.tags.map(tag => `<span class="tag ${getTagClass(tag)}">${tag}</span>`).join('')}
                </div>
                <div class="flavor-price">$${flavor.price.toFixed(2)}</div>
            </div>`;
        flavorsList.appendChild(flavorCard);
    });
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('appear'));
    }, 100);
}

// ====================
// FUNCIONES UTILITARIAS
// ====================
function getTagClass(tag) {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('vegano')) return 'vegan';
    if (lowerTag.includes('fruta') || lowerTag.includes('cítrico') || lowerTag.includes('rojos')) return 'fruit';
    if (lowerTag.includes('chocolate')) return 'chocolate';
    if (lowerTag.includes('nueces') || lowerTag.includes('almendra')) return 'nut';
    if (lowerTag.includes('nuevo') || lowerTag.includes('limitada')) return 'new';
    return '';
}

// ====================
// LÓGICA PRINCIPAL
// ====================

// Carga los sabores desde la API y luego renderiza el contenido
async function loadDynamicContent() {
    try {
        const response = await fetch('/api/flavors');
        if (!response.ok) throw new Error('Error al obtener los sabores desde la API');
        
        flavors = await response.json(); // Actualiza la variable global de sabores

        // Una vez que tenemos los datos, renderizamos las secciones
        renderFlavors();

    } catch (error) {
        console.error("Error al cargar el contenido dinámico:", error);
        if (flavorsList) {
            flavorsList.innerHTML = `<p style="text-align: center; color: #c0392b;">Lo sentimos, no pudimos cargar nuestros sabores en este momento. Por favor, inténtalo de nuevo más tarde.</p>`;
        }
    }
}

// ====================
// EVENT LISTENERS
// ====================

// Función para gestionar la sesión del usuario (real o invitado)
async function manageUserSession() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // Si no hay token, el visitante es nuevo. Creamos una identidad de invitado.
        console.log('Visitante nuevo detectado. Creando sesión de invitado...');
        try {
            const response = await fetch('/api/auth/guest', { method: 'POST' });
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                console.log('Sesión de invitado creada y token guardado.');
            } else {
                throw new Error(data.message || 'No se pudo crear el usuario invitado.');
            }
        } catch (error) {
            console.error('Error al gestionar la sesión de invitado:', error);
        }
    } else {
        // Si ya hay un token, podemos decodificarlo para saber quién es (opcional)
        console.log('El visitante ya tiene una sesión (token encontrado).');
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await manageUserSession(); // Primero gestionamos la sesión para obtener un token si es necesario
    await loadDynamicContent(); // Luego cargamos el contenido dinámico
    
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('appear');
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(element => observer.observe(element));
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // --- Lógica de Filtros ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Actualizar el estado visual de los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Actualizar el estado del filtro y volver a renderizar
            currentFilter = button.dataset.filter;
            renderFlavors();
        });
    });
});