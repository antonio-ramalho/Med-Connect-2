document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../cordenador.html";
  });
});

document.getElementById("enviar").addEventListener("click", function () {
  novo();
});

async function novo() {
  var nome_medicamento = document.getElementById("nome_medicamento").value;
  var unidade = document.getElementById("unidade").value;
  var dosagem = document.getElementById("dosagem").value;
  var num_anvisa = document.getElementById("num_anvisa").value;
  var validade = document.getElementById("validade").value;

  if (
    nome_medicamento.length > 0 &&
    unidade.length > 0 &&
    dosagem.length > 0 &&
    num_anvisa.length > 0 &&
    validade.length > 0
  ) {
    const fd = new FormData();

    fd.append("nome_medicamento", nome_medicamento);
    fd.append("unidade", unidade);
    fd.append("dosagem", dosagem);
    fd.append("num_anvisa", num_anvisa);
    fd.append("validade", validade);

    const retorno = await fetch("../php/novo.php", {
      method: "POST",
      body: fd,
    });

    const resposta = await retorno.json();

    if (resposta.status == "ok") {
      alert("Sucesso " + resposta.mensagem);
      window.location.href = "../../cordenador.html";
    } else {
      alert("Erro " + resposta.mensagem);
    }
  } else {
    alert("É necessário preencher todos os campos!");
  }
}
