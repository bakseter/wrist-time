import { Center, SimpleGrid, GridItem, HStack, Button, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { array } from 'typescript-json-decoder';
import WatchCard from '@components/watch-card';
import type { Watch } from '@customTypes/watch';
import { watchDecoder } from '@customTypes/watch';
import AddWatchModal from '@components/add-watch-modal';

const Home = () => {
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

    const handleDeleteWatch = async (watch: Watch) => {
        try {
            const { data } = await axios.delete(`/api/watches?id=${watch.id}`);
            const allWatchesExceptOne = watches.filter((w) => w.id !== watchDecoder(data).id);
            setWatches(allWatchesExceptOne);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };

    return (
        <Center>
            <VStack>
                <HStack p="1rem">
                    <AddWatchModal watches={watches} setWatches={setWatches} />
                    <Button colorScheme="teal" onClick={() => void router.push('/overview')}>
                        See overview
                    </Button>
                </HStack>
                <SimpleGrid columns={[1, 1, 2, 4]} spacing={10}>
                    {watches.map((watch: Watch) => (
                        <GridItem
                            key={JSON.stringify(watch)}
                            w={320}
                            h={400}
                            borderRadius="1rem"
                            m="1rem"
                            p="1rem"
                            boxShadow="2xl"
                            backgroundColor="teal.500"
                        >
                            <WatchCard watch={watch} handleDeleteWatch={() => void handleDeleteWatch(watch)} />
                        </GridItem>
                    ))}
                </SimpleGrid>
            </VStack>
        </Center>
    );
};

export default Home;
