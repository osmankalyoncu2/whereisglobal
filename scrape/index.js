import * as cheerio from 'cheerio';
import { updateDB } from '../db/index.js';
import puppeteer from 'puppeteer';

async function scrape(url) {
    const html = await pup(url);
    const obj = await cheerio.load(html);
    return obj;
}

async function run(url) { 
    const $ = url ? await scrape(url) : null;
    
    const graph = $(".graph")[0];

    let content = {timestamp: Date.now(), "elos": []};

    let elo = 0;
    let acc = 0;
    graph.children.forEach((child, index) => {
        if (child.attribs && child.attribs.class.split(' ')[0] == 'rating-range') {
            if (elo == 0) {
                content.elos.push({ elo: elo * 1000, percent: 0, acc: 100 });
                elo++;
                return;
            }
            const percent = child.children[1].children[0].children[1].children[1].children[0].data;
            content.elos.push({ elo: elo * 1000, percent: parseFloat(percent.substring(0, percent.length-1)), acc: parseFloat((100-acc).toFixed(2)) });
            elo++;
            acc += parseFloat(percent.substring(0, percent.length-1));
        }
    });

    updateDB(content);
}

async function pup(url) {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();
    const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
    await page.setUserAgent(ua);
    await page.goto(url);
    const html = await page.content();
    await browser.close();
    return html;
}

run('https://csstats.gg/leaderboards');
//run('https://kingsleague.pro/estadisticas/goles/');