const API_KEY = 'nj6BKQ_waiRqB_2UduIIL2b_CehFMzX1UJVgzkNe1lg';

const resultado = document.getElementById("resultado");

cargarImagenes();

const btnNext = document.getElementById("btn-next");
const btnBack = document.getElementById("btn-back");
btnBack.disabled = true;
const searchForm = document.getElementById("formulario");
let page = 1;
let query = "";

searchForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const termino = document.getElementById("termino");
    query = termino.value;
    resultado.innerHTML = "";
    page = 1;
    (!query) ? cargarImagenes(page) : cargarImagenesConQuery(page, query);
});

btnNext.addEventListener("click", () => {
    page++;
    resultado.innerHTML = "";
    (!query) ? cargarImagenes(page) : cargarImagenesConQuery(page, query);
    btnBack.disabled = false;
});

btnBack.addEventListener("click", () => {
    page--;
    resultado.innerHTML = "";
    (!query) ? cargarImagenes(page) : cargarImagenesConQuery(page, query);
    if (page === 1) {
        btnBack.disabled = true;
    }
});

async function cargarImagenesComun(apiUrl) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Error al cargar las imágenes. Estado: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        for (const json of data.results || data) {
            const imgContainer = document.createElement("div");
            imgContainer.classList.add("imagen-container");

            const img = document.createElement("img");
            img.src = json.urls.regular;
            img.classList.add("imagen");
            imgContainer.appendChild(img);

            const likes = document.createElement("span");
            likes.textContent = `Likes: ${json.likes}`;
            likes.classList.add("likes");
            imgContainer.appendChild(likes);

            img.addEventListener("click", () => {
                ampliarImagen(json.urls.full);
            });

            resultado.appendChild(imgContainer);
        }
    } catch (error) {
        console.error("Error al cargar imágenes:", error);
    }
}

// Obtener el modal y la imagen dentro del modal
const modal = document.getElementById("modal");
const modalImg = document.getElementById("imagenAmpliada");

// Obtener todos los elementos de cierre (botones de cierre y el área de fondo)
const closeElements = document.getElementsByClassName("close");

for (const closeElement of closeElements) {
    closeElement.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

function ampliarImagen(url){
    modal.style.display = "block"; // Mostrar el modal
    modalImg.src = url; // Establecer la imagen en el modal
}

async function cargarImagenes(page = 1) {
    const apiUrl = `https://api.unsplash.com/photos?per_page=6&page=${page}&client_id=${API_KEY}`;
    resultado.innerHTML = "";
    cargarImagenesComun(apiUrl);
}

async function cargarImagenesConQuery(page = 1, query) {
    const apiUrl = `https://api.unsplash.com/search/photos?per_page=6&page=${page}&query=${query}&client_id=${API_KEY}`;
    resultado.innerHTML = "";
    cargarImagenesComun(apiUrl);
}


