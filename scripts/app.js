// File: scripts/app.js
// Berisi logika untuk filter, sort, wishlist, dan render produk di menu.html

// ----- Elemen DOM -----
const $list = document.getElementById("list");
const $search = document.getElementById("search");
const $category = document.getElementById("category");
const $sort = document.getElementById("sort");
const $count = document.getElementById("count");

// ----- Wishlist (LocalStorage) -----
const LS_WISHLIST = "tnongan_wishlist";
const getWishlist = () => JSON.parse(localStorage.getItem(LS_WISHLIST) || "[]");
const setWishlist = (ids) => localStorage.setItem(LS_WISHLIST, JSON.stringify(ids));
let wishlist = getWishlist();

// ----- State Filter / Sort -----
let state = {
    q: "", // keyword
    category: "ALL",
    sort: "name-asc",
};

// ----- Utility -----
const currency = (n) => "Rp " + Number(n).toLocaleString("id-ID");

function uniqueCategories(items) {
    return Array.from(new Set(items.map((p) => p.category))).sort();
}

// ----- Render Kategori (dinamis dari data) -----
function renderCategoryOptions() {
    const cats = uniqueCategories(products);
    // hapus opsi lama (kecuali "ALL")
    [...$category.querySelectorAll("option")]
        .filter((opt) => opt.value !== "ALL")
        .forEach((opt) => opt.remove());

    // tambah opsi dari data
    cats.forEach((c) => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        $category.appendChild(opt);
    });
}

// ----- Template Card Produk (Versi Tailwind CSS) -----
// Ini adalah fungsi KUNCI yang dimodifikasi untuk output Tailwind
function productCard(p) {
    const isFav = wishlist.includes(p.id);
    const li = document.createElement("li");

    // Menggunakan kelas Tailwind yang sama dengan index.html
    li.className = "bg-white rounded-lg shadow-lg overflow-hidden group";
    li.setAttribute("data-aos", "fade-up"); // Menambahkan animasi AOS

    li.innerHTML = `
    <div class="relative">
      <img src="${p.image.trim()}" alt="${p.name}" class="w-full h-56 object-cover">
      ${p.tags.includes("best seller")
            ? '<span class="absolute top-3 right-3 bg-amber-500 text-stone-900 text-sm font-semibold px-3 py-1 rounded-full">Best Seller</span>'
            : p.tags.includes("signature")
                ? '<span class="absolute top-3 right-3 bg-red-700 text-white text-sm font-semibold px-3 py-1 rounded-full">Signature</span>'
                : ""
        }
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2">${p.name}</h3>
      <p class="text-sm text-stone-500 mb-3">${p.category}</p>
      <div class="flex justify-between items-center">
        <span class="text-lg font-bold text-red-800">${currency(p.price)}</span>
        
        <div class="flex items-center space-x-2">
            <button 
              class="fav text-2xl ${isFav ? 'text-amber-500' : 'text-stone-300'} hover:text-amber-500 transition-colors" 
              data-id="${p.id}" 
              data-active="${isFav}" 
              aria-label="Tambahkan ke favorit"
            >
              ★
            </button>
            <a 
              href="https://wa.me/6281234567890?text=Halo%2C%20saya%20tertarik%20memesan%20${p.name}" 
              target="_blank"
              class="add-cart bg-stone-800 text-white px-4 py-2 rounded-full text-sm hover:bg-stone-900 transition-colors" 
              data-id="${p.id}"
            >
              Pesan
            </a>
        </div>
      </div>
    </div>
  `;
    return li;
}

// ----- Render Produk -----
function renderProducts(items) {
    console.time("renderProducts");
    $list.innerHTML = "";
    items.forEach((p) => $list.appendChild(productCard(p)));
    $count.textContent = `Hasil: ${items.length}`;
    console.table(items.map(p => ({ Name: p.name, Category: p.category, Price: p.price })));
    console.timeEnd("renderProducts");

    // Re-inisialisasi AOS untuk elemen yang baru ditambahkan
    // Perlu sedikit delay agar DOM update
    setTimeout(() => {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }, 100);
}

// ----- Terapkan Filter & Sort -----
function applyFilter() {
    const q = state.q.toLowerCase().trim();
    const cat = state.category;
    const sortKey = state.sort;

    console.group("Filter");
    console.log("keyword:", q, "| category:", cat, "| sort:", sortKey);

    let filtered = products.filter((p) => {
        // Mencocokkan nama DAN tags
        const matchText = p.name.toLowerCase().includes(q) ||
            p.tags.some(tag => tag.toLowerCase().includes(q));
        const matchCat = cat === "ALL" || p.category === cat;
        return matchText && matchCat;
    });

    // Sorting
    switch (sortKey) {
        case "name-asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
        case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
        default:
            break;
    }

    console.groupEnd();
    renderProducts(filtered);
}

// ----- Event Listeners -----
if ($search) {
    $search.addEventListener("input", (e) => {
        state.q = e.target.value;
        applyFilter();
    });
}

if ($category) {
    $category.addEventListener("change", (e) => {
        state.category = e.target.value;
        applyFilter();
    });
}

if ($sort) {
    $sort.addEventListener("change", (e) => {
        state.sort = e.target.value;
        applyFilter();
    });
}

// Delegasi klik untuk aksi favorit
document.addEventListener("click", (e) => {
    const favButton = e.target.closest(".fav");
    if (favButton) {
        const id = Number(favButton.dataset.id);
        const isFav = wishlist.includes(id);
        wishlist = isFav ? wishlist.filter((x) => x !== id) : [...wishlist, id];
        setWishlist(wishlist);

        console.log(`Produk id=${id} favorit?`, !isFav);

        // Update tombol secara instan tanpa re-render penuh
        favButton.dataset.active = !isFav;
        favButton.classList.toggle('text-amber-500', !isFav);
        favButton.classList.toggle('text-stone-300', isFav);
    }
});

// ----- Init -----
(function init() {
    // Hanya jalankan init jika kita berada di halaman menu
    if (document.getElementById("katalog-controls")) {
        console.log("Inisialisasi Katalog Tnongan...");
        renderCategoryOptions();
        applyFilter();
    }
})();