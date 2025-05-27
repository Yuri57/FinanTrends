let mode = document.getElementById('mode');
let body = document.querySelector('body');
let container = document.querySelector('.container');

mode.addEventListener('click', () => {
mode.classList.toggle('dark')
body.classList.toggle('dark')

})

async function buscarCotacoes() {
  try {
    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL');
    const dados = await resposta.json();

    const grid = document.querySelector('.grid');
    grid.innerHTML = '';

    const moedas = [
      { code: 'USDBRL', nome: 'USD', img: './images/estadosU.png' },
      { code: 'EURBRL', nome: 'EUR', img: './images/eur.png' },
      { code: 'BTCBRL', nome: 'BTC', img: './images/bitCoin.png' }
    ];
    

    moedas.forEach(({ code, nome, img }) => {
      const cotacao = dados[code].bid;

      // Cria a div do item
      const item = document.createElement('div');
      item.classList.add('item-cotacao'); // classe para estilizar depois

      // Cria a imagem
      const imagem = document.createElement('img');
      imagem.src = img;
      imagem.alt = nome;
      imagem.style.width = '24px';
      imagem.style.marginRight = '8px';
      imagem.style.borderRadius = '20px';


      // Cria o texto da cotação
      const texto = document.createElement('span');
      texto.innerText = `${nome}: R$ ${parseFloat(cotacao).toFixed(2)}`;

      // Junta tudo
      item.appendChild(imagem);
      item.appendChild(texto);

      grid.appendChild(item);
    });
  } catch (erro) {
    console.error('Erro ao buscar cotações:', erro);
  }
}

document.addEventListener('DOMContentLoaded', buscarCotacoes);
setInterval(buscarCotacoes, 30000);

async function converterMoeda() {
  const valor = parseFloat(document.getElementById("valor").value);
  const moeda = document.getElementById("moeda").value;
  const resultado = document.getElementById("resultado");

  if (isNaN(valor) || valor <= 0) {
    resultado.innerText = "Por favor, insira um valor válido.";
    return;
  }

  try {
    const res = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL");
    const dados = await res.json();

    const taxas = {
      USD: parseFloat(dados.USDBRL.bid),
      EUR: parseFloat(dados.EURBRL.bid),
      BTC: parseFloat(dados.BTCBRL.bid)
    };

    const convertido = valor * taxas[moeda];
    resultado.innerText = `R$ ${valor} = ${convertido.toFixed(2)} ${moeda}`;
  } catch (erro) {
    resultado.innerText = "Erro ao converter. Tente novamente mais tarde.";
  }
}

function limparConversao() {
  document.getElementById("valor").value = "";
  document.getElementById("resultado").innerText = "";
}
