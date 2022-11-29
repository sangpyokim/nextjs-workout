import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

const Document = () => {
  return (
    <Html>
      <Head>
        <meta name="theme-color"></meta>
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <link
          href="/favicons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/icons/icon-192x192.png"
        />
        <meta
          name="msapplication-TileColor"
          content="#252525"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
