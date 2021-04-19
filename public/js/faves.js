// FIGURE THIS OUTTTTT
console.log("works");

const parkData = async () => {
  const response = await fetch(
    "/api/faves/data"
    // ,
    // {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    // }
  );
  var parks = await response.json();

  console.log(parks);

  console.log(parks.data[0].fullName);

  for (let i = 0; i < parks.data.length; i++) {
    // This makes the card
    var parkCard = document.createElement("div");

    // All of this is being created and inserted into the card
    // Make h1 with park name
    var parkName = document.createElement("h1");
    // THIS ALLOWS YOU TO EDIT IN CCS WITH A CARD.
    parkName.classList.add("faves-title");
    parkName.innerText = parks.data[i].fullName;
    parkCard.appendChild(parkName);

    // Make description with p tag
    var parkDescription = document.createElement("p");
    parkName.classList.add("faves-description");
    parkDescription.innerText = parks.data[i].description;
    parkCard.appendChild(parkDescription);

    // THIS ADDS ALL OF THAT INFO TO THE CARD
    document.querySelector("#parks-container").appendChild(parkCard);
    console.log(parkCard);
  }
};
parkData();
