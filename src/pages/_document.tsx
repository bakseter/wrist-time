import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';

const CustomDocument = () => {
    return (
        <Html lang="en">
            <Head>
                <meta name="robots" content="follow, index" />
                <meta property="og:type" content="website" />

                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

const getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
};

CustomDocument.getInitialProps = getInitialProps;

export default CustomDocument;
