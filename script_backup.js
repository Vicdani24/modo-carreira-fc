const historico = document.getElementById("historico");

function salvarTecnico(){

const clube =
document.getElementById("clube").value;

const temporada =
document.getElementById("temporada").value;

const titulos =
document.getElementById("titulos").value;

if(clube === "" || temporada === ""){
alert("Preencha os campos!");
return;
}

const item = document.createElement("div");

item.classList.add("item");

item.innerHTML = `
<h3>👔 Técnico</h3>
<p><strong>Clube:</strong> ${clube}</p>
<p><strong>Temporada:</strong> ${temporada}</p>
<p><strong>Títulos:</strong> ${titulos}</p>
`;

historico.prepend(item);

document.getElementById("clube").value = "";
document.getElementById("temporada").value = "";
document.getElementById("titulos").value = "";

}

function salvarJogador(){

const jogador =
document.getElementById("jogador").value;

const clubeJogador =
document.getElementById("clubeJogador").value;

const selecao =
document.getElementById("selecao").value;

if(jogador === ""){
alert("Digite o nome do jogador!");
return;
}

const item = document.createElement("div");

item.classList.add("item");

item.innerHTML = `
<h3>⭐ Jogador</h3>
<p><strong>Nome:</strong> ${jogador}</p>
<p><strong>Clube:</strong> ${clubeJogador}</p>
<p><strong>Seleção:</strong> ${selecao}</p>
`;

historico.prepend(item);

document.getElementById("jogador").value = "";
document.getElementById("clubeJogador").value = "";
document.getElementById("selecao").value = "";

}
