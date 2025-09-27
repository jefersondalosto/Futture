// PDF Generator for Solar Calculator
class PDFGenerator {
    constructor() {
        this.jsPDF = window.jspdf.jsPDF;
        this.pageWidth = 210; // A4 width in mm
        this.pageHeight = 297; // A4 height in mm
        this.margin = 20;
        this.lineHeight = 6;
        this.currentY = this.margin;
    }

    generateQuotePDF(systemData, clientData, calculationData) {
        const doc = new this.jsPDF();
        this.currentY = this.margin;

        // Header
        this.addHeader(doc, systemData.empresa);

        // Client Information
        this.addClientInfo(doc, clientData);

        // System Configuration
        this.addSystemConfig(doc, systemData);

        // Materials Table
        this.addMaterialsTable(doc, calculationData);

        // Financial Analysis
        this.addFinancialAnalysis(doc, calculationData);

        // Energy Analysis
        this.addEnergyAnalysis(doc, calculationData);

        // Terms and Conditions
        this.addTermsAndConditions(doc);

        // Footer
        this.addFooter(doc);

        // Generate and download
        const filename = `Orcamento_Solar_${clientData.nome.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
        doc.save(filename);
    }

    addHeader(doc, empresa) {
        // Company Header
        doc.setFillColor(30, 58, 138); // Blue background
        doc.rect(0, 0, this.pageWidth, 40, 'F');

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(empresa.nome, this.margin, 20);

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text('Gerador de Orçamento Solar Profissional', this.margin, 28);

        // Company Contact Info
        doc.setFontSize(8);
        const contactY = 35;
        doc.text(`📍 ${empresa.endereco}`, this.margin, contactY);
        doc.text(`📞 ${empresa.telefone}`, this.margin + 80, contactY);
        doc.text(`✉️ ${empresa.email}`, this.margin + 120, contactY);

        this.currentY = 50;
        doc.setTextColor(0, 0, 0); // Reset to black
    }

    addClientInfo(doc, clientData) {
        this.checkPageBreak(doc, 40);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('DADOS DO CLIENTE', this.margin, this.currentY);
        this.currentY += 10;

        // Client info box
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(250, 250, 250);
        doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 30, 'FD');

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const clientY = this.currentY + 8;

        doc.text(`Nome: ${clientData.nome}`, this.margin + 5, clientY);
        doc.text(`Cidade: ${clientData.cidade}`, this.margin + 5, clientY + 6);
        doc.text(`E-mail: ${clientData.email || 'Não informado'}`, this.margin + 5, clientY + 12);
        doc.text(`Telefone: ${clientData.telefone || 'Não informado'}`, this.margin + 5, clientY + 18);
        doc.text(`Consumo Mensal: ${clientData.consumo} kWh`, this.margin + 5, clientY + 24);

        this.currentY += 40;
    }

    addSystemConfig(doc, systemData) {
        this.checkPageBreak(doc, 50);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('CONFIGURAÇÃO DO SISTEMA', this.margin, this.currentY);
        this.currentY += 10;

        // System config box
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(250, 250, 250);
        doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 35, 'FD');

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const configY = this.currentY + 8;

        doc.text(`Localização: ${systemData.cidade} (Irradiação: ${systemData.irradiacao} kWh/kWp/dia)`, this.margin + 5, configY);
        doc.text(`Painéis: ${systemData.quantidade_paineis}x ${systemData.tipo_painel}`, this.margin + 5, configY + 6);
        doc.text(`Potência Total: ${systemData.potencia_sistema} kWp`, this.margin + 5, configY + 12);
        doc.text(`Estrutura: ${systemData.tipo_estrutura}`, this.margin + 5, configY + 18);
        doc.text(`Inversor: ${systemData.inversor}`, this.margin + 5, configY + 24);

        this.currentY += 45;
    }

    addMaterialsTable(doc, calculationData) {
        this.checkPageBreak(doc, 100);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPOSIÇÃO DO ORÇAMENTO', this.margin, this.currentY);
        this.currentY += 15;

        // Table header
        doc.setFillColor(30, 58, 138);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');

        const tableY = this.currentY;
        const colWidths = [80, 30, 25, 30];
        const colPositions = [this.margin, this.margin + colWidths[0], this.margin + colWidths[0] + colWidths[1], this.margin + colWidths[0] + colWidths[1] + colWidths[2]];

        // Header row
        doc.rect(this.margin, tableY, this.pageWidth - 2 * this.margin, 8, 'F');
        doc.text('Item', colPositions[0] + 2, tableY + 6);
        doc.text('Qtd', colPositions[1] + 2, tableY + 6);
        doc.text('Unidade', colPositions[2] + 2, tableY + 6);
        doc.text('Valor Total', colPositions[3] + 2, tableY + 6);

        this.currentY += 8;

        // Table content
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);

        const items = [
            [`Painéis (${calculationData.sistema.quantidade_paineis}x)`, calculationData.sistema.quantidade_paineis, 'un', calculationData.custos.paineis],
            ['Estrutura', calculationData.sistema.quantidade_paineis, 'un', calculationData.custos.estrutura],
            ['Inversor', 1, 'un', calculationData.custos.inversor],
            ...Object.entries(calculationData.custos.materiais_detalhados || {}).map(([nome, valor]) => [nome, '', '', valor])
        ];

        let rowColor = true;
        items.forEach((item) => {
            this.checkPageBreak(doc, 6);

            // Alternate row colors
            if (rowColor) {
                doc.setFillColor(248, 248, 248);
                doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 6, 'F');
            }
            rowColor = !rowColor;

            doc.text(String(item[0]).substring(0, 35), colPositions[0] + 2, this.currentY + 4);
            doc.text(String(item[1]), colPositions[1] + 2, this.currentY + 4);
            doc.text(String(item[2]), colPositions[2] + 2, this.currentY + 4);
            doc.text(`R$ ${typeof item[3] === 'number' ? item[3].toFixed(2).replace('.', ',') : item[3]}`, colPositions[3] + 2, this.currentY + 4);

            this.currentY += 6;
        });

        // Subtotals
        this.currentY += 5;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);

        const subtotals = [
            ['Subtotal', calculationData.custos.subtotal],
            [`Impostos (${calculationData.percentuais.impostos}%)`, calculationData.custos.impostos],
            [`Mão de Obra (${calculationData.percentuais.mao_obra}%)`, calculationData.custos.mao_obra],
            [`Deslocamento (${calculationData.percentuais.deslocamento}%)`, calculationData.custos.deslocamento]
        ];

        subtotals.forEach(([label, value]) => {
            this.checkPageBreak(doc, 6);
            doc.text(label, this.margin + 100, this.currentY + 4);
            doc.text(`R$ ${value.toFixed(2).replace('.', ',')}`, this.margin + 140, this.currentY + 4);
            this.currentY += 6;
        });

        // Total
        doc.setFillColor(30, 58, 138);
        doc.setTextColor(255, 255, 255);
        doc.rect(this.margin + 95, this.currentY, 70, 10, 'F');
        doc.setFontSize(12);
        doc.text('TOTAL FINAL', this.margin + 100, this.currentY + 7);
        doc.text(`R$ ${calculationData.custos.total.toFixed(2).replace('.', ',')}`, this.margin + 140, this.currentY + 7);

        this.currentY += 20;
        doc.setTextColor(0, 0, 0);
    }

    addFinancialAnalysis(doc, calculationData) {
        this.checkPageBreak(doc, 80);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('ANÁLISE FINANCEIRA (25 ANOS)', this.margin, this.currentY);
        this.currentY += 15;

        // Financial highlights
        doc.setFillColor(250, 250, 250);
        doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 50, 'FD');

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        const finY = this.currentY + 8;

        doc.text(`💰 Investimento Inicial: R$ ${calculationData.financeiro.investimento_inicial.toFixed(2).replace('.', ',')}`, this.margin + 5, finY);
        doc.text(`⏱️ Payback: ${calculationData.financeiro.payback} anos`, this.margin + 5, finY + 8);
        doc.text(`📈 ROI (25 anos): ${calculationData.financeiro.roi}%`, this.margin + 5, finY + 16);
        doc.text(`💵 Economia Total: R$ ${calculationData.financeiro.economia_total.toFixed(2).replace('.', ',')}`, this.margin + 5, finY + 24);
        doc.text(`🏆 Retorno Final: R$ ${calculationData.financeiro.retorno_final.toFixed(2).replace('.', ',')}`, this.margin + 5, finY + 32);
        doc.text(`🌱 CO₂ Evitado: ${calculationData.ambiental.co2_evitado} ton/ano`, this.margin + 5, finY + 40);

        this.currentY += 60;
    }

    addEnergyAnalysis(doc, calculationData) {
        this.checkPageBreak(doc, 80);

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('ANÁLISE ENERGÉTICA', this.margin, this.currentY);
        this.currentY += 15;

        // Energy info
        doc.setFillColor(250, 250, 250);
        doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 35, 'FD');

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const energyY = this.currentY + 8;

        doc.text(`⚡ Geração Anual: ${calculationData.energia.geracao_anual} kWh`, this.margin + 5, energyY);
        doc.text(`🏠 Consumo Anual: ${calculationData.energia.consumo_anual} kWh`, this.margin + 5, energyY + 6);
        doc.text(`💰 Economia Anual: R$ ${calculationData.energia.economia_anual.toFixed(2).replace('.', ',')}`, this.margin + 5, energyY + 12);
        doc.text(`📊 Cobertura: ${calculationData.energia.cobertura_anual}% do consumo`, this.margin + 5, energyY + 18);
        doc.text(`📈 Economia Mensal Média: R$ ${calculationData.energia.economia_mensal.toFixed(2).replace('.', ',')}`, this.margin + 5, energyY + 24);

        this.currentY += 45;
    }

    addTermsAndConditions(doc) {
        this.checkPageBreak(doc, 60);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('CONDIÇÕES COMERCIAIS', this.margin, this.currentY);
        this.currentY += 10;

        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');

        const terms = [
            '• Orçamento válido por 30 dias',
            '• Garantia de 25 anos para painéis solares',
            '• Garantia de 5 anos para inversores',
            '• Instalação inclusa no valor apresentado',
            '• Projeto elétrico e aprovação junto à concessionária inclusos',
            '• Acompanhamento pós-instalação por 12 meses',
            '• Valores sujeitos a alteração conforme mudanças tributárias',
            '• Financiamento disponível (consulte condições)',
            '• Sistema homologado pela ANEEL',
            '• Certificação INMETRO para todos os equipamentos'
        ];

        terms.forEach(term => {
            this.checkPageBreak(doc, 5);
            doc.text(term, this.margin + 5, this.currentY);
            this.currentY += 5;
        });

        this.currentY += 10;
    }

    addFooter(doc) {
        const footerY = this.pageHeight - 20;

        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(`Orçamento gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`, this.margin, footerY);
        doc.text('Futture System - Energia Solar Inteligente', this.pageWidth - this.margin - 60, footerY);

        // Add page number
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.text(`Página ${i} de ${pageCount}`, this.pageWidth - this.margin - 20, footerY + 5);
        }
    }

    checkPageBreak(doc, requiredSpace) {
        if (this.currentY + requiredSpace > this.pageHeight - 30) {
            doc.addPage();
            this.currentY = this.margin;
        }
    }

    // Generate detailed report with charts
    generateDetailedReport(systemData, clientData, calculationData, monthlyData) {
        const doc = new this.jsPDF();
        this.currentY = this.margin;

        // Cover page
        this.addCoverPage(doc, clientData);

        // Add new page for content
        doc.addPage();
        this.currentY = this.margin;

        // All previous sections
        this.addClientInfo(doc, clientData);
        this.addSystemConfig(doc, systemData);
        this.addMaterialsTable(doc, calculationData);
        this.addFinancialAnalysis(doc, calculationData);
        this.addEnergyAnalysis(doc, calculationData);

        // Monthly analysis
        this.addMonthlyAnalysis(doc, monthlyData);

        this.addTermsAndConditions(doc);
        this.addFooter(doc);

        const filename = `Relatorio_Completo_Solar_${clientData.nome.replace(/\s+/g, '_')}_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`;
        doc.save(filename);
    }

    addCoverPage(doc, clientData) {
        // Background gradient effect
        doc.setFillColor(30, 58, 138);
        doc.rect(0, 0, this.pageWidth, this.pageHeight, 'F');

        // Main title
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(32);
        doc.setFont('helvetica', 'bold');
        doc.text('FUTTURE SYSTEM', this.pageWidth/2, 80, { align: 'center' });

        doc.setFontSize(18);
        doc.setFont('helvetica', 'normal');
        doc.text('RELATÓRIO DE ANÁLISE SOLAR', this.pageWidth/2, 100, { align: 'center' });

        // Client name
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(clientData.nome.toUpperCase(), this.pageWidth/2, 140, { align: 'center' });

        // Date
        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(new Date().toLocaleDateString('pt-BR'), this.pageWidth/2, 200, { align: 'center' });

        // Bottom text
        doc.setFontSize(10);
        doc.text('Energia Solar Inteligente', this.pageWidth/2, 250, { align: 'center' });
    }

    addMonthlyAnalysis(doc, monthlyData) {
        doc.addPage();
        this.currentY = this.margin;

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('ANÁLISE MENSAL DETALHADA', this.margin, this.currentY);
        this.currentY += 15;

        // Monthly table header
        doc.setFillColor(30, 58, 138);
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');

        const tableY = this.currentY;
        const monthColWidths = [25, 35, 35, 35, 35];
        const monthColPositions = [
            this.margin,
            this.margin + monthColWidths[0],
            this.margin + monthColWidths[0] + monthColWidths[1],
            this.margin + monthColWidths[0] + monthColWidths[1] + monthColWidths[2],
            this.margin + monthColWidths[0] + monthColWidths[1] + monthColWidths[2] + monthColWidths[3]
        ];

        // Header
        doc.rect(this.margin, tableY, this.pageWidth - 2 * this.margin, 8, 'F');
        doc.text('Mês', monthColPositions[0] + 2, tableY + 6);
        doc.text('Geração (kWh)', monthColPositions[1] + 2, tableY + 6);
        doc.text('Consumo (kWh)', monthColPositions[2] + 2, tableY + 6);
        doc.text('Economia (R$)', monthColPositions[3] + 2, tableY + 6);
        doc.text('Saldo (kWh)', monthColPositions[4] + 2, tableY + 6);

        this.currentY += 8;

        // Monthly data
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');

        const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        let rowColor = true;
        monthlyData.forEach((data, index) => {
            this.checkPageBreak(doc, 6);

            if (rowColor) {
                doc.setFillColor(248, 248, 248);
                doc.rect(this.margin, this.currentY, this.pageWidth - 2 * this.margin, 6, 'F');
            }
            rowColor = !rowColor;

            doc.text(months[index], monthColPositions[0] + 2, this.currentY + 4);
            doc.text(data.geracao.toString(), monthColPositions[1] + 2, this.currentY + 4);
            doc.text(data.consumo.toString(), monthColPositions[2] + 2, this.currentY + 4);
            doc.text(`R$ ${data.economia.toFixed(2).replace('.', ',')}`, monthColPositions[3] + 2, this.currentY + 4);
            doc.text((data.geracao - data.consumo).toString(), monthColPositions[4] + 2, this.currentY + 4);

            this.currentY += 6;
        });
    }
}

// Initialize PDF Generator
window.pdfGenerator = new PDFGenerator();