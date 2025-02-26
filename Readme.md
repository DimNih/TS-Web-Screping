# Web Scraper dengan TypeScript, Axios, dan Cheerio

 Ini adalah scraper sederhana menggunakan **TypeScript**, **Axios**, dan **Cheerio** untuk mengambil teks dan gambar dari halaman web. Hasil scraping akan disimpan dalam folder berdasarkan nama domain website yang diambil.

---

## Ubah Link Website

Ubah Pada bagian ini:

Ganti sesuai link website yang ingin diambil
```bash

scrapeWebsite('https://en.wikipedia.org/wiki/Roswell_incident');

```


## 📌 Fitur
- Mengambil **judul halaman** dan **teks dari elemen `<p>`**.
- Menyimpan hasil dalam file **`result/{domain}/result.txt`**.
- Mengunduh semua **gambar `<img>`** dan menyimpannya di **`result/{domain}/images/`**.

---

## Run

```bash
npm install
npx ts-node scrape.ts
```
