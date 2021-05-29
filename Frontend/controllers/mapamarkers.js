window.onload = () => {
   const renderPlaces = async () => {
    console.log(localStorage.id)
    const response = await fetch(`http://127.0.0.1:8080/user/pedidos`)
    const p = await response.json()
    const places= p.results;
    console.log(p.results)
    x = navigator.geolocation;
    x.getCurrentPosition(success);

    function success(position) {
        var myLat = position.coords.latitude;
        var myLong = position.coords.longitude;
        var coords = new google.maps.LatLng(myLat, myLong);

        var mapOptions = {
            zoom: 9,
            position: coords,
            center: coords,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        for (const place of places) {
        console.log(place.properties.latitude)
        console.log(place.properties.longitude)
        var latDestino1 = place.properties.latitude;
        var longDestino1 = place.properties.longitude;
        var coordsDestino1 = new google.maps.LatLng(latDestino1, longDestino1);
        var markerDestino1 = new google.maps.Marker({
            map: map, position: coordsDestino1,
            icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        });
    }

        }


    }
    renderPlaces()
}