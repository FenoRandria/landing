import React from 'react';
import YouTube from 'react-youtube';

class Video_youtube extends React.Component {
  render() {
    const videoOptions = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    // Remplacez 'VIDEO_ID' par l'identifiant réel de la vidéo YouTube que vous souhaitez intégrer.
    const videoUrl = 'https://www.youtube.com/watch?v=xZkUpRD41yA';

    return (
      <div>
        <YouTube
          videoId={videoUrl.split('v=')[1]} // Récupérer l'ID de la vidéo à partir de l'URL
          opts={videoOptions}
          onReady={(event) => event.target.playVideo()} // Autoplay
        />
      </div>
    );
  }
}

export default Video_youtube;
