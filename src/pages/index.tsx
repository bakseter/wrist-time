import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Center,
    Input,
    SimpleGrid,
    GridItem,
    HStack,
    Button,
    VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { array } from 'typescript-json-decoder';
import WatchCard from '@components/watch-card';
import type { InsertableWatch, Watch, UnfinishedWatch } from '@customTypes/watch';
import { watchDecoder } from '@customTypes/watch';

const Home = () => {
    const [watches, setWatches] = useState<Array<Watch>>([]);
    const [newWatch, setNewWatch] = useState<UnfinishedWatch>({
        name: null,
        imageUrl: null,
    });

    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleSubmitNewWatch = async (newWatch: UnfinishedWatch) => {
        if (newWatch.name && newWatch.imageUrl) {
            try {
                const insertableWatch: InsertableWatch = { name: newWatch.name, imageUrl: newWatch.imageUrl };
                const { data } = await axios.post('/api/watches', {
                    headers: { 'Content-Type': 'application/json' },
                    data: insertableWatch,
                });
                setWatches([...watches, watchDecoder(data)]);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);
            }

            onClose();
        }
    };

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

    const onWatchCardDelete = async (watch: Watch) => {
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
        <>
            <Center>
                <VStack>
                    <HStack p="1rem">
                        <Button onClick={onOpen}>Add new watch</Button>
                        <Button onClick={() => void router.push('/overview')}>See overview</Button>
                    </HStack>
                    <SimpleGrid columns={3} spacing={10}>
                        {watches.map((watch: Watch) => (
                            <GridItem
                                key={JSON.stringify(watch)}
                                w={400}
                                h={400}
                                border="4px solid #f5f5f5"
                                borderRadius="1em"
                                m="1rem"
                                p="1rem"
                                boxShadow="lg"
                                backgroundColor="#f5f5f5"
                            >
                                <WatchCard watch={watch} onDelete={() => void onWatchCardDelete(watch)} />
                            </GridItem>
                        ))}
                    </SimpleGrid>
                </VStack>
            </Center>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new watch</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input
                            placeholder="Name"
                            onChange={(event) => setNewWatch({ ...newWatch, name: event.target.value })}
                            p="1rem"
                            m="0.4rem"
                        />
                        <Input
                            placeholder="Image URL"
                            onChange={(event) => setNewWatch({ ...newWatch, imageUrl: event.target.value })}
                            p="1rem"
                            m="0.4rem"
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Center>
                            <Button
                                colorScheme="blue"
                                alignSelf="left"
                                onClick={() => void handleSubmitNewWatch(newWatch)}
                            >
                                Submit
                            </Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Home;
