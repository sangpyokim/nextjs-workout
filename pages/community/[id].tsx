import React, { ReactElement } from 'react'

const DetailPage = () => {
  return (
    <>
      <div>DetailPage</div>
    </>
  )
}

DetailPage.getLayout = function GetLayout(page: ReactElement) {
  return page
}

export default DetailPage
