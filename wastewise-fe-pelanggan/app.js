// File: app.js - VERSI DIPERBAIKI

// ========== VALIDASI & LOGIN ==========

// Tunggu sampai DOM fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Setup Login Form
    const loginForm = document.getElementById('loginForm');
    const phoneInput = document.getElementById('phoneInput');
    const passwordInput = document.getElementById('passwordInput');
    const loginButton = document.getElementById('loginButton');
    
    if (loginForm) {
        // Validasi real-time untuk phone (hanya angka)
        phoneInput.addEventListener('input', function(e) {
            // Hapus semua yang bukan angka
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Validasi panjang
            if (this.value.length > 0 && this.value.length < 10) {
                showError('phoneError', true);
                this.classList.add('input-error');
            } else {
                showError('phoneError', false);
                this.classList.remove('input-error');
            }
        });
        
        // Validasi password
        passwordInput.addEventListener('input', function(e) {
            if (this.value.length > 0 && this.value.length < 6) {
                showError('passwordError', true);
                this.classList.add('input-error');
            } else {
                showError('passwordError', false);
                this.classList.remove('input-error');
            }
        });
        
        // Handle Form Submit
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Mencegah reload halaman
            
            const phone = phoneInput.value;
            const password = passwordInput.value;
            
            // Validasi final
            let isValid = true;
            
            if (!phone || phone.length < 10 || !/^\d+$/.test(phone)) {
                showError('phoneError', true);
                phoneInput.classList.add('input-error');
                isValid = false;
            }
            
            if (!password || password.length < 6) {
                showError('passwordError', true);
                passwordInput.classList.add('input-error');
                isValid = false;
            }
            
            if (isValid) {
                // Disable tombol saat proses login
                loginButton.disabled = true;
                loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
                
                // Simulasi login (nanti bisa diganti dengan API call)
                setTimeout(() => {
                    // Simpan data user ke localStorage
                    localStorage.setItem('wastewise_user', JSON.stringify({
                        phone: phone,
                        isLoggedIn: true,
                        loginTime: new Date().toISOString()
                    }));
                    
                    // Redirect ke dashboard
                    window.location.href = 'dashboard.html';
                }, 1000);
            }
        });
    }
});

// Fungsi tampilkan error
function showError(elementId, show) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        if (show) {
            errorElement.classList.remove('hidden');
        } else {
            errorElement.classList.add('hidden');
        }
    }
}

// Fungsi Social Login
function socialLogin(provider) {
    alert(`Login dengan ${provider} akan segera tersedia!`);
}

// ========== FUNGSI KERANJANG ==========

function addToCart(name, price) {
    // Ambil data keranjang lama
    let cart = JSON.parse(localStorage.getItem('wastewise_cart')) || [];
    
    // Cek apakah produk sudah ada
    let existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ name: name, price: price, qty: 1 });
    }

    // Simpan lagi
    localStorage.setItem('wastewise_cart', JSON.stringify(cart));
    
    // Update tampilan badge
    updateBadge();
    
    // Feedback visual
    alert(`✅ ${name} ditambahkan ke keranjang!`);
}

function updateBadge() {
    let cart = JSON.parse(localStorage.getItem('wastewise_cart')) || [];
    let badge = document.getElementById('cart-badge');
    
    if (cart.length > 0) {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        badge.innerText = totalItems;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function renderCartPage() {
    let cartContainer = document.getElementById('cart-items');
    let totalDisplay = document.getElementById('total-price');
    
    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem('wastewise_cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center mt-10">
                <i class="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500">Keranjangmu masih kosong</p>
                <a href="dashboard.html" class="inline-block mt-4 text-green-600 font-semibold text-sm">
                    Mulai Belanja →
                </a>
            </div>
        `;
        if (totalDisplay) totalDisplay.innerText = "Rp0";
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        html += `
            <div class="flex justify-between items-center bg-white p-4 rounded-xl mb-3 shadow-sm">
                <div class="flex items-center flex-1">
                    <div class="w-16 h-16 bg-gray-200 rounded-lg mr-3 flex-shrink-0"></div>
                    <div class="flex-1">
                        <h4 class="font-bold text-sm text-gray-800">${item.name}</h4>
                        <p class="text-xs text-gray-500">Rp${item.price.toLocaleString('id-ID')} x ${item.qty}</p>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-bold text-green-700 text-sm">Rp${(item.price * item.qty).toLocaleString('id-ID')}</div>
                    <button onclick="removeFromCart(${index})" class="text-xs text-red-500 mt-1 hover:underline">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    if (totalDisplay) totalDisplay.innerText = `Rp${total.toLocaleString('id-ID')}`;
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('wastewise_cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('wastewise_cart', JSON.stringify(cart));
    renderCartPage();
    updateBadge();
}

// Jalankan saat halaman dimuat
window.onload = function() {
    updateBadge();
    renderCartPage();
};