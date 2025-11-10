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
                <th> Usuario </th>
                <th> Senha </th>
                <th> # </th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td> ${objeto.nome} </td>
                <td> ${objeto.usuario}  </td>
                <td> ${objeto.senha}  </td>
                <td> 
                    <a href="remedios/home/alterar.html?id=${objeto.id}"> Alterar</a>"
                    <a href="#" onclick='excluir(${objeto.id})'> Excluir</a>"
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
