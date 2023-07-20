class CreditCardPayment {
    pay(amount, cardInfo) {
        console.log(`Kredi Kartı ile ${amount} TL ödeme yapıldı.`);
        console.log("Kart Bilgileri:");
        console.log("Kart Numarası:", cardInfo.cardNumber);
        console.log("Son Kullanma Tarihi:", cardInfo.expirationDate);
        console.log("CVV:", cardInfo.cvv);
        return `Kredi Kartı ile ${amount} TL ödeme yapıldı.\n\nKart Bilgileri:\nKart Numarası: ${cardInfo.cardNumber}\nSon Kullanma Tarihi: ${cardInfo.expirationDate}\nCVV: ${cardInfo.cvv}`;
    }
}

class BankTransferPayment {
    pay(amount, iban) {
        console.log(`Havale ile ${amount} TL ödeme yapıldı.`);
        console.log("IBAN:", iban);
        return `Havale ile ${amount} TL ödeme yapıldı.\n\nIBAN: ${iban}`;
    }
}

class PaymentContext {
    constructor(paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    setPaymentStrategy(paymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    doPayment(amount, info) {
        return this.paymentStrategy.pay(amount, info);
    }
}

let paymentContext;

function setPaymentMethod(paymentMethod) {
    const creditCardForm = document.getElementById("creditCardForm");
    const bankTransferForm = document.getElementById("bankTransferForm");

    if (paymentMethod === 'creditCard') {
        creditCardForm.style.display = "block";
        bankTransferForm.style.display = "none";
        paymentContext = new PaymentContext(new CreditCardPayment());
    } else if (paymentMethod === 'bankTransfer') {
        creditCardForm.style.display = "none";
        bankTransferForm.style.display = "block";
        paymentContext = new PaymentContext(new BankTransferPayment());
    }
}

function validateInputs(inputs) {
    for (const input of inputs) {
        if (!input.value) {
            alert("Lütfen tüm alanları doldurun.");
            return false;
        }
    }
    return true;
}

function makePayment(paymentMethod) {
    const amount = document.getElementById("amount").value;
    const creditCardInputs = document.querySelectorAll("#creditCardForm input");
    const bankTransferInputs = document.querySelectorAll("#bankTransferForm input");

    if (paymentMethod === 'creditCard') {
        if (!validateInputs(creditCardInputs)) {
            return;
        }
        const cardNumber = document.getElementById("cardNumber").value;
        const expirationDate = document.getElementById("expirationDate").value;
        const cvv = document.getElementById("cvv").value;
        const result = paymentContext.doPayment(amount, { cardNumber, expirationDate, cvv });
        alert(result);
        clearForm(creditCardInputs);
    } else if (paymentMethod === 'bankTransfer') {
        if (!validateInputs(bankTransferInputs)) {
            return;
        }
        const iban = document.getElementById("iban").value;
        const result = paymentContext.doPayment(amount, iban);
        alert(result);
        clearForm(bankTransferInputs);
    }

    const creditCardForm = document.getElementById("creditCardForm");
    const bankTransferForm = document.getElementById("bankTransferForm");
    creditCardForm.style.display = "none";
    bankTransferForm.style.display = "none";
}

function clearForm(inputs) {
    for (const input of inputs) {
        input.value = "";
    }
} 