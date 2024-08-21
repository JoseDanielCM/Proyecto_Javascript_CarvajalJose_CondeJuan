var paginaNum = 1
let cargados = false

const imagenesClasificacion = {
    arid:"planets/arid.png",
    temperate:"planets/temperate.png",
    frozen: "planets/frozen.png",
    murky: "planets/murky.png",
    hot: "planets/hot.jpg",
    tropical: "planets/tropical.png",
    polluted: "planets/polluted.png",
    unknown: "clasificacion/unknown.jpg"
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
            let nombre = item.name
            let climate = item.climate
            
            let terrain = item.terrain
            let population = item.population
            let diameter = item.diameter
            
            if (climate.length>9 && climate!="hot, humid" && climate!="superheated") {
                climate = "temperate"
            }

            if (climate=="hot, humid" || climate=="superheated") {
                climate="hot"
            }
            if (climate=="frigid") {
                climate="frozen"
            }
            let imagenChar = imagenesClasificacion[climate];
            if (listaCategorias.includes(climate)) {
                let dataCharInner = `
                    <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div class="interno row g-0">
                            <div class="col-sm-5">
                                <img class="imgChar img-fluid rounded-start" src="${imagenChar}" alt="Darth Vader">
                            </div>
                            <div class="col-sm-7">
                                <div class="card-body">
                                    <h4 class="card-title">${nombre}</h4>
                                    <p class="card-text"><strong>Climate: </strong>${climate}</p>
                                    <p class="card-text"><strong>terrain: </strong>${terrain}</p>
                                    <p class="card-text"><strong>population: </strong>${population}</p>
                                    <p class="card-text"><strong>Diameter: </strong>${diameter}</p>
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
                    document.getElementById("Climate").innerText = climate
                    document.getElementById("terrain").innerText = item.terrain
                    document.getElementById("population").innerText = item.population
                    document.getElementById("Diameter").innerText = item.diameter
                    document.getElementById("gravity").innerText = item.gravity
                    document.getElementById("rotation_period").innerText = item.rotation_period
                    document.getElementById("orbital_period").innerText = item.orbital_period
            
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
const url = `https://swapi.dev/api/planets/?page=${paginaNum}`;

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
