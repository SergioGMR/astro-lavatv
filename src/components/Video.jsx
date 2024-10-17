import React, { useRef, useEffect } from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
const BackgroundVideo = ({ videoId, title, backgroundImage }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    // Puedes hacer ajustes aquí si necesitas manipular el video
    if (videoElement) {
      videoElement.muted = true;
      videoElement.loop = true;
    }
  }, []);

  return (
    <div className="fixed left-0 top-0 -z-10 aspect-video h-[100vh] w-screen" id="bg-video">
      <LiteYouTubeEmbed
        id={videoId}
        title={title}
        thumbnail={backgroundImage}
        autoplay={1}
        controls={0}
        loop={0}
        mute={1}
        adNetwork={true} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
        playlist={false} // Use true when your ID be from a playlist
        playlistCoverId="L2vS_050c-M" // The ids for playlists did not bring the cover in a pattern to render so you'll need pick up a video from the playlist (or in fact, whatever id) and use to render the cover. There's a programmatic way to get the cover from YouTube API v3 but the aim of this component is do not make any another call and reduce requests and bandwidth usage as much as possibe
        poster="maxresdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
        noCookie={true} // Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
      />
    </div>
  );
};

export default BackgroundVideo;
