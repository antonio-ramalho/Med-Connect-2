document.addEventListener("DOMContentLoaded", () => {
  valida_sessao();
  mostraNomeUsuario();
  carregarPagina("atendimento/home/index.html");
  selecionarPagina();

  document.getElementById("sair").addEventListener("click", () => {
    logOff();
  });
});

function gerenciarEstadoAtivo(linkAtivo) {
  links.forEach((link) => link.classList.remove("ativo"));
  if (linkAtivo) linkAtivo.classList.add("ativo");
}

function mostraNomeUsuario() {
  const nomeUsuario = localStorage.getItem("nomeUsuario");
  if (nomeUsuario) {
    document.getElementById("nome-usuario").textContent = nomeUsuario;
  }
}

const conteudoPrincipal = document.getElementById("conteudo-principal");
const links = document.querySelectorAll(".sidebar a");

function carregarPagina(url) {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      conteudoPrincipal.innerHTML = html;

      if (url === "atendimento/home/index.html") {
        chamarIndex_atendimento();
      } else if (url === "pacientes/home/index.html") {
        chamarIndex_pac();
      }
    })
    .catch((error) => {
      console.error("Erro ao carregar a página:", error);
      conteudoPrincipal.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
    });
}

function selecionarPagina() {
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      gerenciarEstadoAtivo(link);
      const page = link.getAttribute("data-page");
      carregarPagina(page);

      const linkAtivoInicial = document.querySelector(".sidebar a.ativo");
      if (linkAtivoInicial) {
        carregarPagina(linkAtivoInicial.getAttribute("data-page"));
      } else {
        // Garante que a primeira página seja carregada (ajuste se a página inicial for outra)
        const dashboardLink = document.querySelector('.sidebar a[data-page*="atendimento/home/index.html.html"]');
        if (dashboardLink) {
          dashboardLink.classList.add("ativo");
          carregarPagina(dashboardLink.getAttribute("data-page"));
        }
      }
    });
  });
}
