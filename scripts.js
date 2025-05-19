// Define the continents data first
const continents = {
    "Africa": {
        code: "AFR",
        topCountries: [
            { name: "Nigeria", population: 206139589, gdp: 448.1 },
            { name: "Ethiopia", population: 114963583, gdp: 107.6 },
            { name: "Egypt", population: 102334403, gdp: 303.2 },
            { name: "DR Congo", population: 89561404, gdp: 55.3 },
            { name: "South Africa", population: 59308690, gdp: 351.4 },
            { name: "Tanzania", population: 59734213, gdp: 67.8 },
            { name: "Kenya", population: 53771300, gdp: 109.5 },
            { name: "Uganda", population: 45741000, gdp: 40.5 },
            { name: "Algeria", population: 43851043, gdp: 167.6 },
            { name: "Sudan", population: 43849269, gdp: 34.3 }
        ]
    },
    "Asia": {
        code: "EAS",
        topCountries: [
            { name: "China", population: 1402112000, gdp: 14722.8 },
            { name: "India", population: 1380004385, gdp: 2660.2 },
            { name: "Indonesia", population: 273523621, gdp: 1058.4 },
            { name: "Pakistan", population: 220892331, gdp: 262.6 },
            { name: "Bangladesh", population: 164689383, gdp: 329.1 },
            { name: "Japan", population: 126476458, gdp: 5048.7 },
            { name: "Philippines", population: 109581085, gdp: 367.4 },
            { name: "Vietnam", population: 97338583, gdp: 262.6 },
            { name: "Turkey", population: 84339067, gdp: 719.9 },
            { name: "Iran", population: 83992953, gdp: 463.5 }
        ]
    },
    "Middle East": {
        code: "MEA",
        topCountries: [
            { name: "Saudi Arabia", population: 34813871, gdp: 792.9 },
            { name: "Yemen", population: 29825968, gdp: 23.5 },
            { name: "Iraq", population: 40222503, gdp: 191.7 },
            { name: "Syria", population: 17500657, gdp: 22.8 },
            { name: "Jordan", population: 10203140, gdp: 44.5 },
            { name: "UAE", population: 9890400, gdp: 421.1 },
            { name: "Israel", population: 9216900, gdp: 394.7 },
            { name: "Lebanon", population: 6825442, gdp: 53.4 },
            { name: "Palestine", population: 5101414, gdp: 15.6 },
            { name: "Oman", population: 5106626, gdp: 76.3 }
        ]
    },
    "Europe": {
        code: "ECS",
        topCountries: [
            { name: "Russia", population: 145934460, gdp: 1483.5 },
            { name: "Germany", population: 83240525, gdp: 3845.6 },
            { name: "United Kingdom", population: 67886004, gdp: 2763.3 },
            { name: "France", population: 65273512, gdp: 2715.5 },
            { name: "Italy", population: 60461828, gdp: 1889.0 },
            { name: "Spain", population: 47351567, gdp: 1281.5 },
            { name: "Ukraine", population: 44134693, gdp: 155.6 },
            { name: "Poland", population: 37846605, gdp: 596.6 },
            { name: "Romania", population: 19237682, gdp: 248.7 },
            { name: "Netherlands", population: 17441139, gdp: 907.1 }
        ]
    },
    "North America": {
        code: "NAC",
        topCountries: [
            { name: "United States", population: 331002647, gdp: 20936.6 },
            { name: "Mexico", population: 128932753, gdp: 1076.2 },
            { name: "Canada", population: 38005238, gdp: 1643.4 },
            { name: "Guatemala", population: 16858333, gdp: 76.7 },
            { name: "Haiti", population: 11402533, gdp: 13.4 },
            { name: "Cuba", population: 11326616, gdp: 107.3 },
            { name: "Dominican Republic", population: 10847904, gdp: 78.8 },
            { name: "Honduras", population: 9904608, gdp: 23.8 },
            { name: "Nicaragua", population: 6624554, gdp: 12.5 },
            { name: "El Salvador", population: 6486201, gdp: 24.6 }
        ]
    },
    "South America": {
        code: "LCN",
        topCountries: [
            { name: "Brazil", population: 212559409, gdp: 1444.7 },
            { name: "Colombia", population: 50882884, gdp: 271.5 },
            { name: "Argentina", population: 45195777, gdp: 449.7 },
            { name: "Peru", population: 32971846, gdp: 202.0 },
            { name: "Venezuela", population: 28435943, gdp: 47.0 },
            { name: "Chile", population: 19116209, gdp: 252.8 },
            { name: "Ecuador", population: 17643060, gdp: 98.8 },
            { name: "Bolivia", population: 11673029, gdp: 40.4 },
            { name: "Paraguay", population: 7132530, gdp: 35.7 },
            { name: "Uruguay", population: 3473727, gdp: 53.6 }
        ]
    },
    "Oceania": {
        code: "EAS",
        topCountries: [
            { name: "Australia", population: 25499881, gdp: 1330.9 },
            { name: "Papua New Guinea", population: 8947027, gdp: 22.2 },
            { name: "New Zealand", population: 5084300, gdp: 206.9 },
            { name: "Fiji", population: 896444, gdp: 4.4 },
            { name: "Solomon Islands", population: 686878, gdp: 1.5 },
            { name: "Vanuatu", population: 307150, gdp: 0.9 },
            { name: "New Caledonia", population: 271960, gdp: 9.5 },
            { name: "French Polynesia", population: 280908, gdp: 5.6 },
            { name: "Samoa", population: 198410, gdp: 0.8 },
            { name: "Tonga", population: 105697, gdp: 0.5 }
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

// Also update the displayPopulation function to show country names in purple
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
                    `<li><span style="color: purple; font-weight: bold;">${country.name}</span> - Population: ${country.population.toLocaleString()} - GDP: $${country.gdp.toLocaleString()} Billion</li>`
                ).join("")}
            </ul>
        `;
        container.appendChild(section);
    }
}

// Populate the continent dropdown
function populateContinents() {
    const continentSelect = document.getElementById("continentSelect");
    
    // Clear existing options first
    continentSelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Select a Continent--";
    continentSelect.appendChild(defaultOption);
    
    // Add continent options
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
    
    // Debug log to check selected continent
    console.log("Selected continent:", selectedContinent);
    
    if (hoverInfo) {
        hoverInfo.textContent = "";
    }
    
    // Enable/disable the country dropdown based on whether a continent is selected
    countrySelect.disabled = !selectedContinent;

    if (selectedContinent && continents[selectedContinent]) {
        // Populate the country dropdown with countries from the selected continent
        const countries = continents[selectedContinent].topCountries;
        
        // Debug log to check countries data
        console.log("Countries for continent:", countries);
        
        if (countries && countries.length > 0) {
            // Sort countries by population in descending order
            const sortedCountries = [...countries].sort((a, b) => b.population - a.population);
            
            // Add top 10 countries (or all if less than 10)
            const topCountries = sortedCountries.slice(0, 10);
            
            topCountries.forEach(country => {
                const option = document.createElement("option");
                option.value = country.name;
                option.textContent = `${country.name} (${country.population.toLocaleString()})`;
                option.style.color = "purple"; // Set text color to purple
                countrySelect.appendChild(option);
            });
        } else {
            // If no countries data available
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "No countries data available";
            countrySelect.appendChild(option);
        }
    }
}

// Populate the GDP dropdown based on the selected country
function handleCountryChange() {
    const continentSelect = document.getElementById("continentSelect");
    const countrySelect = document.getElementById("countrySelect");
    const gdpSelect = document.getElementById("gdpSelect");
    const populationBox = document.getElementById("countryPopulation");
    const malePopulation = document.getElementById("malePopulation");
    const femalePopulation = document.getElementById("femalePopulation");
    const childrenPopulation = document.getElementById("childrenPopulation");
    const gdpDisplay = document.getElementById("gdpDisplay");

    const selectedContinent = continentSelect.value;
    const selectedCountry = countrySelect.value;

    // Clear and reset the GDP dropdown
    gdpSelect.innerHTML = '<option value="">--Select GDP--</option>';
    gdpDisplay.innerHTML = "<strong>GDP:</strong> ";
    
    if (selectedContinent && selectedCountry) {
        const continentData = continents[selectedContinent];
        const countryData = continentData.topCountries.find(country => country.name === selectedCountry);

        if (countryData) {
            // Display total population
            populationBox.innerHTML = `Population of <span style="color: purple; font-weight: bold;">${selectedCountry}</span>: ${countryData.population.toLocaleString()}`;
            
            // Calculate and display population breakdown
            const maleCount = Math.round(countryData.population * 0.35);
            const femaleCount = Math.round(countryData.population * 0.40);
            const childrenCount = Math.round(countryData.population * 0.25);
            
            // Display population breakdown with purple country name
            malePopulation.innerHTML = `<strong>Males:</strong> <span style="color: purple;">${maleCount.toLocaleString()}</span> (35% of population)`;
            femalePopulation.innerHTML = `<strong>Females:</strong> <span style="color: purple;">${femaleCount.toLocaleString()}</span> (40% of population)`;
            childrenPopulation.innerHTML = `<strong>Children:</strong> <span style="color: purple;">${childrenCount.toLocaleString()}</span> (25% of population)`;
            
            // Add GDP option to GDP dropdown with an arrow
            const option = document.createElement("option");
            option.value = countryData.gdp;
            option.textContent = `${countryData.name} GDP: $${countryData.gdp.toLocaleString()} Billion ↓`;
            option.style.color = "purple";
            gdpSelect.appendChild(option);
            
            // Enable the GDP select
            gdpSelect.disabled = false;
        } else {
            populationBox.textContent = "Population data unavailable.";
            malePopulation.innerHTML = "<strong>Males:</strong> ";
            femalePopulation.innerHTML = "<strong>Females:</strong> ";
            childrenPopulation.innerHTML = "<strong>Children:</strong> ";
            gdpSelect.disabled = true;
        }
    } else {
        populationBox.textContent = "";
        malePopulation.innerHTML = "<strong>Males:</strong> ";
        femalePopulation.innerHTML = "<strong>Females:</strong> ";
        childrenPopulation.innerHTML = "<strong>Children:</strong> ";
        gdpSelect.disabled = true;
    }
}

// Handle GDP selection
function handleGDPChange() {
    const gdpSelect = document.getElementById("gdpSelect");
    const gdpDisplay = document.getElementById("gdpDisplay");
    const selectedGDP = gdpSelect.value;
    
    if (selectedGDP) {
        const gdpValue = parseFloat(selectedGDP);
        gdpDisplay.innerHTML = `<strong>GDP:</strong> <span style="color: purple;">$${gdpValue.toLocaleString()} Billion</span>`;
    } else {
        gdpDisplay.innerHTML = "<strong>GDP:</strong> ";
    }
}

// Make sure to initialize the page when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Populate the continent dropdown
    populateContinents();
    
    // Add event listeners
    const continentSelect = document.getElementById("continentSelect");
    if (continentSelect) {
        continentSelect.addEventListener("change", handleContinentChange);
        console.log("Continent select event listener attached");
    } else {
        console.error("Continent select element not found");
    }
    
    const countrySelect = document.getElementById("countrySelect");
    if (countrySelect) {
        countrySelect.addEventListener("change", handleCountryChange);
        console.log("Country select event listener attached");
    } else {
        console.error("Country select element not found");
    }
    
    const gdpSelect = document.getElementById("gdpSelect");
    if (gdpSelect) {
        gdpSelect.addEventListener("change", handleGDPChange);
        gdpSelect.disabled = true; // Initially disabled
    }
});

displayPopulation();


