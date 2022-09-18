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
import type { UnfinishedWatch } from '@customTypes/watch';

interface Props {
    handleAddWatch: (watch: UnfinishedWatch) => Promise<void>;
}

const AddWatchModal = ({ handleAddWatch }: Props) => {
    const [newWatch, setNewWatch] = useState<UnfinishedWatch>({
        name: null,
        imageUrl: null,
    });

    const { isOpen, onOpen, onClose } = useDisclosure();

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
                            <Button
                                colorScheme="blue"
                                alignSelf="left"
                                onClick={() => {
                                    void handleAddWatch(newWatch);
                                    onClose();
                                }}
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

export default AddWatchModal;
