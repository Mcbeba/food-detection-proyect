const fs = require('fs');
const path = require('path')
const archivo = path.resolve(__dirname, 'historial.json');


//Guardar historial
function saveDB(data) {
    try {
        fs.writeFileSync(archivo, JSON.stringify(data, null, 2));
        console.log('Data save at historial.json');
    } catch (error) {
        console.error('Error al guardar en historial.json:', error);
    }
}

//Leer el historial
function readDB() {
    try {
        const data = fs.readFileSync(archivo, 'utf8');
        if (data.length === 0) {
            console.log('Database empty');
            return null;
        }
        const jsonData = JSON.parse(data);
        const object = jsonData.map(jsonString => JSON.parse(jsonString))
        console.log(object);
        return object

    } catch (error) {
        console.error('Error reading Database:', error);
        return null;
    }
}


module.exports = {
    saveDB,
    readDB
}