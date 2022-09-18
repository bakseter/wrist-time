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
    Button,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import { watchDecoder } from '@customTypes/watch';
import type { Watch, InsertableWatch, UnfinishedWatch } from '@customTypes/watch';

interface Props {
    watches: Array<Watch>;
    setWatches: (watches: Array<Watch>) => void;
}

const AddWatchModal = ({ watches, setWatches }: Props) => {
    const [newWatch, setNewWatch] = useState<UnfinishedWatch>({
        name: null,
        imageUrl: null,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleAddWatch = async (newWatch: UnfinishedWatch) => {
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

    return (
        <>
            <Button colorScheme="teal" onClick={onOpen}>
                Add new watch
            </Button>
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
                            <Button colorScheme="blue" alignSelf="left" onClick={() => void handleAddWatch(newWatch)}>
                                Submit
                            </Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddWatchModal;
