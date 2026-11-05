"use strict";

/** Somente validação local. Não autentica, não envia e não armazena credenciais. */
function normalizeTaxId(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function maskTaxId(value) {
  const raw = normalizeTaxId(value).slice(0, 14);
  const isCnpj = /[A-Z]/.test(raw) || raw.length > 11;
  const breaks = isCnpj ? { 2: ".", 5: ".", 8: "/", 12: "-" } : { 3: ".", 6: ".", 9: "-" };
  return [...raw].map((char, index) => (breaks[index] || "") + char).join("");
}

function isValidTaxId(value) {
  const raw = normalizeTaxId(value);
  if (/^(.)\1+$/.test(raw)) return false;
  if (/^\d{11}$/.test(raw)) {
    const digit = (length) => {
      const sum = [...raw.slice(0, length)].reduce(
        (total, char, i) => total + Number(char) * (length + 1 - i),
        0,
      );
      const result = (sum * 10) % 11;
      return result === 10 ? 0 : result;
    };
    return digit(9) === Number(raw[9]) && digit(10) === Number(raw[10]);
  }
  if (!/^[A-Z0-9]{12}\d{2}$/.test(raw)) return false;
  // Receita Federal: CNPJ numérico e alfanumérico usam módulo 11 e valores ASCII - 48.
  const digit = (base, weights) => {
    const sum = [...base].reduce(
      (total, char, i) => total + (char.charCodeAt(0) - 48) * weights[i],
      0,
    );
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };
  const first = digit(raw.slice(0, 12), [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  const second = digit(raw.slice(0, 12) + first, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
  return raw.slice(-2) === `${first}${second}`;
}

/** Retorna true quando os dados de entrada são válidos. */
function validateClientLogin(form) {
  const cedente = form.elements.cedente;
  const usuario = form.elements.usuario;
  const senha = form.elements.senha;
  cedente.setCustomValidity("");
  usuario.setCustomValidity("");
  senha.setCustomValidity("");
  if (!isValidTaxId(cedente.value)) cedente.setCustomValidity("Informe um CPF ou CNPJ válido.");
  if (!usuario.value.trim() || usuario.value.length > 50)
    usuario.setCustomValidity("Informe o usuário com até 50 caracteres.");
  if (!senha.value) senha.setCustomValidity("Informe sua senha.");
  if (!form.reportValidity()) return false;
  return true; // Insira aqui a rota/integração de autenticação de acordo com cada cenário.
}

const clientDialog = document.querySelector("#client-dialog");
const clientForm = document.querySelector("#client-login");
const passwordToggle = document.querySelector("#password-toggle");
const passwordInput = document.querySelector("#client-password");
const clientStatus = document.querySelector("#client-status");

document.querySelectorAll("[data-client]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    clientDialog.showModal();
  });
});
document.querySelector(".client-close")?.addEventListener("click", () => clientDialog.close());
clientDialog?.addEventListener("click", (event) => {
  const rect = clientDialog.getBoundingClientRect();
  if (
    event.target === clientDialog &&
    (event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom)
  )
    clientDialog.close();
});
clientDialog?.addEventListener("close", () => {
  clientForm.reset();
  [...clientForm.elements].forEach((field) => field.setCustomValidity?.(""));
  passwordInput.type = "password";
  passwordToggle.setAttribute("aria-pressed", "false");
  passwordToggle.setAttribute("aria-label", "Exibir senha");
  clientStatus.textContent = "";
});
clientForm?.elements.cedente.addEventListener("input", (event) => {
  const input = event.target;
  const cursor = input.selectionStart;
  const charactersBefore = normalizeTaxId(input.value.slice(0, cursor)).length;
  input.value = maskTaxId(input.value);
  let position = 0;
  let count = 0;
  while (position < input.value.length && count < charactersBefore) {
    if (/[A-Z0-9]/.test(input.value[position])) count++;
    position++;
  }
  input.setSelectionRange(position, position);
});
clientForm?.addEventListener("input", (event) => {
  event.target.setCustomValidity?.("");
  clientStatus.textContent = "";
});
passwordToggle?.addEventListener("click", () => {
  const show = passwordInput.type === "password";
  passwordInput.type = show ? "text" : "password";
  passwordToggle.setAttribute("aria-pressed", String(show));
  passwordToggle.setAttribute("aria-label", show ? "Ocultar senha" : "Exibir senha");
});
clientForm?.addEventListener("submit", (event) => {
  // Mantém a demonstração sem transmissão. Não remova antes de definir a integração.
  event.preventDefault();
  if (!validateClientLogin(clientForm)) return;
  // Para um POST tradicional: definir action HTTPS e method="post", validar também no servidor
  // e adaptar este handler para permitir o envio apenas depois da validação.
  // Para API/fetch: implementar aqui a rota, sem registrar a senha no console ou em storage.
  clientStatus.textContent =
    "Dados validados. O acesso será habilitado após configurar a integração. Nenhum dado foi enviado.";
});
if (clientForm) clientForm.querySelector('[type="submit"]').disabled = false;
