# Landing Page UMKM "Tnongan" (Multi-Page)

![Tnongan Screenshot](./assets/images/tnongan-demo.gif)

## Deskripsi Proyek

Proyek ini merupakan tugas mata kuliah **Pemrograman Front-End** yang bertujuan untuk membuat sebuah website statis multi-halaman yang modern dan responsif untuk UMKM fiktif **"Tnongan"**. Website ini terdiri dari tiga halaman utama:

1.  **Beranda (`index.html`):** Halaman utama yang berfungsi sebagai *landing page* untuk memperkenalkan brand, menampilkan produk unggulan, testimoni, dan CTA utama.
2.  **Menu (`menu.html`):** Halaman katalog produk interaktif yang memungkinkan pengguna mencari, memfilter berdasarkan kategori, mengurutkan produk berdasarkan nama atau harga, dan menandai produk favorit (*wishlist*).
3.  **Tentang Kami (`about.html`):** Halaman yang menceritakan sejarah Tnongan melalui *timeline*, menyoroti nilai-nilai perusahaan, dan menampilkan lokasi usaha.

UMKM "Tnongan" bergerak di bidang kuliner dengan fokus pada penjualan kue tradisional China yang dijamin 100% Halal. Website ini dirancang dengan pendekatan *mobile-first* dan bertujuan membangun citra profesional, menampilkan produk secara efektif, membangun kepercayaan, serta menyediakan alur pemesanan yang jelas via WhatsApp.

---

## Struktur Proyek

Proyek ini diorganisir dengan struktur folder sebagai berikut:

``` bash
├── index.html       \# Halaman Beranda/Landing Page
├── menu.html        \# Halaman Katalog Produk
├── about.html       \# Halaman Tentang Kami
├── README.md        \# Dokumentasi Proyek
│
└── scripts/         \# Folder untuk file JavaScript
├── data.js          \# Berisi data produk (array of objects)
└── app.js           \# Logika untuk halaman menu (filter, sort, wishlist, render)

```
Pemisahan data produk (`data.js`) dari logika aplikasi (`app.js`) dilakukan untuk memudahkan *maintenance* dan penambahan data di masa mendatang.

---

## Fitur Utama

* **Desain Responsif:** Tampilan optimal di berbagai ukuran layar (mobile, tablet, desktop) menggunakan Tailwind CSS.
* **Navigasi Multi-Halaman:** Header konsisten di semua halaman dengan navigasi yang jelas (Beranda, Menu, Tentang Kami) dan *hamburger menu* untuk mobile.
* **Animasi Halus:** Efek animasi *fade-up* saat *scroll* menggunakan library AOS di semua halaman.
* **Katalog Produk Interaktif (`menu.html`):**
    * **Pencarian:** Filter produk berdasarkan nama atau *tags*.
    * **Filter Kategori:** Menampilkan produk berdasarkan kategori yang dipilih.
    * **Pengurutan:** Urutkan produk berdasarkan Nama (A-Z), Harga Termurah, atau Harga Termahal.
    * **Wishlist:** Tandai produk favorit dengan ikon bintang (★). Pilihan disimpan di `localStorage` browser sehingga tetap ada meski halaman ditutup/di-refresh.
    * **Hitungan Hasil:** Menampilkan jumlah produk yang cocok dengan filter aktif.
* **Halaman Tentang Kami (`about.html`):**
    * *Timeline* sejarah perusahaan yang visual.
    * Penjelasan nilai-nilai inti perusahaan (Konsistensi, Disiplin, Kepercayaan, Tanggung Jawab).
    * Peta lokasi Google Maps yang terintegrasi.
* **Integrasi WhatsApp:** Tombol "Pesan" di setiap produk (halaman menu) dan CTA utama mengarah langsung ke WhatsApp untuk pemesanan.
* **Banner Persetujuan Cookie:** Fitur simulasi *cookie consent* menggunakan JavaScript Cookies untuk tujuan pembelajaran, dengan masa berlaku 1 tahun.

---

## Teknologi yang Digunakan

* **HTML5**: Struktur dan konten semantik halaman web.
* **Tailwind CSS (CDN)**: Framework CSS *utility-first* untuk styling responsif dan modern.
* **JavaScript (ES6+)**: Logika interaktif untuk katalog produk, *wishlist* (`localStorage`), *toggle menu mobile*, dan *banner cookie* (Cookies).

---

## Library & Aset Eksternal (via CDN)

* **Google Fonts (Poppins)**: Tipografi modern dan mudah dibaca.
* **Font Awesome**: Ikon vektor skalabel untuk UI.
* **AOS (Animate On Scroll)**: Library JavaScript untuk animasi saat *scroll*.

---

## Cara Menjalankan Proyek

Website ini sepenuhnya statis.

**Prasyarat:**
* Web browser modern (Chrome, Firefox, Edge, dll.).
* Koneksi internet (untuk memuat Tailwind CSS, Font Awesome, Google Fonts, AOS dari CDN).

**Langkah-langkah:**
1.  Pastikan semua file (`index.html`, `menu.html`, `about.html`, folder `scripts/` beserta isinya) berada dalam struktur folder yang benar.
2.  Buka file **`index.html`** langsung di browser Anda (misal, klik kanan > "Open with" > Pilih browser).
3.  Navigasi antar halaman dapat dilakukan melalui menu di *header*.