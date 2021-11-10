function carregarPagina () {
    let nome = prompt(`Qual é seu nome?`);
    objNome = {name: nome};
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objNome);
    promessa.then(verificarNome);

    return nome;
}

function verificarNome (resposta) {
    console.log(resposta + "resposta de verificarNome");
    if (resposta.status == 200){
        return;
    } else if (resposta.status == 400) {
        alert("Sinto muito, ja existe um usuario com este nome, por favor digite outro");
        carregarPagina();
    }
}


function verSeEstaNaSala () {
    axios.post('https://mock-api.driven.com.br/api/v4/uol/status', objNome);
}

function buscarMensagens () {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promessa.then(printarMensagens);
}

function printarMensagens(objMensagem) {
    if (objMensagem.type === 'status') { 
        main.innerHTML += `<div class="mensagem ${objMensagem.type}">
                <span class="hora-mensagem">${objMensagem.time}</span>
                <span class="nome-mensagem">${objMensagem.from} </span> 
                <span class="conteudo-mensagem">${objMensagem.text}</span>
            </div>`;
    } else if (objMensagem.type === 'message') {
        main.innerHTML += `<div class="mensagem ${objMensagem.type}">
                <span class="hora-mensagem">${objMensagem.time}</span>
                <span class="nome-mensagem">${objMensagem.from}</span>
                <span> para <span>
                <span class = "nome-mensagem>${objMensagem.to} </span>
                <span class="conteudo-mensagem">${objMensagem.text}</span>
            </div>`;
    } else if (objMensagem.type === 'private_message') {
        main.innerHTML += `<div class="mensagem ${objMensagem.type}">
                <span class="hora-mensagem">${objMensagem.time}</span>
                <span class="nome-mensagem">${objMensagem.from}</span>
                <span> reservadamente para </span>
                <span class = "nome-mensagem>${objMensagem.to} </span>
                <span class="conteudo-mensagem">${objMensagem.text}</span>
            </div>`;
    }
    const elementoQueQueroQueApareca = main.lastChild;
    elementoQueQueroQueApareca.scrollIntoView;
    

}

function tentarEnviarMensagem () {
    const mensagemEnviada = {from: nome, to:'', text:'', type:'message'};
    mensagemEnviada.text = document.querySelector("input").value;
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemEnviada);
    promessa.then(enviarMensagem);
}

function enviarMensagem (resposta) {
    if (resposta.status == 200){
        console.log('mensagem enviada com sucesso?');
    } else if (resposta.status == 400) {
        console.log('mensagem nao enviada com sucesso meu chapa');
    }
}

let objNome = {};
let online = true;
const main = document.querySelector('main');

let nome = carregarPagina();
setInterval(verSeEstaNaSala, 5000);
setInterval(buscarMensagens, 3000);

