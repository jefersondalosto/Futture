# Criar arquivo de configuração personalizada para facilitar customização
config_template = '''/*
 * ARQUIVO DE CONFIGURAÇÃO PERSONALIZADA
 * 
 * Este arquivo contém todas as configurações que você pode modificar
 * para personalizar a calculadora solar com os dados da sua empresa.
 * 
 * Após editar este arquivo, substitua os valores correspondentes nos arquivos:
 * - app.js (linha ~70)
 * - database.js (linha ~45)
 */

const CUSTOM_CONFIG = {
    // DADOS DA EMPRESA
    empresa: {
        nome: "SUA EMPRESA AQUI",
        endereco: "Seu endereço completo",
        telefone: "(xx) xxxxx-xxxx",
        email: "contato@suaempresa.com.br",
        cnpj: "xx.xxx.xxx/xxxx-xx",
        website: "www.suaempresa.com.br"
    },

    // CONFIGURAÇÕES TÉCNICAS
    configuracoes: {
        tarifa_energia: 0.85,           // R$/kWh - Ajustar conforme sua região
        eficiencia_sistema: 0.85,      // 85% de eficiência padrão
        reajuste_anual_tarifa: 0.08,   // 8% ao ano (histórico brasileiro)
        vida_util_sistema: 25,         // Anos de vida útil
        degradacao_anual: 0.005        // 0.5% ao ano de degradação dos painéis
    },

    // PERCENTUAIS PADRÃO
    percentuais_default: {
        impostos: 12,           // % de impostos
        mao_obra: 25,          // % de mão de obra
        deslocamento: 8        // % de deslocamento
    },

    // ADICIONE SUAS CIDADES AQUI
    // Formato: "Nome-UF": irradiacao_em_kWh_por_kWp_por_dia
    cidades_personalizadas: {
        "Sua Cidade-UF": 4.2,
        // Adicione mais cidades conforme necessário
    },

    // SEUS PAINÉIS DISPONÍVEIS
    // Formato: "Potencia": preco
    paineis_personalizados: {
        "550W": 310.00,
        "600W": 370.00,
        // Adicione mais painéis conforme seu estoque
    },

    // SUAS ESTRUTURAS DISPONÍVEIS
    // Formato: "Tipo": preco_por_painel
    estruturas_personalizadas: {
        "Estrutura Personalizada": 80.00,
        // Adicione suas estruturas
    },

    // SEUS INVERSORES DISPONÍVEIS
    // Formato: "Modelo": { preco, min_paineis, max_paineis }
    inversores_personalizados: {
        "Seu Inversor 6kW": {
            preco: 2100.00,
            min_paineis: 10,
            max_paineis: 18
        },
        // Adicione mais inversores
    },

    // SEUS MATERIAIS ADICIONAIS
    // Formato: "Nome": { preco, unidade, quantidade_base }
    materiais_personalizados: {
        "Seu Material Especial": { 
            preco: 25.00, 
            unidade: "unidade", 
            quantidade_base: 1 
        },
        // Adicione mais materiais
    },

    // CONFIGURAÇÕES DE APARÊNCIA
    tema: {
        cor_primaria: "#1e3a8a",      // Azul escuro
        cor_secundaria: "#64748b",     // Cinza
        cor_sucesso: "#059669",        // Verde
        cor_erro: "#dc2626",           // Vermelho
        cor_aviso: "#d97706"           // Laranja
    },

    // CONFIGURAÇÕES DE PDF
    pdf: {
        incluir_logo: true,            // Se tem logo da empresa
        incluir_assinatura: true,      // Se inclui campo de assinatura
        incluir_termos: true,          // Se inclui termos e condições
        formato_data: "dd/mm/yyyy",    // Formato de data brasileiro
        moeda: "BRL"                   // Moeda brasileira
    },

    // TERMOS E CONDIÇÕES PERSONALIZADOS
    termos_condicoes: [
        "• Orçamento válido por 30 dias",
        "• Garantia conforme fabricante",
        "• Instalação inclusa no valor apresentado",
        // Adicione seus termos específicos
    ],

    // MENSAGENS PERSONALIZADAS
    mensagens: {
        boas_vindas: "Bem-vindo à calculadora solar da SUA EMPRESA",
        contato: "Entre em contato conosco para mais informações",
        agradecimento: "Obrigado por escolher energia solar!"
    }
};

/*
 * INSTRUÇÕES DE USO:
 * 
 * 1. Edite os valores acima com os dados da sua empresa
 * 2. Salve este arquivo como 'config.js'
 * 3. Inclua <script src="config.js"></script> no seu HTML
 * 4. Modifique app.js para usar estas configurações
 * 
 * EXEMPLO DE IMPLEMENTAÇÃO NO APP.JS:
 * 
 * // No início do app.js, após carregar config.js:
 * if (typeof CUSTOM_CONFIG !== 'undefined') {
 *     // Mesclar configurações personalizadas
 *     Object.assign(DEFAULT_DATA, CUSTOM_CONFIG);
 * }
 * 
 * CORES PERSONALIZADAS NO CSS:
 * 
 * Adicione no início do style.css:
 * :root {
 *   --color-primary: [CUSTOM_CONFIG.tema.cor_primaria];
 *   --color-secondary: [CUSTOM_CONFIG.tema.cor_secundaria];
 * }
 */
'''

with open('config-template.js', 'w', encoding='utf-8') as f:
    f.write(config_template)

print("✅ Template de configuração criado!")

# Criar um arquivo de instruções de instalação simples
install_instructions = '''# 🚀 INSTALAÇÃO RÁPIDA

## Opção 1: GitHub Pages (Recomendado)

1. **Criar conta no GitHub** (se não tiver)
2. **Fazer fork deste repositório**
3. **Ativar GitHub Pages**:
   - Ir em Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
4. **Aguardar deploy** (alguns minutos)
5. **Acessar**: https://seuusuario.github.io/calculadora-solar

## Opção 2: Servidor Local

```bash
# Baixar os arquivos
git clone [URL-DO-REPOSITORIO]
cd calculadora-solar

# Iniciar servidor (escolha um):
python -m http.server 8000
# OU
php -S localhost:8000
# OU
npm install -g http-server && http-server
```

## Opção 3: Hospedagem Própria

1. Baixar todos os arquivos
2. Fazer upload para seu servidor web
3. Certificar que index.html está na raiz
4. Acessar pelo seu domínio

## ⚙️ Personalização

1. Editar `config-template.js` com seus dados
2. Renomear para `config.js`
3. Incluir no HTML: `<script src="config.js"></script>`
4. Usar painel Admin para ajustar produtos

## 🆘 Problemas Comuns

**Erro de CORS**: Use servidor HTTP, não abra arquivo diretamente
**PDFs não funcionam**: Verifique se jsPDF foi carregado
**Dados não salvam**: Verifique se localStorage está habilitado

## 📞 Suporte

- Abrir issue no GitHub
- Consultar documentação completa no README.md
'''

with open('INSTALL.md', 'w', encoding='utf-8') as f:
    f.write(install_instructions)

print("✅ Instruções de instalação criadas!")

# Listar todos os arquivos criados
print("\n📁 ARQUIVOS CRIADOS:")
print("="*50)
files_created = [
    "admin.html - Interface administrativa",
    "admin.js - Lógica do painel admin", 
    "database.js - Gerenciamento de dados",
    "pdf-generator.js - Geração de PDFs",
    "README.md - Documentação completa",
    "package.json - Configuração Node.js",
    "setup.sh - Script de instalação",
    ".gitignore - Arquivos ignorados pelo Git",
    ".github/workflows/deploy.yml - GitHub Actions",
    "config-template.js - Template de configuração",
    "INSTALL.md - Instruções rápidas"
]

for file in files_created:
    print(f"✅ {file}")

print("\n🎯 PRÓXIMOS PASSOS:")
print("1. Baixe todos os arquivos criados")
print("2. Coloque junto com a aplicação original")
print("3. Siga as instruções no README.md")
print("4. Use o painel Admin para personalizar")
print("5. Hospede online para acesso público")