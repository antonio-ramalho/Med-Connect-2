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

    document.getElementById("nome").value = reg.nome;
    document.getElementById("usuario").value = reg.usuario;
    document.getElementById("senha").value = reg.senha;
    document.getElementById("id").value = id;
  } else {
    alert("Erro " + resposta.mensagem);
  }
}

document.getElementById("enviar").addEventListener("click", function () {
  fase2();
});

async function fase2() {
  var nome = document.getElementById("nome").value;
  var usuario = document.getElementById("usuario").value;
  var senha = document.getElementById("senha").value;
  var id = document.getElementById("id").value;

  if (nome.length > 0 && usuario.length > 0 && senha.length > 0) {
    const fd = new FormData();

    fd.append("nome", nome);
    fd.append("usuario", usuario);
    fd.append("senha", senha);

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
