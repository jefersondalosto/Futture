# Criar o arquivo database.js para gerenciamento de dados
database_js = '''// Database Management System
class DatabaseManager {
    constructor() {
        this.storageKey = 'solar_calculator_data';
        this.backupKey = 'solar_calculator_backup';
        this.versionKey = 'solar_calculator_version';
        this.currentVersion = '1.0.0';
        this.init();
    }

    init() {
        this.migrateData();
        this.createBackup();
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
            },
            empresa: {
                nome: "Futture System",
                endereco: "R. Cel. José Antônio de Moura, 404 - Vila Rica, Santiago - RS, 97716-018",
                telefone: "(55) 99999-9999",
                email: "contato@futturesystem.com.br",
                cnpj: "00.000.000/0001-00",
                website: "www.futturesystem.com.br"
            }
        };
    }

    loadData() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                return this.validateData(data) ? data : this.getDefaultData();
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
        return this.getDefaultData();
    }

    saveData(data) {
        try {
            if (this.validateData(data)) {
                localStorage.setItem(this.storageKey, JSON.stringify(data));
                localStorage.setItem(this.versionKey, this.currentVersion);
                return true;
            } else {
                console.error('Dados inválidos, não foi possível salvar');
                return false;
            }
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    }

    validateData(data) {
        const requiredSections = ['cidades', 'paineis', 'estruturas', 'inversores', 'materiais', 'configuracoes'];
        
        if (!data || typeof data !== 'object') return false;
        
        for (const section of requiredSections) {
            if (!data[section] || typeof data[section] !== 'object') {
                console.error(`Seção obrigatória ausente ou inválida: ${section}`);
                return false;
            }
        }

        // Validar estrutura específica dos inversores
        for (const [nome, inversor] of Object.entries(data.inversores)) {
            if (!inversor.preco || !inversor.min_paineis || !inversor.max_paineis) {
                console.error(`Estrutura de inversor inválida: ${nome}`);
                return false;
            }
        }

        // Validar estrutura específica dos materiais
        for (const [nome, material] of Object.entries(data.materiais)) {
            if (!material.preco || !material.unidade || material.quantidade_base === undefined) {
                console.error(`Estrutura de material inválida: ${nome}`);
                return false;
            }
        }

        return true;
    }

    createBackup() {
        try {
            const currentData = this.loadData();
            const backup = {
                data: currentData,
                timestamp: new Date().toISOString(),
                version: this.currentVersion
            };
            localStorage.setItem(this.backupKey, JSON.stringify(backup));
        } catch (error) {
            console.error('Erro ao criar backup:', error);
        }
    }

    restoreBackup() {
        try {
            const backup = localStorage.getItem(this.backupKey);
            if (backup) {
                const backupData = JSON.parse(backup);
                if (this.validateData(backupData.data)) {
                    this.saveData(backupData.data);
                    return backupData.data;
                }
            }
        } catch (error) {
            console.error('Erro ao restaurar backup:', error);
        }
        return null;
    }

    migrateData() {
        const version = localStorage.getItem(this.versionKey);
        if (!version || version !== this.currentVersion) {
            console.log('Migrando dados para nova versão...');
            const currentData = this.loadData();
            const defaultData = this.getDefaultData();
            
            // Merge com dados padrão para garantir que novas configurações sejam adicionadas
            const migratedData = this.deepMerge(defaultData, currentData);
            
            this.saveData(migratedData);
        }
    }

    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(result[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }

    exportData() {
        const data = this.loadData();
        const exportData = {
            ...data,
            export_info: {
                version: this.currentVersion,
                timestamp: new Date().toISOString(),
                software: 'Futture System Solar Calculator'
            }
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    importData(jsonString) {
        try {
            const importedData = JSON.parse(jsonString);
            
            // Remove informações de exportação se existirem
            if (importedData.export_info) {
                delete importedData.export_info;
            }
            
            if (this.validateData(importedData)) {
                this.saveData(importedData);
                return { success: true, message: 'Dados importados com sucesso!' };
            } else {
                return { success: false, message: 'Dados inválidos!' };
            }
        } catch (error) {
            return { success: false, message: 'Erro ao processar arquivo: ' + error.message };
        }
    }

    resetToDefault() {
        const defaultData = this.getDefaultData();
        this.saveData(defaultData);
        return defaultData;
    }

    getStats() {
        const data = this.loadData();
        return {
            cidades: Object.keys(data.cidades).length,
            paineis: Object.keys(data.paineis).length,
            estruturas: Object.keys(data.estruturas).length,
            inversores: Object.keys(data.inversores).length,
            materiais: Object.keys(data.materiais).length,
            version: this.currentVersion,
            lastModified: new Date(parseInt(localStorage.getItem(this.storageKey + '_timestamp')) || Date.now())
        };
    }
}

// Singleton instance
window.databaseManager = new DatabaseManager();'''

with open('database.js', 'w', encoding='utf-8') as f:
    f.write(database_js)

print("✅ database.js criado com sucesso!")