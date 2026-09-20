import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import ChatWidget from '../components/ChatWidget'
import { SUPPORT } from '../lib/support.config'

export default function App({ Component, pageProps }: AppProps) {
  return       <><Head>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="HomePrep AI" />
        <meta property="og:description" content="From your home type and timeline, get a prioritized prep checklist: what to fix, declutter, and stage before photos and showings." />
        <meta property="og:url" content="https://homeprep-ai.lxsaihub.com/" />
        <meta property="og:image" content="https://homeprep-ai.lxsaihub.com/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HomePrep AI" />
        <meta name="twitter:description" content="From your home type and timeline, get a prioritized prep checklist: what to fix, declutter, and stage before photos and showings." />
        <meta name="twitter:image" content="https://homeprep-ai.lxsaihub.com/og.png" />
                                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"HomePrep AI","url":"https://homeprep-ai.lxsaihub.com/","description":"From your home type and timeline, get a prioritized prep checklist: what to fix, declutter, and stage before photos and showings.","applicationCategory":"BusinessApplication","operatingSystem":"Web","offers":{"@type":"Offer","priceCurrency":"USD","price":"0","availability":"https://schema.org/OnlineOnly"}}' }} />
      </Head>
      <Component {...pageProps} />
      <ChatWidget productName={SUPPORT.productName} brandColor={SUPPORT.brandColor} sessionKeyPrefix={SUPPORT.productSlug} /></>
}
