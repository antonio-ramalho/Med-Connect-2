function chamarIndex_atendimento() {
  inserirBotao();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "atendimento/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='btn-cadastro-filtro' class='botao-cadastro mb-4'> Novo atendimento </button>";
  document.getElementById("titulo").innerHTML += botao;
}
