function chamarIndex_funcionarios() {
  inserirBotao();
  chamarIndex_func();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "funcionarios/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='novo' class='botao-cadastro mb-4'> Novo registro </button>";
  document.getElementById("titulo").innerHTML += botao;
}

async function excluir_func(id_func) {
  const retorno = await fetch("funcionarios/php/excluir.php?id_func=" + id_func);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("sucesso!" + resposta.mensagem);
    window.location.reload();
  } else {
    alert("erro" + resposta.mensagem);
  }
}

async function chamarIndex_func() {
  const retorno = await fetch("funcionarios/php/get.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th></th>
                <th> Nome </th>
                <th> Usuario </th>
                <th> Senha </th>
                <th> CPF </th>
                <th> Telefone </th>
                <th> E-mail </th>
                <th> Cargo </th>
                <th></th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      if (objeto.cargo == "CORD") {
        var cargo_txt = "Cordenador";
      } else if (objeto.cargo == "ENFE") {
        var cargo_txt = "Enfermeiro";
      } else if (objeto.cargo == "RECE") {
        var cargo_txt = "Recepcionista";
      }

      html += ` <tr>
                <td>
                  <a href="#" onclick='excluir_func(${objeto.id_func})' class='botao-excluir'></a>
                </td>
                <td> ${objeto.nome} </td>
                <td> ${objeto.usuario}  </td>
                <td> ${objeto.senha}  </td>
                <td> ${objeto.cpf} </td> 
                <td> ${objeto.telefone} </td> 
                <td> ${objeto.email} </td> 
                <td> ${cargo_txt} </td> 
                <td> 
                  <a href='funcionarios/home/alterar.html?id_func=${objeto.id_func}' class='botao-editar'></a>
                </td>
                </tr>
                `;
    }

    html += `</tbody>
             </table>`;

    document.getElementById("lista_func").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}
