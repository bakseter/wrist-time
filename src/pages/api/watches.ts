import type { NextApiRequest, NextApiResponse } from 'next';
import { string } from 'typescript-json-decoder';
import { insertableWatchDecoder, watchDecoder } from '@customTypes/watch';
import { deleteWatch, updateWatch, getAllWatches, setWatch } from '@schema/watch';

const endpoint = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const data = await getAllWatches();
            res.status(200).json(data);
            return;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({ error: JSON.stringify(error) });
            return;
        }
    }

    if (req.method === 'POST') {
        try {
            const insertableWatch = insertableWatchDecoder(req.body.data);
            const data = await setWatch(insertableWatch);
            res.status(200).json(data);
            return;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({ error: JSON.stringify(error) });
            return;
        }
    }

    if (req.method === 'PATCH') {
        try {
            const watch = watchDecoder(req.body.data);
            const data = await updateWatch(watch);
            res.status(200).json(data);
            return;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({ error: JSON.stringify(error) });
            return;
        }
    }

    if (req.method === 'DELETE') {
        try {
            const id = Number.parseInt(string(req.query.id));
            const data = await deleteWatch(id);
            res.status(200).json(data);
            return;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            res.status(500).json({ error: JSON.stringify(error) });
            return;
        }
    }

    res.status(404).json({ error: 'Not found' });
};

export default endpoint;
