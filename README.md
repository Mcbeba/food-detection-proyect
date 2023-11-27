<h1 align="center"> Food Detection Proyect </h1>

# Food Detection Proyect 
Esta aplicación implementa el reconcimiento de alimentos a través de la cámara web y proporciona la información nutricional del alimento mediante la API: Nutrition API. Utiliza el modelo Object Detection COCO-SSD de TensorFlow.js, capaz de identificar objetos definidos en COCO dataset. Este modelo es capaz de detectar 80 clases de objetos de los cuales 10 son alimentos. Para este proyecto se ha configurado para que detecte los alimentos con un nivel de confianza del 90%. Los alimentos reconocidos actualmente por el modelo son: Manzana, plátano, naranja, zanahoria, brócoli, pastel, donut, pizza, hotdog y sandwich.


## Instalación
Clonar desde el repositorio de GitHub https://github.com/Mcbeba/food-detection-proyect.git ó instalar a través de NPM con "npm install food-detection-proyect"

Instalar dependecias: npm install


## Uso

1. Visite la web para obtener su apiKey "https://api-ninjas.com/"  

2. Ejecute la aplicación desde la terminal con el comando "npm start menu.js" y elija una opción usando las flechas del teclado.

3. Si selecciona "Start server for Food Detector", espere a que el servidor esté activo.

3. Abra su navegador y diríjase al panel general de visualización en: https://localhost:8001.

4. Coloque el alimento frente a la cámara para su detección.

5. Presione el botón "Reset Detection" en el navegador para detectar otro alimento. 

6. Consulte la salida de la consola para visualizar los resultados.

7. Use las flechas del teclado para seleccionar "Open last search history" y ver el historial de los últimos alimentos detectados.

8. Si desea salir de la aplicación seleccione "Exit".


## Dependencias

-Axios: para solicitudes HTTP desde Node.js a la API
-Dotenv: carga de variables de entorno desde archivos .env
-Express: simplifica el desarrollo de aplicaciones web al facilitar la gestión de servidores, rutas  y middleware.
-Body-parser: middleware de Express para analizar información en las solicitudes HTTP.
-Inquirer: para menú interactivo en la consola. 


