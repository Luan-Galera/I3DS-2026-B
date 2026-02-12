import React from 'react'

const SocialLink = ({url, icon}) => {
  return (
    <div>
      <a href={url}>
        <ion-icon name={icon}></ion-icon>
      </a>
    </div>
  )
}

export default SocialLink
