import admin from 'firebase-admin'

const firebaseAdminConfig = {
  privateKey:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuibddZIAtxk3L\nzbgRrbw1c1JoxFAbl/eVzab1ar9yooWij6uOihdIvROXGj1HFg0LiAAHU+oeoQFf\ntIvNI8TvvyAUs3CvzFP37ln9hkm+r/iPbKEMajaKuuG3gUu2aDe+1OlsS0xYMlD7\nzeC1FT2E6r7jwkUbjEjI3eq0JuKNt40jfzbAzLr1oPhm0w9HHWzimsyI9Car4D77\nBK5V0eWyy9H5j2W0bo9phz7aC3yxtzl5L7HQfnNE5dJ8whzzDpS8ciLq0Xcnwn6b\nKK9l6t8Z7f8GUyB9/B46IdGtTvQJBL5ID2EdzGmkue+sG+DRTKTBzABwVxJSYz4V\nrzL2H1RHAgMBAAECggEATUTHqi9jdaBccZTt39m3wDwBKEN8qXKiF643M1/iSKg9\nnCWZkB1/SGL4aMUjirRu6wN268eRFqU1u/5sg9FJjs/grnlwMku1gsYBDfVk8Wfr\nFOfE9n+RDOLGKZyyfZruzutoOVqufj8sTgWrbM9t8EmSX7dyK8tzr4VbMg0i8BSu\n0qFJWHm18lZjDAXoi2uUNjnCCQ5Wgeo6ORgCOxTMJUWNELcpKWKkgoeM45kYj780\nX9mQu721FuE2Ra+6LWJLw9H7Upm0jgJeMAcbSfWrGWh3ZY463GrDTpU11sA4Zi/5\nAHdRdHWSg7rkuG3TA8LK3gZR4lA3ijkBnIR1CeKOJQKBgQDXs0lPJVz7/HgF+5ZQ\nmOGf5ChfMrO0MSIfWN+rJ/BiZp/tClerGsfOs+09QzkxY+7CHPYPcyXzOrYiaJVp\nfQ9POtj91IIcV30PulZ3DSaYWXbNK1ajR5q2hcRBzwg1jeP7Xjud4sggBenXfxI9\nmFJtgeOQomslKriKWijTf38/AwKBgQDPJa18MTbtiex/kaIPUePwlu4hRXdYp8Ms\nfaKpCatKZPIwroEaBFMVxmfGXVmQxJ/I1xaT7BwwUsP7kIc/rsNjwInQFL5aTMaN\n3f/dln3h1ASSFqdo0e/0irfv6YRVxOb3RuB0tTwj80SB56LcuXQQASG00glu8ugK\nOpdZSdCAbQKBgHPixP4aqsxPJgTA2E9Q89c9c1tCGD41L4n7658/A+06Ca4Goncx\nGiw5irohRbb9Y6cyfBhs2vTElFoEKlHUeMcubKpi48xqTKyIhi/MBvJPDn7IS/HJ\nZJuvXnOk0VpEczn3tLvsvWxHAQ1gHeKt1Ysz/5kTSdFcFG1wZwLKOwkVAoGADyZJ\nRtDunHa+1iGXgZlSm1Def45uCQzT6FgT4lrzrRAu6kKI7JcuYGRPSKGhIEZRDUY1\nv4HAGgSjkq1iRtUIMy5spcwuk7oTt2JqCRGtiSuRXgHMIo1gCDlw9FnWtNMetSz4\n03BBwrtS4lFHhu8FPvpmNaw6xmN7duwMD5qnZg0CgYEAyeg+Y7nAaOTONSxXGD5p\nRGeco4x2Mbol1NfIh3WjmBPGL0BzNY2OO8dwjdmcSB/68lnaYGC2O9GTekHuDV70\noS4iOiWGEU8z5nMa0HvnUtq8jUdx7HfB2KjV3oaH7vzrU0nKJe+032uJd5g4l6qI\ntipHrBI3LX24lC7Ocsxgh6I=\n-----END PRIVATE KEY-----\n'.replace(
      /\\n/g,
      '\n',
    ),
  clientEmail: 'firebase-adminsdk-jw8q6@workout-21c5f.iam.gserviceaccount.com',
  projectId: 'workout-21c5f',
}
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseAdminConfig),
    databaseURL:
      'https://workout-21c5f-default-rtdb.asia-southeast1.firebasedatabase.app',
  })
}

export { admin }
