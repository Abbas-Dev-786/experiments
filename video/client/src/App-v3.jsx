import { useEffect } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
function App() {
  useEffect(() => {
    const initializeApp = async () => {
      const zg = new ZegoExpressEngine(
        1437058845,
        "335966e840bce7411ba8c661a267b4e5"
      );

      zg.on("roomStreamUpdate", async (roomID, updateType, streamList) => {
        if (updateType == "ADD") {
          const rmVideo = document.getElementById("remote-video");
          const vd = document.createElement("video");
          vd.id = streamList[0].streamID;
          vd.autoplay = true;
          vd.playsInline = true;
          vd.muted = false;
          if (rmVideo) {
            rmVideo.appendChild(vd);
          }
          zg.startPlayingStream(streamList[0].streamID, {
            audio: true,
            video: true,
          }).then((stream) => {
            vd.srcObject = stream;
          });
          // New stream added, start playing the stream.
        } else if (updateType == "DELETE" && zg && streamList[0].streamID) {
          zg.stopPublishingStream(streamList[0].streamID);
          zg.logoutRoom("123");
        }
      });
      await zg.loginRoom(
        "zego-room",
        "04AAAAAGUv98cAEGZseW9oc2ljNHltbnc5bXkAcCGStXrhbo1yWcGiISzouH9AXvwxlFeRYit6qJRw0sfkOQSp9bH3gBAnrfm6z9KY99HMhtftKTqtZ7NAtrYKLAQxKT87rZqHabXrlTgAvBbUKWlAYNCMoSpqqyLq8Xlm2i4cyS+8FP2PjZmH7k35JO4=",
        { userID: "123", userName: "kishan" },
        { userUpdate: true }
      );
      const localStream = await zg.createStream({
        camera: {
          audio: true,
          video: true,
        },
      });
      // Get the audio tag.
      const localAudio = document.getElementById("local-video");
      const videoElement = document.createElement("video");
      videoElement.id = "local-video";
      videoElement.className = "h-28 w-32";
      videoElement.autoplay = true;
      videoElement.muted = false;
      videoElement.playsInline = true;
      localAudio.appendChild(videoElement);
      const td = document.getElementById("audio-local");
      td.srcObject = localStream;

      const streamID = "123" + Date.now();
      zg.startPublishingStream(streamID, localStream);
    };

    initializeApp();
  }, []);

  return (
    <div>
      <div id="local-video"></div>
      <div id="remote-video"></div>
    </div>
  );
}

export default App;
