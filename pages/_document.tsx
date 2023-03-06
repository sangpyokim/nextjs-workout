import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface IProps {
  styleTags: Array<React.ReactElement<{}>>
}

export default class MyDocument extends Document<IProps> {
  static async getInitialProps(context: any) {
    const sheet = new ServerStyleSheet() // Create an instance of ServerStyleSheet
    const originalRenderPage = context.renderPage
    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(context)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  // render() {
  //   return (
  //     <html>
  //       <Head>
  //         {/* Output the styles in the head  */}
  //         {this.props.styleTags}
  //       </Head>
  //       <body>
  //         <Main />
  //         <NextScript />
  //       </body>
  //     </html>
  //   )
  // }
}
