function chamarIndex() {
  inserirBotao();
  valida_sessao();
  carregarLista();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "pacientes/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='novo' class='botao-cadastro mb-4'> Novo registro </button>";
  document.getElementById("titulo").innerHTML += botao;
}

async function excluir(id) {
  const retorno = await fetch("pacientes/php/excluir.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("sucesso!" + resposta.mensagem);
    window.location.reload();
  } else {
    alert("erro" + resposta.mensagem);
  }
}

async function carregarLista() {
  const retorno = await fetch("pacientes/php/get.php");
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
                <th> # </th>
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
                <td> 
                    <a href="pacientes/home/alterar.html?id=${objeto.id_paciente}"> Alterar</a>"
                    <a href="#" onclick='excluir(${objeto.id_paciente})'> Excluir</a>"
                </td>
                </tr>
                `;
    }

    html += `</tbody>
             </table>`;

    document.getElementById("lista").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}
