var map;
var geocoder;

function initialize() {
	var mapContainer = $('#map-canvas');
	var address = mapContainer.data('address');
	var icon = '../img/map-marker.png';

	map = new google.maps.Map(mapContainer[0], {
		zoom: 16,
		scrollwheel: false,
		center: codeAddress(address),
		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#337DFF"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"featureType":"poi","stylers":[{"visibility": "off"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#ffda00"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#2ecc71"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#333739"},{"weight":0.8}]},{"featureType":"poi.park","stylers":[{"color":"#2ecc71"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#2ecc71"},{"weight":1},{"lightness":-25}]}]
	});

	var marker = new google.maps.Marker({
    position: map.getCenter(),
    icon: icon,
    map: map
  });
}
function codeAddress(address) {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function openModal(target) {
	$('body').addClass('modal-open');
	$(target).addClass('active');
}

function closeModal() {
	$('body').removeClass('modal-open');
	$('#modal-container .modal.active').removeClass('active');
}

$(document).ready(function () {
	// map
	initialize();

	// toggle
	$('[data-toggle]').on('click', function () {
		var target = $(this).data('toggle');
		$(target).toggleClass('active');
	});

	// modal
	$('[data-modal]').on('click', function () {
		var target = $(this).data('modal');
		if (target == "close") {
			closeModal();
		} else {
			openModal($(target)[0]);
		}
	});
	$(document).on('keyup', function (e) {
		if (e.keyCode == 27) {
			closeModal();
		}
	});
});
