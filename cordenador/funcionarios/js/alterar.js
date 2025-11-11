document.addEventListener("DOMContentLoaded", () => {
  const url = new URLSearchParams(window.location.search);
  var id_func = url.get("id_func");

  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../cordenador.html";
  });

  if (id_func) {
    fase1(id_func);
  } else {
    alert("É necessário informar o ID");
  }
});

async function fase1(id_func) {
  const retorno = await fetch("../php/get.php?id_func=" + id_func);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("Sucesso " + resposta.mensagem);
    const reg = resposta.data[0];

    document.getElementById("nome").value = reg.nome;
    document.getElementById("usuario").value = reg.usuario;
    document.getElementById("senha").value = reg.senha;
    document.getElementById("cpf").value = reg.cpf;
    document.getElementById("telefone").value = reg.telefone;
    document.getElementById("email").value = reg.email;
    document.getElementById("cargo").value = reg.cargo;
    document.getElementById("id_func").value = id_func;

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
  var id_func = document.getElementById("id_func").value;
  var cpf = document.getElementById("cpf").value;
  var telefone = document.getElementById("telefone").value;
  var email = document.getElementById("email").value;
  var cargo = document.getElementById("cargo").value;
  console.log(nome,usuario,senha,id_func,cpf,telefone,email,cargo)


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

    const retorno = await fetch("../php/alterar.php?id_func=" + id_func, {
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
