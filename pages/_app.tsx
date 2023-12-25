import type { AppContext, AppProps } from "next/app";
import Head from "next/head";
import "../index.scss";
// redux store
import { Provider as ReduxProvider } from "react-redux";
// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "../src/store";

const store = configureStore({
  reducer: {
    tool: toolReducer,
  },
});

function MyApp({ Component, pageProps, lang }: AppProps & { lang: string }) {
  return (
    <>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-NY5F91MF0B`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
  
      gtag('config', 'G-NY5F91MF0B');
    `,
          }}
        ></script>
      </Head>
      <ReduxProvider store={store}>
        <Component {...pageProps} lang={lang} />
      </ReduxProvider>
    </>
  );
}
MyApp.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<{
  pageProps: Record<string, unknown>;
  lang: string;
}> => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  const path = ctx.asPath || "";
  const lang = path.split("/")[1] || ""; // default to English if language code cannot be extracted

  return { pageProps, lang };
};

export default MyApp;
