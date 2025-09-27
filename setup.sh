#!/bin/bash

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
