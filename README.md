# Abel Weather Dashboard

## Deskripsi
Aplikasi dashboard cuaca real-time yang dibangun menggunakan React dan Tailwind CSS. Aplikasi ini memungkinkan pengguna untuk mencari informasi cuaca saat ini, melihat prakiraan cuaca harian, serta mengelola riwayat pencarian kota. Fitur utama meliputi:
- Form input nama kota dengan autocomplete suggestion
- Display cuaca saat ini dengan icon, temperature, humidity, wind speed
- Tabel forecast 5 hari ke depan
- History pencarian kota - simpan di localStorage
- Mode gelap/terang yang dapat diubah
- Toggle unit Celsius atau Fahrenheit

## Nama
Abel Fortino

## NIM
123140111

## Cara Instalasi
1. Pastikan Anda memiliki Node.js dan npm terinstal di sistem Anda.
2. Clone repository ini:
   ```
   git clone https://github.com/AbelFortino/uts-pemweb-123140111/
   ```
3. Masuk ke direktori proyek:
   ```
   cd abel-weather-dashboard
   ```
4. Instal dependensi:
   ```
   npm install
   ```
5. Jalankan aplikasi dalam mode development:
   ```
   npm start
   ```
6. Buka browser dan akses http://localhost:3000

## Link Deployment
Aplikasi ini telah di-deploy di Vercel. Akses melalui: [Masukkan link deployment Vercel Anda di sini]

## Screenshot
### Tampilan Utama (Light Mode)
![Tampilan Utama Light Mode](screenshots/light-mode.png)

### Tampilan Utama (Dark Mode)
![Tampilan Utama Dark Mode](screenshots/dark-mode.png)

### Pencarian Kota
![Pencarian Kota](screenshots/search.png)

### Prakiraan Cuaca
![Prakiraan Cuaca](screenshots/forecast.png)

*Catatan: Screenshot dapat ditambahkan dengan menyimpan gambar di folder `screenshots/` dan mengupdate path di atas.*

## Teknologi yang Digunakan
- **React**: Library JavaScript untuk membangun user interface
- **Tailwind CSS**: Framework CSS untuk styling
- **Lucide React**: Library ikon
- **OpenWeatherMap API**: Sumber data cuaca
- **Vercel**: Platform deployment

## Fitur Utama
- ✅ Pencarian cuaca real-time berdasarkan nama kota
- ✅ Tampilan cuaca saat ini dengan ikon dan detail lengkap
- ✅ Prakiraan cuaca 5 hari dalam format tabel
- ✅ Riwayat pencarian kota dengan opsi clear
- ✅ Toggle mode gelap/terang
- ✅ Autocomplete pada input pencarian
- ✅ Toggle unit suhu (Celsius/Fahrenheit)

## Struktur Proyek
```
abel-weather-dashboard/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── SearchForm.jsx
│   │   ├── CurrentWeather.jsx
│   │   ├── ForecastTable.jsx
│   │   ├── SearchHistory.jsx
│   │   └── WeatherIcon.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── screenshots/
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
