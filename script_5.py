# Criar package.json para o projeto
package_json = '''{
  "name": "calculadora-solar-profissional",
  "version": "1.0.0",
  "description": "Aplicação web completa para gerar orçamentos profissionais de sistemas de energia solar",
  "main": "index.html",
  "scripts": {
    "start": "http-server -p 8080",
    "dev": "http-server -p 3000 -o",
    "build": "echo 'Projeto já está pronto para produção'",
    "deploy": "gh-pages -d ."
  },
  "keywords": [
    "energia-solar",
    "calculadora",
    "orçamento",
    "fotovoltaico",
    "sustentabilidade",
    "pdf-generator"
  ],
  "author": "Futture System",
  "license": "MIT",
  "devDependencies": {
    "http-server": "^14.1.1",
    "gh-pages": "^6.0.0"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/seuusuario/calculadora-solar-profissional.git"
  },
  "bugs": {
    "url": "https://github.com/seuusuario/calculadora-solar-profissional/issues"
  },
  "homepage": "https://seuusuario.github.io/calculadora-solar-profissional"
}'''

with open('package.json', 'w', encoding='utf-8') as f:
    f.write(package_json)

print("✅ package.json criado com sucesso!")