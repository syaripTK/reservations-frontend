# AssetFlow

**AssetFlow** adalah sistem manajemen aset dan reservasi modern yang dirancang untuk memudahkan pengelolaan inventaris dan proses peminjaman barang secara efisien. Dibangun dengan teknologi web terbaru untuk memberikan pengalaman pengguna yang responsif, cepat, dan premium.

---

## Alur Kerja Aplikasi (Workflow)

Aplikasi AssetFlow mengikuti siklus hidup aset yang terstruktur untuk menjamin transparansi dan efisiensi:

1.  **Inisialisasi & Keamanan**: Pengguna masuk melalui sistem login berbasis JWT. Sistem melakukan *Role Check* untuk menentukan wewenang (Admin vs User/Staff).
2.  **Manajemen Data Master**: Sebelum menginput aset, Admin menyiapkan referensi data master seperti **Kategori**, **Lokasi**, dan **Vendor** untuk menjaga konsistensi data.
3.  **Registrasi & Inventarisasi**: Admin memasukkan detail aset (Merk, Nomor Seri, Harga). Sistem menghasilkan *Unique ID* untuk setiap item guna pelacakan individu.
4.  **Tracking & Mutasi**: Setiap perpindahan aset (Check-in/Check-out) dicatat dalam riwayat (Log). Memastikan informasi "Siapa penanggung jawabnya" dan "Di mana posisinya" selalu akurat.
5.  **Pemeliharaan (Maintenance)**: Pembaruan kondisi aset (Baik, Rusak, Servis) secara berkala. Sistem memberikan pengingat untuk jadwal servis rutin.
6.  **Analisis & Audit**: Visualisasi data melalui Dashboard Analytics untuk memantau total nilai aset, distribusi lokasi, dan status pemeliharaan.

---

## Fitur Berdasarkan Peran

### Administrator (Wewenang Penuh)
- **Setup Data Master**: Mengelola referensi Kategori, Lokasi, dan Vendor.
- **Manajemen Inventaris**: Melakukan registrasi aset baru, memperbarui informasi aset, dan menghapus data.
- **Otorisasi Reservasi**: Menyetujui atau menolak permintaan peminjaman (Check-out) dari User.
- **Manajemen Pengguna**: Mengelola akun staff, aktivasi, dan perubahan peran.
- **Audit & Laporan**: Mengakses dashboard statistik lengkap untuk kebutuhan audit internal.

### User / Staff
- **Discovery & Search**: Mencari aset yang tersedia berdasarkan kategori atau nama.
- **Request Reservasi**: Melakukan proses *Check-out* aset untuk kebutuhan operasional.
- **Update Kondisi**: Melaporkan kondisi aset atau mengajukan kebutuhan servis jika terjadi kerusakan.
- **Personal Log**: Melihat riwayat peminjaman dan status aset yang sedang dibawa.

---


## Teknologi yang Digunakan

| Teknologi | Kegunaan |
| :--- | :--- |
| **React 18** | Framework UI utama |
| **Rsbuild** | Build tool super cepat berbasis Rust |
| **GSAP** | Animasi micro-interaction yang halus |
| **Lucide React** | Set ikon yang modern dan konsisten |
| **Chart.js** | Visualisasi data dan statistik di Dashboard |
| **Axios** | Integrasi API dengan interceptors |
| **SweetAlert2** | Notifikasi dan dialog yang interaktif |
| **Biome** | Linting dan formatting kode yang ultra-cepat |

---

## Instalasi & Persiapan

### Prasyarat
- **Node.js** (versi 18 ke atas disarankan)
- **NPM** atau **Yarn**

### Langkah-langkah
1. **Clone repositori**
   ```bash
   git clone <url-repository>
   cd finalexam-frontend
   ```

2. **Instal dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**
   Buat file `.env` di root direktori dan sesuaikan:
   ```env
   PUBLIC_API_URL=https://api-reservations-production.up.railway.app
   ```

4. **Jalankan aplikasi (Mode Development)**
   ```bash
   npm run dev
   ```

5. **Build untuk Produksi**
   ```bash
   npm run build
   ```

---

## Struktur Proyek

```text
src/
├── assets/      # Gambar dan file statis
├── component/   # Komponen UI reusable (Sidebar, Navbar, dll)
├── hooks/       # Custom React hooks
├── pages/       # Halaman-halaman utama (Dashboard, Assets, Users)
├── utils/       # Utility functions dan Route Guards
└── App.jsx      # Konfigurasi rute utama
```

---

## Skrip yang Tersedia

- `npm run dev`: Menjalankan server pengembangan dengan hot reload.
- `npm run build`: Membangun aplikasi untuk produksi di folder `dist`.
- `npm run preview`: Melihat hasil build lokal sebelum deployment.
- `npm run format`: Merapikan kode menggunakan Prettier/Biome.
- `npm run test`: Menjalankan unit test menggunakan Rstest.

---

## Keamanan & Optimasi
- **JWT Authentication**: Keamanan data menggunakan token JWT.
- **Route Guarding**: Memastikan pengguna tidak dapat mengakses halaman yang bukan haknya.
- **Responsive Layout**: Optimal untuk tampilan mobile, tablet, dan desktop.

---

© 2026 AssetFlow - Final Exam Project
