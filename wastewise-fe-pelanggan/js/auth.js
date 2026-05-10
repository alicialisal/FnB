// ========== TOGGLE PASSWORD ==========
function togglePassword(el) {
  const input = el.parentElement.querySelector("input");
  const icon = el.querySelector("i");

  if (!input || !icon) return;

  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

// ========== SOCIAL LOGIN ==========
function socialLogin(provider) {
  alert(`Login dengan ${provider} akan segera tersedia!`);
}

// ========== SOCIAL REGISTER ==========
function socialRegister(provider) {
  alert(`Daftar dengan ${provider} akan segera tersedia!`);
}

// ========== VALIDATION FUNCTIONS ==========
function validatePhone(phone) {
  const regex = /^[0-9]+$/;
  return regex.test(phone) && phone.length >= 10 && phone.length <= 13;
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validateName(name) {
  return name.trim().length >= 3;
}

function showError(wrapper, errorEl) {
  if (wrapper) wrapper.classList.add("input-error");
  if (errorEl) errorEl.classList.remove("hidden");
}

function hideError(wrapper, errorEl) {
  if (wrapper) wrapper.classList.remove("input-error");
  if (errorEl) errorEl.classList.add("hidden");
}

// ========== WAIT FOR DOM LOADED ==========
document.addEventListener("DOMContentLoaded", function () {
  
  // ========== LOGIN FORM (index.html di ROOT) ==========
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const phoneInput = document.getElementById("phone");
    const passwordInput = document.getElementById("password");
    const phoneWrapper = document.getElementById("phoneWrapper");
    const passwordWrapper = document.getElementById("passwordWrapper");
    const phoneError = document.getElementById("phoneError");
    const passwordError = document.getElementById("passwordError");
    const loginButton = document.getElementById("loginButton");

    // Real-time validation: Phone (only numbers)
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        if (validatePhone(this.value.trim())) {
          hideError(phoneWrapper, phoneError);
        }
      });
    }

    // Real-time validation: Password
    if (passwordInput) {
      passwordInput.addEventListener("input", function () {
        if (validatePassword(this.value.trim())) {
          hideError(passwordWrapper, passwordError);
        }
      });
    }

    // Submit handler
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const phone = phoneInput.value.trim();
      const password = passwordInput.value.trim();

      let isValid = true;

      if (!validatePhone(phone)) {
        showError(phoneWrapper, phoneError);
        isValid = false;
      } else {
        hideError(phoneWrapper, phoneError);
      }

      if (!validatePassword(password)) {
        showError(passwordWrapper, passwordError);
        isValid = false;
      } else {
        hideError(passwordWrapper, passwordError);
      }

      if (!isValid) return;

      // Loading state
      loginButton.disabled = true;
      const originalButtonText = loginButton.innerText;
      loginButton.innerText = "Memproses...";

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simpan data user ke localStorage
        const userData = {
          phone: phone,
          isLoggedIn: true,
          loginTime: new Date().toISOString(),
          name: "Pelanggan",
        };

        localStorage.setItem("wastewise_pelanggan_user", JSON.stringify(userData));

        alert("Login berhasil!");
        
        // ✅ REDIRECT ke dashboard (ada di folder Pages)
        window.location.href = "Pages/dashboard.html";
        
      } catch (error) {
        console.error("Login error:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        loginButton.disabled = false;
        loginButton.innerText = originalButtonText;
      }
    });
  }

  // ========== SIGNUP FORM (Pages/signup.html) ==========
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const phoneWrapper = document.getElementById("phoneWrapper");
    const passwordWrapper = document.getElementById("passwordWrapper");
    const confirmPasswordWrapper = document.getElementById("confirmPasswordWrapper");

    const nameError = document.getElementById("nameError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    const signupButton = document.getElementById("signupButton");

    // Real-time validation: Phone
    if (phoneInput) {
      phoneInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        if (validatePhone(this.value.trim())) {
          hideError(phoneWrapper, phoneError);
        }
      });
    }

    // Real-time validation: Password
    if (passwordInput) {
      passwordInput.addEventListener("input", function () {
        if (validatePassword(this.value.trim())) {
          hideError(passwordWrapper, passwordError);
        }
        // Check password match
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
          showError(confirmPasswordWrapper, confirmPasswordError);
        } else {
          hideError(confirmPasswordWrapper, confirmPasswordError);
        }
      });
    }

    // Real-time validation: Confirm Password
    if (confirmPasswordInput) {
      confirmPasswordInput.addEventListener("input", function () {
        if (this.value !== passwordInput.value) {
          showError(confirmPasswordWrapper, confirmPasswordError);
        } else {
          hideError(confirmPasswordWrapper, confirmPasswordError);
        }
      });
    }

    // Submit handler
    signupForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = confirmPasswordInput.value.trim();

      let isValid = true;

      if (!validateName(name)) {
        showError(null, nameError);
        isValid = false;
      } else {
        hideError(null, nameError);
      }

      if (!validatePhone(phone)) {
        showError(phoneWrapper, phoneError);
        isValid = false;
      } else {
        hideError(phoneWrapper, phoneError);
      }

      if (!validateEmail(email)) {
        showError(null, emailError);
        isValid = false;
      } else {
        hideError(null, emailError);
      }

      if (!validatePassword(password)) {
        showError(passwordWrapper, passwordError);
        isValid = false;
      } else {
        hideError(passwordWrapper, passwordError);
      }

      if (password !== confirmPassword) {
        showError(confirmPasswordWrapper, confirmPasswordError);
        isValid = false;
      } else {
        hideError(confirmPasswordWrapper, confirmPasswordError);
      }

      if (!isValid) return;

      // Loading state
      signupButton.disabled = true;
      const originalButtonText = signupButton.innerText;
      signupButton.innerText = "Mendaftar...";

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Save to localStorage
        const userData = {
          name: name,
          phone: phone,
          email: email,
          isLoggedIn: true,
          registerTime: new Date().toISOString(),
        };

        localStorage.setItem("wastewise_pelanggan_user", JSON.stringify(userData));

        alert("Pendaftaran berhasil! Silakan login.");
        
        // ✅ REDIRECT ke index.html (ada di ROOT)
        window.location.href = "../index.html";
        
      } catch (error) {
        console.error("Signup error:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      } finally {
        signupButton.disabled = false;
        signupButton.innerText = originalButtonText;
      }
    });
  }

  // ========== FORGOT PASSWORD FORM (Pages/lupakatasandi.html) ==========
  const forgotForm = document.getElementById("forgotForm");
  if (forgotForm) {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const submitBtn = document.getElementById("submitBtn");
    const successMsg = document.getElementById("successMsg");

    // Real-time validation: Email
    if (emailInput) {
      emailInput.addEventListener("input", function () {
        if (validateEmail(this.value.trim())) {
          hideError(null, emailError);
        }
      });
    }

    // Submit handler
    forgotForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      successMsg.classList.add("hidden");

      if (!validateEmail(email)) {
        showError(null, emailError);
        return;
      } else {
        hideError(null, emailError);
      }

      // Loading state
      submitBtn.disabled = true;
      const originalButtonText = submitBtn.innerText;
      submitBtn.innerText = "Mengirim...";

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        successMsg.classList.remove("hidden");
        emailInput.value = "";
      } catch (err) {
        console.error("Forgot password error:", err);
        alert("Gagal mengirim email reset password");
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = originalButtonText;
      }
    });
  }
});