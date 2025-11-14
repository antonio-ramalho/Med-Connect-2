function chamarIndex_atendimento() {
  inserirBotao();
  carregarLista_pac_atend();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "atendimento/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='btn-cadastro-filtro' class='botao-cadastro mb-4'> Novo atendimento </button>";
  document.getElementById("titulo").innerHTML += botao;
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
                <th> Email </th>
                <th> Logradouro </th>
                <th> Número de endereço </th>
                <th> CEP </th>
                <th> Cidade </th>
                <th> Estado </th>
                <th> Complemento </th>
                <th> Bairro </th>
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
                <td> ${objeto.email}  </td>
                <td> ${objeto.logradouro}  </td>
                <td> ${objeto.numero_ende}  </td>
                <td> ${objeto.cep}  </td>
                <td> ${objeto.cidade}  </td>
                <td> ${objeto.estado}  </td>
                <td> ${objeto.complemento}  </td>
                <td> ${objeto.bairro}  </td>
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
