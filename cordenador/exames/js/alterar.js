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

async function fase1(id) {
  const retorno = await fetch("../php/get.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("Sucesso " + resposta.mensagem);
    const reg = resposta.data[0];

    document.getElementById("exame").value = reg.nome_exam;
    document.getElementById("tipo_exam").value = reg.tipo_exam;
    document.getElementById("id").value = id;
  } else {
    alert("Erro " + resposta.mensagem);
  }
}

document.getElementById("enviar").addEventListener("click", function () {
  fase2();
});

async function fase2() {
  var nome_exam = document.getElementById("exame").value;
  var tipo_exam = document.getElementById("tipo_exam").value;
  var id = document.getElementById("id").value;

  if (nome_exam.length > 0 && tipo_exam.length > 0) {
    const fd = new FormData();

    fd.append("nome_exam", nome_exam);
    fd.append("tipo_exam", tipo_exam);

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
