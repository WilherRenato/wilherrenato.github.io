# Moeda Contabilidade

Modelo fictício para escritório contábil. HTML, CSS, JavaScript e ilustração SVG local. Sem banco, backend ou dependências de produção. Nove páginas: início, escritório, serviços, segmentos, conteúdos, dois artigos, contato e privacidade.

## Edição

Abra a pasta no Visual Studio Code. HTML: conteúdo. assets/style.css: visual e cores nas variáveis iniciais. assets/main.js: menu, navegação de serviços e formulário de contato. Todos os arquivos estão indentados com dois espaços. Recursos e links relativos permitem servir em subpasta no IIS.

## Área do cliente

assets/client-area.js contém máscara CPF/CNPJ, validação de dígitos (incluindo CNPJ alfanumérico), usuário obrigatório com até 50 caracteres e senha obrigatória. O formulário não tem action. validateClientLogin(form) retorna true após validar e contém o comentário para inserir a integração.

O handler de submit bloqueia o envio enquanto a rota não estiver configurada. Adapte para POST HTTPS ou API conforme o sistema ASP clássico. Repita as validações no servidor. Credenciais não são transmitidas nem armazenadas pelo código do projeto. Fechar o dialog limpa os campos e oculta a senha. No modelo contábil o campo do cedente aparece como “Empresa ou titular”, preservando o name="cedente" para integração.

## Conteúdos e publicação

Serviços, perfis e artigos são demonstrativos. Substitua por informações verificadas do escritório, incluindo equipe e registros profissionais quando aplicáveis. Não há depoimentos ou resultados inventados. Os artigos não contêm alíquotas nem prazos legais. O formulário de contato também não envia dados. Os metadados noindex devem ser revisados antes do lançamento real, junto com privacidade, domínio, URLs canônicas e sitemap.

O seletor de serviços na página inicial funciona por clique e por teclado (setas, Home e End). Sem JS, todos os serviços continuam disponíveis na página servicos.html.
