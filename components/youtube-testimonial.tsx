"use client"

import { useState } from "react"

const VIDEO_ID = "aCpvBid4Z9E"
const THUMBNAIL = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`

export function YouTubeTestimonial() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#242424]">
      {isPlaying ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1`}
          title="Testimonio de alumnos"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <>
          {!imageFailed && (
            <img
              src={THUMBNAIL}
              alt="Video de testimonios de alumnos"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width="480"
              height="360"
              onError={() => setImageFailed(true)}
            />
          )}
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label="Reproducir video de testimonios"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00D084] text-black shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#242424]"
          >
            <span aria-hidden="true" className="ml-1 text-2xl">▶</span>
          </button>
        </>
      )}
    </div>
  )
}
