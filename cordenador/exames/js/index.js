function chamarIndex_exames() {
  inserirBotao();
  carregarLista_exam();

  document.getElementById("novo").addEventListener("click", () => {
    window.location.href = "exames/home/novo.html";
  });
}

function inserirBotao() {
  var botao = "";
  botao = "<button id='novo' class='botao-cadastro mb-4'> Novo registro </button>";
  document.getElementById("titulo").innerHTML += botao;
}

async function excluir_exam(id) {
  const retorno = await fetch("exames/php/excluir.php?id=" + id);
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("sucesso!" + resposta.mensagem);
    window.location.reload();
  } else {
    alert("erro" + resposta.mensagem);
  }
}

async function carregarLista_exam() {
  const retorno = await fetch("exames/php/get.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th></th>
                <th> Exame </th>
                <th> Tipo de exame </th>
                <th></th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td>
                  <a href="#" onclick='excluir_exam(${objeto.id})' class='botao-excluir'></a>
                </td>
                <td> ${objeto.nome_exam} </td>
                <td> ${objeto.tipo_exam}  </td>
                <td> 
                  <a href='exames/home/alterar.html?id=${objeto.id}' class='botao-editar'></a>
                </td>
                </tr>
                `;
    }

    html += `</tbody>
             </table>`;

    document.getElementById("lista_exam").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}
