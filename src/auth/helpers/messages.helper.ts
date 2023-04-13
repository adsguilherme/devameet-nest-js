// messages.helper.ts
// messages = é o nome da regra de negócio
// helper = é o pattern

export const MessagesHelper = {
  AUTH_LOGIN_NOT_FOUND: 'Login informado não é valido.',
  AUTH_PASSWORD_NOT_FOUND: 'Senha informada não é valida.',
  AUTH_PASSWORD_OR_LOGIN_NOT_FOUND: 'Email e/ou senha não encontrados.', // Questão de segurança não expor se é a senha ou login que está errado. Deixe de forma genérica.
};
