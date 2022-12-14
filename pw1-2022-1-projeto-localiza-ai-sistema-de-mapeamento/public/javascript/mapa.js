let map
let marker

let center = {lat: -6.888463202449027, lng: -38.558930105104125};

function initMap() {
  map = new google.maps.Map(document.getElementById("map"),
  {
    center: center,
    zoom: 14,
  });

  marker = new google.maps.Marker(
  {
      map: map,
      position: center,
      draggable: true
  });

  map.addListener("click", (evt) =>
  {
    addMarker(evt);
  });

  marker.addListener('position_changed', ()=>
  {
      map.setCenter(marker.position)
  });

}

function addMarker(evt){
    marker.setPosition(evt.latLng)
}

//---------------------------|SALVA OS MARCADORES|---------------------------//
function salvar(){

    const obj = {
        nome: document.getElementById('nome').value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    };

    fetch("http://localhost:3000/pontos",
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response => {alert('Inserido!')})
    .catch(error => alert('Falha ao salvar!'));   

}

//---------------------------|VISUALIZA OS MARCADORES|---------------------------//
function VerPonto(){ 
  fetch('http://localhost:3000/getPonto')
    .then(function(response) {
      return response.json()
    })
    .then(function(data) {
      var x = 0
      data.forEach(function() {
        new google.maps.Marker(
        {
          position: new google.maps.LatLng(TransformLatLng(data[x]['localizacao'])[0], TransformLatLng(data[x]['localizacao'])[1]),
          map: map,
          draggable: false,
          title: nome
        });
      x = x + 1
      })
    })
}

function TransformLatLng(point)
{
  let latLng = point.replace("POINT(", "").replace(")", "").replace(" ", "/")
  var result = latLng.split("/")
  let points = [parseFloat(result[0]), parseFloat(result[1])]
  return points
}

//---------------------------|REMOVE OS MARCADORES|---------------------------//
function removerPontos()
{
  fetch("http://localhost:3000/getPonto", 
  {
    method: "DELETE",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => {
    closePopUp()
    showPopUp("Aviso", "Pontos Excluidos com Sucesso!")
  })
  .catch(error => showPopUp("Ops Algo deu Errado", "Falha ao deletar!"))
}
