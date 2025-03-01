function getJadwal() {
    const city = document.getElementById("city").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;

    if (!city || !month || !year) {
      alert("Masukkan nama kota, bulan, dan tahun!");
      return;
    }

    fetch(`https://api.aladhan.com/v1/calendarByCity?city=${city}&country=Indonesia&method=2&month=${month}&year=${year}`)
      .then(response => response.json())
      .then(data => {
        if (data.code !== 200) {
          alert("Data tidak ditemukan!");
          return;
        }

        let tableContent = `
          <h3>Jadwal Shalat untuk ${city} - ${document.getElementById("month").options[document.getElementById("month").selectedIndex].text} ${year}</h3>
          <table>
            <tr>
              <th>Tanggal</th>
              <th>Imsak</th>
              <th>Subuh</th>
              <th>Dzuhur</th>
              <th>Ashar</th>
              <th>Maghrib</th>
              <th>Isya</th>
            </tr>
        `;

        data.data.forEach(day => {
          tableContent += `
            <tr>
              <td>${day.date.gregorian.date}</td>
              <td>${day.timings.Imsak}</td>
              <td>${day.timings.Fajr}</td>
              <td>${day.timings.Dhuhr}</td>
              <td>${day.timings.Asr}</td>
              <td>${day.timings.Maghrib}</td>
              <td>${day.timings.Isha}</td>
            </tr>
          `;
        });

        tableContent += "</table>";
        document.getElementById("jadwal-container").innerHTML = tableContent;
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        alert("Gagal mengambil data!");
      });
}