let pagina = 1;
// Inicializa la variable 'pagina' en 1, que se usará para controlar la página actual de las películas mostradas.

const btnAnterior = document.getElementById('btnAnterior');
// Obtiene el botón con el ID 'btnAnterior' del HTML y lo almacena en la variable 'btnAnterior'.

const btnSiguiente = document.getElementById('btnSiguiente');
// Obtiene el botón con el ID 'btnSiguiente' del HTML y lo almacena en la variable 'btnSiguiente'.

// Agrega un evento al botón 'btnSiguiente' que se activará cuando se haga clic.
btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000){
		// Si la página actual es menor a 1000, incrementa el número de página.
		pagina += 1;
		cargarPeliculas();
		// Llama a la función 'cargarPeliculas' para actualizar la lista de películas con la nueva página.
	}
});

// Agrega un evento al botón 'btnAnterior' que se activará cuando se haga clic.
btnAnterior.addEventListener('click', () => {
	if(pagina > 1){
		// Si la página actual es mayor a 1, decrementa el número de página.
		pagina -= 1;
		cargarPeliculas();
		// Llama a la función 'cargarPeliculas' para actualizar la lista de películas con la nueva página.
	}
});

// Función asíncrona que carga las películas desde la API.
const cargarPeliculas = async() => {
	try {
		// Realiza una petición a la API de The Movie Database para obtener películas populares en la página actual.
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=115ce107855781704b0019e582cb2db1&language=es-MX&page=${pagina}`);
	
		console.log(respuesta); // Muestra la respuesta en la consola para verificar el estado de la solicitud.

		// Verifica si la respuesta de la API fue exitosa (código 200).
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			// Convierte la respuesta a formato JSON y la guarda en la variable 'datos'.

			let peliculas = '';
			// Inicializa una cadena vacía que se llenará con el HTML de cada película.

			// Itera sobre cada película en los resultados obtenidos.
			datos.results.forEach(pelicula => {
				// Construye el HTML para cada película, incluyendo la imagen y el título.
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
					</div>
				`;
			});

			// Inserta el HTML generado en el contenedor con el ID 'contenedor' en el HTML.
			document.getElementById('contenedor').innerHTML = peliculas;

		} else if(respuesta.status === 401){
			// Si la API retorna un código 401, significa que la llave API es incorrecta.
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			// Si la API retorna un código 404, significa que la película no se encontró.
			console.log('La pelicula que buscas no existe');
		} else {
			// Si ocurre algún otro error no especificado, muestra un mensaje genérico.
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		// Si ocurre un error en la petición (problemas de red o errores inesperados), se muestra en la consola.
		console.log(error);
	}
}

// Llama a la función 'cargarPeliculas' para cargar las películas iniciales en la página 1.
cargarPeliculas();
