const imagenesClasificacion = [
    "peliculas/phantom.png",
    "peliculas/atackClones.png",
    "peliculas/revenge.png",
    "peliculas/newHope.png",
    "peliculas/empire.png",
    "peliculas/returnJedi.png"
]

//async / await
const peticion = async (url) => {
    const respuesta = await fetch(url);
    if (respuesta.ok) {
        const datos = await respuesta.json()
        return datos
    } else {
        return []
    }
}
// Función asíncrona que controla el bucle del menú
async function mostrarPersonajes(url) {

    // RECORRER PAGINAS
    const principal_object = await peticion(url);

    let elementos_object = principal_object.results


    elementos_object.forEach(async (item, index) => {

        // ver especie

        let nombre = item.title
        let episode_id = item.episode_id

        let director = item.director
        let producer = item.producer
        let release_date = item.release_date

        let imagenChar = imagenesClasificacion[episode_id-1];
        let dataCharInner = `
                    <div class="card">
                        <div class="interno row g-0">
                            <div class="col-sm-5">
                                <img class="imgChar img-fluid rounded-start" src="${imagenChar}" alt="Darth Vader">
                            </div>
                            <div class="col-sm-7">
                                <div class="card-body">
                                    <h4 class="card-title">${nombre}</h4>
                                    <p class="card-text"><strong>Episode id: </strong>${episode_id}</p>
                                    <p class="card-text"><strong>Director: </strong>${director}</p>
                                    <p class="card-text"><strong>Producer: </strong>${producer}</p>
                                    <p class="card-text"><strong>Release date: </strong>${release_date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    `

        let cardContainer = document.createElement("section")
        cardContainer.classList.add("col")

        //*********************************** MODAL********************************** */
        
        let modalElement = document.getElementById('staticBackdrop');
        let modal = new bootstrap.Modal(modalElement);

        // sacar info planetas
        
            let listaUrlPlanetas = item.planets
            let planetsStringList = ""
            for (const planetUrl of listaUrlPlanetas) {
                console.log(planetUrl);
                const objectPlanet = await peticion(planetUrl);
                let elementPlanet = objectPlanet.results
                
                planetsStringList += objectPlanet.name
            }

        // ***********************
        cardContainer.addEventListener("click",()=>{
            
            modal.show()
            document.getElementById("imgModal").src = imagenChar
            document.getElementById("titleModal").innerText = item.title
            document.getElementById("episode_id").innerText = item.episode_id
            document.getElementById("director").innerText = item.director
            document.getElementById("producer").innerText = item.producer
            document.getElementById("release_date").innerText = item.release_date
            document.getElementById("planets").innerText = planetsStringList
    
        })

        document.getElementById('btnCerrar').addEventListener('click', () => {
        modal.hide();
        
        });
        // **********************************************************************************
        cardContainer.innerHTML = dataCharInner

        document.getElementById("personajesContenedor").appendChild(cardContainer)

    });

}



// Iniciar el menú
const url = `https://swapi.dev/api/films`;

mostrarPersonajes(url)
