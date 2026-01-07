let amigos = [];
let amigosOrdemOriginal = [];
let resultadoSorteio = [];
let indiceAtual = 0;

function adicionar() {
    let amigoInput = document.getElementById('nome-amigo');
    let nome = amigoInput.value.trim();
    if (nome === '') return;

    amigos.push(nome);
    amigosOrdemOriginal.push(nome);
    amigoInput.value = '';
    atualizarLista();
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = '';
    amigosOrdemOriginal.forEach((amigo, index) => {
        let item = document.createElement('span');
        item.textContent = amigo;
        item.style.cursor = 'pointer';
        item.style.marginRight = '10px';
        item.onclick = function () { removerAmigo(index); };
        lista.appendChild(item);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    amigosOrdemOriginal.splice(index, 1);
    atualizarLista();
}

// Sorteio circular sem repetições
function sortear() {
    if (amigosOrdemOriginal.length < 2) return;

    let listaSorteio = [...amigosOrdemOriginal];
    embaralha(listaSorteio);

    resultadoSorteio = [];
    for (let i = 0; i < listaSorteio.length; i++) {
        let pessoa = listaSorteio[i];
        let tirou = i === listaSorteio.length - 1 ? listaSorteio[0] : listaSorteio[i + 1];
        resultadoSorteio.push({ pessoa, tirou });
    }

    document.querySelector('.content__main').style.display = 'none';
    document.getElementById('tela-sorteio').style.display = 'flex';

    indiceAtual = 0;
    document.getElementById('btn-reiniciar').style.display = 'none';
    mostrarResultado();
}

// Mostra resultado: Nome → Amigo
function mostrarResultado() {
    let pessoa = amigosOrdemOriginal[indiceAtual];
    let resultado = resultadoSorteio.find(r => r.pessoa === pessoa);
    document.getElementById('resultado-texto').textContent = `${pessoa} → ${resultado.tirou}`;
}

// Próximo participante
function proximo() {
    indiceAtual++;
    if (indiceAtual >= amigosOrdemOriginal.length) {
        document.getElementById('resultado-texto').textContent = '🎉 Sorteio finalizado!';
        document.getElementById('btn-proximo').style.display = 'none';
        document.getElementById('btn-reiniciar').style.display = 'inline-flex';
        return;
    }
    mostrarResultado();
}

// Embaralha array
function embaralha(lista) {
    for (let i = lista.length; i; i--) {
        const j = Math.floor(Math.random() * i);
        [lista[i - 1], lista[j]] = [lista[j], lista[i - 1]];
    }
}

// Reiniciar tudo
function reiniciar() {
    amigos = [];
    amigosOrdemOriginal = [];
    resultadoSorteio = [];
    indiceAtual = 0;

    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('tela-sorteio').style.display = 'none';
    document.querySelector('.content__main').style.display = 'flex';
    document.getElementById('btn-proximo').style.display = 'inline-flex';
}
