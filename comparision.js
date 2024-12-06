
const carData = {
    "Toyota": {
        "Corolla": {
            variants: ["Base", "Sport"],
            images: ["toyota_corolla_base.png", "toyota_corolla_sport.webp"]
        },
        "Camry": {
            variants: ["LE", "XSE"],
            images: ["toyota_camry_le.avif", "toyota_camry_xse.jpg"]
        },
        img: "toyotalogo.png"
    },
    "Honda": {
        "Civic": {
            variants: ["LX", "Sport"],
            images: ["honda_civic_lx.jpg", "hondacivilsports.webp"]
        },
        "Accord": {
            variants: ["Hybrid", "Sport"],
            images: ["honda_accord_hybrid.webp", "honda_accord_sport.jpg"]
        },
        img: "hondalogo.jpg"
    },
    "Ford": {
        "Mustang": {
            variants: ["EcoBoost", "GT"],
            images: ["ford_mustang_ecoboost.jpg", "ford_mustang_gt.webp"]
        },
        "Focus": {
            variants: ["SE", "Titanium"],
            images: ["fordfocusse.jpg", "foardfocustitanium.jpeg"]
        },
        img: "fordlogo.avif"
    },
    "BMW": {
        "3 Series": {
            variants: ["330i", "M340i"],
            images: ["bmw_3series_330i.webp", "bmw_3series_m340i.webp"]
        },
        "X5": {
            variants: ["xDrive40i", "xDrive50i"],
            images: ["bmw_x5_xDrive40i.webp", "bmw_x5_xDrive50i.jpg"]
        },
        img: "bmwlogo2.webp"
    },
    "Hyundai": {
        "Creta": {
            variants: ["Base", "SX"],
            images: ["hyndaicreata.webp", "hyndaiSX.webp"]
        },
        "Verna": {
            variants: ["Base", "SX"],
            images: ["hyndaivernabase.webp", "hyndaiverna sx.webp"]
        },
        img: "hondalogo.jpg"
    },
    "Volvo":{
        "VNL":{
            variants: ["Base", "SI"],
            images: ["volvovnlbase.webp", "volvovnlbase2.webp"]
        },
        "Verna": {
            variants: ["Base", "SX"],
            images: ["volvovnlbase3.jpeg", "volvovnlbase4.webp"]
        },
        img: "volvologo.png"
    },
    "ISUZU":{
        "NVQ":{
            variants: ["mode", "sports"],
            images: ["isuzubase1.jpg", "isuzubase2.webp"]
        },
        img: "isuzulogo.jpg"

    },
    "KIA":{
        "Telluride":{
            variants: ["mode", "sports"],
            images: [" kiabase1.webp", "kiabase2.jpg "]
        },
        img: "kialogo.png"
    }
};

function updateModels(brandSelect, modelSelect) {
    const brand = brandSelect.value;
    modelSelect.innerHTML = '<option>Select Model</option>';
    if (carData[brand]) {
        for (const model in carData[brand]) {
            if (model !== "img") {
                modelSelect.innerHTML += `<option>${model}</option>`;
            }
        }
    }
}

function updateVariants(modelSelect, variantSelect) {
    const brand = modelSelect.parentElement.querySelector('.brand').value;
    const model = modelSelect.value;
    variantSelect.innerHTML = '<option>Select Variant</option>';
    if (carData[brand][model]) {
        carData[brand][model].variants.forEach((variant) => {
            variantSelect.innerHTML += `<option>${variant}</option>`;
        });
    }
}

function updateImage(brandSelect, modelSelect, variantSelect, imgElement) {
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const variant = variantSelect.value;

    if (brand && carData[brand] && carData[brand].img) {
        imgElement.src = carData[brand].img; // Show brand image by default
    }

    if (model && carData[brand][model] && variant && carData[brand][model].variants.includes(variant)) {
        const index = carData[brand][model].variants.indexOf(variant);
        imgElement.src = carData[brand][model].images[index]; // Show model-variant-specific image
    }
}

document.querySelectorAll('.brand').forEach(brandSelect => {
    brandSelect.addEventListener('change', function () {
        const modelSelect = this.nextElementSibling;
        const variantSelect = modelSelect.nextElementSibling;
        const imgElement = this.closest('.car-card').querySelector('img');
        updateModels(this, modelSelect);
        updateImage(this, modelSelect, variantSelect, imgElement);
    });
});

document.querySelectorAll('.model').forEach(modelSelect => {
    modelSelect.addEventListener('change', function () {
        const variantSelect = this.nextElementSibling;
        const imgElement = this.closest('.car-card').querySelector('img');
        updateVariants(this, variantSelect);
        updateImage(this.parentElement.querySelector('.brand'), this, variantSelect, imgElement);
    });
});

document.querySelectorAll('.variant').forEach(variantSelect => {
    variantSelect.addEventListener('change', function () {
        const imgElement = this.closest('.car-card').querySelector('img');
        updateImage(this.parentElement.querySelector('.brand'), this.parentElement.querySelector('.model'), this, imgElement);
    });
});

document.querySelector('.compare-btn').addEventListener('click', function () {
    const brand1 = document.getElementById('brand1').value;
    const model1 = document.getElementById('model1').value;
    const variant1 = document.getElementById('variant1').value;

    const brand2 = document.getElementById('brand2').value;
    const model2 = document.getElementById('model2').value;
    const variant2 = document.getElementById('variant2').value;

    if (brand1 !== "Select Brand" && brand2 !== "Select Brand") {
        let tableContainer = document.querySelector('.comparison-table');
        tableContainer.style.display = "block";
        let table = `
        <table>
            <tr>
                <th>Feature</th>
                <th>${brand1} ${model1} ${variant1}</th>
                <th>${brand2} ${model2} ${variant2}</th>
            </tr>
            <tr>
                <td>Price</td>
                <td>₹X,XX,XXX</td>
                <td>₹Y,YY,YYY</td>
            </tr>
            <tr>
                <td>Fuel Efficiency</td>
                <td>20 km/l</td>
                <td>18 km/l</td>
            </tr>
            <tr>
                <td>Safety Ratings</td>
                <td>5 Star</td>
                <td>4 Star</td>
            </tr>
            <tr>
                <td>Horsepower</td>
                <td>200 HP</td>
                <td>180 HP</td>
            </tr>
            <tr>
                <td>Torque</td>
                <td>250 Nm</td>
                <td>230 Nm</td>
            </tr>
            <tr>
                <td>Top Speed</td>
                <td>220 km/h</td>
                <td>210 km/h</td>
            </tr>
            <tr>
                <td>0-100 km/h</td>
                <td>7.5 seconds</td>
                <td>8.2 seconds</td>
            </tr>
            <tr>
                <td>Transmission</td>
                <td>Automatic</td>
                <td>Manual</td>
            </tr>
            <tr>
                <td>Seating Capacity</td>
                <td>5</td>
                <td>5</td>
            </tr>
            <tr>
                <td>Cargo Space</td>
                <td>400 liters</td>
                <td>380 liters</td>
            </tr>
        </table>`;

        tableContainer.innerHTML = table;
    } else {
        alert('Please select both cars to compare.');
    }
});



// Car Data and Car Comparison Script
const carData1 = { /* existing car data */ };
// Existing car comparison functions...
// Owl Carousel Initialization
$(".slider").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
});
