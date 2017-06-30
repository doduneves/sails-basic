# Sails Basic

Aplicação desenvolvida em Sails.
Um gerenciador de usuários com 2 níveis: Administrador e Visitante.
O Administrador pode alterar os dados de todos os usuários e o Visitante apenas o próprio.

Pacotes usados:
- **Passport**: Para autenticação de usuário;
- **Sails-hook-email**: Para envio de emails SMTP;
- **Sails-mongo**: Uso do Banco de Dados não relacional MongoDB 

**OBS: Para que funcione o envio de e-mail ao novo cadastro de um usuário, é necessário configurar o Servidor SMTP de envio de emails no arquivo 'config/email.js'**