document.addEventListener("DOMContentLoaded", () => {
  escolher_pac();
  inputs_anamnese();

  document.getElementById("enviar").addEventListener("click", () => {
    novo_atend();
  });

  document.getElementById("sair").addEventListener("click", () => {
    window.location.href = "../../recepcionista.html";
  });
});

async function novo_atend() {
  var motivo_consul = document.getElementById("motivo_consul").value;
  var anamnese_rec = document.getElementById("anamnese_rec").value;
  var id_paciente = document.getElementById("id_paciente").value;

  if (motivo_consul.length > 0 && anamnese_rec.length > 0) {
    const fd = new FormData();

    fd.append("motivo_consul", motivo_consul);
    fd.append("anamnese_rec", anamnese_rec);

    const retorno = await fetch("../php/novo.php?id=" + id_paciente, {
      method: "POST",
      body: fd,
    });

    const resposta = await retorno.json();

    if (resposta.status == "ok") {
      alert("Sucesso " + resposta.mensagem);
      window.location.href = "../../recepcionista.html";
    } else {
      alert("Erro " + resposta.mensagem);
    }
  } else {
    alert("É necessário preencher todos os campos!");
  }
}

async function escolher_pac() {
  const retorno = await fetch("../php/get.php?id=");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    var html = `<select name="paciente" id="nome_pac" onchange='carregar_pac_atend(this)' class='input-formulario-cadastro'>
                  <option value="">Escolha um paciente:</option>
                `;

    for (var i = 0; i < resposta.data.length; i++) {
      var obj = resposta.data[i];
      html += `<option value="${obj.cpf}" data-sexo='${obj.sexo}' data-idade='${obj.idade}' data-id='${obj.id_paciente}'>${obj.nome}</option>`;
    }

    html += `</select>`;
    document.getElementById("select_pac").innerHTML = html;
  } else {
    alert("Erro!" + resposta.mensagem);
  }
}

function inputs_anamnese() {
  html = `<div class='box-txt' >
            <label for="motivo_consul">*Motivo da consulta:</label>
            <textarea id="motivo_consul" name="motivo_consul" rows="5" cols="30" class='text-area'></textarea>
          </div>`;

  html += `<div class='box-txt'>
              <label for="anamnese_rec">*Descreva o que o paciente sente:</label>
              <textarea id="anamnese_rec" name="anamnese_rec" rows="5" cols="30" class='text-area'></textarea>
            </div>`;

  document.getElementById("form_atend").innerHTML = html;
}

function carregar_pac_atend(elementoSelecionado) {
  const selectedIndex = elementoSelecionado.selectedIndex;
  const opcao_Select = elementoSelecionado.options[selectedIndex];

  const cpf = opcao_Select.value;
  const sexo = opcao_Select.dataset.sexo;
  const idade = opcao_Select.dataset.idade;
  const id = opcao_Select.dataset.id;

  html_pac = `<div>
                <label for="cpf">Cpf do paciente:</label>
                <input type="text" id="cpf" name="cpf" value="${cpf}" class='input-formulario-cadastro' disabled>
              </div>
              `;

  html_pac += `<div>
                <label for="sexo">Sexo do paciente:</label>
                <input type="text" id="sexo" name="sexo" value="${sexo}" class='input-formulario-cadastro' disabled>
               </div>
              `;

  html_pac += `<div>
                <label for="idade">Idade do paciente:</label>
                <input type="text" id="idade" name="idade" value="${idade}" class='input-formulario-cadastro' disabled>
              </div>
              `;

  document.getElementById("id_paciente").value = id;
  document.getElementById("dados_pac").innerHTML = html_pac;
}
