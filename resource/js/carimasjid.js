if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Inisialisasi peta
        const map = L.map('map').setView([lat, lon], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        // Tandai lokasi pengguna
        L.marker([lat, lon]).addTo(map)
            .bindPopup("Lokasi Anda").openPopup();
        
        // Panggil Overpass API untuk mencari hanya masjid dalam radius 1 km
        const query = `[out:json];
            (
                node["amenity"="place_of_worship"]["religion"="muslim"](around:1000, ${lat}, ${lon});
                way["amenity"="place_of_worship"]["religion"="muslim"](around:1000, ${lat}, ${lon});
                relation["amenity"="place_of_worship"]["religion"="muslim"](around:1000, ${lat}, ${lon});
            );
            out center;`;
        
        fetch("https://overpass-api.de/api/interpreter?data=" + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => {
                const bounds = [];
                data.elements.forEach(element => {
                    const lat = element.lat || element.center.lat;
                    const lon = element.lon || element.center.lon;
                    bounds.push([lat, lon]);
                    L.marker([lat, lon]).addTo(map)
                        .bindPopup(element.tags.name || "Masjid tanpa nama");
                });
                if (bounds.length) {
                    map.fitBounds(bounds);
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    }, error => {
        alert("Mohon izinkan akses lokasi agar sistem dapat menemukan masjid terdekat.");
    });
} else {
    alert("Geolocation tidak didukung oleh browser ini.");
}