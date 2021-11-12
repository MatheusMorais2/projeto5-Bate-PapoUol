function carregarPagina () {
    let nome = prompt(`Qual é seu nome?`);
    objNome = {name: nome};
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objNome);
    promessa.then(verificarNome);
    return nome;
}

function verificarNome (resposta) {
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

function printarMensagens(objTodasMensagens) {
    const arrayMensagensServidor = objTodasMensagens.data;

    for (let i=0;i<arrayMensagensServidor.length;i++){
        const objMensagem = arrayMensagensServidor[i];
        if (objMensagem.to === "Todos" || objMensagem.to === nome) {

        
            if (objMensagem.type === 'status') { 
                main.innerHTML += `<div class="mensagem ${objMensagem.type}">
                                        <span> 
                                            <span class="hora-mensagem">${objMensagem.time}</span> <strong>${objMensagem.from}</strong> ${objMensagem.text}
                                        </span>
                                    </div>`;

            } else if (objMensagem.type === 'message') {
                main.innerHTML += `<div class="mensagem ${objMensagem.type}">
                                        <span> 
                                            <span class="hora-mensagem">${objMensagem.time}</span> <strong>${objMensagem.from}</strong> para <strong>${objMensagem.to}</strong> ${objMensagem.text}
                                        </span>
                                    </div>`;
                
            } else if (objMensagem.type === 'private_message') {
                main.innerHTML += `<div class="mensagem ${objMensagem.type}">
                                        <span> 
                                            <span class="hora-mensagem">${objMensagem.time}</span> <strong>${objMensagem.from}</strong> reservadamente para <strong>${objMensagem.to}</strong> ${objMensagem.text}
                                        </span>
                                    </div>`;
            }
        }
    }
    main.lastChild.scrollIntoView();
}

function tentarEnviarMensagem () {
    const mensagemEnviada = {from: nome, to:'Todos', text:'', type:'message'};
    mensagemEnviada.text = document.querySelector("input").value;
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemEnviada);
    promessa.catch(recarregarPagina);
}

function recarregarPagina() {
    window.location.reload();
}

let objNome = {};
let online = true;
const main = document.querySelector('main');

let nome = carregarPagina();
setInterval(verSeEstaNaSala, 5000);
setInterval(buscarMensagens, 3000);


