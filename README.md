# Portfolio Website - Nandya Muhammad Daffa

Website portofolio yang direplikasi secara persis (1:1 pixel-perfect) dari desain Canva aslinya di:
👉 **[hare-qqx45b.my.canva.site](https://hare-qqx45b.my.canva.site/)**

---

## 🌟 Fitur Utama

1. **Desain & Tipografi Persis 100%**:
   - Palet warna identik: Charcoal (`#181818`), Cream/Champagne (`#ebdcc4`), dan Putih (`#ffffff`).
   - Font asli Canva: `League Gothic` untuk headline artistik dan `Arimo` untuk teks isi, dengan file font lokal (`_assets/fonts/`) dan Google Fonts fallback.
   - Efek artistik **Double-layer Hollow Stroke** pada teks "PORTFOLIO" dan "Thank You".

2. **9 Slide / Bagian Lengkap**:
   - **Hero / Home**: Judul artistik "Portfolio" berlapis outline hollow dan nama "NANDYA MUHAMMAD DAFFA".
   - **About Me**: Foto profil berbingkai lingkaran, biografi lengkap lulusan S1 Sistem Informasi, serta info kontak (Email, GitHub, WhatsApp/Telepon).
   - **Education**: Sarjana Sistem Informasi Universitas Harkat Negeri (2022–2026, IPK: 3,35), logo universitas, dan foto kampus.
   - **Skill and Tools**: Grid 9 icon tools & teknologi asli (Python, HTML5, CSS3, Flask, MySQL, Git, VS Code, Figma, Data Tools).
   - **Certificate**: Galeri 6 sertifikat beresolusi tinggi dengan interaksi hover dan modal lightbox.
   - **My Project**: Cover pembuka bagian proyek.
   - **Proyek 1 (Sapphire Residence Tegal)**: Sistem Pendukung Keputusan prediksi harga rumah berbasis Web menggunakan Artificial Neural Network (MLP / Flask) dilengkapi 3 mockup tampilan aplikasi.
   - **Proyek 2 (E-Arsip Bagian Hukum)**: Pengembangan Sistem Informasi Kearsipan Berbasis Web dilengkapi 4 mockup perangkat mobile & desktop.
   - **Thank You / Footer**: Halaman penutup artistik dengan tautan kontak.

3. **Interaktivitas Modern**:
   - **Mode Ganda**: Tombol `Mode Slide` untuk beralih antara tampilan halaman website gulir halus (*Scroll*) dan tampilan presentasi per slide (*Slide-by-Slide*) layaknya Canva asli.
   - **Lightbox Modal**: Klik pada sertifikat atau tangkapan layar proyek untuk melihatnya dalam ukuran penuh dan detail tinggi.
   - **Copy to Clipboard**: Klik pada alamat email atau nomor telepon untuk langsung menyalin dengan notifikasi toast.
   - **Mobile Responsive**: Tampilan responsif sempurna untuk desktop, tablet, dan smartphone dengan hamburger drawer menu.

---

## 🚀 Cara Menjalankan

### Cara 1: Buka Langsung (Tanpa Server)
Cukup buka file `index.html` dengan cara double-click atau drag-and-drop ke browser favorit Anda (Chrome, Edge, Firefox, Safari).

### Cara 2: Menjalankan dengan Node.js Server
Pastikan Node.js terinstal, lalu jalankan di terminal:

```bash
npm start
# atau
node server.js
```

Buka browser di alamat:
```
http://localhost:3000
```

---

## 📁 Struktur Berkas

```
portofolio/
├── index.html            # Halaman utama portofolio
├── css/
│   └── style.css         # Styling, variabel CSS, animasi & responsivitas
├── js/
│   └── main.js           # ScrollSpy, Lightbox modal, Mode Presentasi, & interaksi
├── _assets/
│   ├── media/            # Semua 56+ gambar, foto, logo SVG, dan mockup proyek asli
│   └── fonts/            # Berkas font asli League Gothic & Arimo (WOFF)
├── server.js             # Server HTTP lokal berbasis Node.js murni (zero-dependency)
├── package.json          # Konfigurasi proyek & skrip npm
└── README.md             # Dokumentasi proyek
```

