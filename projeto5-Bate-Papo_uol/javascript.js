function carregarPagina () {
    let nome = prompt(`Qual é seu nome?`);
    let objNome = {name: nome};
    const promessa = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', objNome);
    promessa.then(verificarResposta);

    /* let hora = '';
    hora = hora.getTime();
    console.log(hora); */
    /* const main = document.querySelector('main');
    main.innerHTML += `
    <div class="mensagem">
            <span class="hora-mensagem">
                ${horaMensagem}
            </span>
            <span class="nome-mensagem">
                Joao 
            </span>
            <span class="conteudo-mensagem">
                entra na sala
            </span>
        </div>
    ` */
}

function verificarResposta (resposta) {
    console.log(resposta);
    if (resposta.status == 200){
        return;
    } else if (resposta.status == 400) {
        alert("Sinto muito, ja existe um usuario com este nome, por favor digite outro");
        carregarPagina();
    }
}

carregarPagina();
let online = true;
setInterval(verSeEstaNaSala, 5000);

function verSeEstaNaSala () {
    if (online) {
        return;
    } else {
        alert("Saiu da sala? eu nao sei como isso mudaria idk");
    }
}


