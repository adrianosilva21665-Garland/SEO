// TODO: substituir pelo número real de WhatsApp (formato: 55 + DDD + número, só dígitos)
const WHATSAPP_NUMERO = "5500000000000";

document.getElementById("ano-atual").textContent = new Date().getFullYear();

const form = document.getElementById("form-inscricao");
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const dados = {
    nome: form.nome.value.trim(),
    email: form.email.value.trim(),
    whatsapp: form.whatsapp.value.trim(),
    empresa: form.empresa.value.trim(),
    atuacao: form.atuacao.value,
  };

  if (!dados.nome || !dados.email || !dados.whatsapp || !dados.atuacao) {
    feedback.textContent = "Preencha os campos obrigatórios: nome, e-mail, WhatsApp e atuação.";
    feedback.className = "form-feedback erro";
    return;
  }

  const mensagem =
    `Olá! Quero garantir minha vaga no Curso ICF.\n` +
    `Nome: ${dados.nome}\n` +
    `E-mail: ${dados.email}\n` +
    `WhatsApp: ${dados.whatsapp}\n` +
    `Empresa: ${dados.empresa || "-"}\n` +
    `Atuação: ${dados.atuacao}`;

  const link = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

  feedback.textContent = "Inscrição recebida! Abrindo o WhatsApp para confirmar seus dados...";
  feedback.className = "form-feedback sucesso";

  window.open(link, "_blank", "noopener");
  form.reset();
});
