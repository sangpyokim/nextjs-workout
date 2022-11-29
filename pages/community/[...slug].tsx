import React, { ReactElement } from 'react'
import Layout from '../../components/layout/layout'
import NestedLayout from '../../components/layout/nested-layout'

const FilteredPage = () => {
  return (
    <div>FilteredPage</div>
  )
}

FilteredPage.getLayout = function GetLayout(page: ReactElement) {

  return (
      <Layout>
        <NestedLayout>
          {page}
        </NestedLayout>
      </Layout>
  )
}

export default FilteredPage