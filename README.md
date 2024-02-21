# Buscador de Imágenes

Este proyecto consiste en un ejemplo de un buscador de imágenes utilizando el servicio Unsplash. Para desarrollar la aplicación, se registró como desarrollador/a en Unsplash y se utilizó la documentación proporcionada [aquí](https://unsplash.com/documentation).

## Desarrollo de la Aplicación

La aplicación sigue la estructura típica de una aplicación Vanilla JavaScript. Se utilizaron los archivos HTML y CSS proporcionados para el desarrollo.

Una caracteristica a destacar de la aplicación es que funciona con solo este codigo HTML:
```
<body>

    <h1 class="text-center text-3xl text-white my-10 font-bold uppercase">Buscador de Imágenes</h1>

    <div class="buscador max-w-lg mx-auto ">
        <form id="formulario" class="">
            <div>
                <label class="block text-white font-bold uppercase">Término Búsqueda</label>
                <input type="text" class="mt-3 rounded w-full p-2 "
                    placeholder="Término de búsqueda. Ejemplo: Café o Futbol" id="termino" />

                <input type="submit" value="Buscar Imágenes"
                    class="mt-5 w-full py-2 bg-yellow-400 cursor-pointer font-bold uppercase hover:bg-yellow-500 rounded">
            </div>
        </form>
    </div>

    <div id="resultado" class="container mx-auto mt-10 flex flex-wrap justify-evenly"></div>

    <div id="paginacion" class="container mx-auto my-10 text-center flex justify-evenly">
        <button class="button-38" id="btn-back">Anterior</button>
        <button class="button-38" id="btn-next">Siguiente</button>
    </div>
    <div id="modal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="imagenAmpliada">
    </div>
    <script src="js/app.js"></script>
</body>
```

Y toda la logica se ejecuta desde JavaScript.


### Funcionalidades Principales

El desarrollo de la aplicación se dividió en los siguientes pasos:

1. **Definición de Enlaces Principales con el DOM:** Se establecieron enlaces con elementos HTML clave como el formulario de búsqueda, el contenedor de imágenes y los elementos de paginación.

2. **Manejo del Evento Submit del Formulario:** Se implementó un event listener para el evento submit del formulario de búsqueda. Cuando el usuario envía el formulario, se realiza una búsqueda de imágenes utilizando la API de Unsplash.

3. **Manejo de la Paginación:** Se implementó una función para gestionar la paginación de los resultados de búsqueda. Cuando el usuario hace clic en los botones de paginación, se cargan las imágenes correspondientes a la página seleccionada.
´´´
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
´´´


4. **Capacidad de ampliar la imagen** Mediante un modal simplemente haciendo click en la imagen conseguimos una versión en "full" de la imagen.
´´´
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
´´´
Importante tener en cuenta el bucle for que añade el evento de cerrar a todos los closeElements
´´´
function ampliarImagen(url){
    modal.style.display = "block"; // Mostrar el modal
    modalImg.src = url; // Establecer la imagen en el modal
}
´´´

### Funciones Auxiliares

El script principal de la aplicación utiliza varias funciones auxiliares:

- **Función de Validación del Formulario:** Se implementó una función para validar que el formulario no se envíe con un campo de búsqueda vacío.
  
- **Función de Alerta de Validación del Formulario:** Se creó una función para mostrar una alerta cuando el formulario no se valida correctamente.

- **Función de Búsqueda de Imágenes:** Se desarrolló una función para realizar una solicitud a la API de Unsplash utilizando el método `fetch` o `Async/await`. Se consultó la documentación de la API para comprender cómo realizar la solicitud y se procesaron los resultados para mostrar las imágenes en la interfaz de usuario.

- **Función para Mostrar las Imágenes:** Se creó una función para renderizar las imágenes recuperadas de la API en la interfaz de usuario. Cada imagen se muestra con información relevante, como el autor y el número de visualizaciones.

- **Función de Gestión de la Paginación:** Se implementó una función para gestionar la paginación de los resultados de búsqueda. Esta función permite al usuario navegar entre las diferentes páginas de resultados.

## Tecnologías Utilizadas

- **JavaScript (Vanilla):** Se utilizó JavaScript puro para el desarrollo de la lógica de la aplicación.
  
- **HTML y CSS:** Se emplearon HTML y CSS para la estructura y el estilo de la interfaz de usuario.

- **Unsplash API:** Se utilizó la API de Unsplash para realizar búsquedas de imágenes y obtener información sobre las mismas.

Este proyecto proporciona una experiencia de búsqueda de imágenes interactiva y fácil de usar para los usuarios, permitiéndoles encontrar y explorar una amplia variedad de imágenes disponibles en Unsplash.

