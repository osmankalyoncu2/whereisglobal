import * as cheerio from 'cheerio'
import { updateDB } from '../db/index.js'

async function scrape(url) {
    const res = await fetch(url);
    const html = await res.text();
    return cheerio.load(html);
}

async function run(url) { 
    const $ = url ? await scrape(url) : null;

    console.log($);
    
    const graph = $(".graph")[0];

    let content = {timestamp: Date.now(), "elos": []};

    let elo = 0;
    let acc = 0;
    graph.children.forEach((child, index) => {
        if (child.attribs && child.attribs.class.split(' ')[0] == 'rating-range') {
            const percent = child.children[1].attribs.title;
            content.elos.push({ elo: elo * 1000, percent: parseFloat(percent.substring(0, percent.length-1)), acc: parseFloat((100-acc).toFixed(2)) });
            elo++;
            acc += parseFloat(percent.substring(0, percent.length-1));
        }
    });

    updateDB(content);
}

run('https://csstats.gg/es/leaderboards');