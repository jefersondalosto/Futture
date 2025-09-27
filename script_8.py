import zipfile
import os

# Criar um arquivo ZIP com todos os arquivos da calculadora solar
zip_filename = 'calculadora-solar-completa.zip'

# Lista de arquivos criados para incluir no ZIP
files_to_zip = [
    'admin.html',
    'admin.js', 
    'database.js',
    'pdf-generator.js',
    'README.md',
    'package.json',
    'setup.sh',
    '.gitignore',
    'config-template.js',
    'INSTALL.md'
]

# Criar o arquivo ZIP
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for file in files_to_zip:
        if os.path.exists(file):
            zipf.write(file, file)
            print(f"✅ Adicionado: {file}")
    
    # Adicionar arquivo de GitHub Actions (com estrutura de pastas)
    github_workflow_file = '.github/workflows/deploy.yml'
    if os.path.exists(github_workflow_file):
        zipf.write(github_workflow_file, github_workflow_file)
        print(f"✅ Adicionado: {github_workflow_file}")

print(f"\n🎉 Arquivo ZIP criado: {zip_filename}")
print(f"📦 Tamanho: {os.path.getsize(zip_filename) / 1024:.1f} KB")

# Verificar conteúdo do ZIP
print("\n📁 Conteúdo do ZIP:")
with zipfile.ZipFile(zip_filename, 'r') as zipf:
    for file_info in zipf.filelist:
        print(f"   📄 {file_info.filename} ({file_info.file_size} bytes)")

print(f"\n💾 Para usar a calculadora solar completa:")
print(f"1. Baixe o arquivo: {zip_filename}")
print(f"2. Extraia todos os arquivos na mesma pasta da aplicação original")
print(f"3. Abra o README.md para instruções completas")
print(f"4. Execute setup.sh (Linux/Mac) ou siga instruções manuais")
print(f"5. Use o painel Admin para personalizar com seus dados")