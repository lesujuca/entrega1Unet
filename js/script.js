const urlBase = `http://127.0.0.1:8000/api`;

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

    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }

    if (event.target == projectModal) {
        projectModal.style.display = 'none';
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
    const url = `${urlBase}/proyectosList`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const projectGallery = document.getElementById('project-gallery');
        projectGallery.innerHTML = ''; // Limpia la lista antes de agregar los proyectos
        
        const tbody = document.querySelector('#project-table tbody');
        tbody.innerHTML = '';  // Limpia el contenido existente del tbody

        data.forEach(proyecto => {
            //Para los usuarios no logueados
            const listProy = document.createElement('div');
            listProy.classList.add('project-card'); // Agrega la clase al div
            const h3 = document.createElement('h3');
            const p = document.createElement('p');
            p.classList.add('indented'); // Agrega la clase de identación
            h3.innerText = proyecto.nombre_proyecto;
            p.textContent = proyecto.descripcion_proyecto;
            listProy.appendChild(h3);
            listProy.appendChild(p);
            projectGallery.appendChild(listProy); // Añadir el div al project-gallery

            //Para los usuarios logueados
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="name-column">${proyecto.nombre_proyecto}</td>
                <td class="description-column">${proyecto.descripcion_proyecto}</td>
                <td class="action-buttons">
                    <button class="action-button show-button" onclick="mostrarProyecto(${proyecto.id}, 'View')">Mostrar</button>
                    <button class="action-button edit-button" onclick="mostrarProyecto(${proyecto.id}, 'Edit')">Editar</button>
                    <button class="action-button delete-button" onclick="mostrarProyecto(${proyecto.id}, 'Delete')">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error Lista Proyectos:', error);
    }
}

async function login(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch(`${urlBase}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        console.log('Login exitoso:', data);
        // Almacena el token en el localStorage
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso');
        document.getElementById('loginModal').style.display = 'none';

        // Cambia el contenido del botón a "Cerrar Sesión"
        document.querySelector('.btn-log').innerHTML = 'Cerrar Sesión';
        document.querySelector('.btn-log').onclick = logout;
    } else {
        console.error('Error en el login:', data);
        alert('Error en el inicio de sesión. Por favor, verifica tus credenciales.');
    }

    checkAuth();
}

function logout() {
    // Elimina el token del localStorage
    localStorage.removeItem('token');
    alert('Cierre de sesión exitoso');
    // Cambia el contenido del botón de nuevo a "Iniciar Sesión"
    document.querySelector('.btn-log').innerHTML = 'Iniciar Sesión';
    document.querySelector('.btn-log').onclick = () => {
        document.getElementById('loginModal').style.display = 'block';
    };

    checkAuth();
}

// Función para verificar el estado de autenticación
function checkAuth() {
    const token = localStorage.getItem('token');
    const btnLog = document.querySelector('.btn-log');
    
    if (token) {
        // Usuario autenticado
        document.querySelector('.btn-log').innerHTML = 'Cerrar Sesión';
        btnLog.classList.remove('btn-login');  // Remueve la clase btn-login
        btnLog.classList.add('logoutBtn');  // Agrega la clase logoutBtn
        document.querySelector('.btn-log').onclick = logout;

        // Mostrar la opción de Admin Proyectos
        const projectGallery = document.getElementById('project-gallery');
        if (projectGallery) {
            projectGallery.style.display = 'none';
        }
        const proyectos = document.getElementById('proyectos');
        if (proyectos) {
            proyectos.style.display = 'none';
        }
        const adminProyectos = document.getElementById('adminProyectos');
        if (adminProyectos) {
            adminProyectos.style.display = '';
        }
        const project_admin = document.getElementById('project-admin');
        if (project_admin) {
            project_admin.style.display = '';
        }
    } else {
        // Usuario no autenticado
        document.querySelector('.btn-log').innerHTML = 'Iniciar Sesión';
        btnLog.classList.remove('logoutBtn');  // Remueve la clase logoutBtn
        btnLog.classList.add('btn-login');  // Agrega la clase btn-login
        document.querySelector('.btn-log').onclick = () => {
            document.getElementById('loginModal').style.display = 'block';
        };

        // Ocultar la opción de Admin Proyectos
        const projectGallery = document.getElementById('project-gallery');
        if (projectGallery) {
            projectGallery.style.display = '';
        }
        const proyectos = document.getElementById('proyectos');
        if (proyectos) {
            proyectos.style.display = '';
        }
        const adminProyectos = document.getElementById('adminProyectos');
        if (adminProyectos) {
            adminProyectos.style.display = 'none';
        }
        const project_admin = document.getElementById('project-admin');
        if (project_admin) {
            project_admin.style.display = 'none';
        }
    }
}

function mostrarProyecto(id, evento) {
    const token = localStorage.getItem('token');

    const btnReg = document.querySelector('#reg-proy');
    const btnUpd = document.querySelector('#upd-proy');
    const btnDel = document.querySelector('#del-proy');

    btnReg.style.display = 'none';
    btnUpd.style.display = 'none';
    btnDel.style.display = 'none';

    // Añadir readonly a los inputs
    document.getElementById('nombre_proyecto').readOnly = true;
    document.getElementById('descripcion_proyecto').readOnly = true;

    document.getElementById('id').value = id;

    if(evento === "Add") {
        // Remover readonly a los inputs
        document.getElementById('nombre_proyecto').readOnly = false;
        document.getElementById('descripcion_proyecto').readOnly = false;

        document.getElementById('nombre_proyecto').value = "";
        document.getElementById('descripcion_proyecto').value = "";

        document.getElementById('projectModal').style.display = 'block';
        btnReg.style.display = '';
    } else {
        fetch(`${urlBase}/proyectos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(proyecto => {
            document.getElementById('nombre_proyecto').value = proyecto.nombre_proyecto;
            document.getElementById('descripcion_proyecto').value = proyecto.descripcion_proyecto;

            document.getElementById('projectModal').style.display = 'block';

            switch(evento) {
                case "Edit":
                    // Remover readonly a los inputs
                    document.getElementById('nombre_proyecto').readOnly = false;
                    document.getElementById('descripcion_proyecto').readOnly = false;
                    btnUpd.style.display = '';
                    break;
                case "Delete":
                    btnDel.style.display = '';
                    break;
            }
        });
    }
}

function registrarProyecto() {
    const token = localStorage.getItem('token');

    const nombre_proyecto = document.getElementById('nombre_proyecto').value;
    const descripcion_proyecto = document.getElementById('descripcion_proyecto').value;

    fetch(`${urlBase}/proyectos`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_proyecto: nombre_proyecto,
            descripcion_proyecto: descripcion_proyecto
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            alert('Proyecto registrado correctamente');
            document.getElementById('projectModal').style.display = 'none';
            
            // Actualizar la fila correspondiente en la tabla
            proyectosList();
        } else {
            alert('Hubo un problema al registrar el proyecto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function editarProyecto() {
    const token = localStorage.getItem('token');

    const id = document.getElementById('id').value;
    const nombre_proyecto = document.getElementById('nombre_proyecto').value;
    const descripcion_proyecto = document.getElementById('descripcion_proyecto').value;

    fetch(`${urlBase}/proyectos/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_proyecto: nombre_proyecto,
            descripcion_proyecto: descripcion_proyecto
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.id) {
            alert('Proyecto actualizado correctamente');
            document.getElementById('projectModal').style.display = 'none';
            
            // Actualizar la fila correspondiente en la tabla
            proyectosList();
        } else {
            alert('Hubo un problema al actualizar el proyecto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function eliminarProyecto() {
    const token = localStorage.getItem('token');
    
    const id = document.getElementById('id').value;

    fetch(`${urlBase}/proyectos/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Proyecto eliminado correctamente');
            document.getElementById('projectModal').style.display = 'none';

            // Actualizar la fila correspondiente en la tabla
            proyectosList();
        } else {
            alert('Hubo un problema al eliminar el proyecto');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

proyectosList();
fetchNews();
clima();
checkAuth();
setInterval(proyectosList, 600000);
setInterval(fetchNews, 600000);
setInterval(clima, 600000);
setInterval(checkAuth, 600000);