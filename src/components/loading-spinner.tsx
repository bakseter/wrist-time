import { Heading, Spinner } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const LoadingSpinner = ({ children }: Props) => (
    <>
        <Heading px="1.3rem" size="lg">
            {children}
        </Heading>
        <Spinner size="xl" />
    </>
);

export default LoadingSpinner;
