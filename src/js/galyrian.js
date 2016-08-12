// Comprobar el dispositivo

var Device = 'desktop'
var windowWidth = $(window).width();
function comprobarDevice () {
	if (windowWidth <= '440') {
		Device = 'mobile'
	} else if (windowWidth <= '920') {
		Device = 'tablet'
	} else if (windowWidth > '920') {
		Device = 'desktop'
	}
}
comprobarDevice();
$(window).resize(function(){
	if($(this).width() != windowWidth){
		windowWidth = $(this).width();
		comprobarDevice();
	}
});

// Posición en la Galería
var gPos = 1

// Obtener colección y crear todos los elementos de la galería
var here = '' + $('#galyrian').attr('coleccion');
if (here == '') {
	here = 'index';
}

var hereCount;
$('#galyrian').html('<div id="fotos"></div><div id="controles"><div id="pbar"><span></span></div><div id="caption"></div><div id="botones"><i onmousedown="gPrev()" class="icon circle-left"></i><div id="reproduccion"><i class="icon play3"></i><i class="icon pause2"></i></div><i onmousedown="gNext()" class="icon circle-right"></i></div></div>');
$(document).ready(function() {
	hereCount = window[here];
	if (hereCount == undefined) {
		hereCount = index;
	}

	
	$('#fotos').css('width', ((hereCount.length * 100) + '%'));

	for (var i = 0; i < hereCount.length; i++) {
		$('#fotos').append('<div class="foto"><img src="' + hereCount[i].src + '"></div>')
		if (hereCount[i].titulo == undefined) {
			hereCount[i].titulo = ''
		}
		if (hereCount[i].descripcion == undefined) {
			hereCount[i].descripcion = ''
		}
	}

	setTimeout(function () {
		$('#controles').animate({width: ($('img[src="' + hereCount[(gPos - 1)].src + '"]').outerWidth())}, 300)
		$('#controles').animate({left: ((gPos - 1) * stepLength) + (($('#galyrian').outerWidth() - $('img[src="' + hereCount[(gPos - 1)].src + '"]').outerWidth()) / 2)}, 300);
		if (Device == 'mobile' || Device == 'tablet') {
			$('#botones').css('height', $('#galyrian').outerHeight() + 'px');
		} else if (Device == 'desktop') {
			$('#botones').css('height', '100%');
		}
		$('#caption').html('<h2>' + hereCount[(gPos - 1)].titulo + '</h2><p>' + hereCount[(gPos - 1)].descripcion + '</p>');
	}, 50);

});

// Ajustar tamaño de elementos
var stepLength = $('#galyrian').outerWidth();
$(window).resize(function() {
	stepLength = $('#galyrian').outerWidth();
	gGoto(gPos);
	if (Device == 'mobile' || Device == 'tablet') {
		$('#botones').css('height', $('#galyrian').outerHeight() + 'px');
	} else if (Device == 'desktop') {
		$('#botones').css('height', 'calc(100% + 5px)');
	}
});

function gGoto (pos) {
	if ($('#galyrian').is(':animated') == false) {
		pos = parseInt(pos);
		if (pos > hereCount.length) {
			console.log('No existen tantas imágenes en esta colección')
		} else if (pos <= 0) {
			console.log('Debes escribir una cantidad mayor que 0 (cero)')
		} else {
			$('#galyrian').animate({scrollLeft: ((pos - 1) * stepLength)}, 300);
			$('#controles').animate({left: ((pos - 1) * stepLength) + (($('#galyrian').outerWidth() - $('img[src="' + hereCount[(pos - 1)].src + '"]').outerWidth()) / 2)}, 300);
			gPos = pos;
			$('#controles').animate({width: ($('img[src="' + hereCount[(gPos - 1)].src + '"]').outerWidth())}, 100)
			$('#caption').html('<h2>' + hereCount[(gPos - 1)].titulo + '</h2><p>' + hereCount[(gPos - 1)].descripcion + '</p>');
		}
		if (playing) {
			gRestart();
		}
	} else {
		console.log('Aguarde a que la transición finalice.')
	}
}

function gNext () {
	if ($('#galyrian').is(':animated') == false) {
		if (gPos == hereCount.length) {
			gGoto(1);
			gPos = 1;
		} else {
			$('#galyrian').animate({scrollLeft: (gPos * stepLength)}, 300);
			$('#controles').animate({left: (gPos * stepLength) + (($('#galyrian').outerWidth() - $('img[src="' + hereCount[(gPos)].src + '"]').outerWidth()) / 2)}, 300);
			$('#caption').html('<h2>' + hereCount[(gPos)].titulo + '</h2><p>' + hereCount[(gPos)].descripcion + '</p>');
			gPos++;
			$('#controles').animate({width: ($('img[src="' + hereCount[(gPos - 1)].src + '"]').outerWidth())}, 100);
		}
		if (playing) {
			gRestart();
		}
	} else {
		console.log('Aguarde a que la transición finalice.')
	}
}

function gPrev () {
	if ($('#galyrian').is(':animated') == false) {
		if (gPos == 1) {
			gGoto(hereCount.length);
			gPos = hereCount.length;
		} else {
			$('#galyrian').animate({scrollLeft: ((gPos - 2) * stepLength)}, 300);
			$('#controles').animate({left: ((gPos - 2) * stepLength) + (($('#galyrian').outerWidth() - $('img[src="' + hereCount[(gPos - 2)].src + '"]').outerWidth()) / 2)}, 300);
			$('#caption').html('<h2>' + hereCount[(gPos - 2)].titulo + '</h2><p>' + hereCount[(gPos - 2)].descripcion + '</p>');
			gPos--
			$('#controles').animate({width: ($('img[src="' + hereCount[(gPos - 1)].src + '"]').outerWidth())}, 100);
		}
		if (playing) {
			gRestart();
		}
	} else {
		console.log('Aguarde a que la transición finalice.')
	}
}

var playing = false;
gPlay();


if (Device == 'mobile' || Device == 'tablet') {
	var hHeader = new Hammer(document.getElementById('galyrian'));
	hHeader.on('swipeleft', function() {
		gNext();
	});

	hHeader.on('swiperight', function() {
		gPrev();
	});

	hHeader.on('tap', function() {
		$('#reproduccion').stop();
		$('#reproduccion').css('opacity', '1');
		$('#reproduccion').animate({opacity: 0}, 500);
		if (playing) {
			gStop();
			$('#caption').css({
				height: $('#galyrian').outerHeight() + 'px',
				background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(0,0,0,0.6) 100%)',
			});
			$('#caption').animate({opacity: '1'}, 200);
		} else if (!playing) {
			gPlay();
			$('#caption').css({
				height: '100%',
				opacity: '0',
				background: 'none',
			});
		}
	});
}

if (Device == 'desktop') {
	$('#reproduccion').click(function() {
		$('#reproduccion').stop();
		$('#reproduccion').css('opacity', '1');
		$('#reproduccion').animate({opacity: 0}, 500);
		if (playing) {
			gStop();
		} else if (!playing) {
			gPlay();
		}
	});
}

var play;
function gPlay () {
	play = setInterval(gNext, 5000);
	$('#pbar span').stop();
	$('#pbar span').animate({width: '0%'}, 300);
	$('#pbar span').animate({width: '100%'}, 4999);
	$('.play3').css('display', 'block');
	$('.pause2').css('display', 'none');
	playing = true;
}

function gStop () {
	clearInterval(play);
	$('#pbar span').stop();
	$('#pbar span').animate({width: '0'}, 300);
	$('.pause2').css('display', 'block');
	$('.play3').css('display', 'none');
	playing = false;
}

function gRestart () {
	gStop();
	gPlay();
}

if (Device == 'desktop') {
	$('#galyrian').hover(function() {
		$('#controles').addClass('active');
	}, function() {
		$('#controles').removeClass('active');
	});
}