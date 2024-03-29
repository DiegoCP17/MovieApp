import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import PlayButton from "../components/PlayButton";
import StarRating from "react-native-star-rating";
import { getMovie } from "../services/services";
import dateFormat from "dateformat";
import VideoD from "../components/VideoD";
import VideoPlayer from "react-native-video-controls";
import Video from "react-native-video";
import StopButton from "../components/StopButton";

const height = Dimensions.get("screen").height;

const Detail = ({ route, navigation }) => {
  const movieId = route.params.movieId;

  const [movieDetail, setMovieDetail] = useState();
  const [loaded, setLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId).then((movieData) => {
      setMovieDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  const videoShown = () => {
    setModalVisible(!modalVisible);
  };

  const videoStop = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded && (
        <View style={styles.containerPrincipal}>
          <ScrollView>
            <Image
              resizeMode="cover"
              style={styles.image}
              source={
                movieDetail.poster_path
                  ? {
                      uri:
                        "https://image.tmdb.org/t/p/w500" +
                        movieDetail.poster_path,
                    }
                  : placeholderImage
              }
            />
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handlePress={videoShown} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>
              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map((genre) => {
                    return (
                      <Text style={styles.genre} key={genre.id}>
                        {genre.name}
                      </Text>
                    );
                  })}
                </View>
              )}
              <StarRating
                disabled={true}
                maxStars={5}
                starSize={25}
                rating={movieDetail.vote_average / 2}
                fullStarColor={"gold"}
              />
              <Text style={styles.overview}>{movieDetail.overview}</Text>

              <Text style={styles.release}>
                {"Release date: " +
                  dateFormat(movieDetail.release_date, "mmmm dS, yyyy")}
              </Text>
            </View>
          </ScrollView>
          <Modal
            supportedOrientations={["portrait", "landscape"]}
            animationType="slide"
            visible={modalVisible}
          >
            <View style={styles.videoModal}>
              {/* <VideoD onClose={videoShown} /> */}
              {/* <VideoPlayer
             source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}/> */}
              <Pressable>
                <Text>Esto debería ser un modal</Text>
                <StopButton handlePress={videoStop} />
              </Pressable>
            </View>
          </Modal>
        </View>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: height / 2.0,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    textAlign: "center",
  },
  genresContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  genre: {
    marginBottom: 5,
    marginRight: 10,
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 15,
  },
  container: {
    backgroundColor: "#0E5F9B",
    height: "100%",
  },
  overview: {
    padding: 15,
  },
  release: {
    fontWeight: "bold",
    color: "#fff",
    paddingLeft: 15,
    paddingBottom: 15,
    textAlign:"center",
  },
  playButton: {
    position: "absolute",
    top: -30,
    right: 10,
  },
  videoModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default Detail;
