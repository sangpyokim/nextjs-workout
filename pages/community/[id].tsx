import React, { ReactElement } from 'react'
import Layout from '../../components/layout/layout'
import NestedLayout from '../../components/layout/nested-layout'

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
