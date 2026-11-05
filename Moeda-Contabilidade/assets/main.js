"use strict";

const menu = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Abrir menu");
  navigation.classList.remove("open");
}
menu.addEventListener("click", () => {
  const open = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  navigation.classList.toggle("open", open);
});
navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
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

const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectService(selected, moveFocus = false) {
  tabs.forEach((tab) => {
    const active = tab === selected;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute("aria-controls")).hidden = !active;
  });
  if (moveFocus) selected.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectService(tab));
  tab.addEventListener("keydown", (event) => {
    let next;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % tabs.length;
    if (["ArrowUp", "ArrowLeft"].includes(event.key))
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      selectService(tabs[next], true);
    }
  });
});

const form = document.querySelector("#contact-form");
if (form) {
  const subject = new URLSearchParams(location.search).get("assunto");
  if ([...form.elements.assunto.options].some((option) => option.value === subject))
    form.elements.assunto.value = subject;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    document.querySelector("#form-status").textContent =
      "Demonstração concluída: campos validados. Nenhuma mensagem foi enviada ou armazenada pelo site.";
    form.reset();
  });
  form.querySelector('[type="submit"]').disabled = false;
}
