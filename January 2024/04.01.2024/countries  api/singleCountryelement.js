export const singleCountryElement = (countryData, countries) => {
  console.log(countryData);
  const borders = countryData.borders || []; // Use an empty array if borders is undefined
  countries.innerHTML += `
        <div> 
          <h1>${countryData.name}</h1>
          <h2> Capital: ${countryData.capital}</h2>
          <img src="${countryData}"/> 
          <h3>Bordering</h3>
          <ol> 
            ${borders.map((element) => `<li>${element}</li>`).join("")}
          </ol>
        </div>
      `;
};
