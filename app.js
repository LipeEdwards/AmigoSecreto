let listaDeAmigos = [];
let paresSorteados = {};

function adicionarAmigo() {
    let inputAmigo = document.getElementById('amigo');
    let nomeAmigo = inputAmigo.value.trim();

    if (nomeAmigo === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }

    let nomeAmigoMinusculo = nomeAmigo.toLowerCase();
    if (listaDeAmigos.some(amigo => amigo.toLowerCase() === nomeAmigoMinusculo)) {
        alert('Este nome já foi adicionado.');
        return;
    }
    
    // Adiciona o nome com a capitalização original
    listaDeAmigos.push(nomeAmigo);
    inputAmigo.value = '';
    
    exibirListaDeAmigos();
}

function exibirListaDeAmigos() {
    let lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';
    
    listaDeAmigos.forEach(amigo => {
        let li = document.createElement('li');
        li.textContent = amigo;
        li.classList.add('name-list-item');
        
        let button = document.createElement('button');
        button.textContent = 'x';
        button.classList.add('button-delete');
        button.onclick = function() {
            excluirAmigo(amigo);
        };
        
        li.appendChild(button);
        lista.appendChild(li);

        setTimeout(() => {
            li.classList.add('is-visible');
        }, 10);
    });
}

function excluirAmigo(amigoParaExcluir) {
    listaDeAmigos = listaDeAmigos.filter(amigo => amigo !== amigoParaExcluir);
    exibirListaDeAmigos();
}

function sortearAmigo() {
    if (listaDeAmigos.length < 3) {
        alert("O sorteio precisa de no mínimo 3 pessoas para acontecer.");
        return;
    }

    // Lógica principal do sorteio
    let listaEmbaralhada = [...listaDeAmigos];
    listaEmbaralhada.sort(() => Math.random() - 0.5);

    paresSorteados = {};
    for (let i = 0; i < listaEmbaralhada.length; i++) {
        let sorteado = listaEmbaralhada[i === listaEmbaralhada.length - 1 ? 0 : i + 1];
        paresSorteados[listaEmbaralhada[i]] = sorteado;
    }

    exibirResultadoSorteio();
}

function exibirResultadoSorteio() {
    let resultado = document.getElementById('resultado');
    resultado.innerHTML = '';
    
    // Converte o objeto de pares em um array de chaves e o embaralha
    let amigos = Object.keys(paresSorteados);
    amigos.sort(() => Math.random() - 0.5);

    amigos.forEach(amigo => {
        let sorteado = paresSorteados[amigo];
        let li = document.createElement('li');
        li.textContent = `${amigo} -> ${sorteado}`;
        resultado.appendChild(li);
    });
}

function reiniciar() {
    listaDeAmigos = [];
    paresSorteados = {};
    document.getElementById('listaAmigos').innerHTML = '';
    document.getElementById('resultado').innerHTML = '';
}
