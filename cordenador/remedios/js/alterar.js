document.addEventListener("DOMContentLoaded", () => {
  const url = new URLSearchParams(window.location.search);
  var id = url.get("id");

  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../cordenador.html";
  });

  if (id) {
    fase1(id);
  } else {
    alert("É necessário informar o ID");
  }
});

async function fase1(id_medicamento) {
  const retorno = await fetch("../php/get.php?id=" + id_medicamento);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("Sucesso " + resposta.mensagem);
    const reg = resposta.data[0];

    document.getElementById("nome_medicamento").value = reg.nome_medicamento;
    document.getElementById("unidade").value = reg.unidade_medida;
    document.getElementById("dosagem").value = reg.dosagem_padrao;
    document.getElementById("num_anvisa").value = reg.num_anvisa;
    document.getElementById("validade").value = reg.validade_medicamento;
    document.getElementById("id_medicamento").value = id_medicamento;
  } else {
    alert("Erro " + resposta.mensagem);
  }
}

document.getElementById("enviar").addEventListener("click", function () {
  fase2();
});

async function fase2() {
  var nome_medicamento = document.getElementById("nome_medicamento").value;
  var unidade = document.getElementById("unidade").value;
  var dosagem = document.getElementById("dosagem").value;
  var num_anvisa = document.getElementById("num_anvisa").value;
  var validade = document.getElementById("validade").value;
  var id_medicamento = document.getElementById("id_medicamento").value;

  if (
    nome_medicamento.length > 0 &&
    unidade.length > 0 &&
    dosagem.length > 0 &&
    num_anvisa.length > 0 &&
    validade.length > 0
  ) {
    const fd = new FormData();

    fd.append("nome_medicamento", nome_medicamento);
    fd.append("unidade_medida", unidade);
    fd.append("dosagem_padrao", dosagem);
    fd.append("num_anvisa", num_anvisa);
    fd.append("validade_medicamento", validade);

    const retorno = await fetch("../php/alterar.php?id=" + id_medicamento, {
      method: "POST",
      body: fd,
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
      alert("Sucesso, " + resposta.mensagem);
      window.location.href = "../../cordenador.html";
    } else {
      alert("Erro, " + resposta.mensagem);
    }
  } else {
    alert("É necessário preencher todos os campos!");
  }
}
