const surahList = document.getElementById("surah-list");
const ayatContainer = document.getElementById("ayat-container");

// Fetch daftar surah dari API EQuran.id
async function fetchSurahList() {
    try {
        let response = await fetch("https://equran.id/api/surat");
        let data = await response.json();

        data.forEach(surah => {
            let option = document.createElement("option");
            option.value = surah.nomor;
            option.textContent = `${surah.nomor}. ${surah.nama_latin}`;
            surahList.appendChild(option);
        });

        console.log("Daftar surah berhasil dimuat");
    } catch (error) {
        console.error("Gagal mengambil daftar surah:", error);
    }
}

// Ambil ayat dari surah yang dipilih (teks Arab + terjemahan)
async function fetchAyat(surahNumber) {
    try {
        ayatContainer.innerHTML = "<p>Loading...</p>";

        let response = await fetch(`https://equran.id/api/surat/${surahNumber}`);
        let data = await response.json();

        ayatContainer.innerHTML = "";
        data.ayat.forEach(ayat => {
            const ayatDiv = document.createElement("div");
            ayatDiv.classList.add("ayat");

            ayatDiv.innerHTML = `
                <span class="ayat-number">Ayat ${ayat.nomor}:</span>
                <p class="arab">${ayat.ar}</p>
                <p class="terjemahan">➝ ${ayat.idn}</p>
            `;
            ayatContainer.appendChild(ayatDiv);
        });

        console.log(`Surah ${surahNumber} berhasil dimuat`);
    } catch (error) {
        ayatContainer.innerHTML = "<p style='color: red;'>Gagal memuat ayat!</p>";
        console.error("Gagal mengambil ayat:", error);
    }
}

async function fetchRandomAyat() {
    try {
        // Fetch the list of Surahs
        let surahResponse = await fetch("https://equran.id/api/surat");
        let surahData = await surahResponse.json();

        // Select a random Surah
        let randomSurah = surahData[Math.floor(Math.random() * surahData.length)];
        let surahNumber = randomSurah.nomor;

        // Fetch the Ayats of the selected Surah
        let ayatResponse = await fetch(`https://equran.id/api/surat/${surahNumber}`);
        let ayatData = await ayatResponse.json();

        // Select a random Ayat from the Surah
        let randomAyat = ayatData.ayat[Math.floor(Math.random() * ayatData.ayat.length)];

        // Display the random Ayat
        document.getElementById("surah-info").textContent = `${randomSurah.nama_latin} (${randomSurah.nama}) - Ayat ${randomAyat.nomor}`;
        document.getElementById("ayat").textContent = randomAyat.ar;
        document.getElementById("ayat-translation").textContent = `➝ ${randomAyat.idn}`;

        console.log("Random Ayat berhasil dimuat");
    } catch (error) {
        console.error("Gagal mengambil random Ayat:", error);
    }
}

// Event listener saat surah dipilih
surahList.addEventListener("change", function() {
    const surahNumber = this.value;
    if (surahNumber) {
        fetchAyat(surahNumber);
    }
});

// Load daftar surah dan random ayat saat halaman dimuat
fetchSurahList();
fetchRandomAyat();