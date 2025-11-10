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

    document.getElementById("num_ambu").value = reg.num_ambulancia;
    document.getElementById("num_placa").value = reg.placa_ambu;
    document.getElementById("id").value = id;
  } else {
    alert("Erro " + resposta.mensagem);
  }
}

document.getElementById("enviar").addEventListener("click", function () {
  fase2();
});

async function fase2() {
  var num_ambu = document.getElementById("num_ambu").value;
  var num_placa = document.getElementById("num_placa").value;
  var id = document.getElementById("id").value;

  if (num_ambu.length > 0 && num_placa.length > 0) {
    const fd = new FormData();

    fd.append("num_ambu", num_ambu);
    fd.append("num_placa", num_placa);

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
