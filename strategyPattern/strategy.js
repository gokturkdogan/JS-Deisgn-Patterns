// Kredi kartı sınıfı
class CreditCardPayment {
    pay(amount, cardInfo) {
        console.log(`Kredi Kartı ile ${amount} TL ödeme yapıldı.`);
        console.log("Kart Bilgileri:", cardInfo);
        return `Kredi Kartı ile ${amount} TL ödeme yapıldı.\n\nKart Bilgileri:\n${JSON.stringify(cardInfo)}`;
    }
}

// Havale sınıfı
class BankTransferPayment {
    pay(amount, iban) {
        console.log(`Havale ile ${amount} TL ödeme yapıldı.`);
        console.log("IBAN:", iban);
        return `Havale ile ${amount} TL ödeme yapıldı.\n\nIBAN: ${iban}`;
    }
}

let paymentStrategy;

// Ödeme yöntemi belirleme
function setPaymentMethod(paymentMethod) {
    const creditCardForm = document.getElementById("creditCardForm");
    const bankTransferForm = document.getElementById("bankTransferForm");

    if (paymentMethod === 'creditCard') {
        creditCardForm.style.display = "block";
        bankTransferForm.style.display = "none";
        paymentStrategy = new CreditCardPayment();
    } else if (paymentMethod === 'bankTransfer') {
        creditCardForm.style.display = "none";
        bankTransferForm.style.display = "block";
        paymentStrategy = new BankTransferPayment();
    }
}

// Inputların doluluk kontrolü
function validateInputs(inputs) {
    for (const input of inputs) {
        if (!input.value) {
            alert("Lütfen tüm alanları doldurun.");
            return false;
        }
    }
    return true;
}

// Ödeme işlemini gerçekleştiren method
function makePayment(paymentMethod) {
    const amount = document.getElementById("amount").value;
    // Seçilen stratejiye göre inputları seçer
    const inputs = (paymentMethod === 'creditCard') ?
        document.querySelectorAll("#creditCardForm input") :
        document.querySelectorAll("#bankTransferForm input");

    if (!validateInputs(inputs)) {
        return;
    }

    // Seçilen stratejiye göre gerekli bilgileri alır
    const info = (paymentMethod === 'creditCard') ? {
        cardNumber: document.getElementById("cardNumber").value,
        expirationDate: document.getElementById("expirationDate").value,
        cvv: document.getElementById("cvv").value
    } : document.getElementById("iban").value;

    // Seçilen strategy üzerinden ödemeyi yapar
    const result = paymentStrategy.pay(amount, info);
    alert(result);
    clearForm(inputs);

    // Formları gizler
    const creditCardForm = document.getElementById("creditCardForm");
    const bankTransferForm = document.getElementById("bankTransferForm");
    creditCardForm.style.display = "none";
    bankTransferForm.style.display = "none";
}

// Giriş alanlarını temizleyen method
function clearForm(inputs) {
    for (const input of inputs) {
        input.value = "";
    }
}