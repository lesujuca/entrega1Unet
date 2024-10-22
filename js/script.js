// Variables el id de los elementos modales
var modalTwitter = document.getElementById("modalTwitter");
var modalContact = document.getElementById("modalContact");
var modalUbicacion = document.getElementById("modalUbicacion");

// Variables el id de los enlaces
var btnTwitter = document.getElementById("openModalTwitter");
var btnContact = document.getElementById("openModalContact");
var btnUbicacion = document.getElementById("openModalUbicacion");

// Variables el id de los elementos para cerrar los modales
var spanTwitter = document.getElementsByClassName("close")[0];
var spanContact = document.getElementsByClassName("close")[1];
var spanUbicacion = document.getElementsByClassName("close")[2];

// función al dar click para mostrar el modal de X
btnTwitter.onclick = function() {
    modalTwitter.style.display = "block";
}

// función al dar click para mostrar el formulario de Contacto
btnContact.onclick = function() {
    modalContact.style.display = "block";
}

// función al dar click para mostrar el modal de Ubicación
btnUbicacion.onclick = function() {
    modalUbicacion.style.display = "block";
}

// función al dar click para cerrar el modal de X
spanTwitter.onclick = function() {
    modalTwitter.style.display = "none";
}

// función al dar click para cerrar el modal de Contacto
spanContact.onclick = function() {
    modalContact.style.display = "none";
}

// función al dar click para cerrar el modal de Ubicación
spanUbicacion.onclick = function() {
    modalUbicacion.style.display = "none";
}

// función al dar click fuera del modal
window.onclick = function(event) {
    if (event.target == modalTwitter) {
        modalTwitter.style.display = "none";
    }

    if (event.target == modalContact) {
        modalContact.style.display = "none";
    }

    if (event.target == modalUbicacion) {
        modalUbicacion.style.display = "none";
    }
}

// función para expandir la sección de sobre mi
document.getElementById('expandAbout').addEventListener('click', function(event) {
    event.preventDefault();
    var details = document.getElementById('about');
    if (!details.open) {
        details.querySelector('summary').click();
    }
});

// función para expandir la sección de habilidades
document.getElementById('expandHabilidades').addEventListener('click', function(event) {
    event.preventDefault();
    var details = document.getElementById('skills');
    if (!details.open) {
        details.querySelector('summary').click();
    }
});

// función para consumir la api de noticias y mostrarla en el div de noticias
async function fetchNews() {
    const apiKey = '93dd4505683f42d790f06de23580077b';
    const url = `https://newsapi.org/v2/everything?q=informatics OR computation OR tecnology OR hardware&language=es&pageSize=10&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const articles = data.articles;
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = ''; // Limpia la lista antes de agregar nuevas noticias
        articles.forEach(article => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = article.title;
            link.target = '_blank'; // Abre el enlace en una nueva pestaña
            listItem.appendChild(link);
            newsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

// función para consumir la api de clima y mostrarla en el div de clima
async function clima() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=7.8101945&longitude=-72.1988272&current_weather=true&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m')
        .then(response => response.json())
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            const temperature = data.current_weather.temperature;
            const windSpeed = data.current_weather.windspeed;

            weatherDiv.innerHTML = `
                <p>Temperatura: ${temperature}°C</p>
                <p>Velocidad del viento: ${windSpeed} km/h</p>
            `;
        })
        .catch(error => {
            const weatherDiv = document.getElementById('weather');
            weatherDiv.innerHTML = `<p>Error al cargar datos del clima.</p>`;
            console.error('Error:', error);
        });
}

// función para cambiar los colores según el tema
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-mode');
    const body = document.body;
    
    // Verificar si el usuario ya tiene una preferencia guardada
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.textContent = 'Cambiar a Modo Claro';
    } else {
        body.classList.remove('dark-mode');
        toggleButton.textContent = 'Cambiar a Modo Oscuro';
    }
  
    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            toggleButton.textContent = 'Cambiar a Modo Claro';
        } else {
            localStorage.setItem('theme', 'light');
            toggleButton.textContent = 'Cambiar a Modo Oscuro';
        }
    });
});

// función para consumir la api de noticias y mostrarla en el div de noticias
async function proyectosList() {
    const url = `http://127.0.0.1:8000/api/proyectosList`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const projectGallery = document.getElementById('project-gallery');
        projectGallery.innerHTML = ''; // Limpia la lista antes de agregar los proyectos
        console.log(data);
        data.forEach(proyecto => {
            const listProy = document.createElement('div');
            listProy.classList.add('project-card'); // Agrega la clase al div
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            h3.innerText = proyecto.nombre_proyecto;
            p.textContent = proyecto.descripcion_proyecto;
            listProy.appendChild(h3);
            listProy.appendChild(p);
            projectGallery.appendChild(listProy); // Añadir el div al project-gallery
        });
    } catch (error) {
        console.error('Error Lista Proyectos:', error);
    }
}