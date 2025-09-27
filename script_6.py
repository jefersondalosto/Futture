# Criar arquivo de configuração do GitHub Actions para deploy automático
github_actions = '''name: Deploy Solar Calculator

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        npm install -g http-server
        
    - name: Test application
      run: |
        # Verificar se todos os arquivos necessários existem
        test -f index.html || exit 1
        test -f admin.html || exit 1
        test -f style.css || exit 1
        test -f app.js || exit 1
        test -f admin.js || exit 1
        test -f database.js || exit 1
        test -f pdf-generator.js || exit 1
        
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: .
        force_orphan: true
'''

# Criar diretório .github/workflows se não existir
import os
os.makedirs('.github/workflows', exist_ok=True)

with open('.github/workflows/deploy.yml', 'w', encoding='utf-8') as f:
    f.write(github_actions)

print("✅ GitHub Actions configurado!")

# Criar script de setup/instalação
setup_script = '''#!/bin/bash

# Script de Setup - Calculadora Solar Profissional
# Este script ajuda a configurar o projeto para hospedagem

echo "🌞 Configurando Calculadora Solar Profissional..."

# Verificar se todos os arquivos necessários existem
FILES=("index.html" "admin.html" "style.css" "app.js" "admin.js" "database.js" "pdf-generator.js")

echo "📁 Verificando arquivos do projeto..."
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file encontrado"
    else
        echo "❌ $file não encontrado!"
        exit 1
    fi
done

# Verificar se Node.js está instalado (opcional)
if command -v node &> /dev/null; then
    echo "✅ Node.js encontrado: $(node --version)"
    
    # Instalar dependências se package.json existir
    if [ -f "package.json" ]; then
        echo "📦 Instalando dependências..."
        npm install
    fi
    
    echo "🚀 Para iniciar o servidor local, execute:"
    echo "   npm start"
    echo ""
else
    echo "⚠️  Node.js não encontrado (opcional)"
fi

# Verificar se Python está instalado (alternativa)
if command -v python3 &> /dev/null; then
    echo "✅ Python3 encontrado: $(python3 --version)"
    echo "🐍 Para iniciar com Python, execute:"
    echo "   python3 -m http.server 8000"
    echo ""
elif command -v python &> /dev/null; then
    echo "✅ Python encontrado: $(python --version)"
    echo "🐍 Para iniciar com Python, execute:"
    echo "   python -m http.server 8000"
    echo ""
fi

echo "🎯 Configuração concluída com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Para teste local: abra um servidor HTTP na pasta do projeto"
echo "2. Para GitHub Pages: faça push para o repositório e ative Pages nas configurações"
echo "3. Para servidor próprio: faça upload dos arquivos para seu hosting"
echo ""
echo "🔗 Acesse o README.md para instruções detalhadas"
echo ""
echo "✨ Boa sorte com sua calculadora solar!"
'''

with open('setup.sh', 'w', encoding='utf-8') as f:
    f.write(setup_script)

# Tornar o script executável (no Unix)
import stat
os.chmod('setup.sh', stat.S_IRWXU | stat.S_IRGRP | stat.S_IROTH)

print("✅ Script de setup criado!")

# Criar arquivo .gitignore
gitignore_content = '''# Logs
*.log
npm-debug.log*

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs
lib-cov

# Coverage directory used by tools like istanbul
coverage

# Grunt intermediate storage
.grunt

# node_modules (se usar npm)
node_modules

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Arquivos do sistema
.DS_Store
Thumbs.db

# Arquivos de backup
*.bak
*.backup
*.old

# Arquivos temporários
*.tmp
*.temp

# IDEs
.vscode/
.idea/
*.swp
*.swo

# Logs específicos da aplicação
debug.log
error.log
'''

with open('.gitignore', 'w', encoding='utf-8') as f:
    f.write(gitignore_content)

print("✅ .gitignore criado!")