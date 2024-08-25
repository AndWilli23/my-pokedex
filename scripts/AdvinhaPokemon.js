let pokemonAtual;


const geraIdNome = async () => {

    let max = 1025

    let idAleatorio = Math.floor(Math.random() * max);
    
    const pegaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${idAleatorio}/`)

    const verificaPokemon = await pegaPokemon.json()

    console.log(verificaPokemon);
    
    pokemonAtual = {
        id: idAleatorio,
        nome: verificaPokemon.name
    }
    console.log(verificaPokemon.name);
    

    return pokemonAtual
}


const validaEntrada = async () => {
    
    const tentativaPokemon = document.getElementById("campo_adivinha_pokemon")
   
    tentativaPokemon.addEventListener("keydown", async function(e){

        const nome = pokemonAtual.nome

        if (e.key === "Enter") {
            e.preventDefault()

            valorInput = tentativaPokemon.value.toLowerCase()

            tentativaPokemon.value = "" 

            if (valorInput === nome) {

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Parabéns!!! Você acertou 💖",
                    showConfirmButton: false,
                    timer: 2000
                  });

                await inicializa()
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Não é esse pokémon ou o nome esta incorreto, tente novamente!",
                  });
                
            }       
        }
    })  
}


const imagemPokemon = async () => {

    if (!pokemonAtual) await geraIdNome(); 

    let pokemonId = pokemonAtual.id

    const pegaId = document.getElementById("AdivinhaPokemon")

    pegaId.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`
} 


const inicializa = async () => {
    await geraIdNome();   
    imagemPokemon();   
}

inicializa();
validaEntrada()