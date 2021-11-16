function carregarPagina() {
    const inputNome = document.querySelector(".pagina-inicial>input");
    nome = inputNome.value;
    console.log(nome);
    objNome = {name: nome};
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objNome);
    promessa.catch(verificarNome);
    pegarParticipantes();
    verSeEstaNaSala();
    buscarMensagens();
    const telaInicial = document.querySelector(".pagina-inicial");
    console.log(telaInicial);
    telaInicial.classList.add("display-none");

}

function pegarParticipantes() {
    const promessaParticipantes = axios.get('https://mock-api.driven.com.br/api/v4/uol/participants');
    promessaParticipantes.then(printarParticipantes);
}

function printarParticipantes(resposta) {
    listaParticipantes = resposta.data;
    const elementoParticipante = document.querySelector("aside>.contatos");
    for (let i=0; i<listaParticipantes.length; i++) {
        elementoParticipante.innerHTML += `<div class="contato" onclick="selecionarDestinatario(this) data-identifier="participant"">
                                                <div>
                                                    <ion-icon class="icone-grande" name="person-circle"></ion-icon>
                                                    <span>${listaParticipantes[i].name}</span>
                                                </div>
                                                <ion-icon class="check display-none" name="checkmark"></ion-icon>
                                            </div>`;
    }
}

function verificarNome() {
    alert("Sinto muito, ja existe um usuario com este nome, por favor digite outro");
    recarregarPagina();
}

function verSeEstaNaSala() {
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', objNome);
    promessa.catch(recarregarPagina);
}

function buscarMensagens() {
    const promessa = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    promessa.then(printarMensagens);
}

function printarMensagens(objTodasMensagens) {
    let arrayMensagensServidor = objTodasMensagens.data;
    for (let i=0; i<100; i++){
        const objMensagem = arrayMensagensServidor[i];
        if (objMensagem.to === "Todos" || objMensagem.to === nome) {

        
            if (objMensagem.type === 'status') { 
                main.innerHTML += `<div class="mensagem ${objMensagem.type}" data-identifier="message">
                                        <span> 
                                            <span class="hora-mensagem">${objMensagem.time}</span> <strong>${objMensagem.from}</strong> ${objMensagem.text}
                                        </span>
                                    </div>`;

            } else if (objMensagem.type === 'message') {
                main.innerHTML += `<div class="mensagem ${objMensagem.type}" data-identifier="message">
                                        <span> 
                                            <span class="hora-mensagem">${objMensagem.time}</span> <strong>${objMensagem.from}</strong> para <strong>${objMensagem.to}</strong> ${objMensagem.text}
                                        </span>
                                    </div>`;
                
            } else if (objMensagem.type === 'private_message') {
                main.innerHTML += `<div class="mensagem ${objMensagem.type}" data-identifier="message">
                                        <span> 
                                            <span class="hora-mensagem">${objMensagem.time}</span> <strong>${objMensagem.from}</strong> reservadamente para <strong>${objMensagem.to}</strong> ${objMensagem.text}
                                        </span>
                                    </div>`;
            }
        }
    }
    arrayMensagensServidor = [];
    main.lastChild.scrollIntoView();
}

function tentarEnviarMensagem () {
    const mensagemEnviada = {from: nome, to: destino, text:'', type:tipo};
    mensagemEnviada.text = document.querySelector("input").value;
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages', mensagemEnviada);
    promessa.then(buscarMensagens);
    promessa.catch(recarregarPagina);
}

function recarregarPagina() {
    window.location.reload();
}

function abrirMenuLateral() {
    const menuLateral = document.querySelector("aside");
    const transparencia = document.querySelector(".transparencia");
    menuLateral.classList.remove("display-none");
    transparencia.classList.remove("display-none");
}

function voltar() {
    const menuLateral = document.querySelector("aside");
    const transparencia = document.querySelector(".transparencia");
    menuLateral.classList.add("display-none");
    transparencia.classList.add("display-none");
}

function selecionarDestinatario(elemento) {
    let elementosComCheck = document.querySelectorAll("aside>.contatos .check");
    for (let i=0; i<elementosComCheck.length; i++) {
        elementosComCheck[i].classList.add("display-none");
    }
    destino = elemento.innerText;
    const checkDoElemento = elemento.querySelector(".check");
    checkDoElemento.classList.remove("display-none");

    if (tipo === 'message') {
        const avisoDestino = document.querySelector("footer>div>p")
        avisoDestino.innerHTML = `Enviando para ${destino}`;
    } else if (tipo === 'private_message') {
        const avisoDestino = document.querySelector("footer>div>p")
        avisoDestino.innerHTML = `Enviando para ${destino} (reservadamente)`;
    }
}

function selecionarVisibilidade(visibilidade) {
    let checkDosElementos = document.querySelectorAll("#visibillity .check");
    for (let i=0; i<checkDosElementos.length; i++) { 
        checkDosElementos[i].classList.add("display-none");
    }
    visibilidade.lastElementChild.classList.remove("display-none");

    if (visibilidade.innerText === 'Público') {
        tipo = 'message';
        const avisoDestino = document.querySelector("footer>div>p")
        avisoDestino.innerHTML = `Enviando para ${destino}`;
    } else if (visibilidade.innerText === 'Reservadamente') {
        tipo = 'private_message';
        const avisoDestino = document.querySelector("footer>div>p")
        avisoDestino.innerHTML = `Enviando para ${destino} (reservadamente)`;
    }
}

let nome = '';
let objNome = {};
let listaParticipantes = [];
let destino = 'Todos';
let tipo = 'message';
const main = document.querySelector('main');

setInterval(verSeEstaNaSala, 5000);
setInterval(buscarMensagens, 3000);
setInterval(pegarParticipantes, 10000);
