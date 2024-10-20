import React, { useEffect, useRef, useState } from 'react'
import YouTubePlayer from 'react-player/youtube'
import { Maximize, Minimize } from 'lucide-react'

interface Video {
    key: string
    name: string
    thumbnail: string
}

interface YouTubePlayerWithCarouselProps {
    videos: Video[]
    initialVideoId?: string
}

const getThumbnailUrl = (videoKey: string) => {
    return `https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`
}

const VideoPlayer: React.FC<{ videoId: string }> = ({ videoId }) => {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const playerRef = useRef<HTMLDivElement>(null)

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            playerRef.current?.requestFullscreen()
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleFullscreenChange)
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [])

    return (
        <div ref={playerRef} className="flex flex-col w-full aspect-video rounded-lg overflow-hidden">
            <YouTubePlayer
                url={`https://www.youtube.com/watch?v=${videoId}`}
                width="100%"
                height="100%"
                allowFullScreen
                config={{
                    youtube: {
                        playerVars: {
                            autoplay: 0,
                            loop: 0,
                            mute: 0,
                            controls: 0,
                            disablekb: 1,
                            enablejsapi: 1,
                            playsinline: 0,
                            rel: 0,
                            showinfo: 0,
                            modestbranding: 1,
                            fs: 1,
                            playbackQuality: 'highres'
                        },
                    },
                }}
                volume={0.35}
            />
            <button
                id='fullscreenButton'
                onClick={toggleFullscreen}
                className="w-10 h-10 relative z-10 bottom-14 left-6 bg-black bg-opacity-50 text-white p-2 rounded-full"
                aria-label={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
            >
                {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
            </button>
        </div>
    )
}

const YouTubePlayerWithCarousel: React.FC<YouTubePlayerWithCarouselProps> = ({ videos, initialVideoId }) => {
    const [currentVideoId, setCurrentVideoId] = useState(initialVideoId || videos[0]?.key)

    const handleVideoSelect = (videoId: string) => {
        if (videoId !== currentVideoId) {
            setCurrentVideoId(videoId)
        }
    }

    return (
        <div className="text-white">
            <VideoPlayer videoId={currentVideoId} />

            {videos.length >= 2 && (
                <div className="relative w-full overflow-hidden py-4 mt-4">
                    <div className="flex justify-center space-x-8 transition-transform duration-300 ease-in-out mx-4">
                        {videos.map((video) => (
                            <div
                                key={video.key}
                                className={`flex w-2/12 cursor-pointer transition-all duration-300 overflow-hidden rounded-lg  ${video.key === currentVideoId ? 'scale-125' : 'border-0'
                                    }`}
                                onClick={() => handleVideoSelect(video.key)}
                            >
                                <img
                                    src={getThumbnailUrl(video.key)}
                                    alt={video.name}
                                    width={160}
                                    height={90}
                                    className="w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default YouTubePlayerWithCarousel