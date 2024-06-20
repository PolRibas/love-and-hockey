import "@/styles/globals.css";
import type { AppContext, AppProps } from "next/app";
import { IntlProvider as NextIntlProvider } from 'next-intl';
import { useRouter } from "next/router";
import { getTranslations } from "@/messages";
import getConfig from 'next/config';


const { publicRuntimeConfig } = getConfig();

function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  return <NextIntlProvider
    messages={pageProps.messages}
    locale={locale || 'ca-ES'}
    timeZone={publicRuntimeConfig.timeZone}
  >
    <Component {...pageProps} />;
  </NextIntlProvider>
}

App.getInitialProps = async (context: AppContext) => {
  return {
    pageProps: {
      messages: getTranslations(context.router.locale || 'ca-ES')
    },
  };
}

export default App;