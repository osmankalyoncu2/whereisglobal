import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path'

const DB_PATH = path.join(process.cwd(), './db/');

export function readDBFile(dbName) {
    return readFile(`${DB_PATH}/${dbName}.json`, 'utf-8').then(JSON.parse);
}

export const CURRENT_DATA = await readDBFile('current_data');
export const HISTORIC_DATA = await readDBFile('historical_data');
export const CSGO_DATA = await readDBFile('csgo_rank_distribution');

export function writeDBFile(dbName, data) {
    return writeFile(`${DB_PATH}/${dbName}.json`, JSON.stringify(data, null, 2), 'utf-8');
}

export async function updateDB(content) {
    const csgo = await readDBFile("csgo_rank_distribution");
    const calculatedElos = calculateElos(content, csgo);
    writeDBFile("current_data", {eloPerRank: calculatedElos, timestamp: content.timestamp});

    let hist = { ...HISTORIC_DATA };
    
    hist.historical_global = [{ elo: calculatedElos.global, timestamp: content.timestamp }].concat(hist.historical_global);
    writeDBFile("historical_data", hist);
}

function calculateElos(content, csgo) {
    let res = {};
    let keys = Object.keys(csgo);

    let key_target = keys[keys.length-1];
    let acc_target = csgo[key_target].acc;

    for (let i = content.elos.length - 1; i > 0; i--) {
        const acc = content.elos[i].acc;
        const acc_low = content.elos[i - 1].acc;

        if (acc > acc_target || acc < acc_target && acc_low < acc_target) continue;
            
        const calcElo = (content.elos[i - 1].elo + (acc_target - acc_low) * 1000 / (acc - acc_low)).toFixed(0); 
        res = { ...res, [key_target]: parseInt(calcElo) };

        keys.pop();
        key_target = keys[keys.length-1];
        if (csgo[key_target] == undefined) break;
        acc_target = csgo[key_target].acc;

        i += 2;
    }

    res.unranked = 0;

    return res;
}