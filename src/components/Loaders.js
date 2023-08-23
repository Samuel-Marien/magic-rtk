import React from 'react'

import { Image, Dimmer, Loader } from 'semantic-ui-react'

const Loaders = () => {
  return (
    <>
      <Dimmer active>
        <Loader size="massive" />
      </Dimmer>

      <Image src="/images/wireframe/short-paragraph.png" />
    </>
  )
}

export default Loaders
