document.addEventListener("DOMContentLoaded", () => {
  const conteudoPrincipal = document.getElementById("conteudo-principal");
  const links = document.querySelectorAll(".sidebar a");

  function carregarPagina(url) {
    fetch(url)
      .then((response) => response.text())
      .then((html) => {
        conteudoPrincipal.innerHTML = html;

        if (url === "pacientes/home/index.html") {
          chamarIndex();
        }
      })
      .catch((error) => {
        console.error("Erro ao carregar a página:", error);
        conteudoPrincipal.innerHTML = "<p>Erro ao carregar o conteúdo.</p>";
      });
  }

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const page = link.getAttribute("data-page");
      carregarPagina(page);
    });
  });

  carregarPagina("pacientes/home/index.html");
});
