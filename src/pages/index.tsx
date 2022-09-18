import { Center, Heading, Spinner, SimpleGrid, GridItem, HStack, Button, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { array } from 'typescript-json-decoder';
import WatchCard from '@components/watch-card';
import type { Watch, InsertableWatch, UnfinishedWatch } from '@customTypes/watch';
import { watchDecoder } from '@customTypes/watch';
import AddWatchModal from '@components/add-watch-modal';

const Home = () => {
    const [watches, setWatches] = useState<Array<Watch> | null>(null);

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

    const handleAddWatch = async (newWatch: UnfinishedWatch) => {
        if (newWatch.name && newWatch.imageUrl) {
            try {
                const insertableWatch: InsertableWatch = { name: newWatch.name, imageUrl: newWatch.imageUrl };
                const { data } = await axios.post('/api/watches', {
                    headers: { 'Content-Type': 'application/json' },
                    data: insertableWatch,
                });
                setWatches((prevWatches) => {
                    if (prevWatches) {
                        return [...prevWatches, watchDecoder(data)];
                    }
                    return null;
                });
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }
        }
    };

    const handleDeleteWatch = async (watch: Watch) => {
        try {
            const { data } = await axios.delete(`/api/watches?id=${watch.id}`);
            const allWatchesExceptOne = watches?.filter((w) => w.id !== watchDecoder(data).id) ?? [];
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
                    <AddWatchModal handleAddWatch={handleAddWatch} />
                    <Button colorScheme="teal" onClick={() => void router.push('/overview')}>
                        See overview
                    </Button>
                </HStack>
                {!watches && (
                    <>
                        <Heading px="1.3rem" size="lg">
                            Loading watches...
                        </Heading>
                        <Spinner size="xl" />
                    </>
                )}
                {watches && (
                    <>
                        {watches.length === 0 && <Heading size="md">No watches found</Heading>}
                        {watches.length > 0 && (
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
                                        <WatchCard
                                            watch={watch}
                                            handleDeleteWatch={() => void handleDeleteWatch(watch)}
                                        />
                                    </GridItem>
                                ))}
                            </SimpleGrid>
                        )}
                    </>
                )}
            </VStack>
        </Center>
    );
};

export default Home;
