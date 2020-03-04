const search = document.getElementById('search');
const matchList = document.getElementById('match-list');
search.value = '';                                        // set initial search value blank

// Search colours.json and filter

const searchColours = async searchText => {
    const res = await fetch('../data/colours.json');      // gets data from json file
    const colours = await res.json();                     // converts it to json

    

    // Get matches to current text input
    let matches = colours.filter(colour => {                                // for each colour...
        const regex = new RegExp(`${searchText}`, 'gi');                    // create regular exp. based on search term
        return colour.name.match(regex) || colour.hexString.match(regex);   // returns an array of matching colour names and hex values
        
    });


    // If no matches, ensure they are hidden
    
    if (matches.length == 0) {
        matchList.innerHTML = 'No matches found';
    }


    // If search text is empty, return empty array

    if(search.value === "") {                               
        matches = [];
        matchList.innerHTML = 'No matches found';
    }
    
    // Output result
    outputHTML(matches);
};

// Show results on page
const outputHTML = matches => {
    if(matches.length > 0) {
        const html = matches.map(match => `<div class="card card-body mb-4"
            <h4>${match.name}</h4><span class="text-danger">Hex: ${match.hexString}</span>
            <span class="text-danger">RGB: (${match.rgb.r},${match.rgb.g},${match.rgb.b})</span>
            <div class="square" style="background-color:${match.hexString}"></div>
        </div>
        `).join('');

        matchList.innerHTML = html;
    }

}



search.addEventListener('input', () => searchColours(search.value))