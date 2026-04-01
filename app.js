/**
 * FuelSense - Core Engine v6 (Enterprise Google Maps SDK Upgrade)
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- DARK MODE THEME CACHING ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    let savedTheme = 'light';
    try {
        savedTheme = localStorage.getItem('fuelsense-theme') || 'light';
    } catch (e) {
        console.warn("Local storage blocked for theme. Defaulting to light.");
    }

    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('fuelsense-theme', newTheme);
        } catch (e) { }
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun text-orange"></i>';
        } else {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon text-blue"></i>';
        }
    }

    // --- API SECURE KEY MANAGEMENT ---
    const apiModal = document.getElementById('api-modal');
    const btnApiSettings = document.getElementById('btn-api-settings');
    const btnCloseApi = document.getElementById('btn-close-api');
    const btnSaveApi = document.getElementById('btn-save-api');
    const inputGmapsKey = document.getElementById('input-gmaps-key');
    const apiSuccessMsg = document.getElementById('api-success-msg');

    let googleMapsKey = '';
    try {
        googleMapsKey = localStorage.getItem('fuelsense-gmaps-key') || (window.FUEL_SENSE_CONFIG ? window.FUEL_SENSE_CONFIG.GOOGLE_MAPS_KEY : '');
    } catch (e) { }

    if (inputGmapsKey) inputGmapsKey.value = googleMapsKey;

    if (btnApiSettings) {
        btnApiSettings.addEventListener('click', () => apiModal.classList.remove('hidden'));
    }
    if (btnCloseApi) {
        btnCloseApi.addEventListener('click', () => apiModal.classList.add('hidden'));
    }

    if (btnSaveApi) {
        btnSaveApi.addEventListener('click', () => {
            googleMapsKey = inputGmapsKey.value.trim();

            try {
                localStorage.setItem('fuelsense-gmaps-key', googleMapsKey);
            } catch (e) { }

            apiSuccessMsg.classList.remove('hidden');
            setTimeout(() => {
                apiSuccessMsg.classList.add('hidden');
                apiModal.classList.add('hidden');
                window.location.reload();
            }, 1200);
        });
    }

    // --- TAB NAVIGATION LOGIC ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => { p.classList.add('hidden-pane'); p.classList.remove('active-pane'); });

            btn.classList.add('active');
            const targetPane = document.getElementById(btn.getAttribute('data-tab'));
            targetPane.classList.remove('hidden-pane');
            targetPane.classList.add('active-pane');
        });
    });

    // --- FUEL RATES MANAGEMENT & LIVE TICKERS ---
    const editPetrol = document.getElementById('edit-petrol');
    const editDiesel = document.getElementById('edit-diesel');
    const editCng = document.getElementById('edit-cng');
    const editEv = document.getElementById('edit-ev');
    const btnSaveRates = document.getElementById('btn-save-rates');
    const ratesSuccessMsg = document.getElementById('rates-success-msg');

    let fuelRates = null;
    try {
        fuelRates = JSON.parse(localStorage.getItem('fuelsense-rates'));
    } catch (e) {
        console.warn("Local storage blocked for rates.");
    }

    // Default Fallbacks if no cache
    if (!fuelRates) {
        fuelRates = { petrol: 104.20, diesel: 92.15, cng: 75.00, ev: 15.00 };
    }

    // Live Web Scraper (Indian Market)
    async function fetchLiveRates() {
        try {
            const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://www.goodreturns.in/petrol-price.html'));
            if (!response.ok) throw new Error('Live proxy failed');
            const data = await response.json();

            const doc = new DOMParser().parseFromString(data.contents, 'text/html');
            let grabbedPetrol = null, grabbedDiesel = null;

            const tables = doc.querySelectorAll('table');
            for (let table of tables) {
                if (grabbedPetrol) break;
                for (let row of table.rows) {
                    if (row.cells.length >= 2 && row.cells[0].textContent.includes('New Delhi')) {
                        grabbedPetrol = parseFloat(row.cells[1].textContent.replace(/[^\d.]/g, ''));
                        grabbedDiesel = grabbedPetrol - 12.50; // Approximated if not pure dual-table
                        break;
                    }
                }
            }
            if (grabbedPetrol && !isNaN(grabbedPetrol)) {
                fuelRates.petrol = grabbedPetrol.toFixed(2);
                fuelRates.diesel = grabbedDiesel.toFixed(2);
            }
        } catch (err) {
            console.warn("Scraper disconnected, defaulting to local rates");
        } finally {
            updateUITickers();
        }
    }

    function updateUITickers() {
        if (editPetrol) editPetrol.value = fuelRates.petrol;
        if (editDiesel) editDiesel.value = fuelRates.diesel;
        if (editCng) editCng.value = fuelRates.cng;
        if (editEv) editEv.value = fuelRates.ev;

        try {
            document.querySelector('#ticker-petrol .rate-val').textContent = fuelRates.petrol;
            document.querySelector('#ticker-diesel .rate-val').textContent = fuelRates.diesel;
            document.querySelector('#ticker-cng .rate-val').textContent = fuelRates.cng;
            document.querySelector('#ticker-ev .rate-val').textContent = fuelRates.ev;
        } catch (e) { }
    }

    fetchLiveRates();

    btnSaveRates.addEventListener('click', () => {
        fuelRates = {
            petrol: parseFloat(editPetrol.value).toFixed(2),
            diesel: parseFloat(editDiesel.value).toFixed(2),
            cng: parseFloat(editCng.value).toFixed(2),
            ev: parseFloat(editEv.value).toFixed(2)
        };
        try {
            localStorage.setItem('fuelsense-rates', JSON.stringify(fuelRates));
        } catch (e) { }
        updateUITickers();
        ratesSuccessMsg.classList.remove('hidden');
        setTimeout(() => ratesSuccessMsg.classList.add('hidden'), 3000);
    });

    // --- DUAL DROPDOWN VEHICLE LOGIC ---
    const brandSelect = document.getElementById('brand-select');
    const modelSelect = document.getElementById('model-select');
    const customGroup = document.getElementById('custom-mileage-group');
    const btnCalculate = document.getElementById('btn-calculate');

    // Extract unique brands using window.indianVehicles (loaded from vehicles.js)
    const vehiclesData = window.indianVehicles || [];
    const brands = [...new Set(vehiclesData.map(v => v.brand))].sort();

    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand; option.textContent = brand;
        brandSelect.appendChild(option);
    });

    const customOpt = document.createElement('option');
    customOpt.value = 'custom'; customOpt.textContent = '⚙️ Custom Vehicle Setup';
    brandSelect.appendChild(customOpt);

    brandSelect.addEventListener('change', () => {
        modelSelect.innerHTML = '<option value="" disabled selected>Select Model</option>';
        customGroup.classList.add('hidden');

        if (brandSelect.value === 'custom') {
            modelSelect.disabled = true;
            customGroup.classList.remove('hidden');
        } else {
            modelSelect.disabled = false;
            const filteredModels = vehiclesData.filter(v => v.brand === brandSelect.value);
            filteredModels.forEach((vehicle, idx) => {
                const opt = document.createElement('option');
                opt.value = idx;
                opt.textContent = `${vehicle.model} (${vehicle.fuel_type.toUpperCase()})`;
                opt.setAttribute('data-city', vehicle.mileage_city);
                opt.setAttribute('data-hw', vehicle.mileage_highway);
                opt.setAttribute('data-fuel', vehicle.fuel_type);
                modelSelect.appendChild(opt);
            });
        }
        validateForm();
    });

    modelSelect.addEventListener('change', validateForm);

    // --- GOOGLE MAPS ENGINE (Replaces Leaflet & Routing Machine) ---
    const mapContainer = document.getElementById('map');
    const distBadge = document.getElementById('dist-badge');
    const pumpBadge = document.getElementById('pump-badge');
    const startLocInput = document.getElementById('start-location');
    const endLocInput = document.getElementById('end-location');
    const btnFindRoute = document.getElementById('btn-find-route');
    const manualDistInput = document.getElementById('manual-dist');

    let map = null;
    let directionsService = null;
    let directionsRenderer = null;
    let placesService = null;
    let clickCount = 0;
    let tempStart = null;
    let tempEnd = null;
    let tempMarkers = [];
    let pumpMarkers = [];
    let currentRouteDistance = 0;

    window.initGoogleMap = function () {
        const indiaCenter = { lat: 21.1458, lng: 79.0882 };
        map = new google.maps.Map(mapContainer, {
            zoom: 5,
            center: indiaCenter,
            mapTypeId: 'roadmap',
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
                { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
                { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
                { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
                { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
                { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
                { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
                { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] }
            ]
        });

        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            draggable: true,
            polylineOptions: { strokeColor: '#3b82f6', strokeWeight: 5, strokeOpacity: 0.9 }
        });
        placesService = new google.maps.places.PlacesService(map);

        directionsRenderer.addListener('directions_changed', () => {
            const directions = directionsRenderer.getDirections();
            if (directions && directions.routes.length > 0) {
                const route = directions.routes[0];
                let totalDist = 0;
                route.legs.forEach(leg => totalDist += leg.distance.value);
                currentRouteDistance = parseFloat((totalDist / 1000).toFixed(1));

                distBadge.classList.remove('hidden');
                distBadge.innerHTML = `<i class="fa-solid fa-road"></i> ${currentRouteDistance} km`;
                manualDistInput.value = currentRouteDistance;
                validateForm();

                fetchGoogleRadar(route);
            }
        });

        // Tap-to-Route Feature
        map.addListener('click', (e) => {
            if (clickCount === 0) {
                tempStart = e.latLng;
                startLocInput.value = "Selected Origin";
                const m = new google.maps.Marker({ position: tempStart, map: map, icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' });
                tempMarkers.push(m);
                clickCount++;
            } else if (clickCount === 1) {
                tempEnd = e.latLng;
                endLocInput.value = "Selected Destination";
                const m = new google.maps.Marker({ position: tempEnd, map: map, icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png' });
                tempMarkers.push(m);
                clickCount++;

                btnFindRoute.innerHTML = 'Computing <i class="fa-solid fa-spinner fa-spin"></i>';
                distBadge.classList.remove('hidden'); distBadge.textContent = "Routing...";

                executeRoute(tempStart, tempEnd);
            }
        });
    };

    // Secure Map Injector
    if (googleMapsKey) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places&callback=initGoogleMap`;
        script.async = true;
        document.head.appendChild(script);
    } else {
        mapContainer.innerHTML = `<div class="flex-center" style="height:100%; flex-direction:column; color:var(--text-orange); padding:2rem; text-align:center; border: 1px dotted var(--border-light);">
            <i class="fa-solid fa-triangle-exclamation" style="font-size:2rem; margin-bottom:1rem;"></i>
            <span>Google Maps API Key required.<br><span class="text-sm">Click the Top-Right Key Icon to connect SDK.</span></span>
        </div>`;
    }

    function executeRoute(origin, destination) {
        tempMarkers.forEach(m => m.setMap(null));
        tempMarkers = [];
        pumpMarkers.forEach(m => m.setMap(null));
        pumpMarkers = [];

        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        }, (response, status) => {
            if (status === 'OK') {
                directionsRenderer.setDirections(response);
            } else {
                alert('Routing failed: ' + status);
            }
            btnFindRoute.innerHTML = 'Engage Route <i class="fa-solid fa-satellite-dish"></i>';
        });
    }

    document.getElementById('btn-clear-map').addEventListener('click', () => {
        if (directionsRenderer) directionsRenderer.setDirections({ routes: [] });
        clickCount = 0; tempStart = null; tempEnd = null;
        tempMarkers.forEach(m => m.setMap(null)); tempMarkers = [];
        pumpMarkers.forEach(m => m.setMap(null)); pumpMarkers = [];

        startLocInput.value = ''; endLocInput.value = '';
        distBadge.classList.add('hidden');
        pumpBadge.classList.add('hidden');
        manualDistInput.value = '';
        btnCalculate.disabled = true;
    });

    btnFindRoute.addEventListener('click', async () => {
        const startText = startLocInput.value.trim();
        const endText = endLocInput.value.trim();
        if (!startText || !endText) return alert("Enter both locations.");
        if (!googleMapsKey) return alert("API Key Missing.");

        btnFindRoute.innerHTML = 'Searching <i class="fa-solid fa-spinner fa-spin"></i>';
        distBadge.classList.remove('hidden'); distBadge.textContent = "Routing...";
        pumpBadge.classList.add('hidden');

        executeRoute(startText + ", India", endText + ", India");
    });

    async function fetchGoogleRadar(route) {
        if (!placesService) return;
        pumpMarkers.forEach(m => m.setMap(null)); pumpMarkers = [];
        pumpBadge.classList.remove('hidden');

        let activeFuelType = 'petrol';
        if (brandSelect.value !== 'custom') {
            const selectedOpt = modelSelect.options[modelSelect.selectedIndex];
            activeFuelType = selectedOpt.getAttribute('data-fuel');
        }

        const searchType = activeFuelType === 'ev' ? 'charging_station' : 'gas_station';
        const searchIcon = activeFuelType === 'ev' ? 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png' : 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';

        if (currentRouteDistance > 1000) {
            pumpBadge.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-red"></i> Route too long for live radar`;
            return;
        }

        pumpBadge.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-orange"></i> Live Radar scanning for ${activeFuelType.toUpperCase()}...`;

        const path = route.overview_path;
        if (path.length === 0) return;

        // Search at 3 points: 25%, 50%, 75% of the route
        const points = [
            path[Math.floor(path.length * 0.25)],
            path[Math.floor(path.length * 0.50)],
            path[Math.floor(path.length * 0.75)]
        ];

        let totalFound = 0;
        const infowindow = new google.maps.InfoWindow();

        points.forEach((location, idx) => {
            const request = {
                location: location,
                radius: '20000', // 20km radius
                type: searchType
            };

            placesService.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    results.forEach(place => {
                        // Avoid duplicates
                        if (pumpMarkers.some(m => m.getTitle() === place.name)) return;

                        const marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location,
                            icon: searchIcon,
                            title: place.name
                        });

                        marker.addListener('click', () => {
                            infowindow.setContent(`<strong>${place.name}</strong><br>${place.vicinity || 'Station'}`);
                            infowindow.open(map, marker);
                        });

                        pumpMarkers.push(marker);
                        totalFound++;
                    });
                    pumpBadge.innerHTML = `<i class="fa-solid fa-gas-pump"></i> ${totalFound} ${activeFuelType.toUpperCase()} Stations Found`;
                } else if (idx === 1 && totalFound === 0) { // Only show offline if midpoint search fails and nothing found yet
                    pumpBadge.innerHTML = `<i class="fa-solid fa-gas-pump"></i> Radar Offline`;
                }
            });
        });
    }

    // --- FORM VALIDATION ---
    const customMileageInputEv = document.getElementById('custom-mileage');

    function validateForm() {
        let valid = true;
        if (brandSelect.value === '') valid = false;
        if (brandSelect.value === 'custom' && (!customMileageInputEv.value || parseFloat(customMileageInputEv.value) <= 0)) valid = false;
        if (brandSelect.value !== 'custom' && modelSelect.value === '') valid = false;
        if (!manualDistInput.value || parseFloat(manualDistInput.value) <= 0) valid = false;
        btnCalculate.disabled = !valid;
    }

    customMileageInputEv.addEventListener('input', validateForm);
    manualDistInput.addEventListener('input', validateForm);

    // --- TRUE GEMINI AI MODULE ---
    btnCalculate.addEventListener('click', async () => {
        let distance = parseFloat(manualDistInput.value);
        const isRoundTrip = document.getElementById('trip-round').checked;
        if (isRoundTrip) distance = distance * 2;

        let env = document.getElementById('env-highway').checked ? 'highway' : 'city';

        let mileage = 0; let activeFuelType = 'petrol'; let vName = '';
        let mileageHigh = 0; let mileageLow = 0;

        if (brandSelect.value === 'custom') {
            mileage = parseFloat(customMileageInputEv.value);
            activeFuelType = 'petrol';
            vName = "Custom Engine Profile";
            mileageHigh = mileage * 1.1;
            mileageLow = mileage * 0.85;
        } else {
            const selectedOpt = modelSelect.options[modelSelect.selectedIndex];
            activeFuelType = selectedOpt.getAttribute('data-fuel');
            const cityM = parseFloat(selectedOpt.getAttribute('data-city'));
            const hwM = parseFloat(selectedOpt.getAttribute('data-hw'));

            mileage = env === 'highway' ? hwM : cityM;
            vName = `${brandSelect.value} ${selectedOpt.text}`;
            mileageHigh = hwM;
            mileageLow = cityM * 0.85;
        }

        let activeRate = parseFloat(fuelRates[activeFuelType]);
        const fuelNeeded = distance / mileage;
        const totalAvgCost = fuelNeeded * activeRate;
        const costBest = (distance / mileageHigh) * activeRate;
        const costWorst = (distance / mileageLow) * activeRate;

        document.getElementById('res-total-cost').textContent = Math.round(totalAvgCost).toLocaleString('en-IN');
        document.getElementById('cost-best').textContent = Math.round(costBest).toLocaleString('en-IN');
        document.getElementById('cost-worst').textContent = Math.round(costWorst).toLocaleString('en-IN');
        document.getElementById('res-vector').textContent = isRoundTrip ? `Round-Trip` : `Arrival Target`;
        document.getElementById('res-mileage').textContent = `${mileage.toFixed(1)} km/(l|unit) (${env})`;
        document.getElementById('res-dist').textContent = `${distance} km`;
        document.getElementById('res-fuel-needed').textContent = `${fuelNeeded.toFixed(1)} Units`;

        document.getElementById('results-dashboard').classList.remove('hidden');
        setTimeout(() => document.getElementById('results-dashboard').scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    });
});
