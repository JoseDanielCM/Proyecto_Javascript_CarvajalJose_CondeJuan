var paginaNum = 1

const imagenesClasificacion = {
    human_female:"clasificacion/humans.jpg  ",
    human_male:"clasificacion/human_male.webp",
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
// https://orig00.deviantart.net/514a/f/2016/352/3/0/darth_vader_ro_2_by_gillesmareschalart-das0stj.png
// Función asíncrona que controla el bucle del menú
async function mostrarPersonajes(url) {
    let pagActual = url;
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
            let especie_data
            // traer planeta 
            const planeta = await fetch(item.homeworld)
            planeta_data = await planeta.json()
            planetaName = planeta_data.name
            if (item.species.length!=0) {
                //Treaer especie
                const especie = await fetch(item.species)
                especie_data = await especie.json()
                especie_data = especie_data.classification

                
            }else{
                if (item.gender=="male") {
                    especie_data="human_male"
                    
                } else {
                    especie_data="human_female"
                }
            }
            if (especie_data=="mammals") {
                especie_data="mammal"   
            }
            let imagenChar = imagenesClasificacion[especie_data];
            // cambiar human_male // female -> Human
            if (especie_data=="human_male"||especie_data=="human_female") {
                especie_data="human"
            } 
            
            let dataCharInner = `
                <div class="card">
                    <div class="interno row g-0">
                        <div class="col-sm-5">
                            <img class="imgChar img-fluid rounded-start" src="${imagenChar}" alt="Darth Vader">
                        </div>
                        <div class="col-sm-7">
                            <div class="card-body">
                                <h4 class="card-title">${item.name}</h4>
                                <p class="card-text"><strong>Gender: </strong>${item.gender}</p>
                                <p class="card-text"><strong>Homeworld: </strong>${planetaName}</p>
                                <p class="card-text"><strong>Height: </strong>${item.height}</p>
                                <p class="card-text"><strong>Especie: </strong>${especie_data}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `

            let cardContainer = document.createElement("section")
            cardContainer.classList.add("col")

            cardContainer.innerHTML = dataCharInner

            document.getElementById("personajesContenedor").appendChild(cardContainer)

        });
        
        
    }
    paginaNum--
    

}

// Iniciar el menú
const url = `https://swapi.dev/api/people/?page=${paginaNum}`;

mostrarPersonajes(url);
async function mostrarFiltrados(url) {
    // RECORRER PAGINAS
    const listaBotonesPersonajes = document.querySelectorAll(".btn")
    let listaCategorias = []

    listaBotonesPersonajes.forEach(element => {
        element.addEventListener("click",()=>{
            document.getElementById("personajesContenedor").innerHTML=""
            
            let cat = element.value
            if (listaCategorias.includes(cat)) {
                listaCategorias.splice(listaCategorias.indexOf(cat))
                element.classList.remove("seleccionado")

            } else {
                listaCategorias.push(cat)
                element.classList.add("seleccionado")
            }
            console.log(listaCategorias);
            filtrado(listaCategorias)
        })
    });
    
    
    

}

const filtrado = async function(listaCategorias) {
    let pagActual = url;
    while (pagActual!=null) {
        const principal_object = await peticion(pagActual);
        pagActual = principal_object.next; 

        let elementos_object = principal_object.results
        
        // RECORRER PERSONAJES 
        // PAGINA ACTUAL
        
        await elementos_object.forEach(async (item,index) => {
            
            // ver especie
            let especie_data
            // traer planeta 
            const planeta = await fetch(item.homeworld)
            planeta_data = await planeta.json()
            planetaName = planeta_data.name
            if (item.species.length!=0) {
                //Treaer especie
                const especie = await fetch(item.species)
                especie_data = await especie.json()
                especie_data = especie_data.classification

                
            }else{
                if (item.gender=="male") {
                    especie_data="human_male"
                    
                } else {
                    especie_data="human_female"
                }
            }
            if (especie_data=="mammals") {
                especie_data="mammal"   
            }
            let imagenChar = imagenesClasificacion[especie_data];
            // cambiar human_male // female -> Human
            if (especie_data=="human_male"||especie_data=="human_female") {
                especie_data="human"
            } 
            
            if (listaCategorias.includes(especie_data)) {
            
            let dataCharInner = `
                <div class="card">
                    <div class="interno row g-0">
                        <div class="col-sm-5">
                            <img class="imgChar img-fluid rounded-start" src="${imagenChar}" alt="Darth Vader">
                        </div>
                        <div class="col-sm-7">
                            <div class="card-body">
                                <h4 class="card-title">${item.name}</h4>
                                <p class="card-text"><strong>Gender: </strong>${item.gender}</p>
                                <p class="card-text"><strong>Homeworld: </strong>${planetaName}</p>
                                <p class="card-text"><strong>Height: </strong>${item.height}</p>
                                <p class="card-text"><strong>Especie: </strong>${especie_data}</p>
                            </div>
                        </div>
                    </div>
                </div>
                `

            let cardContainer = document.createElement("section")
            cardContainer.classList.add("col")

            cardContainer.innerHTML = dataCharInner

            document.getElementById("personajesContenedor").appendChild(cardContainer)
            }
        }
    );
        
        
    }
    paginaNum--
}

mostrarFiltrados(url)
