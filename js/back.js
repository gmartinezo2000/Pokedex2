const listaPokemon = document.querySelector("#listaPokemon");
const botonHeader = document.querySelectorAll(".btn-header");
let URL = "https://pokeapi.co/api/v2/pokemon/";

for (let i= 1; i<=151; i++) {
    fetch (URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}



function mostrarPokemon(poke) {   
    
    let tipos = poke.types.map (type => `<p class= "${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    const div= document.createElement ("div");
    div.classList.add("pokemon")
    div.innerHTML = `
        <p class="pokemon-id-back">${poke.id}</p>
        <div class="pokemon-imagen">
            <img src="${poke.sprites.other["official-artwork"].front_default}" alt=${poke.name}>
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">${poke.id}</p>
                <h2 class="pokemon-nombre">${poke.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="height">${poke.height}m</p>
                <p class="weight">${poke.weight}Kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

botonHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                }

            })
    }

    document.getElementById("searchButton").addEventListener("click", function() {
        var searchTerm = document.getElementById("searchInput").value;
        // Lógica para realizar la búsqueda y mostrar los resultados
        console.log("Búsqueda realizada:", searchTerm);
    });
}))