import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import useAuth from "../useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import "./index.css";

const GoodCensor = require("good-censor");
const badwordsArray = require("badwords/array");

// note: this is the app client id, not user
const spotifyApi = new SpotifyWebApi({
  clientId: "75b8ee5250fc4c15b07c36fe24f9b35e",
});

export default function Dashboard({ code, theme }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  // clear search and choose track
  function chooseTrack(track) {
    setPlayingTrack(track);
    setSearch("");
    setLyrics("");
  }

  // censorship options, for if user requests to not see profanity
  const myCensorOptions = { censorText: "▇" };
  const myCensor = new GoodCensor(badwordsArray);
  const censorEnabled = true;

  useEffect(() => {
    if (!playingTrack) return;

    axios
      .get(`${process.env.REACT_APP_API_URL}/lyrics`, {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics);
      });
  }, [playingTrack]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!search) return setSearchResults([]);
    if (!accessToken) return;

    // make request, if new request made, then stop
    // to prevent lots of requests when typing
    let cancel = false;
    console.log("right before searching tracks");
    spotifyApi.searchTracks(search).then((res) => {
      console.log("able to search tracks");
      if (cancel) return;
      console.log("does not cancel");
      setSearchResults(
        res.body.tracks.items.map((track) => {
          const smallestAlbumImage = track.album.images.reduce(
            (smallest, image) => {
              if (image.height < smallest.height) return image;
              return smallest;
            },
            track.album.images[0]
          );

          return {
            artist: track.artists[0].name,
            title: track.name,
            uri: track.uri,
            albumUrl: smallestAlbumImage.url,
          };
        })
      );
    });

    return () => (cancel = true);
  }, [search, accessToken]);

  return (
    <Container
      className="flex flex-grow flex-col w-screen cursor-pointer"
      style={{ height: "100vh" }}
    >
      {/* Search box */}
      <div className="pt-2">
        <form
          className="bg-opacity-40 rounded-md shadow-md"
          style={{ backgroundColor: theme.secondaryColor }}
        >
          <input
            type="search"
            placeholder="Search Songs/Artists"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border focus:outline-none py-2 px-4 block w-full rounded-md leading-5  sm:text-sm bg-transparent h-12"
          />
        </form>
      </div>
      {/* Part where the songs appear under search */}
      <div
        className="flex flex-col py-2 bg-opacity-80"
        style={{
          overflowY: "auto",
          flexGrow: 1,
          // backgroundColor: theme.secondaryColor,
        }}
      >
        {searchResults.map((track) => (
          <TrackSearchResult
            track={track}
            key={track.uri}
            chooseTrack={chooseTrack}
          />
        ))}
        {/* if no search results then show lyrics*/}
        {searchResults.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {/* If censorEnabled setting on, then run through good-censor */}
            {censorEnabled ? myCensor.censor(lyrics, myCensorOptions) : lyrics}
          </div>
        )}
      </div>
      <div className="w-full player">
        <Player
          accessToken={accessToken}
          trackUri={playingTrack?.uri}
          theme={theme}
        />
      </div>
    </Container>
  );
}
