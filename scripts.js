const continents = {
    Africa: {
        code: "AF",
        population: 1400000000,
        topCountries: [
            { name: "Nigeria", population: 223804632 },
            { name: "Ethiopia", population: 126527060 },
            { name: "Egypt", population: 112716598 },
            { name: "DR Congo", population: 102262808 },
            { name: "Tanzania", population: 67743903 },
            { name: "South Africa", population: 60641700 },
            { name: "Kenya", population: 55422344 },
            { name: "Uganda", population: 48677986 },
            { name: "Sudan", population: 48772599 },
            { name: "Algeria", population: 45350100 }
        ]
    },
    Asia: {
        code: "AS",
        population: 4700000000,
        topCountries: [
            { name: "China", population: 1411778724 },
            { name: "India", population: 1406631785 },
            { name: "Indonesia", population: 277534122 },
            { name: "Pakistan", population: 240485658 },
            { name: "Bangladesh", population: 173018378 },
            { name: "Japan", population: 123294513 },
            { name: "Philippines", population: 117337368 },
            { name: "Vietnam", population: 100874737 },
            { name: "Turkey", population: 86988700 },
            { name: "Iran", population: 89161000 }
        ]
    },
    Europe: {
        code: "EU",
        population: 740000000,
        topCountries: [
            { name: "Russia", population: 144444359 },
            { name: "Germany", population: 83900471 },
            { name: "United Kingdom", population: 68497913 },
            { name: "France", population: 65480710 },
            { name: "Italy", population: 58853482 },
            { name: "Spain", population: 47450795 },
            { name: "Ukraine", population: 36608400 },
            { name: "Poland", population: 37797100 },
            { name: "Romania", population: 19185000 },
            { name: "Netherlands", population: 17533400 }
        ]
    },
    NorthAmerica: {
        code: "NA",
        population: 600000000,
        topCountries: [
            { name: "United States", population: 334233854 },
            { name: "Mexico", population: 128649565 },
            { name: "Canada", population: 38974600 },
            { name: "Guatemala", population: 19033700 },
            { name: "Honduras", population: 10349400 },
            { name: "Cuba", population: 11317400 },
            { name: "Dominican Republic", population: 11348100 },
            { name: "Costa Rica", population: 5230000 },
            { name: "El Salvador", population: 6486200 },
            { name: "Panama", population: 4520000 }
        ]
    },
    SouthAmerica: {
        code: "SA",
        population: 430000000,
        topCountries: [
            { name: "Brazil", population: 216422446 },
            { name: "Argentina", population: 46044703 },
            { name: "Colombia", population: 53215500 },
            { name: "Peru", population: 34458700 },
            { name: "Venezuela", population: 33355600 },
            { name: "Chile", population: 19987500 },
            { name: "Ecuador", population: 18592200 },
            { name: "Bolivia", population: 12507300 },
            { name: "Paraguay", population: 7438000 },
            { name: "Uruguay", population: 3518000 }
        ]
    },
    Oceania: {
        code: "OC",
        population: 43000000,
        topCountries: [
            { name: "Australia", population: 26178000 },
            { name: "Papua New Guinea", population: 10596000 },
            { name: "New Zealand", population: 5210000 },
            { name: "Fiji", population: 936000 },
            { name: "Solomon Islands", population: 739000 },
            { name: "Vanuatu", population: 334000 },
            { name: "Samoa", population: 223000 },
            { name: "Tonga", population: 106000 },
            { name: "Kiribati", population: 123000 },
            { name: "Micronesia", population: 116000 }
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
            <ul>${data.topCountries.map(country => `<li>${country.name} - Population: ${country.population.toLocaleString()}</li>`).join("")}</ul>
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

// Display the population of the selected country and breakdown by males, females, and children
function handleCountryChange() {
    const continentSelect = document.getElementById("continentSelect");
    const countrySelect = document.getElementById("countrySelect");
    const populationBox = document.getElementById("countryPopulation");
    const maleBox = document.getElementById("malePopulation");
    const femaleBox = document.getElementById("femalePopulation");
    const childrenBox = document.getElementById("childrenPopulation");

    const selectedContinent = continentSelect.value;
    const selectedCountry = countrySelect.value;

    if (selectedContinent && selectedCountry) {
        const continentData = continents[selectedContinent];
        const countryData = continentData.topCountries.find(country => country.name === selectedCountry);

        if (countryData) {
            const totalPopulation = countryData.population;
            const males = Math.round(totalPopulation * 0.49); // Assume 49% males
            const females = Math.round(totalPopulation * 0.49); // Assume 49% females
            const children = Math.round(totalPopulation * 0.02); // Assume 2% children

            // Update the population box
            populationBox.textContent = `Population of ${selectedCountry}: ${totalPopulation.toLocaleString()}`;

            // Update the details boxes
            maleBox.textContent = `Males: ${males.toLocaleString()}`;
            femaleBox.textContent = `Females: ${females.toLocaleString()}`;
            childrenBox.textContent = `Children: ${children.toLocaleString()}`;
        } else {
            populationBox.textContent = "Population data unavailable.";
            maleBox.textContent = "Males: N/A";
            femaleBox.textContent = "Females: N/A";
            childrenBox.textContent = "Children: N/A";
        }
    } else {
        // Clear the boxes if no country is selected
        populationBox.textContent = "";
        maleBox.textContent = "Males: ";
        femaleBox.textContent = "Females: ";
        childrenBox.textContent = "Children: ";
    }
}

// Add event listeners
document.getElementById("continentSelect").addEventListener("change", handleContinentChange);
document.getElementById("countrySelect").addEventListener("change", handleCountryChange);

// Call the function to populate the continent dropdown
populateContinents();

displayPopulation();


