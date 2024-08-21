var paginaNum = 1
let cargados = false

const imagenesClasificacion = {
    wheeled:"vehicles/wheeled.png",
    repulsorcraft:"vehicles/repulsorcraft.png",
    starfighter: "vehicles/starFigther.png",
    airspeeder: "vehicles/airSpeeder.png",
    bomber: "vehicles/bomber.png",
    assault_walker: "vehicles/assaultWalker.png",
    walker: "vehicles/walker.png",
    sail_barge: "vehicles/sailBarge.png",
    droidTank: "vehicles/droidTank.png",
    droid_starfighter: "vehicles/droid_starfigther.png",
    transport: "vehicles/transport.png",
    gunship: "vehicles/gunship.png",
    submarine: "vehicles/submarine.png",
    landing: "vehicles/landing.png",
    fire_suppression:"vehicles/fire.png"
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
            let vehicle_class = item.vehicle_class
            if (vehicle_class=="space/planetary bomber") {
                vehicle_class="bomber"
            }
            if (vehicle_class=="assault walker") {
                vehicle_class="assault_walker"
            }
            if (vehicle_class=="sail barge") {
                vehicle_class="sail_barge"
            }
            if (vehicle_class=="sail barge") {
                vehicle_class="sail_barge"
            }
            if (vehicle_class=="speeder"||vehicle_class=="air speeder") {
                vehicle_class="airspeeder"
            }
            if (vehicle_class=="wheeled walker") {
                vehicle_class="wheeled"
            }
            if (vehicle_class=="repulsorcraft cargo skiff") {
                vehicle_class="repulsorcraft"
            }
            if (vehicle_class=="droid tank") {
                vehicle_class="droidTank"
            }
            if (vehicle_class=="landing craft") {
                vehicle_class="landing"
            }
            if (vehicle_class=="droid starfighter") {
                vehicle_class="droid_starfighter"
            }
            if (vehicle_class=="fire suppression ship") {
                vehicle_class="fire_suppression"
            }
            let modelo = item.model
            let CostoNave = item.cost_in_credits
            let speed = item.max_atmosphering_speed
            // traer planeta 
            //Treaer especie

            let imagenChar = imagenesClasificacion[vehicle_class];
            if (listaCategorias.includes(vehicle_class)) {
                let dataCharInner = `
                    <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div class="interno row g-0">
                            <div class="col-sm-5">
                                <img class="imgChar img-fluid rounded-start" src="${imagenChar}" alt="Darth Vader">
                            </div>
                            <div class="col-sm-7">
                                <div class="card-body">
                                    <h4 class="card-title">${nombre}</h4>
                                    <p class="card-text"><strong>Model: </strong>${modelo}</p>
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
                    document.getElementById("Model").innerText = item.model
                    document.getElementById("Cost").innerText = item.cost_in_credits
                    document.getElementById("length").innerText = item.length
                    document.getElementById("speed").innerText = item.max_atmosphering_speed
                    document.getElementById("crew").innerText = item.crew
                    document.getElementById("passengers").innerText = item.passengers
                    document.getElementById("class").innerText = vehicle_class
            
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
const url = `https://swapi.dev/api/vehicles/?page=${paginaNum}`;

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
