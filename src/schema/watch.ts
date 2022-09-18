import { array } from 'typescript-json-decoder';
import supabase from '@utils/supabaseClient';
import { watchDecoder, dbWatchDecoder } from '@customTypes/watch';
import type { DbWatch, Watch, InsertableWatch } from '@customTypes/watch';

const fromDbWatch = (dbWatch: DbWatch) => {
    return {
        id: dbWatch.id,
        createdAt: dbWatch.created_at,
        name: dbWatch.name,
        wristTime: dbWatch.wrist_time,
        imageUrl: dbWatch.image_url,
    };
};

const getAllWatches = async (): Promise<Array<Watch>> => {
    const { data, error } = await supabase.from<DbWatch>('watch').select('*').order('id', { ascending: true });

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw new Error('Error getting watches: ' + error.message);
    }

    // eslint-disable-next-line no-console
    console.log('\n\nGot watches:', JSON.stringify(data));

    return array(watchDecoder)(data.map(fromDbWatch));
};

const setWatch = async (watch: InsertableWatch): Promise<Watch> => {
    const dbWatch = {
        name: watch.name,
        /* eslint-disable camelcase */
        wrist_time: 0,
        image_url: watch.imageUrl,
        /* eslint-enable camelcase */
    };

    const { data, error } = await supabase.from<DbWatch>('watch').insert([dbWatch]);

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw new Error('Error inserting watch: ' + error.message);
    }

    const newWatch = fromDbWatch(dbWatchDecoder(data[0]));
    // eslint-disable-next-line no-console
    console.log('\n\nInserted watch:', JSON.stringify(newWatch));

    return newWatch;
};

const updateWatch = async (watch: Watch): Promise<Watch> => {
    const { data, error } = await supabase
        .from<DbWatch>('watch')
        // eslint-disable-next-line camelcase
        .update({ wrist_time: watch.wristTime, name: watch.name })
        .match({ id: watch.id });

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw new Error('Error updating watch: ' + error.message);
    }

    const newWatch = fromDbWatch(dbWatchDecoder(data[0]));
    // eslint-disable-next-line no-console
    console.log('\n\nUpdated watch:', JSON.stringify(newWatch));

    return newWatch;
};

const deleteWatch = async (id: number): Promise<Watch> => {
    const { data, error } = await supabase.from<DbWatch>('watch').delete().eq('id', id);

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        throw new Error('Error deleting watch: ' + error.message);
    }

    const newWatch = fromDbWatch(dbWatchDecoder(data[0]));
    // eslint-disable-next-line no-console
    console.log('\n\nDeleted watch:', JSON.stringify(newWatch));

    return newWatch;
};

export { getAllWatches, setWatch, updateWatch, deleteWatch };
