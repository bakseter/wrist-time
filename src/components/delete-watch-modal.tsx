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
    Heading,
    Button,
} from '@chakra-ui/react';

interface Props {
    name: string;
    handleDeleteWatch: () => void;
}

const DeleteWatchModal = ({ name, handleDeleteWatch }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme="red" onClick={onOpen}>
                Delete
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete watch</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody></ModalBody>
                    <Heading size="sm" px="1.5rem">
                        {`Are you sure you want to delete '${name}?'`}
                    </Heading>
                    <ModalFooter>
                        <Center>
                            <Button colorScheme="red" alignSelf="left" onClick={handleDeleteWatch}>
                                Delete
                            </Button>
                        </Center>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default DeleteWatchModal;
