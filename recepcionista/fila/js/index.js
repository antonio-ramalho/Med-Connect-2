async function carregarFila() {
  const retorno = await fetch("fila/php/get_atend_pac.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<table>
                <thead>
                <tr>
                <th> Nome do paciente </th>
                <th> Cpf do paciente</th>
                <th> status</th>
                <th> Hora de inicio do atendimento </th>
                </tr>
                </thead>
                <tbody>`;

    for (var i = 0; i < resposta.data.length; i++) {
      var objeto = resposta.data[i];

      html += ` <tr>
                <td> ${objeto.nome_pac} </td>
                <td> ${objeto.cpf_pac} </td>
                <td> ${objeto.status_fila} </td>
                <td> ${objeto.data_atendimento} </td>
                </tr>
                `;
    }

    html += `</tbody>
             </table>`;

    document.getElementById("fila").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}
