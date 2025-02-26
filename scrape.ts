import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

async function downloadImage(url: string, savePath: string) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(savePath, response.data);
    console.log(`Gambar disimpan: ${savePath}`);
  } catch (error) {
    console.error(`Gagal mengunduh gambar: ${url}`, error);
  }
}


async function scrapeWebsite(url: string): Promise<void> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Buat folder result/{domain}
    const websiteDomain = new URL(url).hostname;
    const folderPath = path.join(__dirname, 'result', websiteDomain);
    const imageFolder = path.join(folderPath, 'images');

    // validasi
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
    if (!fs.existsSync(imageFolder)) fs.mkdirSync(imageFolder);

    // Ambil semua teks dalam elemen <p>
    let result = '';

    // Ambil judul halaman
    const title = $('title').text();
    result += `Judul halaman: ${title}\n\n`;

    // Ambil semua teks dalam elemen <p>
    $('p').each((i, elem) => {
      result += `Paragraf ${i + 1}: ${$(elem).text()}\n\n`;
    });

    // Simpan teks ke result/{domain}/result.txt
    const filePath = path.join(folderPath, 'result.txt');
    fs.writeFileSync(filePath, result, 'utf8');
    console.log(`Hasil scraping berhasil disimpan di ${filePath}`);

    // Ambil semua gambar <img>
    $('img').each((i, elem) => {
      let imgSrc = $(elem).attr('src');

      if (imgSrc) {
        if (!imgSrc.startsWith('http')) {
          const baseUrl = new URL(url);
          imgSrc = baseUrl.origin + imgSrc;
        }

        const imgName = `image_${i + 1}.jpg`;
        const savePath = path.join(imageFolder, imgName);

        // Unduh gambar
        downloadImage(imgSrc, savePath);
      }
    });

  } catch (error) {
    console.error('Error saat scraping website:', error);
  }
}

// Ubah URL sesuai dengan website yang ingin di-scrape
scrapeWebsite('https://en.wikipedia.org/wiki/Roswell_incident');
