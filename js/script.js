const limparElementos = (elemento) => {
    while(elemento.firstChild) {
        elemento.removeChild(elemento.lastChild);
    }
}

const criarItemJogo = (imagens) => {
    //Seleciona o container que vai ser mudado
    const container = document.querySelector("#apresentacaoJogos")
    //Criando uma nova div
    const novaDiv = document.createElement("div")
	novaDiv.classList.add('jogos')
   	novaDiv.innerHTML =
	`
    <div class="imgJogo">
        <img src="capaJogo/${imagens.capa}" class="capaJogo">
    </div>
    <div class="infoJogo">
        <h2> ${imagens.nome} </h2>
            <p class="txtInfoJogo">
                ${imagens.descricao}
            </p>
            <p class="generos">
                ${imagens.categoria}
            </p>
        <div class="saibaMais">
                Saiba mais
        </div>
        <div class="valor">
            R$ ${imagens.preco}
        </div>
    </div>
	`
    container.appendChild(novaDiv);
    
}

const pesquisar = async (evento) => {
	if(evento.key === "Enter" || evento.type === "click"){
        limparElementos(document.querySelector("#apresentacaoJogos"));
		const textInput = document.getElementById('barraPesquisa').value;
		const url = `http://localhost/ds2t20212/welington/ProjetoPinceruGames/admin/api/produtos?nome=${textInput}`
		const imagensResponse = await fetch(url);
        const imagens = await imagensResponse.json();
        const itemArray = imagens.map(criarItemJogo)	
    } 
}

const carregarPaginas = async () => {
    const url = `http://localhost/ds2t20212/welington/ProjetoPinceruGames/admin/api/produtos`
		const imagensResponse = await fetch(url);
		const imagens = await imagensResponse.json();
		imagens.map(criarItemJogo);
}

document.addEventListener("DOMContentLoaded", carregarPaginas);
document.querySelector("#barraPesquisa").addEventListener('keypress', pesquisar);
document.querySelector("#botaoPesquisa").addEventListener('click', pesquisar);