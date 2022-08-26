// Initialize and add the map
function initMap(lat, lng) {
  console.log("It is alive");

  const inputLocation = { lat: lat, lng: lng };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: inputLocation,
  });

  const marker = new google.maps.Marker({
    position: inputLocation,
    map: map,
  });
}

window.initMap = initMap;


//get location form
let locationForm = document.getElementById("location-form");

//listen for submit

locationForm.addEventListener("submit", geocode);

function geocode(e) {
  e.preventDefault();

  let location = document.getElementById("location-input").value;
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: location,
        key: "AIzaSyAxfMcSxjfNjScA-i1Wrx1ZsL-2uK4cIBg",
      },
    })
    .then((res) => {
      //log full response
      console.log(res);

      //formatted address
      let formattedAddress = res.data.results[0].formatted_address;
      let formattedAddressOutput = `
<ul class='list-group'>
    <li class='list-group-item'>
        ${formattedAddress}</li>
        </ul>
`;

      let addressComponents = res.data.results[0].address_components;
      let addressComponentsOutput = '<ul class="list-group">';
      for (let i = 0; i < addressComponents.length; i++) {
        addressComponentsOutput += `
  <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
  `;
      }
      addressComponentsOutput += "</ul>";

      let lat = res.data.results[0].geometry.location.lat;
      let lng = res.data.results[0].geometry.location.lng;
      let geometryOutput = `
<ul class= 'list-group'>
    <li class= 'list-group-item'><strong>Latitude</strong>: ${lat}</li>
    <li class= 'list-group-item'><strong>Longitude</strong>: ${lng}</li>
    </ul>
`;

      document.getElementById("formatted-address").innerHTML =
        formattedAddressOutput;
      document.getElementById("address-components").innerHTML =
        addressComponentsOutput;
      document.getElementById("geometry").innerHTML = geometryOutput;

      initMap(lat, lng);
    })
    .catch((err) => console.log(err));
}

// const budaCastle = {
//   lat: 47.4961180781074,
//   lng: 19.0395855903625,
// };
// const citadella = {
//   lat: 47.29779,
//   lng: 19.0282,
// };

// var geocoder;
// var map;
// function initMap() {
//   const inputCityLocation = {lat: -34.397, lng: 150.644 }
//   var latlng = new google.maps.LatLng(-34.397, 150.644);
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: inputCityLocation,
//   });

//   const marker = new google.maps.Marker({
//     position: inputCityLocation,
//     map: map,
//   });

// }

// window.initMap = initMap;

// function codeAddress() {
//   var address = document.getElementById('address').value;
//   geocoder.geocode( { 'address' : address }, function(results, status) {
// if (status == 'okay') {
//   map.setCenter(results[0].geometry.location);
//   var marker = new google.maps.Marker({
//     map: map,
//     position: results[0].geometry.location
//   });
// } else {
//   alert('Geocode was not successful for the following reason: ' + status)
// }
//   })
// }

// const directionsService = new google.maps.DirectionsService();
// const directionsRenderer = new google.maps.DirectionsRenderer();
// let map = google.maps.Map;

// function startMap() {
//   map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 15,
//     center: budaCastle,
//   });

//   const citadellaMarker = new google.maps.Marker({
//     position: {
//       lat: citadella.lat,
//       lng: citadella.lng,
//     },
//     map: map,
//     title: "Citadella",
//   });

//   let infoWindow3 = new google.maps.InfoWindow({
//     content: `<p> It's ${citadellaMarker.title} </p>`,
//   });

//   citadellaMarker.addListener("mouseover", (event) =>
//     infoWindow3.open({
//       anchor: citadellaMarker,
//       map,
//       shouldFocus: false,
//     })
//   );

//   const budaCastleMarker = new google.maps.Marker({
//     position: {
//       lat: budaCastle.lat,
//       lng: budaCastle.lng,
//     },
//     map: map,
//     title: "Buda Castle",
//   });

//   let infoWindow = new google.maps.InfoWindow({
//     content: `<p> It's ${budaCastleMarker.title} </p>`,
//   });

//   budaCastleMarker.addListener("mouseover", (event) =>
//     infoWindow.open({
//       anchor: budaCastleMarker,
//       map,
//       shouldFocus: false,
//     })
//   );

//   //geolocation service
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       function (position) {
//         const user_location = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };

//         map.setCenter(user_location);

//         const userLocationMarker = new google.maps.Marker({
//           position: {
//             lat: user_location.lat,
//             lng: user_location.lng,
//           },
//           map: map,
//           title: "Dis be you",
//         });

//         let infoWindow2 = new google.maps.InfoWindow({
//           content: `<p> ${userLocationMarker.title} </p>`,
//         });

//         userLocationMarker.addListener("mouseover", (event) =>
//           infoWindow2.open({
//             anchor: userLocationMarker,
//             map,
//             shouldFocus: false,
//           })
//         );
//       },
//       function () {
//         alert("Fine, be that way");
//       }
//     );
//   } else {
//     alert("Browser does not support geolocation services");
//   }
// }

// function calcRoute() {
//   var start = budaCastle;
//   var end = citadella;
//   var request = {
//     origin: start,
//     destination: end,
//     travelMode: "WALKING",
//   };
//   directionsService.route(request, function (result, status) {
//     if (status == "OK") {
//       console.log("ok");
//       directionsRenderer.setDirections(result);
//     } else {
//       window.alert("Directions request failed due to " + status);
//     }
//   });

//   directionsRenderer.setMap(map);
//   directionsRenderer.setPanel(document.getElementById("directionsPanel"));
// }

// startMap();
// calcRoute();
