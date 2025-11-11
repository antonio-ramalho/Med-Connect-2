document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../cordenador.html";
  });
});

document.getElementById("enviar").addEventListener("click", function () {
  novo();
});

async function novo() {
  var nome = document.getElementById("nome").value;
  var usuario = document.getElementById("usuario").value;
  var senha = document.getElementById("senha").value;
  var cpf = document.getElementById("cpf").value;
  var telefone = document.getElementById("telefone").value;
  var email = document.getElementById("email").value;
  var cargo = document.getElementById("cargo").value;


  if (nome.length > 0 && usuario.length > 0 && senha.length > 0 &&
    cpf.length > 0 && telefone.length > 0 && email.length > 0 && 
    cargo.length > 0) {
    const fd = new FormData();

    fd.append("nome", nome);
    fd.append("usuario", usuario);
    fd.append("senha", senha);
    fd.append("cpf", cpf);
    fd.append("telefone", telefone);
    fd.append("email", email);
    fd.append("cargo", cargo);

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
