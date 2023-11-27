let stopDetection = false;

//Detectar el modelo de alimentos
async function detect() {
    const video = document.getElementById('videoElement');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const model = await cocoSsd.load();

    stopDetection = false;

    async function predict() {
        ctx.drawImage(video, 0, 0, 640, 480);
        const predictions = await model.detect(video);

        for (let i = 0; i < predictions.length; i++) {
            const object = predictions[i];
            const clasesValidas = ["apple", "banana", "orange", "broccoli", "carrot", "sandwich", "donut", "hotdog", "pizza", "cake"];

            if (clasesValidas.includes(object.class)) {

                ctx.strokeStyle = 'green';
                ctx.lineWidth = 4;
                ctx.strokeRect(object.bbox[0], object.bbox[1], object.bbox[2], object.bbox[3]);
                ctx.font = '24px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(object.class, object.bbox[0] + 10, object.bbox[1] + 24);

                if (object.score > 0.90) {
                    stopDetection = true;
                    const respuesta = object.class
                    const message = "Food detected: " + respuesta;
                    console.log(message)
                    ctx.font = '24px Arial';
                    ctx.fillStyle = 'white';
                    ctx.fillText(message, 20, 50);

                    await sendFood(obtainQuery(respuesta));
                }
            }
        }
        if (!stopDetection) {
            requestAnimationFrame(() => predict());
        }
    }
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => console.error('Error accessing camera:', err));

    video.onloadedmetadata = () => {
        video.play();
        predict();
    };
}

////Obtener Query
function obtainQuery(respuesta) {
    let query = ''
    switch (respuesta) {
        case 'apple':
            query = '1 apple';
            break;
        case 'banana':
            query = '1 banana';
            break;
        case 'orange':
            query = '1 orange';
            break;
        case 'broccoli':
            query = '1 broccoli';
            break;
        case 'carrot':
            query = '1 carrot';
            break;
        case 'sandwich':
            query = '1 sandwich';
            break;
        case 'donut':
            query = '1 donut';
            break;
        case 'hotdog':
            query = '1 hotdog';
            break;
        case 'pizza':
            query = '1 slice pizza';
            break;
        case 'cake':
            query = '1  piece of cake';
            break;
        default:
            query = 'Not Found';
    }
    return query;

}

//Enviar la respuesta del alimento al servidor
async function sendFood(food) {
    try {
        const responseDelServidor = await fetch('https://localhost:8001/alimento', {
            body: JSON.stringify({
                food
            }),
            mode: "cors",
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            })
        })

        //console.log(responseDelServidor)
        console.log('Server received food');

    } catch (error) {
        console.error('Error sending food to server:', error);
    }
}

//Resetear la detección
function setDetection() {
    console.log('Reset detection');
    stopDetection = false;
    detect();
}

detect();
