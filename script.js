


let carreiras = JSON.parse(localStorage.getItem("carreiras")) || [];
let atual = JSON.parse(localStorage.getItem("atual")) || null;

async function pegarEscudo(nomeTime){

    if(!nomeTime) return "escudo_padrao.png";

    try{

        const resposta = await fetch(

`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(nomeTime)}`

        );

        const dados = await resposta.json();

        if(
            dados.teams &&
            dados.teams.length > 0
        ){

            return dados.teams[0].strBadge;

        }

    }
    catch(erro){

        console.log("Erro API:", erro);

    }

    return "escudo_padrao.png";

}

function salvar(){

    localStorage.setItem(
        "carreiras",
        JSON.stringify(carreiras)
    );

    localStorage.setItem(
        "atual",
        JSON.stringify(atual)
    );

    console.log(carreiras);

}

function ir(tela){

    document.querySelectorAll(".tela")
        .forEach(t => t.classList.remove("ativa"));

    const elemento =
        document.getElementById(tela);

    if(!elemento) return;

    elemento.classList.add("ativa");

    if(tela==="carregar") renderCarreiras();

    if(tela==="atual") renderAtual();

    if(tela==="historico"){
        renderHistorico();
    }

    if(tela==="hall"){
        renderHall();
    }

}

function criar() {

    if (
        !nome.value ||
        !temporada.value
    ) {

        alert("Preencha nome e temporada.");
        return;

    }

    let carreira = {

        id: Date.now(),

        nome: nome.value,

        tipo: tipo.value,


temporadas:[{

    ano:Number(temporada.value),

    time:time.value || "",

    selecao:"",

    orcamento:orcamento.value || "",

    orcamentof:"",

    jogos:0,

    vitorias:0,

    empates:0,

    derrotas:0,

    gols:0,

    goleada:"",

    transferencia:"",

    titulos:[]

}]

    };

    carreiras.push(carreira);

    atual = carreira.id;

    salvar();

    alert("Carreira criada!");

    ir("menu");

}

function getAtual() {
    return carreiras.find(c => c.id === atual);
}

function temporadaAtual() {
    let c = getAtual();

    if (!c) return null;

    return c.temporadas[c.temporadas.length - 1];
}

async function renderAtual(){

    let c = getAtual();

    if (!c) {
        document.getElementById("infoAtual").innerHTML =
            "<p>Nenhuma carreira carregada.</p>";
        return;
    }

    let t = temporadaAtual();

const escudo = await pegarEscudo(t.time);

    document.getElementById("infoAtual").innerHTML = `
        <div class="card">

            <img src="${escudo}" class="escudo">

            <h3>${c.nome}</h3>

            <p><b>${c.tipo}</b></p>

            <p><b>Temporada:</b> ${t.ano}</p>

            <p><b>Time:</b> ${t.time || "-"}</p>

<p><b>Jogos:</b> ${t.jogos}</p>

<p><b>Vitórias:</b> ${t.vitorias}</p>

<p><b>Empates:</b> ${t.empates}</p>

<p><b>Derrotas:</b> ${t.derrotas}</p>

<p><b>Gols marcados:</b> ${t.gols}</p>

            <p><b>Orçamento Inicial:</b> ${t.orcamento || "-"}</p>

            <p><b>Orçamento Final:</b> ${t.orcamentof || "-"}</p>

            <p><b>Seleção:</b> ${t.selecao || "-"}</p>

            <p><b>Maior Goleada:</b> ${t.goleada || "-"}</p>

            <p><b>Maior Transferência:</b> ${t.transferencia || "-"}</p>

            <p><b>Títulos:</b></p>

            <ul>
                ${
                    t.titulos.length
                    ? t.titulos.map(x => `<li>${x}</li>`).join("")
                    : "<li>Nenhum título</li>"
                }
            </ul>

        </div>
    `;

    renderTemporadas();

}

function alterarTime() {

    let t = temporadaAtual();

    if (!t) return;

    if (!novoTime.value) return;

    t.time = novoTime.value;

    salvar();

    renderAtual();
}

function alterarSelecao() {

    let t = temporadaAtual();

    if (!t) return;

    t.selecao = novaSelecao.value;

    salvar();

    renderAtual();
}

function alterarOrcamento() {

    let t = temporadaAtual();

    if (!t) return;

    t.orcamento = novoOrcamento.value;

    salvar();

    renderAtual();
}

function alterarOrcamentof(){

    let t = temporadaAtual();

    if(!t) return;

    t.orcamentof =
        document.getElementById(
            "novaOrcamentof"
        ).value;

    salvar();

    renderAtual();

}

function alterarGoleada() {

    let t = temporadaAtual();

    if (!t) return;

    t.goleada = novaGoleada.value;

    salvar();

    renderAtual();
}

function alterarTransferencia() {

    let t = temporadaAtual();

    if (!t) return;

    t.transferencia = novaTransferencia.value;

    salvar();

    renderAtual();
}

function adicionarTitulo() {

    let t = temporadaAtual();

    if (!t) return;

    let titulo =
        document.getElementById("tituloSelect").value;

    t.titulos.push(titulo);

    salvar();

    renderAtual();
}

function novaTemporada(){

    let c = getAtual();

    if(!c) return;

    let ultima = temporadaAtual();

c.temporadas.push({

    ano:Number(ultima.ano)+1,

    time:ultima.time,

jogos:ultima.jogos,

vitorias:ultima.vitorias,

empates:ultima.empates,

derrotas:ultima.derrotas,

gols:ultima.gols,

    selecao:ultima.selecao,

    orcamento:ultima.orcamento,

    orcamentof:ultima.orcamentof,

    goleada:ultima.goleada,

    transferencia:ultima.transferencia,

    titulos:[]

});

    salvar();

    renderAtual();

}

function toggleTemporada(){

    const menu =
        document.getElementById(
            "conteudoTemporada"
        );

    const icone =
        document.getElementById(
            "iconeTemp"
        );

    menu.classList.toggle("aberto");

    if(menu.classList.contains("aberto")){

        icone.innerHTML = "▲";

    }else{

        icone.innerHTML = "▼";

    }

}

function renderTemporadas() {

    let c = getAtual();

    if (!c) return;

    document.getElementById("listaTemporadas").innerHTML =
        c.temporadas.map(t => `

        <div class="temporada-card">

            <h4>Temporada ${t.ano}</h4>

            <p>Time: ${t.time || "-"}</p>

            <p>Seleção: ${t.selecao || "-"}</p>

            <p>Orçamento: ${t.orcamento || "-"}</p>

<p>Orçamento Final: ${t.orcamentof || "-"}</p>

            <p>Maior Goleada: ${t.goleada || "-"}</p>

            <p>Maior Transferência: ${t.transferencia || "-"}</p>

            <p>Títulos:</p>

            <ul>
                ${t.titulos.map(x => `<li>${x}</li>`).join("")}
            </ul>

        </div>

    `).join("");
}

function renderCarreiras() {

    document.getElementById("listaCarreiras").innerHTML =
        carreiras.map((c, i) => `

        <div class="card">

            <b>Carreira ${i + 1} - ${c.nome}</b>

            <button onclick="selecionar(${c.id})">
                Carregar
            </button>

            <button class="danger"
                onclick="apagar(${c.id})">
                Apagar
            </button>

        </div>

    `).join("");
}

function selecionar(id) {

    atual = id;

    salvar();

    ir("atual");
}

function apagar(id) {

    if (!confirm("Apagar carreira?")) return;

    carreiras =
        carreiras.filter(c => c.id !== id);

    salvar();

    renderCarreiras();
}

function apagarCarreiraAtual() {

    if (!confirm("Apagar carreira atual?")) return;

    carreiras =
        carreiras.filter(c => c.id !== atual);

    atual = null;

    salvar();

    ir("menu");
}


function renderHistorico(){

    const div =
        document.getElementById(
            "infoHistorico"
        );

    if(!div) return;

    if(carreiras.length === 0){

        div.innerHTML = `
            <div class="card">

                <h3>Nenhuma carreira criada</h3>

            </div>
        `;

        return;

    }

    let html = "";

    carreiras.forEach(c=>{

        html += `

        <div class="card">

            <h2>

                ${c.tipo === "Técnico"
                    ? "👔 TEC"
                    : "⚽ JOG"}

                : ${c.nome}

            </h2>

        `;

        const equipes = {};

        const totais = {};

        let totalTitulos = 0;

        c.temporadas.forEach(t=>{

            const nomeEquipe =
                t.time || "Sem clube";

            if(!equipes[nomeEquipe]){

                equipes[nomeEquipe] = {

                    inicio:t.ano,

                    fim:t.ano,

                    titulos:{}

                };

            }

            equipes[nomeEquipe].fim = t.ano;

            t.titulos.forEach(tt=>{

                equipes[nomeEquipe]
                    .titulos[tt] =

                    (
                        equipes[nomeEquipe]
                        .titulos[tt]

                        || 0

                    ) + 1;

                totais[tt] =

                    (
                        totais[tt]

                        || 0

                    ) + 1;

                totalTitulos++;

            });

        });

        Object.keys(equipes).forEach(nome=>{

            const equipe = equipes[nome];

            html += `

            <div class="temporada-card">

                <h3>

                    ${nome}

                    (${equipe.inicio}

                    -

                    ${equipe.fim})

                </h3>

            `;

            const lista =

                Object.entries(
                    equipe.titulos
                );

            if(lista.length === 0){

                html += `

                    <p>

                        Nenhum título

                    </p>

                `;

            }

            lista.forEach(([titulo,qtd])=>{

                html += `

                    <p>

                        🏆

                        ${titulo}

                        :

                        ${qtd}

                    </p>

                `;

            });

            html += `

            </div>

            `;

        });

        html += `

        <hr>

        <div class="temporada-card">

            <h3>

                🏅 TOTAL DA CARREIRA

            </h3>

        `;

        Object.entries(totais)

        .forEach(([titulo,qtd])=>{

            html += `

                <p>

                    🏆

                    ${titulo}

                    :

                    ${qtd}

                </p>

            `;

        });

        html += `

            <hr>

            <p>

                <b>

                    🎖️ Total de títulos:

                </b>

                ${totalTitulos}

            </p>

            <p>

                <b>

                    📅 Temporadas:

                </b>

                ${c.temporadas.length}

            </p>

        </div>

        </div>

        `;

    });

    div.innerHTML = html;

}


function renderHall(){

    const div = document.getElementById("infoHall");

    if(!div) return;

    if(carreiras.length === 0){

        div.innerHTML = `
            <div class="card">
                <h3>Nenhuma carreira criada</h3>
            </div>
        `;

        return;

    }

    const titulos = [];
    const goleadas = [];
    const transferencias = [];
    const temporadas = [];

    carreiras.forEach(c => {

        let totalTitulos = 0;
        let maiorGoleada = 0;
        let maiorTransferencia = 0;

        c.temporadas.forEach(t => {

            totalTitulos += t.titulos.length;

            maiorGoleada = Math.max(
                maiorGoleada,
                parseInt(t.goleada) || 0
            );

            maiorTransferencia = Math.max(
                maiorTransferencia,
                parseInt(t.transferencia) || 0
            );

        });

        titulos.push({

            nome: c.nome,
            valor: totalTitulos

        });

        goleadas.push({

            nome: c.nome,
            valor: maiorGoleada

        });

        transferencias.push({

            nome: c.nome,
            valor: maiorTransferencia

        });

        temporadas.push({

            nome: c.nome,
            valor: c.temporadas.length

        });

    });

    titulos.sort((a,b)=>b.valor-a.valor);
    goleadas.sort((a,b)=>b.valor-a.valor);
    transferencias.sort((a,b)=>b.valor-a.valor);
    temporadas.sort((a,b)=>b.valor-a.valor);

    div.innerHTML =

        hallCard("🏆 Títulos Totais", titulos) +

        hallCard("⚽ Maiores Goleadas", goleadas) +

        hallCard("💰 Transferências", transferencias) +

        hallCard("📅 Temporadas", temporadas);

}

function hallCard(titulo, lista){

    return `

    <div class="card">

        <h3>${titulo}</h3>

        <div class="hall-item">

            🥇 ${
                lista[0]
                ? `${lista[0].nome} (${lista[0].valor})`
                : "-"
            }

        </div>

        <div class="hall-item">

            🥈 ${
                lista[1]
                ? `${lista[1].nome} (${lista[1].valor})`
                : "-"
            }

        </div>

        <div class="hall-item">

            🥉 ${
                lista[2]
                ? `${lista[2].nome} (${lista[2].valor})`
                : "-"
            }

        </div>

    </div>

    `;

}


window.onload = function(){

    ir("menu");

}

function alterarJogos(){

let t = temporadaAtual();

if(!t) return;

t.jogos =
Number(
document.getElementById(
"novoJogos"
).value
);

salvar();

renderAtual();

}

function alterarVitorias(){

let t = temporadaAtual();

if(!t) return;

t.vitorias =
Number(
document.getElementById(
"novoVitorias"
).value
);

salvar();

renderAtual();

}

function alterarEmpates(){

let t = temporadaAtual();

if(!t) return;

t.empates =
Number(
document.getElementById(
"novoEmpates"
).value
);

salvar();

renderAtual();

}

function alterarDerrotas(){

let t = temporadaAtual();

if(!t) return;

t.derrotas =
Number(
document.getElementById(
"novoDerrotas"
).value
);

salvar();

renderAtual();

}

function alterarGols(){

let t = temporadaAtual();

if(!t) return;

t.gols =
Number(
document.getElementById(
"novoGols"
).value
);

salvar();

renderAtual();

}
