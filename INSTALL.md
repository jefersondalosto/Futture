# 🚀 INSTALAÇÃO RÁPIDA

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
