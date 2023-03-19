import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri, theme }) {
  const [play, setPlay] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((key) => key + 1);
  }, [theme]);

  useEffect(() => {
    setPlay(true);
  }, [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      key={key}
      token={accessToken}
      showSaveIcon
      hideAttribution
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
      }}
      // if not playing, setPlay to false
      // (every time song changes)
      play={play}
      uris={trackUri ? [trackUri] : []}
      styles={{
        bgColor: theme.primaryColor,
        color: theme.playButtonColor,
        loaderColor: theme.warningColor,
        sliderColor: theme.accentColor,
        // active is heart icon
        activeColor: theme.accentColor,
        trackNameColor: theme.textColor,
        trackArtistColor: theme.secondaryColor,
      }}
    />
  );
}
