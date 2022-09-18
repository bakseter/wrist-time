import type { decodeType } from 'typescript-json-decoder';
import { record, nil, date, string, number, union } from 'typescript-json-decoder';

const watchDecoder = record({
    id: number,
    createdAt: date,
    name: string,
    wristTime: number,
    imageUrl: string,
});
type Watch = decodeType<typeof watchDecoder>;

const unfinishedWatchDecoder = record({
    name: union(string, nil),
    imageUrl: union(string, nil),
});
type UnfinishedWatch = decodeType<typeof unfinishedWatchDecoder>;

const insertableWatchDecoder = record({
    name: string,
    imageUrl: string,
});
type InsertableWatch = decodeType<typeof insertableWatchDecoder>;

const dbWatchDecoder = record({
    id: number,
    /* eslint-disable camelcase */
    created_at: date,
    name: string,
    wrist_time: number,
    image_url: string,
    /* eslint-enable camelcase */
});
type DbWatch = decodeType<typeof dbWatchDecoder>;

export {
    type DbWatch,
    dbWatchDecoder,
    watchDecoder,
    type Watch,
    unfinishedWatchDecoder,
    type UnfinishedWatch,
    insertableWatchDecoder,
    type InsertableWatch,
};
