var parksKey = 'J6YwwQU5Pdf3XX70BNdRWNHUZoz5neEQnOc5x3LL';
const start = async () => {
  var res = await fetch('https://ipapi.co/json');
  var data = await res.json();
  var stateIP = data.region_code;
  console.log(stateIP);
  var apiKey = `https://developer.nps.gov/api/v1/parks?stateCode=${stateIP}&api_key=${parksKey}`;
  console.log(apiKey);
  var data;
  fetch(apiKey)
    .then(function (response) {
      return response.json();
    })
    .then(function (parks) {
      data = parks.data;
      console.log(data);
      for (var i = 0; i < parks.data.length; i++) {
        var card = document.createElement('div');
        card.innerHTML = `
<div class="col text-center">
  <div class="col-lg-4">
    <div class="card" style="width: 18rem;">
        <img class= homepage-img src=${parks.data[i].images[0].url} alt="Card image cap" height="200px" width="auto">
        <div class="card-body">
            <h4 class="card-title">${parks.data[i].fullName}</h4>
<hr>
            <h5>About the Park</h5>
            <p class="card-text">${parks.data[i].description}</p>
<hr>
            <h5>PARK FEE<h5>
                <p>${parks.data[i].entranceFees[0].cost}<p>
<hr>      
            <h5>Hours</h5>
                <p class="card-time-text">Monday: ${parks.data[i].operatingHours[0].standardHours.monday} </li>
                <p class="card-time-text">Thuesday: ${parks.data[i].operatingHours[0].standardHours.tuesday} </li>
                <p class="card-time-text">Wednesday: ${parks.data[i].operatingHours[0].standardHours.wednesday} </li>
                <p class="card-time-text">Thursday: ${parks.data[i].operatingHours[0].standardHours.thursday} </li>
                <p class="card-time-text">Friday: ${parks.data[i].operatingHours[0].standardHours.friday} </li>
                <p class="card-time-text">Saturday: ${parks.data[i].operatingHours[0].standardHours.saturday} </li>
                <p class="card-time-text">Sunday: ${parks.data[i].operatingHours[0].standardHours.sunday} </li>
            </ul>
        </div>         
        <button id="add-fav" class="button btn-lg" data-index=${i} data-fullName="${parks.data[i].fullName}" data-description="${parks.data[i].description}" data-park-id="${parks.data[i].id}" >Add to Faves</button>
    </div> 
  </div>
</div>
                `;
        document.querySelector('#parks-cards').appendChild(card);
      }
      const newFormHandler = async (event) => {
        event.preventDefault();
      var index = event.target.getAttribute('data-index');
      
      
      //add here new post etc
      //faves_id
      var park_id_code = event.target.getAttribute('data-park-id')
      console.log(park_id_code);
      //faves_fullName
      var fullName = event.target.getAttribute('data-fullName');
      //faves_description
      var description = event.target.getAttribute('data-description');
      //user_id
      const response = await fetch(`/api/faves`, {
        method: 'POST',
        body: JSON.stringify({ fullName, description, park_id_code, }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/profile');
      } else {
        alert(response);
      }
    };
    // I CHANGED THE SELECTOR TO AN ID SO IF IT DOESNT WORK WE NEED TO CHANGE THE TEMP LITERAL BACK TO A CLASS> SHOULDNT BE AN ISSUE.
      document.querySelectorAll('#add-fav').forEach((element) => {
        // element.addEventListener('click', function (e) {
          element.addEventListener('click', newFormHandler);
      // });
    });
});
}
start();
