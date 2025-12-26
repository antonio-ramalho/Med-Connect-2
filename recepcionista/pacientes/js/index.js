function chamarIndex_pac() {
  inserirBotao();
  carregarLista_pac();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "pacientes/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='novo' class='botao-cadastro'> Novo registro </button>";
  document.getElementById("controles_tabela").innerHTML += botao;
}

async function excluir_pac(id) {
  const retorno = await fetch("pacientes/php/excluir.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("sucesso!" + resposta.mensagem);
    window.location.reload();
  } else {
    alert("erro" + resposta.mensagem);
  }
}

async function carregarLista_pac() {
  const retorno = await fetch("pacientes/php/get.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th> </th>
                <th> Nome </th>
                <th> CPF </th>
                <th> Telefone </th>
                <th> Data de nascimento </th>
                <th> Idade </th>
                <th> Sexo </th>
                <th> Email </th>
                <th> # </th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td> 
                  <a href="#" onclick='excluir_pac(${objeto.id_paciente})' class='botao-excluir'></a> 
                </td>
                <td> ${objeto.nome} </td>
                <td> ${objeto.cpf}  </td>
                <td> ${objeto.telefone}  </td>
                <td> ${objeto.data_nasc}  </td>
                <td> ${objeto.idade}  </td>
                <td> ${objeto.sexo}  </td>
                <td> ${objeto.email}  </td>
                <td> 
                  <a href='pacientes/home/alterar.html?id=${objeto.id_paciente}' class='botao-editar'> </a>
                </td>
                </tr>
                `;
    }

    html += `</tbody>
             </table>`;

    document.getElementById("lista_pac").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}
