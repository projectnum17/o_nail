const locationFlow = () => {
    const filterFlow = () => {
        const filterButton = document.querySelectorAll('.js-location');
        if (!filterButton.length) return;

        filterButton[0].classList.add('active');

        filterButton.forEach((btn) => {
            btn.addEventListener('click', () => {
                const isActive = btn.classList.contains('active');

                filterButton.forEach((item) => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    btn.classList.add('active');
                }
            });
        });
    };

    const partnerFlow = () => {
        const buttonMore = document.querySelector('.js-partners-more');
        if (!buttonMore) return;

        const partnerCards = document.querySelectorAll('.partners__card');
        if (!partnerCards.length) return;

        let hasHiddenCards = false;

        partnerCards.forEach((card, i) => {
            if (i > 17) {
                card.style.display = 'none';
                hasHiddenCards = true;
            }
        });

        if (hasHiddenCards) {
            buttonMore.style.display = '';
            buttonMore.addEventListener('click', () => {
                partnerCards.forEach((card) => {
                    card.style.display = '';
                });
                buttonMore.style.display = 'none';
            });
        } else {
            buttonMore.style.display = 'none';
        }
    };

    const scrollBox = () => {
        const mapBox = document.querySelector('.location__map-box');

        if (!mapBox) return;

        mapBox.addEventListener('scroll', function () {
            const scrollBottom = mapBox.scrollTop + mapBox.clientHeight;
            const scrollHeight = mapBox.scrollHeight;

            if (scrollBottom >= scrollHeight - 1) {
                mapBox.classList.add('end');
            } else {
                mapBox.classList.remove('end');
            }
        });
    };

    const mapFlow = () => {
        const storesData = document.querySelector('#stores-data');
        const mapContainer = document.querySelector('#map');

        if (!storesData || !mapContainer) return;

        const getStoresFromDOM = () => {
            const elements = storesData.querySelectorAll('div');
            const stores = [];

            elements.forEach((el) => {
                const city = el.dataset.city;
                const name = el.dataset.name;
                const lat = parseFloat(el.dataset.lat);
                const lng = parseFloat(el.dataset.lng);

                if (!isNaN(lat) && !isNaN(lng)) {
                    stores.push({
                        city,
                        name,
                        coords: [lat, lng],
                    });
                }
            });

            return stores;
        };

        const stores = getStoresFromDOM();

        if (stores.length === 0) return; 

        const isMobile = window.innerWidth < 768;

        const mapZoom = isMobile ? 3 : 5;
        const iconSize = isMobile ? [24, 24] : [32, 32];
        const iconAnchor = isMobile ? [12, 24] : [16, 32];

        const map = L.map('map', {
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            boxZoom: false,
            keyboard: false,
            touchZoom: false,
            zoomControl: false,
        }).setView([49.8419, 24.0315], 10);

        L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            {
                minZoom: mapZoom,
                detectRetina: true,
                updateWhenIdle: true,
            }
        ).addTo(map);

        const customIcon = L.icon({
            iconUrl: './assets/images/icons/ico-marker.svg',
            iconSize: iconSize,
            iconAnchor: iconAnchor,
        });

        let markers = [];
        function renderMarkers(city) {
            markers.forEach((m) => map.removeLayer(m));
            markers = [];

            const filtered =
                city === 'all' ? stores : stores.filter((s) => s.city === city);

            const bounds = [];

            filtered.forEach((store) => {
                const marker = L.marker(store.coords, { icon: customIcon })
                    .addTo(map)
                    .bindPopup(store.name);
                markers.push(marker);
                bounds.push(store.coords);
            });

            if (filtered.length > 0) {
                if (city === 'all') {
                    map.fitBounds(bounds, { padding: [20, 20] });
                } else {
                    map.setView(filtered[0].coords, 20);
                }
            }
        }

        renderMarkers('all');

        const locationButtons = document.querySelectorAll('.js-location');
        if (locationButtons.length) {
            locationButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    locationButtons.forEach((b) =>
                        b.classList.remove('active')
                    );
                    btn.classList.add('active');

                    const city = btn.dataset.city;
                    renderMarkers(city);
                });
            });
        }

        const nearestBtn = document.querySelector('.js-nearest');
        if (nearestBtn) {
            nearestBtn.addEventListener('click', () => {
                if (!navigator.geolocation) {
                    alert('Geolocation is not supported by your browser.');
                    return;
                }

                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLon = position.coords.longitude;

                        let nearest = null;
                        let minDistance = Infinity;

                        stores.forEach((store) => {
                            const [lat, lon] = store.coords;
                            const distance = Math.sqrt(
                                (lat - userLat) ** 2 + (lon - userLon) ** 2
                            );
                            if (distance < minDistance) {
                                minDistance = distance;
                                nearest = store;
                            }
                        });

                        if (nearest) {
                            map.setView(nearest.coords, 14);

                            const nearestMarker = L.marker(nearest.coords, {
                                icon: customIcon,
                            }).addTo(map);
                            markers.push(nearestMarker);

                            L.popup()
                                .setLatLng(nearest.coords)
                                .setContent(`${nearest.name}`)
                                .openOn(map);
                        }
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                alert(
                                    'Будь ласка, дозвольте доступ до геолокації.'
                                );
                                break;
                            case error.POSITION_UNAVAILABLE:
                                alert('Location unavailable.');
                                break;
                            case error.TIMEOUT:
                                alert('The geolocation timeout has expired.');
                                break;
                            default:
                                alert('An unknown geolocation error occurred.');
                                break;
                        }
                    },
                    { timeout: 5000 }
                );
            });
        }
    };

    filterFlow();
    partnerFlow();
    scrollBox();
    mapFlow();
};

export default locationFlow;
