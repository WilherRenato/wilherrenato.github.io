# Conion-Fomento — modelo institucional

Site estático demonstrativo em HTML, CSS, JavaScript e SVG. Seis páginas, layout responsivo e todos os recursos locais. Empresa fictícia, sem oferta ou contratação financeira.

## Edição

Abra esta pasta no Visual Studio Code. HTML contém o conteúdo, assets/style.css contém o visual, assets/main.js contém as interações institucionais. Arquivos indentados com dois espaços. Não há compilação ou dependências para hospedagem. Alterações nos HTML podem ser feitas diretamente.

## Área do cliente

Todos os botões abrem um dialog com formulário. O formulário não possui action. Usa method="post" e um handler de submit que impede o envio enquanto a integração não estiver implementada.

- assets/client-area.js: máscara de CPF/CNPJ, cálculo de dígitos verificadores, usuário obrigatório com até 50 caracteres e senha obrigatória. Compatível com CNPJ numérico e alfanumérico.
- validateClientLogin(form): retorna false se inválido e true se válido; contém comentário indicando o ponto de integração.
- Handler submit: ponto para configurar o cenário real (action HTTPS e POST ou API). Repetir validações no servidor. O formulário envia atualmente o cedente com máscara; normalize no servidor ou na integração conforme o contrato da rota.
- assets/client-area.css: estilos do formulário, herdando as cores do modelo.
- Olhinho dentro do campo: botão acessível para exibir/ocultar senha; fechar o dialog apaga os campos e volta a ocultar a senha.

Não há autenticação implementada. Não há transmissão nem armazenamento de credenciais pelo código do projeto. O botão é habilitado pelo JS para evitar envio acidental sem o script. Teste com dados fictícios. Validação de dígitos verificadores não consulta cadastro nem comprova titularidade.

## Conteúdo demonstrativo

O formulário de contato também não envia dados. Downloads são exemplos TXT. Antes de uso comercial, personalizar a empresa, revisar textos e documentos, configurar os canais reais, substituir a nota de privacidade e revisar noindex, domínio, URLs canônicas e sitemap.

## Referência técnica

Algoritmo do CNPJ alfanumérico: https://www.gov.br/receitafederal/pt-br/centrais-de-conteudo/publicacoes/documentos-tecnicos/cnpj/manual-dv-cnpj.pdf
