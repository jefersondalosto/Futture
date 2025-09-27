# Criar o arquivo admin.js para a lógica administrativa
admin_js = '''// Admin Panel Logic
class AdminPanel {
    constructor() {
        this.data = this.loadData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderAllSections();
    }

    loadData() {
        const stored = localStorage.getItem('solar_calculator_data');
        if (stored) {
            return JSON.parse(stored);
        }
        return this.getDefaultData();
    }

    saveData() {
        localStorage.setItem('solar_calculator_data', JSON.stringify(this.data));
        this.showNotification('Dados salvos com sucesso!', 'success');
    }

    getDefaultData() {
        return {
            cidades: {
                "Alegrete-RS": 4.4,
                "Belo Horizonte-MG": 4.5,
                "Bossoroca-RS": 4.0,
                "Brasília-DF": 4.8,
                "Capão do Cipó-RS": 4.0,
                "Itacurubi-RS": 4.1,
                "Jaguari-RS": 4.1,
                "Jóia-RS": 4.2,
                "Nova Esperança do Sul-RS": 4.1,
                "Rio de Janeiro-RJ": 4.4,
                "Santiago-RS": 4.3,
                "São Borja-RS": 4.3,
                "São Francisco de Assis-RS": 4.2,
                "São Luiz Gonzaga-RS": 4.2,
                "São Paulo-SP": 4.2,
                "Unistalda-RS": 4.3
            },
            paineis: {
                "560W": 320.00,
                "585W": 350.00,
                "610W": 380.00,
                "700W": 450.00
            },
            estruturas: {
                "Estrutura para Solo": 85.00,
                "Estrutura para Brasilite": 65.00,
                "Estrutura para Zinco": 55.00,
                "Estrutura para Telha": 75.00
            },
            inversores: {
                "Inversor 5kW On-Grid": {
                    preco: 1800.00,
                    min_paineis: 9,
                    max_paineis: 16
                },
                "Inversor 3kW On-Grid": {
                    preco: 1200.00,
                    min_paineis: 5,
                    max_paineis: 8
                },
                "Inversor 10kW On-Grid": {
                    preco: 3200.00,
                    min_paineis: 17,
                    max_paineis: 30
                }
            },
            materiais: {
                "Cabo Solar 4mm²": { preco: 8.50, unidade: "metro", quantidade_base: 50 },
                "Cabo Solar 6mm²": { preco: 12.00, unidade: "metro", quantidade_base: 30 },
                "Conector MC4": { preco: 12.00, unidade: "par", quantidade_base: 6 },
                "Fusível MC4 15A": { preco: 25.00, unidade: "unidade", quantidade_base: 2 },
                "Conector Y MC4": { preco: 18.00, unidade: "unidade", quantidade_base: 4 },
                "String Box CC/CA": { preco: 450.00, unidade: "unidade", quantidade_base: 1 },
                "Disjuntor CC 32A": { preco: 85.00, unidade: "unidade", quantidade_base: 1 },
                "Disjuntor CA 40A": { preco: 65.00, unidade: "unidade", quantidade_base: 1 },
                "DPS CC 1000V": { preco: 120.00, unidade: "unidade", quantidade_base: 1 },
                "DPS CA 275V": { preco: 95.00, unidade: "unidade", quantidade_base: 1 },
                "Eletroduto Corrugado 25mm": { preco: 3.20, unidade: "metro", quantidade_base: 20 },
                "Eletroduto Rígido 25mm": { preco: 4.50, unidade: "metro", quantidade_base: 15 },
                "Abraçadeira Plástica": { preco: 0.50, unidade: "unidade", quantidade_base: 50 },
                "Canaleta 20x12mm": { preco: 6.80, unidade: "metro", quantidade_base: 10 },
                "Medidor Bidirecional": { preco: 320.00, unidade: "unidade", quantidade_base: 1 },
                "Transformador de Corrente": { preco: 45.00, unidade: "unidade", quantidade_base: 1 },
                "Sistema de Monitoramento WiFi": { preco: 280.00, unidade: "unidade", quantidade_base: 1 },
                "Parafuso Autoperfurante": { preco: 2.50, unidade: "unidade", quantidade_base: 20 },
                "Vedante Telhado": { preco: 8.00, unidade: "unidade", quantidade_base: 12 },
                "Terminal Cabo 6mm²": { preco: 3.50, unidade: "unidade", quantidade_base: 10 },
                "Fita Isolante": { preco: 12.00, unidade: "unidade", quantidade_base: 3 },
                "Haste de Aterramento 2,5m": { preco: 45.00, unidade: "unidade", quantidade_base: 1 },
                "Cabo de Aterramento 16mm²": { preco: 15.00, unidade: "metro", quantidade_base: 10 },
                "Conector de Aterramento": { preco: 8.50, unidade: "unidade", quantidade_base: 3 }
            },
            configuracoes: {
                tarifa_energia: 0.78,
                eficiencia_sistema: 0.85,
                reajuste_anual_tarifa: 0.08,
                vida_util_sistema: 25,
                degradacao_anual: 0.005
            }
        };
    }

    setupEventListeners() {
        // Tab navigation
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Back button
        document.getElementById('back-btn').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Add buttons
        document.getElementById('add-cidade').addEventListener('click', () => this.addItem('cidades'));
        document.getElementById('add-painel').addEventListener('click', () => this.addItem('paineis'));
        document.getElementById('add-estrutura').addEventListener('click', () => this.addItem('estruturas'));
        document.getElementById('add-inversor').addEventListener('click', () => this.addItem('inversores'));
        document.getElementById('add-material').addEventListener('click', () => this.addItem('materiais'));

        // Config save
        document.getElementById('save-config').addEventListener('click', () => this.saveConfigurations());

        // Data management
        document.getElementById('export-data').addEventListener('click', () => this.exportData());
        document.getElementById('import-data').addEventListener('click', () => this.importData());
        document.getElementById('reset-data').addEventListener('click', () => this.resetData());
        document.getElementById('import-file').addEventListener('change', (e) => this.handleFileImport(e));
    }

    switchTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        document.getElementById(tabId).classList.add('active');
    }

    renderAllSections() {
        this.renderCidades();
        this.renderPaineis();
        this.renderEstruturas();
        this.renderInversores();
        this.renderMateriais();
        this.renderConfiguracoes();
    }

    renderCidades() {
        const container = document.getElementById('cidades-list');
        container.innerHTML = '';
        
        Object.entries(this.data.cidades).forEach(([nome, irradiacao]) => {
            const item = this.createEditableItem('cidade', nome, irradiacao, 'kWh/kWp/dia');
            container.appendChild(item);
        });
    }

    renderPaineis() {
        const container = document.getElementById('paineis-list');
        container.innerHTML = '';
        
        Object.entries(this.data.paineis).forEach(([potencia, preco]) => {
            const item = this.createEditableItem('painel', potencia, preco, 'R$');
            container.appendChild(item);
        });
    }

    renderEstruturas() {
        const container = document.getElementById('estruturas-list');
        container.innerHTML = '';
        
        Object.entries(this.data.estruturas).forEach(([tipo, preco]) => {
            const item = this.createEditableItem('estrutura', tipo, preco, 'R$/painel');
            container.appendChild(item);
        });
    }

    renderInversores() {
        const container = document.getElementById('inversores-list');
        container.innerHTML = '';
        
        Object.entries(this.data.inversores).forEach(([modelo, data]) => {
            const item = this.createInversorItem(modelo, data);
            container.appendChild(item);
        });
    }

    renderMateriais() {
        const container = document.getElementById('materiais-list');
        container.innerHTML = '';
        
        Object.entries(this.data.materiais).forEach(([nome, data]) => {
            const item = this.createMaterialItem(nome, data);
            container.appendChild(item);
        });
    }

    renderConfiguracoes() {
        const config = this.data.configuracoes;
        document.getElementById('tarifa-energia').value = config.tarifa_energia;
        document.getElementById('eficiencia-sistema').value = config.eficiencia_sistema * 100;
        document.getElementById('reajuste-anual').value = config.reajuste_anual_tarifa * 100;
        document.getElementById('vida-util').value = config.vida_util_sistema;
    }

    createEditableItem(type, name, value, unit) {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <div class="item-content">
                <input type="text" class="item-name" value="${name}" data-original="${name}">
                <div class="item-value">
                    <input type="number" class="item-price" value="${value}" step="0.01">
                    <span class="unit">${unit}</span>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn-small btn--primary" onclick="adminPanel.saveItem('${type}', this)">Salvar</button>
                <button class="btn-small btn--danger" onclick="adminPanel.deleteItem('${type}', '${name}', this)">Excluir</button>
            </div>
        `;
        return div;
    }

    createInversorItem(modelo, data) {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <div class="item-content">
                <input type="text" class="item-name" value="${modelo}" data-original="${modelo}">
                <div class="inversor-details">
                    <div class="detail-group">
                        <label>Preço (R$):</label>
                        <input type="number" class="inversor-preco" value="${data.preco}" step="0.01">
                    </div>
                    <div class="detail-group">
                        <label>Min Painéis:</label>
                        <input type="number" class="inversor-min" value="${data.min_paineis}">
                    </div>
                    <div class="detail-group">
                        <label>Max Painéis:</label>
                        <input type="number" class="inversor-max" value="${data.max_paineis}">
                    </div>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn-small btn--primary" onclick="adminPanel.saveInversor('${modelo}', this)">Salvar</button>
                <button class="btn-small btn--danger" onclick="adminPanel.deleteItem('inversores', '${modelo}', this)">Excluir</button>
            </div>
        `;
        return div;
    }

    createMaterialItem(nome, data) {
        const div = document.createElement('div');
        div.className = 'admin-item';
        div.innerHTML = `
            <div class="item-content">
                <input type="text" class="item-name" value="${nome}" data-original="${nome}">
                <div class="material-details">
                    <div class="detail-group">
                        <label>Preço:</label>
                        <input type="number" class="material-preco" value="${data.preco}" step="0.01">
                    </div>
                    <div class="detail-group">
                        <label>Unidade:</label>
                        <input type="text" class="material-unidade" value="${data.unidade}">
                    </div>
                    <div class="detail-group">
                        <label>Qtd Base:</label>
                        <input type="number" class="material-quantidade" value="${data.quantidade_base}">
                    </div>
                </div>
            </div>
            <div class="item-actions">
                <button class="btn-small btn--primary" onclick="adminPanel.saveMaterial('${nome}', this)">Salvar</button>
                <button class="btn-small btn--danger" onclick="adminPanel.deleteItem('materiais', '${nome}', this)">Excluir</button>
            </div>
        `;
        return div;
    }

    addItem(type) {
        let newItem = '';
        let defaultValue = '';
        
        switch(type) {
            case 'cidades':
                newItem = prompt('Nome da cidade (formato: Cidade-UF):');
                defaultValue = prompt('Irradiação solar (kWh/kWp/dia):') || 4.0;
                if (newItem) this.data.cidades[newItem] = parseFloat(defaultValue);
                break;
            case 'paineis':
                newItem = prompt('Potência do painel (ex: 580W):');
                defaultValue = prompt('Preço (R$):') || 350.00;
                if (newItem) this.data.paineis[newItem] = parseFloat(defaultValue);
                break;
            case 'estruturas':
                newItem = prompt('Tipo de estrutura:');
                defaultValue = prompt('Preço por painel (R$):') || 70.00;
                if (newItem) this.data.estruturas[newItem] = parseFloat(defaultValue);
                break;
            case 'inversores':
                newItem = prompt('Modelo do inversor:');
                if (newItem) {
                    const preco = parseFloat(prompt('Preço (R$):') || 1500);
                    const min = parseInt(prompt('Mínimo de painéis:') || 5);
                    const max = parseInt(prompt('Máximo de painéis:') || 15);
                    this.data.inversores[newItem] = { preco, min_paineis: min, max_paineis: max };
                }
                break;
            case 'materiais':
                newItem = prompt('Nome do material:');
                if (newItem) {
                    const preco = parseFloat(prompt('Preço:') || 10);
                    const unidade = prompt('Unidade:') || 'unidade';
                    const quantidade = parseInt(prompt('Quantidade base:') || 1);
                    this.data.materiais[newItem] = { preco, unidade, quantidade_base: quantidade };
                }
                break;
        }
        
        if (newItem) {
            this.saveData();
            this.renderAllSections();
        }
    }

    saveItem(type, button) {
        const item = button.closest('.admin-item');
        const originalName = item.querySelector('.item-name').dataset.original;
        const newName = item.querySelector('.item-name').value;
        const newValue = parseFloat(item.querySelector('.item-price').value);
        
        if (originalName !== newName) {
            delete this.data[type][originalName];
        }
        this.data[type][newName] = newValue;
        
        this.saveData();
        this.renderAllSections();
    }

    saveInversor(originalModelo, button) {
        const item = button.closest('.admin-item');
        const newModelo = item.querySelector('.item-name').value;
        const preco = parseFloat(item.querySelector('.inversor-preco').value);
        const min = parseInt(item.querySelector('.inversor-min').value);
        const max = parseInt(item.querySelector('.inversor-max').value);
        
        if (originalModelo !== newModelo) {
            delete this.data.inversores[originalModelo];
        }
        
        this.data.inversores[newModelo] = {
            preco: preco,
            min_paineis: min,
            max_paineis: max
        };
        
        this.saveData();
        this.renderInversores();
    }

    saveMaterial(originalNome, button) {
        const item = button.closest('.admin-item');
        const newNome = item.querySelector('.item-name').value;
        const preco = parseFloat(item.querySelector('.material-preco').value);
        const unidade = item.querySelector('.material-unidade').value;
        const quantidade = parseInt(item.querySelector('.material-quantidade').value);
        
        if (originalNome !== newNome) {
            delete this.data.materiais[originalNome];
        }
        
        this.data.materiais[newNome] = {
            preco: preco,
            unidade: unidade,
            quantidade_base: quantidade
        };
        
        this.saveData();
        this.renderMateriais();
    }

    deleteItem(type, name, button) {
        if (confirm(`Tem certeza que deseja excluir "${name}"?`)) {
            delete this.data[type][name];
            this.saveData();
            button.closest('.admin-item').remove();
        }
    }

    saveConfigurations() {
        this.data.configuracoes = {
            tarifa_energia: parseFloat(document.getElementById('tarifa-energia').value),
            eficiencia_sistema: parseFloat(document.getElementById('eficiencia-sistema').value) / 100,
            reajuste_anual_tarifa: parseFloat(document.getElementById('reajuste-anual').value) / 100,
            vida_util_sistema: parseInt(document.getElementById('vida-util').value),
            degradacao_anual: 0.005
        };
        this.saveData();
        this.showNotification('Configurações salvas!', 'success');
    }

    exportData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'solar_calculator_data.json';
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Dados exportados!', 'success');
    }

    importData() {
        document.getElementById('import-file').click();
    }

    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                this.data = importedData;
                this.saveData();
                this.renderAllSections();
                this.showNotification('Dados importados com sucesso!', 'success');
            } catch (error) {
                this.showNotification('Erro ao importar dados!', 'error');
            }
        };
        reader.readAsText(file);
    }

    resetData() {
        if (confirm('Tem certeza que deseja resetar todos os dados para o padrão? Esta ação não pode ser desfeita.')) {
            this.data = this.getDefaultData();
            this.saveData();
            this.renderAllSections();
            this.showNotification('Dados resetados para padrão!', 'success');
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('notification--show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});'''

with open('admin.js', 'w', encoding='utf-8') as f:
    f.write(admin_js)

print("✅ admin.js criado com sucesso!")