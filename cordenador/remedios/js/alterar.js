document.addEventListener("DOMContentLoaded", () => {
  const url = new URLSearchParams(window.location.search);
  var id_medicamento = url.get("id_medicamento");

  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../cordenador.html";
  });

  if (id) {
    fase1(id_medicamento);
  } else {
    alert("É necessário informar o ID");
  }
});

async function fase1(id) {
  const retorno = await fetch("../php/get.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("Sucesso " + resposta.mensagem);
    const reg = resposta.data[0];

    document.getElementById("nome_medicamento").value = reg.nome;
    document.getElementById("unidade").value = reg.unidade;
    document.getElementById("dosagem").value = reg.dosagem;
    document.getElementById("num_anvisa").value = reg.num_anvisa;
    document.getElementById("validade").value = reg.validade;
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

  if (nome.length > 0 && usuario.length > 0 && senha.length > 0) {
    const fd = new FormData();

    fd.append("nome_medicamento", nome_medicamento);
    fd.append("unidade", unidade);
    fd.append("dosagem", dosagem);
    fd.append("num_anvisa", num_anvisa);
    fd.append("validade", validade);

    const retorno = await fetch("../php/alterar.php?id=" + id, {
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
