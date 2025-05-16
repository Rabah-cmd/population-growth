const continents = {
    Africa: {
        code: "AF",
        population: 1400000000,
        topCountries: [
            { name: "Nigeria", population: 223804632, gdp: 477.4 },
            { name: "Ethiopia", population: 126527060, gdp: 156.1 },
            { name: "Egypt", population: 112716598, gdp: 387.1 },
            { name: "DR Congo", population: 102262808, gdp: 64.6 },
            { name: "Tanzania", population: 67743903, gdp: 85.4 },
            { name: "South Africa", population: 60641700, gdp: 399.0 },
            { name: "Kenya", population: 55422344, gdp: 113.4 },
            { name: "Uganda", population: 48677986, gdp: 49.5 },
            { name: "Sudan", population: 48772599, gdp: 34.3 },
            { name: "Algeria", population: 45350100, gdp: 206.0 }
        ]
    },
    Asia: {
        code: "AS",
        population: 4700000000,
        topCountries: [
            { name: "China", population: 1411778724, gdp: 17968.6 },
            { name: "India", population: 1406631785, gdp: 3762.2 },
            { name: "Indonesia", population: 277534122, gdp: 1390.6 },
            { name: "Pakistan", population: 240485658, gdp: 376.5 },
            { name: "Bangladesh", population: 173018378, gdp: 460.2 },
            { name: "Japan", population: 123294513, gdp: 4230.8 },
            { name: "Philippines", population: 117337368, gdp: 404.3 },
            { name: "Vietnam", population: 100874737, gdp: 433.0 },
            { name: "Turkey", population: 86988700, gdp: 1120.8 },
            { name: "Iran", population: 89161000, gdp: 388.7 }
        ]
    },
    Europe: {
        code: "EU",
        population: 740000000,
        topCountries: [
            { name: "Russia", population: 144444359, gdp: 2263.8 },
            { name: "Germany", population: 83900471, gdp: 4456.1 },
            { name: "United Kingdom", population: 68497913, gdp: 3429.6 },
            { name: "France", population: 65480710, gdp: 3031.7 },
            { name: "Italy", population: 58853482, gdp: 2112.8 },
            { name: "Spain", population: 47450795, gdp: 1579.2 },
            { name: "Ukraine", population: 36608400, gdp: 200.1 },
            { name: "Poland", population: 37797100, gdp: 842.2 },
            { name: "Romania", population: 19185000, gdp: 301.3 },
            { name: "Netherlands", population: 17533400, gdp: 1071.6 }
        ]
    },
    NorthAmerica: {
        code: "NA",
        population: 600000000,
        topCountries: [
            { name: "United States", population: 334233854, gdp: 26955.0 },
            { name: "Mexico", population: 128649565, gdp: 1492.7 },
            { name: "Canada", population: 38974600, gdp: 2251.6 },
            { name: "Guatemala", population: 19033700, gdp: 95.0 },
            { name: "Honduras", population: 10349400, gdp: 30.6 },
            { name: "Cuba", population: 11317400, gdp: 107.3 },
            { name: "Dominican Republic", population: 11348100, gdp: 114.0 },
            { name: "Costa Rica", population: 5230000, gdp: 78.5 },
            { name: "El Salvador", population: 6486200, gdp: 32.4 },
            { name: "Panama", population: 4520000, gdp: 76.5 }
        ]
    },
    SouthAmerica: {
        code: "SA",
        population: 430000000,
        topCountries: [
            { name: "Brazil", population: 216422446, gdp: 2132.5 },
            { name: "Argentina", population: 46044703, gdp: 641.8 },
            { name: "Colombia", population: 53215500, gdp: 362.7 },
            { name: "Peru", population: 34458700, gdp: 268.3 },
            { name: "Venezuela", population: 33355600, gdp: 111.8 },
            { name: "Chile", population: 19987500, gdp: 335.7 },
            { name: "Ecuador", population: 18592200, gdp: 115.0 },
            { name: "Bolivia", population: 12507300, gdp: 44.3 },
            { name: "Paraguay", population: 7438000, gdp: 44.4 },
            { name: "Uruguay", population: 3518000, gdp: 82.4 }
        ]
    },
    Oceania: {
        code: "OC",
        population: 43000000,
        topCountries: [
            { name: "Australia", population: 26178000, gdp: 1630.0 },
            { name: "Papua New Guinea", population: 10596000, gdp: 32.4 },
            { name: "New Zealand", population: 5210000, gdp: 253.6 },
            { name: "Fiji", population: 936000, gdp: 4.7 },
            { name: "Solomon Islands", population: 739000, gdp: 1.7 },
            { name: "Vanuatu", population: 334000, gdp: 1.1 },
            { name: "Samoa", population: 223000, gdp: 0.9 },
            { name: "Tonga", population: 106000, gdp: 0.5 },
            { name: "Kiribati", population: 123000, gdp: 0.2 },
            { name: "Micronesia", population: 116000, gdp: 0.4 }
        ]
    }
};

async function fetchPopulationData(continentCode) {
    const url = `https://api.worldbank.org/v2/country/${continentCode}/indicator/SP.POP.TOTL?format=json`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data[1]) {
            return data[1][0].value.toLocaleString(); // Extract population value
        } else {
            return "Data unavailable";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return "Error loading data";
    }
}

async function displayPopulation() {
    const container = document.getElementById("populationData");
    container.innerHTML = "";

    for (let continent in continents) {
        let data = continents[continent];
        let population = await fetchPopulationData(data.code); // Fetch real-time population data
        let section = document.createElement("div");
        section.innerHTML = `
            <h2>${continent}</h2>
            <p>Population: ${population}</p>
            <h3>Top 10 Countries</h3>
            <ul>
                ${data.topCountries.map(country => 
                    `<li>${country.name} - Population: ${country.population.toLocaleString()} - GDP: $${country.gdp.toLocaleString()} Billion</li>`
                ).join("")}
            </ul>
        `;
        container.appendChild(section);
    }
}

// Populate the continent dropdown
function populateContinents() {
    const continentSelect = document.getElementById("continentSelect");
    for (let continent in continents) {
        const option = document.createElement("option");
        option.value = continent;
        option.textContent = continent;
        continentSelect.appendChild(option);
    }
}

// Populate the country dropdown based on the selected continent
function handleContinentChange() {
    const continentSelect = document.getElementById("continentSelect");
    const countrySelect = document.getElementById("countrySelect");
    const hoverInfo = document.getElementById("hoverInfo");
    const selectedContinent = continentSelect.value;

    // Clear the country dropdown and hover info
    countrySelect.innerHTML = '<option value="">--Select a Country--</option>';
    hoverInfo.textContent = "";
    countrySelect.disabled = !selectedContinent;

    if (selectedContinent) {
        // Populate the country dropdown with countries from the selected continent
        const countries = continents[selectedContinent].topCountries;
        countries.forEach(country => {
            const option = document.createElement("option");
            option.value = country.name;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
    }
}

// Display the population of the selected country and GDP
function handleCountryChange() {
    const continentSelect = document.getElementById("continentSelect");
    const countrySelect = document.getElementById("countrySelect");
    const populationBox = document.getElementById("countryPopulation");
    const gdpBox = document.getElementById("gdpDisplay");

    const selectedContinent = continentSelect.value;
    const selectedCountry = countrySelect.value;

    if (selectedContinent && selectedCountry) {
        const continentData = continents[selectedContinent];
        const countryData = continentData.topCountries.find(country => country.name === selectedCountry);

        if (countryData) {
            populationBox.textContent = `Population of ${selectedCountry}: ${countryData.population.toLocaleString()}`;
            gdpBox.innerHTML = `<strong>GDP:</strong> $${countryData.gdp.toLocaleString()} Billion`;
        } else {
            populationBox.textContent = "Population data unavailable.";
            gdpBox.innerHTML = `<strong>GDP:</strong> N/A`;
        }
    } else {
        populationBox.textContent = "";
        gdpBox.innerHTML = `<strong>GDP:</strong> `;
    }
}

// Add event listeners
document.getElementById("continentSelect").addEventListener("change", handleContinentChange);
document.getElementById("countrySelect").addEventListener("change", handleCountryChange);

// Call the function to populate the continent dropdown
populateContinents();

displayPopulation();


