function chamarIndex_atendimento() {
  inserirBotao();
  carregarLista_pac_atend();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "atendimento/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='btn-cadastro-filtro' class='botao-cadastro'> Novo atendimento </button>";
  document.getElementById("controles_tabela").innerHTML += botao;
}

async function carregarLista_pac_atend() {
  const retorno = await fetch("atendimento/php/get.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th> Nome </th>
                <th> CPF </th>
                <th> Telefone </th>
                <th> Data de nascimento </th>
                <th> Idade </th>
                <th> Sexo </th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td> ${objeto.nome} </td>
                <td> ${objeto.cpf}  </td>
                <td> ${objeto.telefone}  </td>
                <td> ${objeto.data_nasc}  </td>
                <td> ${objeto.idade}  </td>
                <td> ${objeto.sexo}  </td>
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
