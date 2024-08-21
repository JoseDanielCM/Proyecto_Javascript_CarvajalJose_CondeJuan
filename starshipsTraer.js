var paginaNum = 1
let cargados = false

const imagenesClasificacion = {
    corvette:"starships/corvette.png",
    Star_Destroyer:"starships/starDestroyer.png",
    landing_craft: "starships/landingCraft.png",
    Deep_Space_Mobile_Battlestation: "starships/battlestation.png",
    Light_freighter: "starships/lightFighter.png",
    assault_starfighter: "starships/assaultStarfighter.png",
    Starfighter: "starships/Starfighter.png",
    Star_dreadnought: "starships/starDread.png",
    Medium_transport: "starships/medTransport.png",
    Patrol_craft: "starships/patrol.png",
    Armed_government_transport: "starships/armedTransport.png",
    Escort_ship: "starships/escort.png",
    cruiser: "starships/cruiser.png",
    Droid_control_ship: "starships/droid.png",
    yacht:"starships/yacht.png",
    Space_Transport: "starships/spaceTransport.png",
    Diplomatic_barge: "starships/barge.png",
    freighter: "starships/freighter.png",
    capital_ship: "starships/capital.png",
    transport:"starships/transport.png",
};

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
// Función asíncrona que controla el bucle del menú
async function mostrarPersonajes(url,listaCategorias) {
    let pagActual = url;
    console.log(pagActual);
    
    cargados = false
    // RECORRER PAGINAS
    while (pagActual!=null) {
        paginaNum++
        const principal_object = await peticion(pagActual);
        pagActual = principal_object.next; 

        let elementos_object = principal_object.results
        
        // RECORRER PERSONAJES 
        // PAGINA ACTUAL
        
        elementos_object.forEach(async (item,index) => {
            
            // ver especie

            let nombre = item.name
            let vehicle_class = item.starship_class

            vehicle_class = vehicle_class.replaceAll(" ","_")
            if (vehicle_class=="Assault_Starfighter") {
                vehicle_class="assault_starfighter"
            }
            if (vehicle_class=="Star_Cruiser"||vehicle_class=="Space_cruiser") {
                vehicle_class="cruiser"
            }
            if (vehicle_class=="starfighter") {
                vehicle_class="Starfighter"
            }
            if (vehicle_class=="star_destroyer") {
                vehicle_class="Star_Destroyer"
            }
            if (vehicle_class=="assault_ship") {
                vehicle_class="assault_starfighter"
            }
            
            let CostoNave = item.cost_in_credits
            let length = item.length
            let speed = item.max_atmosphering_speed
            // traer planeta 
            //Treaer especie

            let imagenChar = imagenesClasificacion[vehicle_class];
            if (listaCategorias.includes(vehicle_class)) {
                let dataCharInner = `
                    <div class="card">
                        <div class="interno row g-0">
                            <div class="col-sm-5">
                                <img class="imgChar img-fluid rounded-start" src="${imagenChar}" alt="Darth Vader">
                            </div>
                            <div class="col-sm-7">
                                <div class="card-body">
                                    <h4 class="card-title">${nombre}</h4>
                                    <p class="card-text"><strong>length: </strong>${length}</p>
                                    <p class="card-text"><strong>Class: </strong>${vehicle_class}</p>
                                    <p class="card-text"><strong>Cost: </strong>${CostoNave}</p>
                                    <p class="card-text"><strong>Max speed: </strong>${speed}</p>
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

                cardContainer.addEventListener("click",()=>{
                    
                    modal.show()
                    document.getElementById("imgModal").src = imagenChar
                    document.getElementById("titleModal").innerText = item.name
                    document.getElementById("cost_in_credits").innerText = item.cost_in_credits
                    document.getElementById("length").innerText = item.length
                    document.getElementById("max_atmosphering_speed").innerText = item.max_atmosphering_speed
                    document.getElementById("passengers").innerText = item.passengers
                    document.getElementById("cargo_capacity").innerText = item.cargo_capacity
                    document.getElementById("vehicle_class").innerText = vehicle_class
                    document.getElementById("consumables").innerText = item.consumables
            
                })

                document.getElementById('btnCerrar').addEventListener('click', () => {
                modal.hide();
                
                });
                // **********************************************************************************
                cardContainer.innerHTML = dataCharInner

                document.getElementById("personajesContenedor").appendChild(cardContainer)
            }
        });
    
        
    }
    cargados = true
    paginaNum--

}

// Iniciar el menú
const url = `https://swapi.dev/api/starships/?page=${paginaNum}`;

async function mostrarFiltrados(url) {
    // RECORRER PAGINAS
    
    const listaBotonesPersonajes = document.querySelectorAll(".botonFiltro")
    let listaCategorias = Object.keys(imagenesClasificacion)
    mostrarPersonajes(url,listaCategorias)
    listaBotonesPersonajes.forEach(element => {
        element.addEventListener("click",()=>{
            
            if (!cargados) {
                alert("Los datos están cargando, espera...")
                return
            }
            cargados=false
            document.getElementById("personajesContenedor").innerHTML=""
            
            let cat = element.value
            if (listaCategorias.includes(cat)) {
                listaCategorias.splice(listaCategorias.indexOf(cat),1)
                element.classList.remove("seleccionado")

            } else {
                listaCategorias.push(cat)
                element.classList.add("seleccionado")
            }
            console.log(listaCategorias);
            mostrarPersonajes(url,listaCategorias)
        })
    });
    listaCategorias = []
    
}

mostrarFiltrados(url)
