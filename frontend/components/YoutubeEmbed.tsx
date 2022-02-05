import React, { FC } from 'react'

type Props = {
  embedId: string
}

const YoutubeEmbed: FC<Props> = ({ embedId }) => (
  <div className="overflow-hidden pb-[56.25%] relative h-0">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
)

export default YoutubeEmbed
