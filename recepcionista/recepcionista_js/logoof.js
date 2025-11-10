async function logOff() {
  const retorno = await fetch("recepcionista_php/logoff.php");
  const resposta = await retorno.json();

  if (resposta.status == "ok") {
    alert("volte sempre");
    window.location.href = "../login/index.html";
  }
}
