// Kullanıcı adını validasyonu
function validateUsername(username) {
    const usernameRegex = /^(?=.*\d)[a-zA-Z0-9]{4,}$/;
    return usernameRegex.test(username);
}

// E-posta validasyonu
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Şifrenin validasyonu
function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{8,}$/;
    return passwordRegex.test(password);
}

// Doğrulayıcı sınıf
class Validator {
    constructor() {
        this.successor = null;
    }

    // Sıradaki halkayı setleyen method
    setSuccessor(successor) {
        this.successor = successor;
    }

    // Sıradaki halkaya geçişi yapan method
    handleRequest(data, type) {
        if (this.successor) {
            return this.successor.handleRequest(data, type);
        }
        return true;
    }
}

// Kullanıcı adı sınıfı
class UsernameValidator extends Validator {
    handleRequest(data, type) {
        if (type === "username") {
            if (!validateUsername(data)) {
                alert("Kullanıcı adı en az 4 karakter olmalı ve en az bir rakam içermelidir.");
                return false;
            }
        }
        return super.handleRequest(data, type);
    }
}

// E-posta sınıfı
class EmailValidator extends Validator {
    handleRequest(data, type) {
        if (type === "email") {
            if (!validateEmail(data)) {
                alert("Lütfen geçerli bir e-posta adresi giriniz.");
                return false;
            }
        }
        return super.handleRequest(data, type);
    }
}

// Şifre sınıfı
class PasswordValidator extends Validator {
    handleRequest(data, type) {
        if (type === "password") {
            if (!validatePassword(data)) {
                alert("Şifre en az 8 karakter olmalı ve en az bir rakam içermelidir.");
                return false;
            }
        }
        return super.handleRequest(data, type);
    }
}

// Formu valide eden fonksiyon.
function validateForm() {
    // Inputlardan değerler alınıp constantlara atılıyor
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Constantlara sınıflar atanıyor
    const usernameValidator = new UsernameValidator();
    const emailValidator = new EmailValidator();
    const passwordValidator = new PasswordValidator();

    // Zincirin halkaları birbirine bağlanıyor
    usernameValidator.setSuccessor(emailValidator);
    emailValidator.setSuccessor(passwordValidator);

    // Bir constanta ilgili halkalardan dönen değerler atanıyor
    const isFormValid = usernameValidator.handleRequest(username, "username") &&
        emailValidator.handleRequest(email, "email") &&
        passwordValidator.handleRequest(password, "password");

    // Zincir başarı ile tamamlanırsa alertte girilen bilgiler basılıyor
    if (isFormValid) {
        alert("Kayıt başarılı!\n\nKullanıcı adı: " + username + "\nE-posta: " + email + "\nŞifre: " + password);
        //Formu resetliyor
        document.getElementById("registrationForm").reset();
    }
}