import type { NextApiRequest, NextApiResponse } from 'next';
import { CURRENT_DATA } from './../../../db/index';

const methodHandlerMap: { [id: string]: (req: NextApiRequest, res: NextApiResponse) => void } = {
}
methodHandlerMap["get"] = post;

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

async function post(req: NextApiRequest, res: NextApiResponse) {
    return res.status(200).json({ rank: "global", elo: CURRENT_DATA.eloPerRank.global });
}