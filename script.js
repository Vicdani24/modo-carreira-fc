let carreiras =
JSON.parse(
localStorage.getItem("carreiras")
) || [];

let atual =
JSON.parse(
localStorage.getItem("atual")
) || null;


/* ==========================
   ESCUDOS
========================== */

async function pegarEscudo(nomeTime){

    if(!nomeTime)
        return "escudo_padrao.png";

    try{

        const resposta = await fetch(

`https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(nomeTime)}`

        );

        const dados =
        await resposta.json();

        if(
            dados.teams &&
            dados.teams.length
        ){

            return dados
                .teams[0]
                .strBadge;

        }

    }catch(e){

        console.log(e);

    }

    return "escudo_padrao.png";

}


/* ==========================
   SALVAR
========================== */

function salvar(){

    localStorage.setItem(

        "carreiras",

        JSON.stringify(
            carreiras
        )

    );

    localStorage.setItem(

        "atual",

        JSON.stringify(
            atual
        )

    );

}


/* ==========================
   NAVEGAÇÃO
========================== */

function ir(tela){

document
.querySelectorAll(".tela")

.forEach(

t=>t.classList.remove(
"ativa"
)

);

const elemento =

document.getElementById(
tela
);

if(!elemento) return;

elemento.classList.add(
"ativa"
);


if(tela==="carregar"){

renderCarreiras();

}

if(tela==="atual"){

renderAtual();

}

if(tela==="historico"){

renderHistorico();

}

if(tela==="hall"){

renderHall();

}

}


/* ==========================
   CARREIRA
========================== */

function criar(){

if(

!nome.value ||

!temporada.value

){

alert(

"Preencha nome e temporada."

);

return;

}

const carreira = {

id:Date.now(),

nome:nome.value,

tipo:tipo.value,

temporadas:[{

ano:Number(

temporada.value

),

time:

time.value || "",

selecao:"",

orcamento:

orcamento.value || "",

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


carreiras.push(

carreira

);

atual = carreira.id;

salvar();

alert(

"Carreira criada!"

);

ir("menu");

}


/* ==========================
   AUXILIARES
========================== */

function getAtual(){

return carreiras.find(

c => c.id === atual

);

}


function temporadaAtual(){

const c = getAtual();

if(!c) return null;

return c.temporadas[

c.temporadas.length - 1

];

}

/* ==========================
   TELA ATUAL
========================== */

async function renderAtual(){

const c = getAtual();

if(!c){

document.getElementById(

"infoAtual"

).innerHTML =

"<p>Nenhuma carreira carregada.</p>";

return;

}

const t = temporadaAtual();

const escudo =

await pegarEscudo(

t.time

);

document.getElementById(

"infoAtual"

).innerHTML = `

<div class="card">

<img src="${escudo}"

class="escudo">

<h3>${c.nome}</h3>

<p>

<b>${c.tipo}</b>

</p>

<p>

<b>Temporada:</b>

${t.ano}

</p>

<p>

<b>Time:</b>

${t.time || "-"}

</p>

<p>

<b>Seleção:</b>

${t.selecao || "-"}

</p>

<p>

<b>Jogos:</b>

${t.jogos}

</p>

<p>

<b>Vitórias:</b>

${t.vitorias}

</p>

<p>

<b>Empates:</b>

${t.empates}

</p>

<p>

<b>Derrotas:</b>

${t.derrotas}

</p>

<p>

<b>Gols:</b>

${t.gols}

</p>

<p>

<b>Orçamento Inicial:</b>

${t.orcamento || "-"}

</p>

<p>

<b>Orçamento Final:</b>

${t.orcamentof || "-"}

</p>

<p>

<b>Maior Goleada:</b>

${t.goleada || "-"}

</p>

<p>

<b>Maior Transferência:</b>

${t.transferencia || "-"}

</p>

<p>

<b>Títulos</b>

</p>

<ul>

${
t.titulos.length

?

t.titulos

.map(

x=>`<li>${x}</li>`

)

.join("")

:

"<li>Nenhum título</li>"

}

</ul>

</div>

`;

renderTemporadas();

}


/* ==========================
   ALTERAÇÕES
========================== */

function alterarTime(){

const t = temporadaAtual();

if(!t) return;

const valor =

novoTime.value.trim();

if(!valor) return;

t.time = valor;

salvar();

renderAtual();

}


function alterarSelecao(){

const t = temporadaAtual();

if(!t) return;

t.selecao =

novaSelecao.value;

salvar();

renderAtual();

}


function alterarOrcamento(){

const t = temporadaAtual();

if(!t) return;

t.orcamento =

novoOrcamento.value;

salvar();

renderAtual();

}


function alterarOrcamentof(){

const t = temporadaAtual();

if(!t) return;

t.orcamentof =

document.getElementById(

"novaOrcamentof"

).value;

salvar();

renderAtual();

}


function alterarGoleada(){

const t = temporadaAtual();

if(!t) return;

t.goleada =

novaGoleada.value;

salvar();

renderAtual();

}


function alterarTransferencia(){

const t = temporadaAtual();

if(!t) return;

t.transferencia =

novaTransferencia.value;

salvar();

renderAtual();

}


/* ==========================
   TITULOS
========================== */

function adicionarTitulo(){

const t = temporadaAtual();

if(!t) return;

const titulo =

document.getElementById(

"tituloSelect"

).value;

if(!titulo) return;

t.titulos.push(

titulo

);

salvar();

renderAtual();

}


/* ==========================
   ESTATÍSTICAS
========================== */

function alterarJogos(){

const t = temporadaAtual();

if(!t) return;

t.jogos = Number(

document.getElementById(

"novoJogos"

).value

);

salvar();

renderAtual();

}


function alterarVitorias(){

const t = temporadaAtual();

if(!t) return;

t.vitorias = Number(

document.getElementById(

"novoVitorias"

).value

);

salvar();

renderAtual();

}


function alterarEmpates(){

const t = temporadaAtual();

if(!t) return;

t.empates = Number(

document.getElementById(

"novoEmpates"

).value

);

salvar();

renderAtual();

}


function alterarDerrotas(){

const t = temporadaAtual();

if(!t) return;

t.derrotas = Number(

document.getElementById(

"novoDerrotas"

).value

);

salvar();

renderAtual();

}


function alterarGols(){

const t = temporadaAtual();

if(!t) return;

t.gols = Number(

document.getElementById(

"novoGols"

).value

);

salvar();

renderAtual();

}


/* ==========================
   NOVA TEMPORADA
========================== */

function novaTemporada(){

const c = getAtual();

if(!c) return;

const ultima =

temporadaAtual();

c.temporadas.push({

ano:

Number(

ultima.ano

)+1,

time:

ultima.time,

selecao:

ultima.selecao,

orcamento:

ultima.orcamento,

orcamentof:

ultima.orcamentof,

jogos:0,

vitorias:0,

empates:0,

derrotas:0,

gols:0,

goleada:"",

transferencia:"",

titulos:[]

});

salvar();

renderAtual();

}

/* ==========================
   MENU TEMPORADAS
========================== */

function toggleTemporada(){

const menu =

document.getElementById(

"conteudoTemporada"

);

const icone =

document.getElementById(

"iconeTemp"

);

if(!menu) return;

menu.classList.toggle(

"aberto"

);

icone.innerHTML =

menu.classList.contains(

"aberto"

)

?

"▲"

:

"▼";

}


/* ==========================
   LISTA TEMPORADAS
========================== */

function renderTemporadas(){

const c = getAtual();

if(!c) return;

const lista =

document.getElementById(

"listaTemporadas"

);

if(!lista) return;

lista.innerHTML =

c.temporadas.map(

t => `

<div class="temporada-card">

<h4>

Temporada ${t.ano}

</h4>

<p>

Time:

${t.time || "-"}

</p>

<p>

Seleção:

${t.selecao || "-"}

</p>

<p>

Jogos:

${t.jogos}

</p>

<p>

Vitórias:

${t.vitorias}

</p>

<p>

Empates:

${t.empates}

</p>

<p>

Derrotas:

${t.derrotas}

</p>

<p>

Gols:

${t.gols}

</p>

<p>

Orçamento:

${t.orcamento || "-"}

</p>

<p>

Orçamento Final:

${t.orcamentof || "-"}

</p>

<p>

Maior Goleada:

${t.goleada || "-"}

</p>

<p>

Maior Transferência:

${t.transferencia || "-"}

</p>

<p>

Títulos:

</p>

<ul>

${

t.titulos.length

?

t.titulos.map(

x=>`<li>${x}</li>`

).join("")

:

"<li>Nenhum título</li>"

}

</ul>

</div>

`

).join("");

}


/* ==========================
   CARREGAR CARREIRAS
========================== */

function renderCarreiras(){

const lista =

document.getElementById(

"listaCarreiras"

);

if(!lista) return;

if(

carreiras.length===0

){

lista.innerHTML = `

<div class="card">

<h3>

Nenhuma carreira

</h3>

</div>

`;

return;

}

lista.innerHTML =

carreiras.map(

(c,i)=>`

<div class="card">

<b>

Carreira

${i+1}

-

${c.nome}

</b>

<br><br>

<button

onclick="selecionar(${c.id})"

>

Carregar

</button>

<button

class="danger"

onclick="apagar(${c.id})"

>

Apagar

</button>

</div>

`

).join("");

}


/* ==========================
   SELECIONAR
========================== */

function selecionar(id){

atual = id;

salvar();

ir(

"atual"

);

}


/* ==========================
   APAGAR
========================== */

function apagar(id){

if(

!confirm(

"Apagar carreira?"

)

)

return;

carreiras =

carreiras.filter(

c => c.id !== id

);

if(

atual === id

){

atual = null;

}

salvar();

renderCarreiras();

}


/* ==========================
   APAGAR ATUAL
========================== */

function apagarCarreiraAtual(){

if(

!confirm(

"Apagar carreira atual?"

)

)

return;

carreiras =

carreiras.filter(

c => c.id !== atual

);

atual = null;

salvar();

ir(

"menu"

);

}


/* ==========================
   HISTÓRICO
========================== */

function renderHistorico(){

const div =

document.getElementById(

"infoHistorico"

);

if(!div) return;

if(

carreiras.length===0

){

div.innerHTML = `

<div class="card">

<h3>

Nenhuma carreira criada

</h3>

</div>

`;

return;

}

let html = "";

carreiras.forEach(

c=>{

let totalTitulos = 0;

let totais = {};

let equipes = {};

c.temporadas.forEach(

t=>{

const clube =

t.time ||

"Sem clube";

if(

!equipes[clube]

){

equipes[clube]={

inicio:t.ano,

fim:t.ano,

titulos:{}

};

}

equipes[clube].fim =

t.ano;

t.titulos.forEach(

titulo=>{

equipes[clube]

.titulos[titulo] =

(

equipes[clube]

.titulos[titulo]

||0

)+1;

totais[titulo] =

(

totais[titulo]

||0

)+1;

totalTitulos++;

}

);

}

);

html += `

<div class="card">

<h2>

${c.nome}

</h2>

`;

Object.keys(

equipes

)

.forEach(

nome=>{

const equipe =

equipes[nome];

html += `

<div class="temporada-card">

<h3>

${nome}

(

${equipe.inicio}

-

${equipe.fim}

)

</h3>

`;

const lista =

Object.entries(

equipe.titulos

);

if(

lista.length===0

){

html += `

<p>

Nenhum título

</p>

`;

}

lista.forEach(

([titulo,qtd])=>{

html += `

<p>

🏆

${titulo}

:

${qtd}

</p>

`;

}

);

html += `

</div>

`;

}

);

html += `

<hr>

<div class="temporada-card">

<h3>

🏅 Total

da Carreira

</h3>

`;

Object.entries(

totais

)

.forEach(

([titulo,qtd])=>{

html += `

<p>

🏆

${titulo}

:

${qtd}

</p>

`;

}

);

html += `

<hr>

<p>

<b>

🎖️ Total:

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

}

);

div.innerHTML =

html;

}

/* ==========================
   HALL DA FAMA
========================== */

function renderHall(){

const div =

document.getElementById(

"infoHall"

);

if(!div) return;

if(

carreiras.length===0

){

div.innerHTML = `

<div class="card">

<h3>

Nenhuma carreira criada

</h3>

</div>

`;

return;

}

const titulos = [];

const goleadas = [];

const transferencias = [];

const temporadas = [];

const gols = [];

const vitorias = [];

carreiras.forEach(

c=>{

let totalTitulos = 0;

let maiorGoleada = 0;

let maiorTransferencia = 0;

let totalGols = 0;

let totalVitorias = 0;

c.temporadas.forEach(

t=>{

totalTitulos +=

t.titulos.length;

maiorGoleada =

Math.max(

maiorGoleada,

Number(

t.goleada

) || 0

);

maiorTransferencia =

Math.max(

maiorTransferencia,

Number(

t.transferencia

) || 0

);

totalGols +=

Number(

t.gols

) || 0;

totalVitorias +=

Number(

t.vitorias

) || 0;

}

);

titulos.push({

nome:c.nome,

valor:totalTitulos

});

goleadas.push({

nome:c.nome,

valor:maiorGoleada

});

transferencias.push({

nome:c.nome,

valor:maiorTransferencia

});

temporadas.push({

nome:c.nome,

valor:c.temporadas.length

});

gols.push({

nome:c.nome,

valor:totalGols

});

vitorias.push({

nome:c.nome,

valor:totalVitorias

});

}

);

titulos.sort(

(a,b)=>

b.valor-a.valor

);

goleadas.sort(

(a,b)=>

b.valor-a.valor

);

transferencias.sort(

(a,b)=>

b.valor-a.valor

);

temporadas.sort(

(a,b)=>

b.valor-a.valor

);

gols.sort(

(a,b)=>

b.valor-a.valor

);

vitorias.sort(

(a,b)=>

b.valor-a.valor

);

div.innerHTML =

hallCard(

"🏆 Títulos Totais",

titulos

)

+

hallCard(

"⚽ Maiores Goleadas",

goleadas

)

+

hallCard(

"💰 Transferências",

transferencias

)

+

hallCard(

"📅 Temporadas",

temporadas

)

+

hallCard(

"🥅 Total de Gols",

gols

)

+

hallCard(

"✅ Total de Vitórias",

vitorias

);

}


/* ==========================
   CARD HALL
========================== */

function hallCard(

titulo,

lista

){

return `

<div class="card">

<h3>

${titulo}

</h3>

<div class="hall-item">

🥇

${

lista[0]

?

`${lista[0].nome}

(${lista[0].valor})`

:

"-"

}

</div>

<div class="hall-item">

🥈

${

lista[1]

?

`${lista[1].nome}

(${lista[1].valor})`

:

"-"

}

</div>

<div class="hall-item">

🥉

${

lista[2]

?

`${lista[2].nome}

(${lista[2].valor})`

:

"-"

}

</div>

</div>

`;

}

/* ==========================
   INICIALIZAÇÃO
========================== */

window.onload = function(){

    try{

        ir("menu");

        if(atual){

            const carreira = getAtual();

            if(carreira){

                renderAtual();

            }

        }

    }

    catch(erro){

        console.error(

            "Erro ao iniciar:",

            erro

        );

    }

};


/* ==========================
   UTILITÁRIOS
========================== */

function formatarNumero(valor){

    return Number(valor || 0)

    .toLocaleString(

        "pt-BR"

    );

}


function limparCampos(){

    if(typeof nome !== "undefined"){

        nome.value = "";

    }

    if(typeof temporada !== "undefined"){

        temporada.value = "";

    }

    if(typeof time !== "undefined"){

        time.value = "";

    }

    if(typeof orcamento !== "undefined"){

        orcamento.value = "";

    }

}


/* ==========================
   VALIDAÇÕES
========================== */

function carreiraExiste(){

    return carreiras.some(

        c => c.id === atual

    );

}


function garantirCarreira(){

    if(

        !carreiraExiste()

    ){

        alert(

            "Nenhuma carreira carregada."

        );

        return false;

    }

    return true;

}


/* ==========================
   ESTATÍSTICAS
========================== */

function aproveitamento(t){

    if(!t) return 0;

    if(t.jogos === 0)

        return 0;

    return (

        (

            t.vitorias * 3 +

            t.empates

        )

        /

        (

            t.jogos * 3

        )

    ) * 100;

}


/* ==========================
   BACKUP
========================== */

function exportarCarreiras(){

    const dados = JSON.stringify(

        carreiras,

        null,

        2

    );

    const blob = new Blob(

        [dados],

        {

            type:

            "application/json"

        }

    );

    const url =

        URL.createObjectURL(

            blob

        );

    const a =

        document.createElement(

            "a"

        );

    a.href = url;

    a.download =

        "carreiras.json";

    a.click();

}


/* ==========================
   IMPORTAÇÃO
========================== */

function importarCarreiras(

arquivo

){

const leitor =

new FileReader();

leitor.onload = e => {

try{

carreiras = JSON.parse(

e.target.result

);

salvar();

renderCarreiras();

alert(

"Importado com sucesso!"

);

}

catch{

alert(

"Arquivo inválido"

);

}

};

leitor.readAsText(

arquivo

);

}


/* ==========================
   FIM DO SCRIPT
========================== */

console.log(

"Modo Carreira carregado"

);
