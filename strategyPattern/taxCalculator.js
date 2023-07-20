class KdvStrategy {
    calculate(amount) {
        const kdvRate = 0.18; // %18 KDV oranı
        const kdvAmount = amount * kdvRate;
        return kdvAmount;
    }
}

class IncomeTaxStrategy {
    calculate(amount) {
        const taxRate = 0.25; // %25 Gelir Vergisi oranı
        const taxAmount = amount * taxRate;
        return taxAmount;
    }
}

class TaxCalculator {
    constructor() {
        this.strategies = {
            kdv: new KdvStrategy(),
            incomeTax: new IncomeTaxStrategy(),
        };
        this.strategy = null;
    }

    setStrategy(strategy) {
        this.strategy = this.strategies[strategy];
    }

    calculateManager(amount) {
        const taxAmount = this.strategy.calculate(amount);
        console.log(`Hesaplanan Vergi Miktarı: ${taxAmount.toFixed(2)} TL`);
        return taxAmount.toFixed(2);
    }
}

function calculateTax(strategy) {
    const amountInput = document.getElementById(`${strategy}Amount`);
    const amount = amountInput.value;
    const taxCalculator = new TaxCalculator();
    taxCalculator.setStrategy(strategy);
    const result = taxCalculator.calculateManager(amount);
    document.getElementById(`${strategy}Result`).innerText = `Hesaplanan Vergi Miktarı: ${result} TL`;
}