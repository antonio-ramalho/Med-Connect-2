document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../recepcionista.html";
  });
});

document.getElementById("enviar").addEventListener("click", function () {
  novo();
});

async function novo() {
  var nome = document.getElementById("nome").value;
  var cpf = document.getElementById("cpf").value;
  var telefone = document.getElementById("telefone").value;
  var data_nasc = document.getElementById("data_nasc").value;
  var idade = document.getElementById("idade").value;
  var sexo = document.getElementById("sexo").value;
  var email = document.getElementById("email").value;
  var logradouro = document.getElementById("logradouro").value;
  var numero_ende = document.getElementById("numero_ende").value;
  var cep = document.getElementById("cep").value;
  var cidade = document.getElementById("cidade").value;
  var estado = document.getElementById("estado").value;
  var complemento = document.getElementById("complemento").value;
  var bairro = document.getElementById("bairro").value;

  if (nome.length > 0 && cpf.length > 0 && telefone.length > 0 && data_nasc.length > 0 && idade.length > 0 && sexo.length > 0 && email.length > 0 && logradouro.length > 0 && numero_ende.length > 0 && cep.length > 0 && cidade.length > 0 && estado.length > 0 && bairro.length > 0) {
    const fd = new FormData();

    fd.append("nome", nome);
    fd.append("cpf", cpf);
    fd.append("telefone", telefone);
    fd.append("data_nasc", data_nasc);
    fd.append("idade", idade);
    fd.append("sexo", sexo);
    fd.append("email", email);
    fd.append("logradouro", logradouro);
    fd.append("numero_ende", numero_ende);
    fd.append("cep", cep);
    fd.append("cidade", cidade);
    fd.append("estado", estado);
    fd.append("complemento", complemento);
    fd.append("bairro", bairro);

    const retorno = await fetch("../php/novo.php", {
      method: "POST",
      body: fd,
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
      alert("Sucesso " + resposta.mensagem);
      window.location.href = "../../recepcionista.html";
    } else {
      alert("Erro " + resposta.mensagem);
    }
  } else {
    alert("É necessário preencher todos os campos!");
  }
}
