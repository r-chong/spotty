import { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { themes } from "../theme";

export default function Player({ accessToken, trackUri, theme }) {
  const [play, setPlay] = useState(false);
  const [key, setKey] = useState(0);

  // let bgColor, textColor, iconColor;

  // switch (theme) {
  //   case "light":
  //     bgColor = "#f3f3f3";
  //     textColor = "#111";
  //     iconColor = "#1DB954";
  //     break;
  //   case "dark":
  //     bgColor = "#111";
  //     textColor = "#f3f3f3";
  //     iconColor = "#1DB954";
  //     break;
  //   case "city_lights":
  //     bgColor = "#292d3e";
  //     textColor = "#a9b1d6";
  //     iconColor = "#5cb85c";
  //     break;
  //   case "spotify_green":
  //     bgColor = "#1DB954";
  //     textColor = "#f3f3f3";
  //     iconColor = "#f3f3f3";
  //     break;
  //   default:
  //     bgColor = "#f3f3f3";
  //     textColor = "#111";
  //     iconColor = "#1DB954";
  // }

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
