const btnEspeciesall = document.getElementById("especies-all");
const btnVehiculosall = document.getElementById("vehiculos-all");
const btnNavesall = document.getElementById("naves-all");
const resultContainer = document.getElementById("result-container")
    
const EspaciesAll = () => {
    return new Promise((resolve,reject) => {
        
        const EspacieAll = new XMLHttpRequest();
        EspacieAll.open("GET","https://swapi.py4e.com/api/species/");
        EspacieAll.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            EspacieAll.onload = function(){
            if(EspacieAll.status === 200){
                const response = JSON.parse(EspacieAll.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ EspacieAll.statusText);
            } 
            
        }
        EspacieAll.send();
    },2000)
    })
}


const VehiculosAll = () => {
    return new Promise((resolve,reject) => {
        
        const VehiculoAll = new XMLHttpRequest();
        VehiculoAll.open("GET","https://swapi.py4e.com/api/vehicles/");
        VehiculoAll.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            VehiculoAll.onload = function(){
            if(VehiculoAll.status === 200){
                const response = JSON.parse(VehiculoAll.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ VehiculoAll.statusText);
            } 
            
        }
        VehiculoAll.send();
    },2000)
    })
}

const NavesAll = () => {
    return new Promise((resolve,reject) => {
        
        const NaveAll = new XMLHttpRequest();
        NaveAll.open("GET","https://swapi.py4e.com/api/starships/");
        NaveAll.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            NaveAll.onload = function(){
            if(NaveAll.status === 200){
                const response = JSON.parse(NaveAll.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ NaveAll.statusText);
            } 
            
        }
        NaveAll.send();
    },2000)
    })
}

const ClasificacionEspecies = () => {
    return new Promise((resolve,reject) => {
        
        const Clasificacion = new XMLHttpRequest();
        Clasificacion.open("GET","https://swapi.py4e.com/api/species/");
        Clasificacion.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            Clasificacion.onload = function(){
            if(Clasificacion.status === 200){
                const response = JSON.parse(Clasificacion.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3> ⬇️ <p>${element.classification}</p>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ Clasificacion.statusText);
            } 
            
        }
        Clasificacion.send();
    },2000)
    })
}

const LenguajesProvenientes = () => {
    return new Promise((resolve,reject) => {
        
        const LenguajeProveniente = new XMLHttpRequest();
        LenguajeProveniente.open("GET","https://swapi.py4e.com/api/species/");
        LenguajeProveniente.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            LenguajeProveniente.onload = function(){
            if(LenguajeProveniente.status === 200){
                const response = JSON.parse(LenguajeProveniente.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3> ⬇️ <p>${element.language}</p>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ LenguajeProveniente.statusText);
            } 
            
        }
        LenguajeProveniente.send();
    },2000)
    })
}


const VehiculosCapacidad = () => {
    return new Promise((resolve,reject) => {
        
        const VehiculoCapacidad = new XMLHttpRequest();
        VehiculoCapacidad.open("GET","https://swapi.py4e.com/api/vehicles/");
        VehiculoCapacidad.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            VehiculoCapacidad.onload = function(){
            if(VehiculoCapacidad.status === 200){
                const response = JSON.parse(VehiculoCapacidad.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3> ⬇️ <p>${element.passengers} Pasajeros</p>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ VehiculoCapacidad.statusText);
            } 
            
        }
        VehiculoCapacidad.send();
    },2000)
    })
}

const VehiculosFabricantes = () => {
    return new Promise((resolve,reject) => {
        
        const VehiculoFabricante = new XMLHttpRequest();
        VehiculoFabricante.open("GET","https://swapi.py4e.com/api/vehicles/");
        VehiculoFabricante.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            VehiculoFabricante.onload = function(){
            if(VehiculoFabricante.status === 200){
                const response = JSON.parse(VehiculoFabricante.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3> ⬇️ <p>Fabricado por: ${element.manufacturer}</p>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ VehiculoFabricante.statusText);
            } 
            
        }
        VehiculoFabricante.send();
    },2000)
    })
}

const NavesLongitudes = () => {
    return new Promise((resolve,reject) => {
        
        const Navelongitud = new XMLHttpRequest();
        Navelongitud.open("GET","https://swapi.py4e.com/api/starships/");
        Navelongitud.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            Navelongitud.onload = function(){
            if(Navelongitud.status === 200){
                const response = JSON.parse(Navelongitud.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3> ⬇️ <p>${element.length} Metros</p>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ Navelongitud.statusText);
            } 
            
        }
        Navelongitud.send();
    },2000)
    })
}

const TiposNaves = () => {
    return new Promise((resolve,reject) => {
        
        const TipoNave = new XMLHttpRequest();
        TipoNave.open("GET","https://swapi.py4e.com/api/starships/");
        TipoNave.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            TipoNave.onload = function(){
            if(TipoNave.status === 200){
                const response = JSON.parse(TipoNave.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3> ⬇️ <p>Clase: ${element.starship_class}</p>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ TipoNave.statusText);
            } 
            
        }
        TipoNave.send();
    },2000)
    })
}

const CostosNaves = () => {
    return new Promise((resolve,reject) => {
        
        const CostoNave = new XMLHttpRequest();
        CostoNave.open("GET","https://swapi.py4e.com/api/starships/");
        CostoNave.setRequestHeader("Content-Type","application.json");
        setTimeout(() => {
            CostoNave.onload = function(){
            if(CostoNave.status === 200){
                const response = JSON.parse(CostoNave.responseText);
                response.results.forEach(element => {
                    const resultItem = document.createElement("div");
                    resultItem.classList.add("result");
                    resultItem.innerHTML = `
                        <h3>${element.name}</h3> ⬇️ <p>${element.cost_in_credits} Creditos</p>
                    `;
                    resolve(resultContainer.appendChild(resultItem));
                });
            }else{
                console.log("Error :"+ CostoNave.statusText);
            } 
            
        }
        CostoNave.send();
    },2000)
    })
}

VehiculosAll()