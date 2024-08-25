const pokemon = async () => {
    
    const botaoBusca = document.getElementById("enviaPokemon");

    botaoBusca.disabled = true;

    const pegaNome = document.getElementById("nomePokemon").value.toLowerCase().replace(/\s+/g, '');

    let pegaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pegaNome}/`);


    if (pegaPokemon.ok) {
        let verificaPokemon = await pegaPokemon.json();

        console.log(verificaPokemon);
        carregando.style.display = "none";

        botaoBusca.disabled = false;
   
        return verificaPokemon;
     
    } else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Pokemon não encontrado! Verifique se o nome ou o id da pokédex estão corretos...",
          });  
    }

    return pegaNome;
}


const pesquisaEnter = () => {

    const botaoBuscaNome = document.getElementById("nomePokemon");

    botaoBuscaNome.addEventListener("keydown", function(e){
        if (e.key === "Enter") {
            e.preventDefault();

            atualizaPokemon()
        }
        
    })
}


const imagemPokemon =  (pokemons) => {

    const pokemonSprit = pokemons.sprites.front_default;

    const pegaId  = document.getElementById("imagem");

    pegaId.src = pokemonSprit;
}


const pegaNomePokemonId =  async (pokemons) => {

    pokemons = await pokemon()

    let nomePokemon = pokemons.name;

    let idPokemon = pokemons.id;

    const colocaNome = document.getElementById("nome");

    const colocaId = document.getElementById("idPokemon");

    colocaNome.innerHTML = `${nomePokemon.charAt(0).toUpperCase() + nomePokemon.slice(1)}`;

    colocaId.innerHTML = `Id da pokédex: ${idPokemon}`;
}


const tipoPokemen =  (pokemons) => {
    
    const tipoPokemon = pokemons.types;

    const listaDeTipos = [];

    for (let index = 0; index < tipoPokemon.length; index++) {
        let tipos = tipoPokemon[index].type.name;

        listaDeTipos.push(" " + tipos );
    }

    const tipo = document.getElementById("tipo");

    tipo.innerHTML = `<span>Tipo:</span> ${listaDeTipos}`; 
  
}



const habilidadePokemon =  (pokemons) => {

    const habilidadePokemon = pokemons.abilities;
    
    const listaDeHabilidades = [];

    for (let index = 0; index < habilidadePokemon.length; index++) {
        const habilidades = habilidadePokemon[index].ability.name;

        listaDeHabilidades.push(" " + habilidades);
    }

    const habilidade = document.getElementById("habilidade");

    habilidade.innerHTML = `<span>Habilidade:</span> ${listaDeHabilidades}`;
}


const atualizaPokemon = async () => {
    const pokemonAtulizado = await pokemon();

    if(pokemonAtulizado) {
        imagemPokemon(pokemonAtulizado);
        tipoPokemen(pokemonAtulizado);
        habilidadePokemon(pokemonAtulizado);
        pegaNomePokemonId(pokemonAtulizado);
        pegaRegiaoPokemon(pokemonAtulizado)
    }
}

pesquisaEnter();

