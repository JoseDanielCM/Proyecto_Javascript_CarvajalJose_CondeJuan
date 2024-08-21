var paginaNum = 1
let cargados = false

const imagenesClasificacion = {
    human_female:"clasificacion/humans.jpg  ",
    artificial: "clasificacion/artificial.png",
    sentient: "clasificacion/sentient.jpg",
    mammal: "clasificacion/mammals.jpg",
    gastropod: "clasificacion/gastropodo.jpg",
    amphibian: "clasificacion/amphibian.jpg",
    reptile: "clasificacion/reptile.jpg",
    unknown: "clasificacion/unknown.jpg",
    insectoid: "clasificacion/insectoid.jpg",
    reptilian: "clasificacion/reptilian.jpg"
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
            let clasificacion = item.classification
            
            let average_height = item.average_height
            let average_lifespan = item.average_lifespan
            let language = item.language
            
            let imagenChar = imagenesClasificacion[clasificacion];
            if (nombre=="Human") {
                imagenChar = imagenesClasificacion.human_female
            }
            if (listaCategorias.includes(clasificacion)) {
                let dataCharInner = `
                    <div class="card" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <div class="interno row g-0">
                            <div class="col-sm-5">
                                <img class="imgChar img-fluid rounded-start" src="${imagenChar}" alt="Darth Vader">
                            </div>
                            <div class="col-sm-7">
                                <div class="card-body">
                                    <h4 class="card-title">${nombre}</h4>
                                    <p class="card-text"><strong>clasificacion: </strong>${clasificacion}</p>
                                    <p class="card-text"><strong>height: </strong>${average_height}</p>
                                    <p class="card-text"><strong>lifespan: </strong>${average_lifespan}</p>
                                    <p class="card-text"><strong>language: </strong>${language}</p>
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

                let planetsStringList
                let planetUrl = item.homeworld
                if (planetUrl!=null) {
                    const objectPlanet = await peticion(planetUrl);
                    planetsStringList = objectPlanet.name
                }else{
                    planetsStringList = "n/a"
                }
                    
                

                cardContainer.addEventListener("click",()=>{
                    
                    modal.show()
                    document.getElementById("imgModal").src = imagenChar
                    document.getElementById("titleModal").innerText = item.name
                    document.getElementById("classification").innerText = item.classification
                    document.getElementById("language").innerText = item.language
                    document.getElementById("average_height").innerText = item.average_height
                    document.getElementById("average_lifespan").innerText = item.average_lifespan
                    document.getElementById("homeworld").innerText = planetsStringList
                    document.getElementById("skin_colors").innerText = item.skin_colors
                    document.getElementById("hair_colors").innerText = item.hair_colors
            
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
const url = `https://swapi.dev/api/species/?page=${paginaNum}`;

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
