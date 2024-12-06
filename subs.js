
function addToComparison(model, image, engine, price, mileage) {
    let comparisons = JSON.parse(localStorage.getItem('vehicleComparisons')) || [];

    if (comparisons.length < 2) {
        comparisons.push({ model, image, engine, price, mileage });
        localStorage.setItem('vehicleComparisons', JSON.stringify(comparisons));

        if (comparisons.length === 2) {
            showComparisonModal();
        } else {
            alert('Vehicle added for comparison. You can add one more vehicle.');
        }
    } else {
        alert('You can only compare two vehicles at a time. Please clear the comparisons first.');
    }
}

function showComparisonModal() {
    const modal = document.getElementById("comparisonModal");
    const container = document.getElementById('comparisonContainer');
    const comparisons = JSON.parse(localStorage.getItem('vehicleComparisons')) || [];

    container.innerHTML = ''; // Clear previous content

    comparisons.forEach(vehicle => {
        const card = document.createElement('div');
        card.className = 'vehicle-card';
        card.innerHTML = `
        <img src="${vehicle.image}" alt="${vehicle.model}">
        <h2>${vehicle.model}</h2>
        <p>Engine: ${vehicle.engine}</p>
        <p>Price: ₹${vehicle.price}</p>
        <p>Mileage: ${vehicle.mileage}</p>
    `;
        container.appendChild(card);
    });

    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("comparisonModal");
    modal.style.display = "none"; // Close modal
}

window.onclick = function (event) {
    const modal = document.getElementById("comparisonModal");
    if (event.target == modal) {
        closeModal();
    }
};

function clearComparisons() {
    localStorage.removeItem('vehicleComparisons');
    alert('Comparisons cleared! You can now add new vehicles for comparison.');
    closeModal(); // Close the modal after clearing comparisons
}

function clearAllComparisons() {
    localStorage.removeItem('vehicleComparisons');
    alert('All comparisons cleared!');
}


function changeImage(thumbnail) {
    const mainImage = document.getElementById("mainImage");
    mainImage.src = thumbnail.src;
}

// Add vehicle to comparison list
document.getElementById("compareButton").addEventListener("click", function () {
    alert("Vehicle added to comparison list!");
});
