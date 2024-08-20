const cabeceras = new Headers();
cabeceras.set("Content-Type", "application/json");
const opciones = {
    method: "GET",
    headers: cabeceras,
    // body: JSON.stringify(datos)
};
const url = 'https://swapi.dev/api/';

//async / await
const peticion = async (url, opciones) => {
    const respuesta = await fetch(url, opciones);
    if (respuesta.ok) {
        const datos = await respuesta.json()
        return datos
    } else {
        return []
    }
}

// ****************** PEDIR OPCION NÚMERICA ****************
const validarOpcSinCallback = function (minimo, maximo, mensaje) {
    return new Promise((resolve) => {
        while (true) {
            var opcion = prompt(mensaje);
            if (isNaN(opcion) || opcion > maximo || opcion < minimo) {
                alert(`*Debes ingresar un numero valido, y que esté entre ${minimo} y ${maximo}`);
            } else {
                break;
            }
        }
        opcion = Number(opcion);
        resolve(opcion);
    });
}

const FilmByDateFunction = function (filmsArray) {
    let buscarFechaPelicula = prompt("Ingresa el año del que quieres buscar las peliculas")
    console.log("*Cargando...")
    let encontradas = false
    setTimeout(() => {
        for (const pelicula of filmsArray) {
            if ((pelicula.release_date).slice(0, 4) == buscarFechaPelicula) {
                console.log("***********************************************************")
                console.log(`Titulo : ${pelicula.title}`)
                console.log(`Director : ${pelicula.director}`)
                console.log(`Productor : ${pelicula.producer}`)
                console.log(`Fecha de estreno : ${pelicula.release_date}`)
                encontradas = true
            }
        }
        if (!encontradas) {
            console.log(`*No se encontraron peliculas para el año ${buscarFechaPelicula}`)
        }
    }, 2000);
}

const movieCharacters = async function (filmsArray) {

    let buscarPersonajesPelicula = prompt("Ingresa el nombre de la pelicula")
    buscarPersonajesPelicula = buscarPersonajesPelicula.toLowerCase()
    console.log("*Cargando...")
    let encontradas = false

    let listaUrlPersonajesPelicula = []
    // ********************************* TRAER DATOS *************************
    for (const pelicula of filmsArray) {
        if ((pelicula.title.slice(0, 4)).toLowerCase() == buscarPersonajesPelicula.slice(0, 4) || (pelicula.title).toLowerCase() == buscarPersonajesPelicula) {
            var nombrePelicula = pelicula.title
            for (const urlPersonaje of pelicula.characters) {
                listaUrlPersonajesPelicula.push(urlPersonaje);
                encontradas=true
            }

        }
    }
    if (!encontradas) {
        console.log(`*No se encontraron peliculas con el nombre ${buscarPersonajesPelicula}`)
        return null
    }
    // ***************************************************************************
    var lista_nombres_personajes = []

    for (const url of listaUrlPersonajesPelicula) {
        let nombre= await peticion(url)
        nombre = nombre.name
        lista_nombres_personajes.push(nombre)
    }
    setTimeout(() => {
        for (const pelicula of filmsArray) {
            if (pelicula.title == nombrePelicula) {
                console.log(`Personajes de la pelicula ${pelicula.title}`)
                for (const char of lista_nombres_personajes) {
                    console.log(`- ${char}`)
                }
            }
        }
    }, 2000);
    
}

const moviePlanets = async function (filmsArray) {

    let buscarNombrePelicula = prompt("Ingresa el nombre de la pelicula")
    buscarNombrePelicula = buscarNombrePelicula.toLowerCase()
    console.log("*Cargando...")
    let encontradas = false

    let listaUrlPlanetasPelicula = []
    // ********************************* TRAER DATOS *************************
    for (const pelicula of filmsArray) {
        if ((pelicula.title.slice(0, 4)).toLowerCase() == buscarNombrePelicula.slice(0, 4) || (pelicula.title).toLowerCase() == buscarNombrePelicula) {
            var nombrePelicula = pelicula.title
            for (const urlPlanet of pelicula.planets) {
                listaUrlPlanetasPelicula.push(urlPlanet);
                encontradas=true
            }

        }
    }
    if (!encontradas) {
        console.log(`*No se encontraron peliculas con el nombre ${buscarNombrePelicula}`)
        return null
    }
    // ***************************************************************************
    var lista_nombres_Planetas = []

    for (const url of listaUrlPlanetasPelicula) {
        let nombre= await peticion(url)
        nombre = nombre.name
        lista_nombres_Planetas.push(nombre)
    }
    setTimeout(() => {
        for (const pelicula of filmsArray) {
            if (pelicula.title == nombrePelicula) {
                console.log(`Planetas de la pelicula ${pelicula.title}`)
                for (const char of lista_nombres_Planetas) {
                    console.log(`- ${char}`)
                }
            }
        }
    }, 2000);
    
}

const mostrarTodosPlanetas = async function(planetsArray){
    console.log("*Cargando...")
    setTimeout(() => {
        for (const planet of planetsArray) {
            console.log("*************************************")
            console.log(`PLANETA -> ${planet.name}`)
            console.log(`Diametro -> ${planet.diameter}`)
            console.log(`Clima -> ${planet.climate}`)
            console.log(`Terreno -> ${planet.terrain}`)
            console.log(`Poblacion -> ${planet.population}`) 
        }
    }, 1000);
}

async function menu(lista_productos) {
    // traer datos
    const films = await peticion(lista_productos.films)
    const people = await peticion(lista_productos.people)
    const planets = await peticion(lista_productos.planets)
    const species = await peticion(lista_productos.species)
    const starships = await peticion(lista_productos.starships)
    const vehicles = await peticion(lista_productos.vehicles)
    let filmsArray = films.results
    let peopleArray = people.results
    let planetsArray = planets.results
    let speciesArray = species.results
    let starshipsArray = starships.results
    let vehiclesArray = vehicles.results
    // ****************************************************
    let opcion = await validarOpcSinCallback(1, 20, "Ingresa el numero de la opcion a la cual deseas acceder")
    switch (opcion) {
        case 1://FILM date
            FilmByDateFunction(filmsArray)
            break;
        case 2://Personajes en pelicula
            movieCharacters(filmsArray)
            break;
        case 3://CASO
            moviePlanets(filmsArray)
            break;
        case 4://CASO
            mostrarTodosPlanetas(planetsArray)
            break;
        case 5://CASO

            break;
        case 6://CASO

            break;
        case 7://CASO

            break;
        case 8://CASO

            break;
        case 9://CASO

            break;
        case 10://CASO

            break;
        case 11://CASO

            break;
        case 12://CASO

            break;
        case 13://CASO

            break;
        case 14://CASO

            break;
        case 15://CASO

            break;
        case 16://CASO

            break;
        case 17://CASO

            break;
        case 18://CASO

            break;
        case 19://CASO

            break;
        case 20://CASO

            break;

        default:
            break;
    }
}

// Función asíncrona que controla el bucle del menú
async function iniciarMenu() {
    const principal_object = await peticion(url, opciones)

    console.log(`PERSONAS:
1- Buscar pelicula por año de lanzamiento`);
    await menu(principal_object);

    while (false) {
        await menu(url, opciones);
    }
}

// Iniciar el menú
iniciarMenu();