function chamarIndex_medicamentos() {
  inserirBotao();
  carregarLista_med();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "remedios/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='novo' class='botao-cadastro mb-4'> Novo registro </button>";
  document.getElementById("titulo").innerHTML += botao;
}

async function excluir_med(id) {
  const retorno = await fetch("remedios/php/excluir.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("sucesso!" + resposta.mensagem);
    window.location.reload();
  } else {
    alert("erro" + resposta.mensagem);
  }
}

async function carregarLista_med() {
  const retorno = await fetch("remedios/php/get.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th></th>
                <th> Nome </th>
                <th> Unidade de Medida </th>
                <th> Dosagem Padrão </th>
                <th> Registro ANVISA </th>
                <th> Validade do Medicamento </th>
                <th></th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td> 
                  <a href="#" onclick='excluir_med(${objeto.id_medicamento})' class='botao-excluir'></a>
                </td>
                <td> ${objeto.nome_medicamento} </td>
                <td> ${objeto.unidade_medida}  </td>
                <td> ${objeto.dosagem_padrao}  </td>
                <td> ${objeto.num_anvisa}  </td>
                <td> ${objeto.validade_medicamento}  </td>
                <td> 
                   <a href='remedios/home/alterar.html?id=${objeto.id_medicamento}' class='botao-editar'></a>
                </td>
                </tr>
                `;
    }

    html += `</tbody>
             </table>`;

    document.getElementById("lista_med").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}
