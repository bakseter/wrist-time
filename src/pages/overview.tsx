import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Button, Center, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { getAllWatches } from '@schema/watch';

interface WatchGraphData {
    name: string;
    'Wrist time': number;
}

interface Props {
    watchesGraphData: Array<WatchGraphData> | null;
}

const Overview = ({ watchesGraphData }: Props) => {
    const router = useRouter();

    return (
        <>
            <Button colorScheme="teal" mt="4rem" ml="4rem" onClick={() => void router.push('/')}>
                Home
            </Button>
            <Center p="4rem">
                {!watchesGraphData && <Heading size="lg">Unexpected error.</Heading>}
                {watchesGraphData && (
                    <BarChart width={730} height={500} data={watchesGraphData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickCount={1} />
                        <Tooltip />
                        <Bar dataKey="Wrist time" fill="#8884d8" />
                    </BarChart>
                )}
            </Center>
        </>
    );
};

export const getServerSideProps = async () => {
    try {
        const watches = await getAllWatches();
        const watchesGraphData = watches.map((watch) => ({ name: watch.name, 'Wrist time': watch.wristTime }));

        const props: Props = { watchesGraphData };

        return { props };
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return { props: { watches: null } };
    }
};

export default Overview;
