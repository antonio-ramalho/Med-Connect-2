function chamarIndex_ambulancias() {
  inserirBotao();
  carregarLista_ambu();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "ambulancia/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='novo' class='botao-cadastro mb-4'> Novo registro </button>";
  document.getElementById("titulo").innerHTML += botao;
}

async function excluir_ambu(id) {
  const retorno = await fetch("ambulancia/php/excluir.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("sucesso!" + resposta.mensagem);
    window.location.reload();
  } else {
    alert("erro" + resposta.mensagem);
  }
}

async function carregarLista_ambu() {
  const retorno = await fetch("ambulancia/php/get.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th></th>
                <th> Número da ambulância </th>
                <th> Número da placa da ambulância </th>
                <th></th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td>
                  <a href="#" onclick='excluir_ambu(${objeto.id})' class='botao-excluir'></a>
                </td>
                <td> ${objeto.num_ambulancia} </td>
                <td> ${objeto.placa_ambu} </td>
                <td> 
                  <a href='ambulancia/home/alterar.html?id=${objeto.id}' class='botao-editar'></a>
                </td>
                </tr>
                `;
    }

    html += `</tbody>
             </table>`;

    document.getElementById("lista_ambu").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}
