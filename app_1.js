// Application Database and State Management
const DEFAULT_DATA = {
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
  percentuais_default: {
    impostos: 12,
    mao_obra: 25,
    deslocamento: 8
  },
  empresa: {
    nome: "Futture System",
    endereco: "R. Cel. José Antônio de Moura, 404 - Vila Rica, Santiago - RS, 97716-018",
    telefone: "(55) 99999-9999",
    email: "contato@futturesystem.com.br",
    cnpj: "00.000.000/0001-00"
  },
  configuracoes: {
    tarifa_energia: 0.78,
    eficiencia_sistema: 0.85,
    reajuste_anual_tarifa: 0.08,
    vida_util_sistema: 25,
    degradacao_anual: 0.005
  }
};

// Application State
let appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
let calculatorState = {
  cidade: '',
  irradiacao: 0,
  tipoPainel: '',
  quantidadePaineis: 10,
  tipoEstrutura: '',
  percentualImpostos: 12,
  percentualMaoObra: 25,
  percentualDeslocamento: 8,
  cliente: {
    nome: '',
    cidade: '',
    email: '',
    telefone: '',
    consumo: 0
  },
  custos: {
    paineis: 0,
    estrutura: 0,
    inversor: 0,
    materiais: 0,
    subtotal: 0,
    impostos: 0,
    maoObra: 0,
    deslocamento: 0,
    total: 0
  }
};

// Database Management
function saveData() {
  try {
    const dataToSave = {
      ...appData,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };
    localStorage.setItem('solarCalculatorData', JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados:', error);
    return false;
  }
}

function loadData() {
  try {
    const savedData = localStorage.getItem('solarCalculatorData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      // Merge with default data to ensure all properties exist
      appData = { ...DEFAULT_DATA, ...parsed };
      return true;
    }
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
  }
  return false;
}

function resetToDefault() {
  appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
  saveData();
  showNotification('Dados resetados para o padrão com sucesso!');
  initializeApp();
}

function exportData() {
  try {
    const dataBlob = new Blob([JSON.stringify(appData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `futture-system-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Dados exportados com sucesso!');
  } catch (error) {
    console.error('Erro ao exportar dados:', error);
    showNotification('Erro ao exportar dados', 'error');
  }
}

function importData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      if (importedData && typeof importedData === 'object') {
        appData = { ...DEFAULT_DATA, ...importedData };
        saveData();
        showNotification('Dados importados com sucesso!');
        initializeApp();
      } else {
        throw new Error('Formato inválido');
      }
    } catch (error) {
      console.error('Erro ao importar dados:', error);
      showNotification('Erro: arquivo JSON inválido', 'error');
    }
  };
  reader.readAsText(file);
}

// Utility Functions
function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value || 0);
}

function formatNumber(value, decimals = 2) {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value || 0);
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const text = document.getElementById('notification-text');
  
  text.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.remove('hidden');
  
  setTimeout(() => {
    notification.classList.add('hidden');
  }, 4000);
}

function validateForm(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ff4444';
      isValid = false;
    } else {
      input.style.borderColor = '';
    }
  });

  return isValid;
}

// Validation Status Updates
function updateValidationStatus() {
  const statusCidade = document.getElementById('status-cidade');
  const statusSistema = document.getElementById('status-sistema');
  const statusCliente = document.getElementById('status-cliente');
  const statusPdf = document.getElementById('status-pdf');
  
  // Check cidade
  if (calculatorState.cidade && calculatorState.irradiacao > 0) {
    statusCidade.textContent = '✅ Selecionado';
    statusCidade.className = 'status--success';
  } else {
    statusCidade.textContent = '❌ Não selecionado';
    statusCidade.className = 'status--error';
  }
  
  // Check sistema
  if (calculatorState.tipoPainel && calculatorState.tipoEstrutura && calculatorState.quantidadePaineis > 0) {
    statusSistema.textContent = '✅ Configurado';
    statusSistema.className = 'status--success';
  } else {
    statusSistema.textContent = '❌ Incompleto';
    statusSistema.className = 'status--error';
  }
  
  // Check cliente
  if (calculatorState.cliente.nome && calculatorState.cliente.consumo > 0) {
    statusCliente.textContent = '✅ Completo';
    statusCliente.className = 'status--success';
  } else {
    statusCliente.textContent = '❌ Incompleto';
    statusCliente.className = 'status--error';
  }
  
  // Check PDF readiness
  const allValid = calculatorState.cidade && calculatorState.tipoPainel && 
                   calculatorState.tipoEstrutura && calculatorState.cliente.nome && 
                   calculatorState.cliente.consumo > 0;
  
  if (allValid) {
    statusPdf.textContent = '✅ Pronto';
    statusPdf.className = 'status--success';
  } else {
    statusPdf.textContent = '❌ Aguardando';
    statusPdf.className = 'status--error';
  }
}

// DOM Manipulation Functions
function populateSelect(selectId, options, valueKey = null, textKey = null) {
  const select = document.getElementById(selectId);
  if (!select) return;
  
  select.innerHTML = '<option value="">Selecione uma opção</option>';
  
  Object.entries(options).forEach(([key, value]) => {
    const option = document.createElement('option');
    option.value = valueKey ? value[valueKey] : key;
    option.textContent = textKey ? `${key} (${formatCurrency(value[textKey])})` : key;
    option.dataset.key = key;
    select.appendChild(option);
  });
}

function populateCidades() {
  const select = document.getElementById('cidade');
  if (!select) return;
  
  select.innerHTML = '<option value="">Selecione uma cidade</option>';
  
  Object.entries(appData.cidades).forEach(([cidade, irradiacao]) => {
    const option = document.createElement('option');
    option.value = cidade;
    option.textContent = cidade;
    option.dataset.irradiacao = irradiacao;
    select.appendChild(option);
  });
}

function populateMateriais() {
  const container = document.getElementById('materiais-lista');
  if (!container) return;
  
  container.innerHTML = '';
  
  Object.entries(appData.materiais).forEach(([nome, info]) => {
    const div = document.createElement('div');
    div.className = 'material-item';
    div.innerHTML = `
      <span class="material-name">${nome}</span>
      <span class="material-price">${formatCurrency(info.preco)}/${info.unidade}</span>
    `;
    container.appendChild(div);
  });
}

// Calculation Functions
function calculatePotencia() {
  const quantidade = parseInt(calculatorState.quantidadePaineis) || 0;
  const tipoPainel = calculatorState.tipoPainel;
  
  if (!tipoPainel) return 0;
  
  const potenciaPainel = parseInt(tipoPainel.replace('W', ''));
  return (quantidade * potenciaPainel) / 1000; // kWp
}

function calculateGeracao() {
  const potencia = calculatePotencia();
  const irradiacao = calculatorState.irradiacao;
  
  if (!potencia || !irradiacao) return 0;
  
  return Math.round(potencia * irradiacao * 30 * appData.configuracoes.eficiencia_sistema);
}

function getRecommendedInversor() {
  const quantidade = calculatorState.quantidadePaineis;
  
  for (const [nome, specs] of Object.entries(appData.inversores)) {
    if (quantidade >= specs.min_paineis && quantidade <= specs.max_paineis) {
      return { nome, ...specs };
    }
  }
  
  return null;
}

function calculateMaterialCosts() {
  const quantidade = calculatorState.quantidadePaineis || 0;
  let total = 0;
  
  Object.entries(appData.materiais).forEach(([nome, info]) => {
    const qtdBase = info.quantidade_base || 1;
    let qtdNecessaria;
    
    // Determine quantity based on material type
    if (nome.includes('Cabo') || nome.includes('Eletroduto') || nome.includes('Canaleta')) {
      qtdNecessaria = qtdBase * Math.ceil(quantidade / 10); // Scale with panels
    } else if (nome.includes('String Box') || nome.includes('Medidor') || nome.includes('Monitoramento')) {
      qtdNecessaria = qtdBase; // Fixed quantity
    } else {
      qtdNecessaria = qtdBase * Math.ceil(quantidade / 5); // Scale moderately
    }
    
    total += info.preco * qtdNecessaria;
  });
  
  return total;
}

function calculateCosts() {
  const quantidade = calculatorState.quantidadePaineis || 0;
  const tipoPainel = calculatorState.tipoPainel;
  const tipoEstrutura = calculatorState.tipoEstrutura;
  
  // Reset costs
  calculatorState.custos = {
    paineis: 0,
    estrutura: 0,
    inversor: 0,
    materiais: 0,
    subtotal: 0,
    impostos: 0,
    maoObra: 0,
    deslocamento: 0,
    total: 0
  };
  
  // Calculate panel costs
  if (tipoPainel && appData.paineis[tipoPainel]) {
    calculatorState.custos.paineis = appData.paineis[tipoPainel] * quantidade;
  }
  
  // Calculate structure costs
  if (tipoEstrutura && appData.estruturas[tipoEstrutura]) {
    calculatorState.custos.estrutura = appData.estruturas[tipoEstrutura] * quantidade;
  }
  
  // Calculate inversor costs
  const inversor = getRecommendedInversor();
  if (inversor) {
    calculatorState.custos.inversor = inversor.preco;
  }
  
  // Calculate material costs
  calculatorState.custos.materiais = calculateMaterialCosts();
  
  // Calculate subtotal
  calculatorState.custos.subtotal = 
    calculatorState.custos.paineis + 
    calculatorState.custos.estrutura + 
    calculatorState.custos.inversor + 
    calculatorState.custos.materiais;
  
  // Calculate percentages
  calculatorState.custos.impostos = 
    (calculatorState.custos.subtotal * calculatorState.percentualImpostos) / 100;
  
  calculatorState.custos.maoObra = 
    (calculatorState.custos.subtotal * calculatorState.percentualMaoObra) / 100;
  
  calculatorState.custos.deslocamento = 
    (calculatorState.custos.subtotal * calculatorState.percentualDeslocamento) / 100;
  
  // Calculate total
  calculatorState.custos.total = 
    calculatorState.custos.subtotal + 
    calculatorState.custos.impostos + 
    calculatorState.custos.maoObra + 
    calculatorState.custos.deslocamento;
}

// Display Update Functions
function updateDisplay() {
  // Update system info
  const potencia = calculatePotencia();
  const geracao = calculateGeracao();
  
  const potenciaEl = document.getElementById('potencia-sistema');
  const geracaoEl = document.getElementById('geracao-estimada');
  
  if (potenciaEl) potenciaEl.textContent = `${formatNumber(potencia)} kWp`;
  if (geracaoEl) geracaoEl.textContent = `${formatNumber(geracao, 0)} kWh/mês`;
  
  // Update inversor recommendation
  const inversor = getRecommendedInversor();
  const inversorInfo = document.getElementById('inversor-recomendado');
  
  if (inversorInfo) {
    if (inversor) {
      inversorInfo.textContent = `${inversor.nome} - ${formatCurrency(inversor.preco)} (${inversor.min_paineis}-${inversor.max_paineis} painéis)`;
    } else {
      inversorInfo.textContent = 'Nenhum inversor recomendado para esta quantidade de painéis';
    }
  }
  
  // Update cost summary
  calculateCosts();
  
  const costElements = {
    'custo-paineis': calculatorState.custos.paineis,
    'custo-estrutura': calculatorState.custos.estrutura,
    'custo-inversor': calculatorState.custos.inversor,
    'custo-materiais': calculatorState.custos.materiais,
    'subtotal': calculatorState.custos.subtotal,
    'custo-impostos': calculatorState.custos.impostos,
    'custo-mao-obra': calculatorState.custos.maoObra,
    'custo-deslocamento': calculatorState.custos.deslocamento,
    'custo-total': calculatorState.custos.total
  };
  
  Object.entries(costElements).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (element) element.textContent = formatCurrency(value);
  });
  
  // Update validation status
  updateValidationStatus();
}

function updateAnaliseFinanceira() {
  // Update dados base
  const dadosBase = document.getElementById('dados-base');
  if (!dadosBase) return;
  
  const potencia = calculatePotencia();
  const geracao = calculateGeracao();
  const total = calculatorState.custos.total;
  
  dadosBase.innerHTML = `
    <div class="dado-item">
      <div class="dado-label">Potência Instalada</div>
      <div class="dado-valor">${formatNumber(potencia)} kWp</div>
    </div>
    <div class="dado-item">
      <div class="dado-label">Geração Mensal</div>
      <div class="dado-valor">${formatNumber(geracao, 0)} kWh</div>
    </div>
    <div class="dado-item">
      <div class="dado-label">Investimento Total</div>
      <div class="dado-valor">${formatCurrency(total)}</div>
    </div>
    <div class="dado-item">
      <div class="dado-label">Cidade</div>
      <div class="dado-valor">${calculatorState.cidade || 'N/A'}</div>
    </div>
  `;
  
  // Update resumo financeiro
  const consumoMensal = calculatorState.cliente.consumo || 0;
  const economiaMensal = Math.min(geracao, consumoMensal) * appData.configuracoes.tarifa_energia;
  const payback = economiaMensal > 0 ? total / (economiaMensal * 12) : 0;
  const economiaTotal25Anos = economiaMensal * 12 * 25;
  const roi = total > 0 ? ((economiaTotal25Anos - total) / total) * 100 : 0;
  
  const resumoFinanceiro = document.getElementById('resumo-financeiro');
  if (resumoFinanceiro) {
    resumoFinanceiro.innerHTML = `
      <div class="financeiro-item">
        <span class="financeiro-label">Payback:</span>
        <span class="financeiro-valor">${formatNumber(payback, 1)} anos</span>
      </div>
      <div class="financeiro-item">
        <span class="financeiro-label">Economia Mensal:</span>
        <span class="financeiro-valor">${formatCurrency(economiaMensal)}</span>
      </div>
      <div class="financeiro-item">
        <span class="financeiro-label">Economia Total (25 anos):</span>
        <span class="financeiro-valor">${formatCurrency(economiaTotal25Anos)}</span>
      </div>
      <div class="financeiro-item">
        <span class="financeiro-label">ROI:</span>
        <span class="financeiro-valor">${formatNumber(roi, 1)}%</span>
      </div>
    `;
  }
  
  // Update análise energética
  const analiseEnergetica = document.getElementById('analise-energetica');
  if (analiseEnergetica) {
    const cobertura = consumoMensal > 0 ? (geracao/consumoMensal)*100 : 0;
    analiseEnergetica.innerHTML = `
      <div class="energia-item">
        <span class="energia-label">Geração Mensal:</span>
        <span class="energia-valor">${formatNumber(geracao, 0)} kWh</span>
      </div>
      <div class="energia-item">
        <span class="energia-label">Consumo Médio:</span>
        <span class="energia-valor">${formatNumber(consumoMensal, 0)} kWh</span>
      </div>
      <div class="energia-item">
        <span class="energia-label">Cobertura:</span>
        <span class="energia-valor">${formatNumber(cobertura, 1)}%</span>
      </div>
    `;
  }
  
  // Update impacto ambiental
  const co2Evitado = geracao * 12 * 0.084; // kg CO2 por kWh
  const impactoAmbiental = document.getElementById('impacto-ambiental');
  if (impactoAmbiental) {
    impactoAmbiental.innerHTML = `
      <div class="impacto-valor">${formatNumber(co2Evitado, 0)} kg</div>
      <div class="impacto-label">CO₂ evitado por ano</div>
    `;
  }
}

function updateResumoFinal() {
  const potencia = calculatePotencia();
  const geracao = calculateGeracao();
  const total = calculatorState.custos.total;
  
  const resumoFinal = document.getElementById('resumo-final');
  if (!resumoFinal) return;
  
  resumoFinal.innerHTML = `
    <div class="resumo-secao">
      <h4>Dados do Cliente</h4>
      <div class="dados">
        <div><span>Nome:</span><span>${calculatorState.cliente.nome || 'N/A'}</span></div>
        <div><span>Cidade:</span><span>${calculatorState.cliente.cidade || 'N/A'}</span></div>
        <div><span>Consumo Médio:</span><span>${calculatorState.cliente.consumo || 0} kWh/mês</span></div>
      </div>
    </div>
    <div class="resumo-secao">
      <h4>Sistema Fotovoltaico</h4>
      <div class="dados">
        <div><span>Potência:</span><span>${formatNumber(potencia)} kWp</span></div>
        <div><span>Geração Estimada:</span><span>${formatNumber(geracao, 0)} kWh/mês</span></div>
        <div><span>Painéis:</span><span>${calculatorState.quantidadePaineis}x ${calculatorState.tipoPainel || 'N/A'}</span></div>
        <div><span>Estrutura:</span><span>${calculatorState.tipoEstrutura || 'N/A'}</span></div>
      </div>
    </div>
    <div class="resumo-secao">
      <h4>Investimento</h4>
      <div class="dados">
        <div><span>Valor Total:</span><span>${formatCurrency(total)}</span></div>
        <div><span>Valor por kWp:</span><span>${formatCurrency(potencia > 0 ? total/potencia : 0)}</span></div>
      </div>
    </div>
  `;
}

// Chart Creation
function createInvestmentChart() {
  const ctx = document.getElementById('grafico-investimento');
  if (!ctx) {
    showNotification('Elemento do gráfico não encontrado', 'error');
    return;
  }
  
  // Clear previous chart
  if (window.investmentChart) {
    window.investmentChart.destroy();
  }
  
  const consumoMensal = calculatorState.cliente.consumo || 0;
  const geracao = calculateGeracao();
  const economiaMensal = Math.min(geracao, consumoMensal) * appData.configuracoes.tarifa_energia;
  const investimentoInicial = calculatorState.custos.total;
  
  if (investimentoInicial === 0) {
    showNotification('Configure o sistema primeiro para gerar o gráfico', 'warning');
    return;
  }
  
  if (consumoMensal === 0) {
    showNotification('Informe o consumo do cliente para calcular a economia', 'warning');
    return;
  }
  
  // Generate 25 years of data
  const anos = [];
  const investimentoAcumulado = [];
  const economiaAcumulada = [];
  
  let economiaTotal = 0;
  
  for (let ano = 0; ano <= 25; ano++) {
    anos.push(ano);
    
    if (ano === 0) {
      investimentoAcumulado.push(-investimentoInicial);
      economiaAcumulada.push(-investimentoInicial);
    } else {
      // Calculate annual savings with tariff adjustment
      const reajusteAcumulado = Math.pow(1 + appData.configuracoes.reajuste_anual_tarifa, ano - 1);
      const economiaAnual = economiaMensal * 12 * reajusteAcumulado;
      economiaTotal += economiaAnual;
      
      investimentoAcumulado.push(-investimentoInicial);
      economiaAcumulada.push(economiaTotal - investimentoInicial);
    }
  }
  
  try {
    window.investmentChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: anos,
        datasets: [
          {
            label: 'Investimento Inicial',
            data: investimentoAcumulado,
            borderColor: '#B4413C',
            backgroundColor: 'rgba(180, 65, 60, 0.1)',
            fill: false,
            tension: 0,
            pointRadius: 2
          },
          {
            label: 'Economia Acumulada',
            data: economiaAcumulada,
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.2)',
            fill: true,
            tension: 0.1,
            pointRadius: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Evolução do Investimento ao Longo de 25 Anos',
            font: {
              size: 16
            }
          },
          legend: {
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return formatCurrency(value);
              }
            },
            title: {
              display: true,
              text: 'Valor (R$)'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Anos'
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
    
    showNotification('Gráfico de investimento gerado com sucesso!');
  } catch (error) {
    console.error('Erro ao criar gráfico:', error);
    showNotification('Erro ao gerar gráfico', 'error');
  }
}

// PDF Generation
function generatePDF() {
  // Check if jsPDF is available
  if (typeof window.jspdf === 'undefined') {
    showNotification('Biblioteca PDF não está disponível', 'error');
    return;
  }

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Company Header
    doc.setFontSize(20);
    doc.setTextColor(31, 184, 205);
    doc.text('Futture System', 20, 30);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Energia Solar Profissional', 20, 40);
    
    // Date
    doc.setFontSize(10);
    doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 150, 30);
    
    // Client Data
    doc.setFontSize(16);
    doc.setTextColor(31, 184, 205);
    doc.text('DADOS DO CLIENTE', 20, 60);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    let yPos = 70;
    doc.text(`Nome: ${calculatorState.cliente.nome || 'N/A'}`, 20, yPos);
    doc.text(`Cidade: ${calculatorState.cliente.cidade || 'N/A'}`, 20, yPos += 10);
    doc.text(`Consumo Médio: ${calculatorState.cliente.consumo || 0} kWh/mês`, 20, yPos += 10);
    
    // System Data
    doc.setFontSize(16);
    doc.setTextColor(31, 184, 205);
    doc.text('SISTEMA FOTOVOLTAICO', 20, yPos += 25);
    
    const potencia = calculatePotencia();
    const geracao = calculateGeracao();
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Potência: ${formatNumber(potencia)} kWp`, 20, yPos += 15);
    doc.text(`Geração Estimada: ${formatNumber(geracao, 0)} kWh/mês`, 20, yPos += 10);
    doc.text(`Painéis: ${calculatorState.quantidadePaineis}x ${calculatorState.tipoPainel || 'N/A'}`, 20, yPos += 10);
    doc.text(`Estrutura: ${calculatorState.tipoEstrutura || 'N/A'}`, 20, yPos += 10);
    doc.text(`Cidade: ${calculatorState.cidade || 'N/A'}`, 20, yPos += 10);
    
    // Cost Summary
    doc.setFontSize(16);
    doc.setTextColor(31, 184, 205);
    doc.text('RESUMO FINANCEIRO', 20, yPos += 25);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Painéis Solares: ${formatCurrency(calculatorState.custos.paineis)}`, 20, yPos += 15);
    doc.text(`Estrutura: ${formatCurrency(calculatorState.custos.estrutura)}`, 20, yPos += 10);
    doc.text(`Inversor: ${formatCurrency(calculatorState.custos.inversor)}`, 20, yPos += 10);
    doc.text(`Materiais: ${formatCurrency(calculatorState.custos.materiais)}`, 20, yPos += 10);
    doc.text(`Subtotal: ${formatCurrency(calculatorState.custos.subtotal)}`, 20, yPos += 10);
    doc.text(`Impostos (${calculatorState.percentualImpostos}%): ${formatCurrency(calculatorState.custos.impostos)}`, 20, yPos += 10);
    doc.text(`Mão de Obra (${calculatorState.percentualMaoObra}%): ${formatCurrency(calculatorState.custos.maoObra)}`, 20, yPos += 10);
    doc.text(`Deslocamento (${calculatorState.percentualDeslocamento}%): ${formatCurrency(calculatorState.custos.deslocamento)}`, 20, yPos += 10);
    
    // Total
    doc.setFontSize(14);
    doc.setTextColor(31, 184, 205);
    doc.text(`TOTAL: ${formatCurrency(calculatorState.custos.total)}`, 20, yPos += 20);
    
    // Financial Analysis
    const consumoMensal = calculatorState.cliente.consumo || 0;
    const economiaMensal = Math.min(geracao, consumoMensal) * appData.configuracoes.tarifa_energia;
    const payback = economiaMensal > 0 ? calculatorState.custos.total / (economiaMensal * 12) : 0;
    const economiaTotal25Anos = economiaMensal * 12 * 25;
    const roi = calculatorState.custos.total > 0 ? ((economiaTotal25Anos - calculatorState.custos.total) / calculatorState.custos.total) * 100 : 0;
    
    doc.setFontSize(16);
    doc.setTextColor(31, 184, 205);
    doc.text('ANÁLISE FINANCEIRA', 20, yPos += 30);
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.text(`Economia Mensal: ${formatCurrency(economiaMensal)}`, 20, yPos += 15);
    doc.text(`Payback: ${formatNumber(payback, 1)} anos`, 20, yPos += 10);
    doc.text(`Economia Total (25 anos): ${formatCurrency(economiaTotal25Anos)}`, 20, yPos += 10);
    doc.text(`ROI: ${formatNumber(roi, 1)}%`, 20, yPos += 10);
    
    // Environmental Impact
    const co2Evitado = geracao * 12 * 0.084;
    doc.text(`CO₂ evitado por ano: ${formatNumber(co2Evitado, 0)} kg`, 20, yPos += 10);
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Este orçamento é válido por 30 dias', 20, 280);
    doc.text('Futture System - Energia Solar Profissional', 20, 290);
    
    // Save PDF
    const fileName = `orcamento-solar-${calculatorState.cliente.nome.replace(/\s+/g, '-') || 'cliente'}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
    
    showNotification('PDF gerado e baixado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    showNotification('Erro ao gerar PDF: ' + error.message, 'error');
  }
}

// Admin Functions
function renderAdminList(type) {
  const container = document.getElementById(`lista-${type}`);
  if (!container) return;
  
  container.innerHTML = '';
  
  const data = appData[type] || {};
  
  Object.entries(data).forEach(([key, value]) => {
    const item = document.createElement('div');
    item.className = 'admin-item';
    
    let details = '';
    if (typeof value === 'object' && value !== null) {
      if (type === 'inversores') {
        details = `${formatCurrency(value.preco)} | ${value.min_paineis}-${value.max_paineis} painéis`;
      } else if (type === 'materiais') {
        details = `${formatCurrency(value.preco)}/${value.unidade} | Base: ${value.quantidade_base}`;
      }
    } else {
      details = typeof value === 'number' ? 
        (type === 'cidades' ? `${value} kWh/kWp/dia` : formatCurrency(value)) : 
        value;
    }
    
    item.innerHTML = `
      <div class="admin-item-info">
        <div class="admin-item-name">${key}</div>
        <div class="admin-item-details">${details}</div>
      </div>
      <div class="admin-item-actions">
        <button class="btn btn--sm btn--outline" onclick="editItem('${type}', '${key}')">✏️</button>
        <button class="btn btn--sm btn--outline" onclick="deleteItem('${type}', '${key}')">🗑️</button>
      </div>
    `;
    
    container.appendChild(item);
  });
}

function addItem(type) {
  const inputs = {
    cidades: ['nova-cidade', 'nova-irradiacao'],
    paineis: ['novo-painel', 'novo-preco-painel'],
    estruturas: ['nova-estrutura', 'novo-preco-estrutura'],
    inversores: ['novo-inversor', 'novo-preco-inversor', 'novo-min-paineis', 'novo-max-paineis'],
    materiais: ['novo-material', 'novo-preco-material', 'nova-unidade', 'nova-quantidade-base']
  };
  
  const fields = inputs[type] || [];
  const values = fields.map(id => document.getElementById(id)?.value || '');
  
  if (values.some(val => !val.trim())) {
    showNotification('Preencha todos os campos', 'error');
    return;
  }
  
  const key = values[0];
  if (appData[type][key]) {
    showNotification('Item já existe', 'error');
    return;
  }
  
  let value;
  switch (type) {
    case 'cidades':
      value = parseFloat(values[1]);
      break;
    case 'paineis':
    case 'estruturas':
      value = parseFloat(values[1]);
      break;
    case 'inversores':
      value = {
        preco: parseFloat(values[1]),
        min_paineis: parseInt(values[2]),
        max_paineis: parseInt(values[3])
      };
      break;
    case 'materiais':
      value = {
        preco: parseFloat(values[1]),
        unidade: values[2],
        quantidade_base: parseInt(values[3])
      };
      break;
  }
  
  appData[type][key] = value;
  saveData();
  renderAdminList(type);
  
  // Clear inputs
  fields.forEach(id => {
    const input = document.getElementById(id);
    if (input) input.value = '';
  });
  
  showNotification(`${key} adicionado com sucesso!`);
  
  // Refresh main app if necessary
  if (['cidades', 'paineis', 'estruturas', 'inversores'].includes(type)) {
    initializeApp();
  }
}

function deleteItem(type, key) {
  if (confirm(`Tem certeza que deseja remover "${key}"?`)) {
    delete appData[type][key];
    saveData();
    renderAdminList(type);
    showNotification(`${key} removido com sucesso!`);
    
    // Refresh main app if necessary
    if (['cidades', 'paineis', 'estruturas', 'inversores'].includes(type)) {
      initializeApp();
    }
  }
}

function editItem(type, key) {
  const currentValue = appData[type][key];
  const valueStr = typeof currentValue === 'object' ? JSON.stringify(currentValue) : currentValue.toString();
  const newValue = prompt(`Editar ${key}:`, valueStr);
  
  if (newValue !== null && newValue !== valueStr) {
    try {
      let parsedValue;
      if (type === 'cidades') {
        parsedValue = parseFloat(newValue);
      } else if (type === 'paineis' || type === 'estruturas') {
        parsedValue = parseFloat(newValue);
      } else {
        parsedValue = JSON.parse(newValue);
      }
      
      appData[type][key] = parsedValue;
      saveData();
      renderAdminList(type);
      showNotification(`${key} editado com sucesso!`);
      
      // Refresh main app if necessary
      if (['cidades', 'paineis', 'estruturas', 'inversores'].includes(type)) {
        initializeApp();
      }
    } catch (error) {
      showNotification('Formato inválido', 'error');
    }
  }
}

function loadConfigForm() {
  const config = appData.configuracoes;
  const tarifaEl = document.getElementById('tarifa-energia');
  const eficienciaEl = document.getElementById('eficiencia-sistema');
  const reajusteEl = document.getElementById('reajuste-anual');
  
  if (tarifaEl) tarifaEl.value = config.tarifa_energia;
  if (eficienciaEl) eficienciaEl.value = config.eficiencia_sistema;
  if (reajusteEl) reajusteEl.value = config.reajuste_anual_tarifa * 100;
}

function saveConfig() {
  const tarifaEl = document.getElementById('tarifa-energia');
  const eficienciaEl = document.getElementById('eficiencia-sistema');
  const reajusteEl = document.getElementById('reajuste-anual');
  
  appData.configuracoes.tarifa_energia = parseFloat(tarifaEl?.value) || 0.78;
  appData.configuracoes.eficiencia_sistema = parseFloat(eficienciaEl?.value) || 0.85;
  appData.configuracoes.reajuste_anual_tarifa = (parseFloat(reajusteEl?.value) || 8) / 100;
  
  saveData();
  showNotification('Configurações salvas com sucesso!');
  updateDisplay(); // Refresh calculations with new settings
}

// Event Listeners Setup
function setupEventListeners() {
  // Tab navigation
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabId = e.target.dataset.tab;
      
      // Update tab appearance
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      
      e.target.classList.add('active');
      const panel = document.getElementById(tabId);
      if (panel) panel.classList.add('active');
      
      // Update content when switching tabs
      if (tabId === 'analise-financeira') {
        updateAnaliseFinanceira();
      } else if (tabId === 'finalizar-orcamento') {
        updateResumoFinal();
        updateValidationStatus();
      }
    });
  });
  
  // Admin button
  document.getElementById('admin-btn')?.addEventListener('click', () => {
    document.getElementById('admin-modal').classList.remove('hidden');
    renderAdminList('cidades');
    loadConfigForm();
  });
  
  // Close admin modal
  document.getElementById('close-admin')?.addEventListener('click', () => {
    document.getElementById('admin-modal').classList.add('hidden');
  });
  
  // Admin tabs
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      const tabId = e.target.dataset.adminTab;
      
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
      
      e.target.classList.add('active');
      const panel = document.getElementById(`admin-${tabId}`);
      if (panel) panel.classList.add('active');
      
      if (tabId !== 'configuracoes') {
        renderAdminList(tabId);
      }
    });
  });
  
  // Add item buttons
  document.getElementById('add-cidade')?.addEventListener('click', () => addItem('cidades'));
  document.getElementById('add-painel')?.addEventListener('click', () => addItem('paineis'));
  document.getElementById('add-estrutura')?.addEventListener('click', () => addItem('estruturas'));
  document.getElementById('add-inversor')?.addEventListener('click', () => addItem('inversores'));
  document.getElementById('add-material')?.addEventListener('click', () => addItem('materiais'));
  
  // Config actions
  document.getElementById('save-config')?.addEventListener('click', saveConfig);
  document.getElementById('export-data')?.addEventListener('click', exportData);
  document.getElementById('reset-data')?.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja resetar todos os dados? Esta ação não pode ser desfeita.')) {
      resetToDefault();
    }
  });
  
  document.getElementById('import-data')?.addEventListener('click', () => {
    document.getElementById('file-import').click();
  });
  
  document.getElementById('file-import')?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      importData(file);
      e.target.value = ''; // Reset file input
    }
  });
  
  // Calculator form inputs
  document.getElementById('cidade')?.addEventListener('change', (e) => {
    calculatorState.cidade = e.target.value;
    calculatorState.irradiacao = parseFloat(e.target.selectedOptions[0]?.dataset.irradiacao || 0);
    
    const irradiacaoInfo = document.getElementById('irradiacao-info');
    const irradiacaoValor = document.getElementById('irradiacao-valor');
    
    if (calculatorState.irradiacao > 0) {
      if (irradiacaoValor) irradiacaoValor.textContent = calculatorState.irradiacao.toFixed(1);
      if (irradiacaoInfo) irradiacaoInfo.classList.remove('hidden');
    } else {
      if (irradiacaoInfo) irradiacaoInfo.classList.add('hidden');
    }
    
    updateDisplay();
  });
  
  document.getElementById('tipo-painel')?.addEventListener('change', (e) => {
    calculatorState.tipoPainel = e.target.selectedOptions[0]?.dataset.key || '';
    updateDisplay();
  });
  
  document.getElementById('quantidade-paineis')?.addEventListener('input', (e) => {
    calculatorState.quantidadePaineis = parseInt(e.target.value) || 0;
    updateDisplay();
  });
  
  document.getElementById('tipo-estrutura')?.addEventListener('change', (e) => {
    calculatorState.tipoEstrutura = e.target.selectedOptions[0]?.dataset.key || '';
    updateDisplay();
  });
  
  // Percentages
  ['impostos', 'mao-obra', 'deslocamento'].forEach(type => {
    const elementId = `percentual-${type}`;
    const stateKey = type === 'mao-obra' ? 'percentualMaoObra' : 
                     type === 'impostos' ? 'percentualImpostos' : 'percentualDeslocamento';
    
    document.getElementById(elementId)?.addEventListener('input', (e) => {
      calculatorState[stateKey] = parseFloat(e.target.value) || 0;
      updateDisplay();
    });
  });
  
  // Client form
  ['nome', 'cidade', 'email', 'telefone', 'consumo'].forEach(field => {
    const element = document.getElementById(`cliente-${field}`);
    if (element) {
      element.addEventListener('input', (e) => {
        calculatorState.cliente[field] = field === 'consumo' ? parseFloat(e.target.value) || 0 : e.target.value;
        updateValidationStatus();
      });
    }
  });
  
  // Action buttons
  document.getElementById('gerar-analise')?.addEventListener('click', () => {
    if (!calculatorState.cidade || !calculatorState.tipoPainel || calculatorState.quantidadePaineis === 0) {
      showNotification('Complete os dados básicos de cálculo primeiro', 'error');
      return;
    }
    
    if (!calculatorState.cliente.nome || calculatorState.cliente.consumo === 0) {
      showNotification('Complete os dados do cliente primeiro', 'error');
      return;
    }
    
    updateAnaliseFinanceira();
    createInvestmentChart();
  });
  
  document.getElementById('gerar-pdf')?.addEventListener('click', () => {
    if (!calculatorState.cliente.nome || calculatorState.custos.total === 0) {
      showNotification('Complete todos os dados antes de gerar o PDF', 'error');
      return;
    }
    generatePDF();
  });
  
  document.getElementById('enviar-email')?.addEventListener('click', () => {
    if (!calculatorState.cliente.email) {
      showNotification('E-mail do cliente não informado', 'error');
      return;
    }
    showNotification('Funcionalidade de e-mail em desenvolvimento', 'info');
  });
  
  document.getElementById('salvar-orcamento')?.addEventListener('click', () => {
    try {
      const orcamento = {
        ...calculatorState,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('ultimoOrcamento', JSON.stringify(orcamento));
      showNotification('Orçamento salvo com sucesso!');
    } catch (error) {
      showNotification('Erro ao salvar orçamento', 'error');
    }
  });
  
  // Notification close
  document.getElementById('notification-close')?.addEventListener('click', () => {
    document.getElementById('notification').classList.add('hidden');
  });
}

// Initialize Application
function initializeApp() {
  // Load saved data
  loadData();
  
  // Populate dropdowns
  populateCidades();
  populateSelect('tipo-painel', appData.paineis);
  populateSelect('tipo-estrutura', appData.estruturas);
  
  // Populate materials
  populateMateriais();
  
  // Initial display update
  updateDisplay();
  
  // Load last budget if exists
  try {
    const lastBudget = localStorage.getItem('ultimoOrcamento');
    if (lastBudget) {
      const budget = JSON.parse(lastBudget);
      // Restore some basic state if needed
      if (budget.cliente && budget.cliente.nome) {
        Object.assign(calculatorState.cliente, budget.cliente);
        
        // Fill form fields
        Object.keys(budget.cliente).forEach(key => {
          const element = document.getElementById(`cliente-${key}`);
          if (element) element.value = budget.cliente[key];
        });
      }
    }
  } catch (error) {
    console.log('No previous budget found');
  }
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  initializeApp();
  
  // Welcome message
  setTimeout(() => {
    showNotification('Sistema de orçamento solar carregado com sucesso!');
  }, 1000);
});

// Expose functions for inline event handlers
window.addItem = addItem;
window.deleteItem = deleteItem;
window.editItem = editItem;