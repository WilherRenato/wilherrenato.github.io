"use strict";
const toggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-label", "Abrir menu");
  navigation?.classList.remove("open");
}
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  navigation.classList.toggle("open", open);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
});
matchMedia("(min-width: 901px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll("[data-category]").forEach((row) => {
      row.hidden =
        button.dataset.filter !== "Todos" && row.dataset.category !== button.dataset.filter;
    });
  }),
);
const form = document.querySelector("#contact-form");
if (form) {
  const subject = new URLSearchParams(location.search).get("assunto");
  if (["recebiveis", "capital", "estruturado", "outro"].includes(subject))
    form.elements.assunto.value = subject;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    document.querySelector("#form-status").textContent =
      "Demonstração concluída: os campos foram validados. Nenhuma mensagem foi enviada e os dados não foram armazenados pelo site.";
    form.reset();
  });
}
