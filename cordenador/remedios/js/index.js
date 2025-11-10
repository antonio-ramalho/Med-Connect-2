function chamarIndex() {
  inserirBotao();
  carregarLista();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "remedios/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='novo' class='botao-cadastro mb-4'> Novo registro </button>";
  document.getElementById("titulo").innerHTML += botao;
}

async function excluir(id) {
  const retorno = await fetch("remedios/php/excluir.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("sucesso!" + resposta.mensagem);
    window.location.reload();
  } else {
    alert("erro" + resposta.mensagem);
  }
}

async function carregarLista() {
  const retorno = await fetch("remedios/php/get.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th> Nome </th>
                <th> Unidade de Medida </th>
                <th> Dosagem Padrão </th>
                <th> Registro ANVISA </th>
                <th> Validade do Medicamento </th>
                <th> # </th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td> ${objeto.nome_medicamento} </td>
                <td> ${objeto.unidade_medida}  </td>
                <td> ${objeto.dosagem_padrao}  </td>
                <td> ${objeto.num_anvisa}  </td>
                <td> ${objeto.validade_medicamento}  </td>
                <td> 
                    <a href="remedios/home/alterar.html?id=${objeto.id_medicamento}"> Alterar</a>"
                    <a href="#" onclick='excluir(${objeto.id_medicamento})'> Excluir</a>"
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
