// Home Page Code👇👇👇👇

// When Click on Product Button in Nav-Bar, Smoothly goes to Card Section

function scrollToProducts() {
    // Scroll smoothly to the cardSection
    document.getElementById('cardSection').scrollIntoView({ behavior: 'smooth' });
}

// Data Fetch From data.json File
let url = "http://localhost:3000/cars";

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from the API (data.json in my case)
    fetch(url) // Server is running at localhost:3000
        .then(response => response.json())
        .then(data => {
            // Check if data is an array
            if (Array.isArray(data)) {
                // Process the fetched data and create cards
                createCards(data);
            } else {
                console.error('Invalid data format. Expecting an array.');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

// Process of creating cards

function createCards(data) {
    const cardSection = document.getElementById('cardSection');

    // Loop through the data and create cards dynamically
    data.forEach(cardData => {
        const card = document.createElement('div');
        card.classList.add('card');
        // Adding car Image dynamically
        const img = document.createElement('img');
        img.src = cardData.imageURL; // Use the imageURL from data
        img.alt = cardData.carName;
        // Adding car details dynamically
        const details = document.createElement('div');
        details.classList.add('card-details');
        details.innerHTML = `
        <p>Car Name: ${cardData.carName}</p>
        <p>Fuel: ${cardData.fuel}</p>
        <p>Speed: ${cardData.speed}</p>
        <p>Price: ${cardData.price}</p>
      `;
        // Create Book-Button dynamically
        const bookButton = document.createElement('a');
        bookButton.href = '#';
        bookButton.classList.add('book-button');
        bookButton.textContent = 'Book a Car';
        // Appending Details
        card.appendChild(img);
        card.appendChild(details);
        card.appendChild(bookButton);

        cardSection.appendChild(card);
    });
}


//   Admin Panel Code 👇👇👇👇


function gettingData() {


    fetch(url).then(res => {
        console.log(res);
        return res.json();
    }).then(res2 => {
        showdata(res2)
    })
}

function showdata(res2) {
    let str = "";
    res2.forEach((item) => {

        str = str +
            `
        <tr>
        <td>${item.carName}</td>
        <td>${item.fuel}</td>
        <td>${item.speed}</td>
        <td>${item.price}</td>
        <td>
            <button class="update" onclick="updateData(${item.id})">
                <img class="pencil" src="Images/pencil.svg"Update Icon">
            </button>
            <button class="delete" onclick="deleteData(${item.id})">
                <img class="dustbin" src="Images/dustbin.svg" alt="Delete Icon">
        </td>
        </tr>
        `
    });
    let body = document.querySelector("tbody")
    body.innerHTML = str;

}
gettingData()

function deleteData(id) {
    const deleteId = id;

    console.log(deleteId);

    fetch(url + "/" + deleteId, {

        method: 'DELETE'
    })
}

function updateData(id) {
    window.location.href = `DataEntryForm.html?id=${id}`

}

function addCar(id) {
    window.location.href = `DataEntryForm.html`;
}


//   Car Entry Form Code 👇👇👇👇


const params = new URLSearchParams(window.location.search);
const id = params.get("id");



if (id) {
    getEditData()
}

const form = document.querySelector("form")

form.addEventListener("submit", function (event) {

    console.log(event);
    event.preventDefault();

    if (this.carName.value != "" &&
        this.fuel.value != "" &&
        this.speed.value != ""
        && this.price.value != ""
        && this.imageURL.value != "") {

        const dataObj = {

            carName: this.carName.value,
            fuel: this.fuel.value,
            speed: this.speed.value,
            price: this.price.value,
            imageURL: this.imageURL.value

        }
        console.log(dataObj);
        let method = 'POST'
        if (id) {
            url = url + '/' + id
            method = 'PUT'
        }
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataObj)
        })
            .then(() => {
                window.location.href = "AdminPanel.html";

            })
    }
})

function getEditData() {

    fetch(url + "/" + id).then(data => {
        return data.json();
    }).then(res => {
        document.getElementById("carName").value = res.carName,
            document.getElementById("fuel").value = res.fuel,
            document.getElementById("speed").value = res.speed,
            document.getElementById("price").value = res.price;
        document.getElementById("imageURL").value = res.imageURL;
    })
}