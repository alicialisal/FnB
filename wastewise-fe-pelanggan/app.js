// File: app.js

// 1. Fungsi Tambah ke Keranjang
function addToCart(name, price) {
    // Ambil data keranjang lama (jika ada)
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
    
    // Update tampilan badge (notifikasi merah)
    updateBadge();
    alert(`${name} ditambahkan ke keranjang!`);
}

// 2. Fungsi Update Badge di Navigasi
function updateBadge() {
    let cart = JSON.parse(localStorage.getItem('wastewise_cart')) || [];
    let badge = document.getElementById('cart-badge');
    
    if (cart.length > 0) {
        badge.innerText = cart.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// 3. Fungsi Render Keranjang (Untuk halaman cart.html nanti)
function renderCartPage() {
    let cartContainer = document.getElementById('cart-items');
    let totalDisplay = document.getElementById('total-price');
    
    if (!cartContainer) return; // Stop jika bukan di halaman cart

    let cart = JSON.parse(localStorage.getItem('wastewise_cart')) || [];
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `<p class="text-center text-gray-500 mt-10">Keranjangmu kosong :(</p>`;
        totalDisplay.innerText = "Rp0";
        return;
    }

    let html = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        html += `
            <div class="flex justify-between items-center bg-white p-4 rounded-xl mb-3 shadow-sm">
                <div class="flex items-center">
                    <div class="w-12 h-12 bg-gray-200 rounded-lg mr-3"></div> <!-- Placeholder Image -->
                    <div>
                        <h4 class="font-bold text-sm">${item.name}</h4>
                        <p class="text-xs text-gray-500">Rp${item.price} x ${item.qty}</p>
                    </div>
                </div>
                <div class="font-bold text-green-600">Rp${item.price * item.qty}</div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;
    totalDisplay.innerText = `Rp${total}`;
}

// Jalankan saat halaman dimuat
window.onload = function() {
    updateBadge();
    renderCartPage();
};