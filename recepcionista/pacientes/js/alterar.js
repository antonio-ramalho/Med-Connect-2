document.addEventListener("DOMContentLoaded", () => {
  const url = new URLSearchParams(window.location.search);
  var id = url.get("id");

  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../recepcionista.html";
  });

  if (id) {
    fase1(id);
  } else {
    alert("É necessário informar o ID");
  }
});

async function fase1(id_paciente) {
  const retorno = await fetch("../php/get.php?id=" + id_paciente);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("Sucesso " + resposta.mensagem);
    const reg = resposta.data[0];

    document.getElementById("nome").value = reg.nome;
    document.getElementById("cpf").value = reg.cpf;
    document.getElementById("telefone").value = reg.telefone;
    document.getElementById("data_nasc").value = reg.data_nasc;
    document.getElementById("idade").value = reg.idade;
    document.getElementById("sexo").value = reg.sexo;
    document.getElementById("email").value = reg.email;
    document.getElementById("logradouro").value = reg.logradouro;
    document.getElementById("numero_ende").value = reg.numero_ende;
    document.getElementById("cep").value = reg.cep;
    document.getElementById("cidade").value = reg.cidade;
    document.getElementById("estado").value = reg.estado;
    document.getElementById("complemento").value = reg.complemento;
    document.getElementById("bairro").value = reg.bairro;
    document.getElementById("id_paciente").value = id_paciente;
  } else {
    alert("Erro " + resposta.mensagem);
  }
}

document.getElementById("enviar").addEventListener("click", function () {
  fase2();
});

async function fase2() {
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
  var id = document.getElementById("id_paciente").value;

  if (
    nome.length > 0 &&
    cpf.length > 0 &&
    telefone.length > 0 &&
    data_nasc.length > 0 &&
    idade.length > 0 &&
    sexo.length > 0 &&
    email.length > 0 &&
    logradouro.length > 0 &&
    numero_ende.length > 0 &&
    cep.length > 0 &&
    cidade.length > 0 &&
    estado.length > 0 &&
    bairro.length > 0
  ) {
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

    const retorno = await fetch("../php/alterar.php?id=" + id, {
      method: "POST",
      body: fd,
    });
    const resposta = await retorno.json();

    if (resposta.status == "ok") {
      alert("Sucesso, " + resposta.mensagem);
      window.location.href = "../../recepcionista.html";
    } else {
      alert("Erro, " + resposta.mensagem);
      console.log(resposta.data);
    }
  } else {
    alert("É necessário preencher todos os campos!");
  }
}
