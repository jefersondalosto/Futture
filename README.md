# 🌞 Futture System - Calculadora Solar Profissional

Uma aplicação web completa para gerar orçamentos profissionais de sistemas de energia solar, com funcionalidades avançadas de administração e geração de PDFs.

![Calculadora Solar](https://img.shields.io/badge/Solar-Calculator-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Características Principais

### 🎯 Funcionalidades Principais
- **Calculadora Profissional**: Interface completa para configuração de sistemas solares
- **Geração de PDF**: Relatórios profissionais prontos para impressão
- **Painel Administrativo**: Sistema completo para gerenciar produtos e preços
- **Banco de Dados Editável**: Todos os dados podem ser modificados via interface
- **Backup/Restore**: Sistema de backup automático e manual
- **Responsivo**: Funciona perfeitamente em desktop e mobile

### 📊 Cálculos Automáticos
- Potência do sistema baseada nos painéis selecionados
- Geração energética por localização (irradiação solar)
- Análise financeira de 25 anos com ROI e payback
- Cálculo de materiais necessários
- Impostos, mão de obra e deslocamento configuráveis

### 🔧 Sistema Administrativo
- Gerenciar cidades e valores de irradiação solar
- Configurar painéis solares e preços
- Definir tipos de estrutura e custos
- Cadastrar inversores com faixas de painéis
- Gerenciar lista completa de materiais
- Configurações gerais do sistema

## 🚀 Como Usar

### Opção 1: Hospedagem Online (GitHub Pages)

1. **Fork este repositório**
2. **Ative o GitHub Pages**:
   - Vá em Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
3. **Acesse sua calculadora**: `https://seuusuario.github.io/nome-do-repo`

### Opção 2: Hospedagem Local

1. **Clone ou baixe os arquivos**
```bash
git clone https://github.com/seuusuario/calculadora-solar.git
cd calculadora-solar
```

2. **Instale um servidor local** (qualquer uma das opções):

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

3. **Acesse no navegador**: `http://localhost:8000`

### Opção 3: Upload para Servidor Web

1. Faça upload de todos os arquivos para seu servidor web
2. Certifique-se de que o `index.html` está na raiz
3. Acesse através do seu domínio

## 📁 Estrutura de Arquivos

```
calculadora-solar/
│
├── index.html          # Interface principal da calculadora
├── admin.html          # Painel administrativo
├── style.css           # Estilos principais
├── app.js              # Lógica da calculadora principal
├── admin.js            # Lógica do painel administrativo
├── database.js         # Gerenciamento de banco de dados
├── pdf-generator.js    # Geração de PDFs profissionais
└── README.md           # Este arquivo
```

## 🛠️ Como Usar a Aplicação

### 1. Interface Principal

**Base de Cálculo**:
- Selecione a cidade para cálculo de irradiação
- Escolha o tipo e quantidade de painéis
- Configure o tipo de estrutura
- Ajuste percentuais de impostos, mão de obra e deslocamento

**Dados do Cliente**:
- Preencha informações do cliente
- Insira o consumo mensal em kWh

**Análise Financeira**:
- Visualize projeções de 25 anos
- Analise ROI, payback e economia total
- Veja impacto ambiental

**Finalizar Orçamento**:
- Revise todas as configurações
- Gere PDF profissional do orçamento

### 2. Painel Administrativo

Acesse através do botão "🔧 Admin" no header da aplicação principal.

**Gerenciar Dados**:
- **Cidades**: Adicione/edite cidades e valores de irradiação
- **Painéis**: Configure potências e preços dos painéis
- **Estruturas**: Defina tipos de estrutura e custos
- **Inversores**: Cadastre modelos com faixas de painéis
- **Materiais**: Gerencie lista completa de materiais

**Configurações**:
- Tarifa de energia elétrica
- Eficiência do sistema
- Reajuste anual da tarifa
- Vida útil do sistema

**Backup/Restore**:
- Exportar dados em JSON
- Importar configurações
- Resetar para padrão

## 🎨 Personalização

### Modificar Empresa
Edite os dados da empresa no arquivo `app.js`:

```javascript
empresa: {
    nome: "Sua Empresa",
    endereco: "Seu Endereço",
    telefone: "(xx) xxxxx-xxxx",
    email: "seu@email.com",
    cnpj: "xx.xxx.xxx/xxxx-xx"
}
```

### Cores e Visual
Modifique as variáveis CSS no `style.css`:

```css
:root {
  --color-primary: #1e3a8a; /* Azul principal */
  --color-secondary: #64748b; /* Cinza secundário */
  /* ... outras cores */
}
```

### Adicionar Novos Materiais
Use o painel administrativo ou edite diretamente no código:

```javascript
materiais: {
    "Novo Material": { 
        preco: 100.00, 
        unidade: "unidade", 
        quantidade_base: 1 
    }
}
```

## 📋 Requisitos

- **Navegador moderno** (Chrome, Firefox, Safari, Edge)
- **JavaScript habilitado**
- **Servidor web** (para hospedagem online)
- **LocalStorage** (para persistência de dados)

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura da aplicação
- **CSS3**: Estilos e responsividade
- **Vanilla JavaScript**: Lógica da aplicação
- **jsPDF**: Geração de documentos PDF
- **Chart.js**: Gráficos e visualizações
- **LocalStorage**: Armazenamento local de dados

## 📊 Funcionalidades dos PDFs

Os PDFs gerados incluem:

### Relatório Básico
- Dados do cliente e sistema
- Tabela detalhada de materiais e custos
- Análise financeira resumida
- Condições comerciais

### Relatório Completo
- Capa profissional
- Análise mensal detalhada
- Gráficos de projeção
- Impacto ambiental
- Termos e condições completos

## 🔒 Segurança e Dados

- **Dados Locais**: Todas as informações ficam no navegador do usuário
- **Sem Servidor**: Não há envio de dados para servidores externos
- **Backup Automático**: Sistema cria backups automáticos das configurações
- **Validação**: Validação completa de todos os dados inseridos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- Abra uma issue no GitHub
- Entre em contato: contato@futturesystem.com.br

## 🎯 Roadmap

### Versão 1.1
- [ ] Integração com APIs de cotação
- [ ] Sistema de usuários
- [ ] Templates de PDF personalizáveis
- [ ] Exportação para Excel

### Versão 1.2
- [ ] Modo escuro
- [ ] Múltiplos idiomas
- [ ] Sistema de notificações
- [ ] Relatórios analíticos avançados

---

**Desenvolvido com ❤️ para o mercado de energia solar brasileiro**

![Solar Energy](https://img.shields.io/badge/Energia-Solar-green?style=for-the-badge)
