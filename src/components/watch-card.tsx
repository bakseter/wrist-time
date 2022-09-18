import { useState } from 'react';
import axios from 'axios';
import { HStack, VStack, Heading, Image, Button } from '@chakra-ui/react';
import type { Watch } from '@customTypes/watch';
import DeleteWatchModal from '@components/delete-watch-modal';

interface Props {
    watch: Watch;
    handleDeleteWatch: (watch: Watch) => void;
}

const WatchCard = ({ watch, handleDeleteWatch }: Props) => {
    const [wristTime, setWristTime] = useState(watch.wristTime);

    const handleUpdateWristTime = async (time: number) => {
        try {
            await axios.patch(`/api/watches`, {
                headers: { 'Content-Type': 'application/json' },
                data: { ...watch, wristTime: wristTime + time },
            });
            setWristTime(wristTime + time);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return (
        <VStack>
            <Heading size="lg">{watch.name}</Heading>
            <Heading size="md">{`Days worn: ${wristTime}`}</Heading>
            <Image pb="2rem" src={watch.imageUrl} alt={watch.name} maxW="200" maxH="200" />
            <HStack spacing={15}>
                <Button colorScheme="blue" onClick={() => void handleUpdateWristTime(1)}>
                    +
                </Button>
                <Button colorScheme="yellow" onClick={() => void handleUpdateWristTime(-1)}>
                    -
                </Button>
                <DeleteWatchModal name={watch.name} handleDeleteWatch={() => handleDeleteWatch(watch)} />
            </HStack>
        </VStack>
    );
};

export default WatchCard;
