document.getElementById("entrar").addEventListener("click", () => {
  verificarLogin();
});

async function verificarLogin() {
  var usuario = document.getElementById("usuario").value;
  var senha = document.getElementById("senha").value;

  const fd = new FormData();
  fd.append("usuario", usuario);
  fd.append("senha", senha);

  const retorno = await fetch("login.php", {
    method: "POST",
    body: fd,
  });

  const resposta = await retorno.json();
  console.log("O PHP respondeu com:");
  console.log(resposta);

  if (resposta.status == "ok") {
    localStorage.setItem("nomeUsuario", resposta.nome);
    alert("seja bem vindo");

    if (resposta.data == "CORD") {
      window.location.href = "../cordenador/cordenador.html";
    } else if (resposta.data == "RECE") {
      window.location.href = "../recepcionista/cordenador.html";
    } else {
      alert("cargo não existe!");
    }
  } else {
    alert("Credenciais invalidas");
  }
}
