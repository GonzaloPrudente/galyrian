# Galyrian

## ¿Qué es Galyrian?
Básicamente Galyrian es una galería fotográfica con un diseño sencillo, bonito y responsive.
Además, es muy sencilla de implementarse.

## Descargas
* Versión Plug N' Play: [galyrian-pnp-1.0.2.zip](https://github.com/user/repo/blob/branch/other_file.md)
* Versión con librerías aparte: [galyrian-1.0.2.zip](https://github.com/EdGraVill/galyrian/raw/master/dist/galyrian-1.0.2.zip)

## Instalación
### Versión Plug N' Play
La forma más sencilla de implementar Galyrian es con la versión Plug N' Play, pues tiene todas las utilerías necesarias comprimidas en el mismo archivo, así que literalmente sólo instalas los archivos y ya están listos para usarse.
El archivo .zip contiene dos archivos:
* galyrian.min.css
* plugnplay-galyrian.min.js

Lo único que debes hacer es llamar el archivo galyrian.min.css dentro de la etiqueta head así:
```html
<head>
[...]
<link rel="stylesheet" href="galyrian.min.css">
[...]
</head>
```
Y el archivo plugnplay-galyrian.min.js antes de cerrar la etiqueta </body> de la siguiente manera:
```html
<body>
[...]
<script type="text/javascript" src="plugnplay-galyrian.min.js"></script>
</body>
```
### Versión con Librerías Aparte
También puedes descargar sólo el código de Galyrian en JS y los estilos necesarios para funcionar en CSS; esto es para todas aquellas personas que en su proyecto ya tengan jQuery, jQuery UI y/o Hammer.js no tengan conflictos al utilizar Galyrian.
Galyrian utiliza las siguientes librerías, que igualmente se encuentran contenidas en el archivo .zip en caso de que necesites una aparte:
`
> jQuery 3.1.0
> jQuery UI 1.12.0
> Hammer.js 2.0.8
`
El archivo .zip contiene los siguientes archivos:
* galyrian.min.css
* galyrian.min.js
* | lib
 * hammer-2.0.8.min.js
 * jquery-3.1.0.min.js
 * jquery-ui-1.12.0.min.js

Se instala de la misma manera que en la Versión Plug N' Play, pero llamando el código después de las librerías.

## Uso
Implementarlo es realmente muy simple, lo únio que se debe hacer, es que dentro de un contenedor el cual podrás mover y ajustar el tamaño libremente sin preocuparte pues Galyrian se ajusta; crear un div con el id "galyrian":
```html
<div id="galyrian"></div>
```
Para indicarle qué imágenes con sus respectivos títulos y descripciones debe usar, primero se debe agredar el atributo "coleccion" con el nombre de nuestra colección de imágenes como valor:
```html
<div id="galyrian" coleccion="foo"></div>
```
Y después se debe crear un array en javascript que contenga como objetos los atributos de cada imagen ya mencionados:
```javascript
var foo = [
    {
        titulo: 'Título de imagen 1',
        src: '[ruta de la imagen (puede ser de sitios externos)]',
        descripcion: 'Descripción de la imagen 1'
    }, {
        titulo: 'Título de imagen 2, Sólo tiene título',
        src: 'img/mi-foto.jpg'
    }, {
        src: 'http://img3.wikia.nocookie.net/__cb20131014231758/legomessageboards/images/c/c2/Troll-face.png',
        descripcion: 'Descripción de la imagen 3, Sólo tiene descripción'
    }
];
```

## Colaboraciones
Actualmente, y por ser un proyecto nuevo, sólo trabaja en él [Eduardo Grajales](https://github.com/EdGraVill), pero tú también puedes ayudar a mejorar y hacer más grande este proyecto.
Aceptamos dos formas de colaboración:
### Enviándonos tus ideas para mejorar
[Enviar Mail](mailto:hola@inncode.mx?Subject=Tengo una brillante idea para Galyrian)

Las mejores ideas irán en la lista de promesas para futuras versiones.
### Contribuyendo directamente al desarrollo implementando tus propias ideas o ayudando a cumplir las promesas para las futuras versiones
[Fork](https://github.com/EdGraVill/galyrian#fork-destination-box)

Las promesas para futuras versiones están en la siguiente sección.

## Próximamente
Si estás leyendo esto, posiblemente eres uno de los primeros en descubrir Galyrian, pues es muy nueva y las ambiciones son muchas, por eso a manera de 'ToDo list' y de promesas para futuras veriones, la siguiente lista contiene todas las cosas que proximamente podrás encontrar:
* Versión hecha con JavaScript puro
* Mejoras en el rendimiento
* Templates
* Configuración Completa
* Miniaturas

## Licencia
[GPL 3.0](https://www.gnu.org/licenses/gpl.html)