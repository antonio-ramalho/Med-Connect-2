document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../cordenador.html";
  });
});

document.getElementById("enviar").addEventListener("click", function () {
  novo();
});

async function novo() {
  var num_ambu = document.getElementById("num_ambu").value;
  var num_placa = document.getElementById("num_placa").value;

  if (num_ambu.length > 0 && num_placa.length > 0) {
    const fd = new FormData();

    fd.append("num_ambu", num_ambu);
    fd.append("num_placa", num_placa);

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
