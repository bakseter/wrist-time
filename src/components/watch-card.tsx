import { useState } from 'react';
import axios from 'axios';
import { HStack, VStack, Heading, Image, Button } from '@chakra-ui/react';
import type { Watch } from '@customTypes/watch';

const WatchCard = ({ watch, onDelete }: { watch: Watch; onDelete: (watch: Watch) => void }) => {
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
            <Image src={watch.imageUrl} alt={watch.name} maxW="200" maxH="200" />
            <HStack pt="1rem" spacing={15}>
                <Button colorScheme="blue" onClick={() => void handleUpdateWristTime(1)}>
                    +
                </Button>
                <Button onClick={() => void handleUpdateWristTime(-1)}>-</Button>
                <Button colorScheme="red" onClick={() => onDelete(watch)}>
                    Delete
                </Button>
            </HStack>
        </VStack>
    );
};

export default WatchCard;
