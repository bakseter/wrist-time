import { useEffect, useState } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Button, Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { array } from 'typescript-json-decoder';
import { watchDecoder } from '@customTypes/watch';
import type { Watch } from '@customTypes/watch';

const Overview = () => {
    const [watches, setWatches] = useState<Array<Watch>>([]);

    const router = useRouter();

    useEffect(() => {
        const fetchWatches = async () => {
            try {
                const { data } = await axios.get('/api/watches');
                setWatches(array(watchDecoder)(data));
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        };

        void fetchWatches();
    }, []);

    const data = watches.map((watch) => {
        return { name: watch.name, 'Wrist time': watch.wristTime };
    });

    return (
        <>
            <Button mt="4rem" ml="4rem" onClick={() => void router.push('/')}>
                Home
            </Button>
            <Center p="4rem">
                <BarChart width={730} height={500} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Wrist time" fill="#8884d8" />
                </BarChart>
            </Center>
        </>
    );
};

export default Overview;
