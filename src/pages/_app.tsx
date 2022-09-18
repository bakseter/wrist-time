import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
import { ChakraProvider } from '@chakra-ui/react';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider>
            <NextNProgress
                color="#29D"
                startPosition={0.15}
                stopDelayMs={200}
                height={4}
                options={{ showSpinner: false }}
            />
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default App;
