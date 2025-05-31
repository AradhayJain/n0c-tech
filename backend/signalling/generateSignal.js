import { timeStamp } from 'console';
import fs from 'fs';

const generateRandomSignal = () => {
    const temp= Math.random();
    const pressure= Math.random();
    const humidity= Math.random();

    return {
        temperature: temp,
        pressure: pressure,
        humidity: humidity
    };
}


const generateSignal= ()=>{
    const signal =[];
    for(let i = 0; i < 10; i++) {
        let timeStamp=new Date().toISOString()
        signal.push({signal:generateRandomSignal(),timeStamp:timeStamp});

    }
    return {
        signal: signal,
    };
}

const to_json = (signal) => {

    if (!signal || !signal.signal) {
        throw new Error('Invalid signal object');
    }
    return JSON.stringify({
        signal: signal.signal,
    });
}

export const save_json = () => {
    const signal=generateRandomSignal();
    const finalSignal=generateSignal(signal);
    const json = to_json(finalSignal);
    
    fs.writeFile('signal.json', json, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Signal saved to signal.json');
        }
    });
}
