window.addEventListener('load', function(event) {

    !window.reinit && (window.reinit = {});


    window.reinit.map = (conf) => {

        const {
            baloonSizeWidth,
            baloonSizeHeight,
            zoom,
            coords
        } = conf;

        const [initLat, initLon] = coords[0];

        let isMapInited = false;
        if (!isMapInited) {
            isMapInited = true;
            (async() => {
                await new Promise((resolve, reject) => {
                    $.getScript({
                        url: 'https://api-maps.yandex.ru/2.1/?apikey=AQAAAABYwOCAVM1bfnx9nlHU_xs6Z_Sf_lK8k&lang=ru_RU',
                        dataType: "script",
                        success: () => resolve()
                    })
                })

                ymaps.ready(init);

                const createPlacemark = (lat, lon) => {
                    var myPlacemark = new ymaps.Placemark([lat, lon], {}, {
                        balloonShadow: false,
                        balloonPanelMaxMapArea: 0,
                        balloonOffset: [0, -baloonSizeWidth],
                        iconLayout: 'default#image',
                        // Своё изображение иконки метки.
                        iconImageHref: '/local/templates/html/images/map-mark.svg',
                        // Размеры метки.
                        iconImageSize: [baloonSizeWidth, baloonSizeHeight],
                        // Смещение левого верхнего угла иконки относительно
                        // её "ножки" (точки привязки).
                        iconImageOffset: [-baloonSizeWidth / 2, -baloonSizeHeight]
                    });

                    return myPlacemark
                }


                function init() {
                    // Создание карты.



                    var myMap = new ymaps.Map("map", {
                        center: [initLat, initLon],
                        // от 0 (весь мир) до 19.
                        zoom: zoom
                    });

                    coords.forEach((x) => {
                        const [lat, long] = x;
                        myMap.geoObjects.add(createPlacemark(lat, long));
                    })

                    $('.js-map').removeClass('preloader');
                }
            })()
        }
    }




})