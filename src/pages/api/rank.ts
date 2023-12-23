import type { NextApiRequest, NextApiResponse } from 'next';
import { CURRENT_DATA } from './../../../db/index';
import { useSearchParams } from 'next/navigation';


const methodHandlerMap: { [id: string]: (req: NextApiRequest, res: NextApiResponse) => void } = {
}
methodHandlerMap["get"] = get;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Set the CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const method: string = (req.method as string).toLowerCase();

    if (!Object.keys(methodHandlerMap).includes(method)) {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    return methodHandlerMap[method](req, res);
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    const elo = parseInt(req.query.elo as string);
    if(!elo) return res.status(400).json({ error: "Missing elo parameter" });

    let currentRank = -1;
    const ranks = Object.keys(CURRENT_DATA.eloPerRank);
    for(let i = 0; i < ranks.length; i++) {
        if(CURRENT_DATA.eloPerRank[ranks[i]] > elo) {
            currentRank = i;
            continue;
        }
        currentRank = i;
        break;
    }
    
    return res.status(200).json({rank: ranks[currentRank]});
}