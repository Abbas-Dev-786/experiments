import { useState } from "react";
import "./App.css";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded";
// import {} from "@zoom/videosdk";

function Meeting() {
  const [isClicked, setClicked] = useState(false);
  const client = ZoomMtgEmbedded.createClient();

  var sdkKey = "pDGbB4qiQAaDpkABPGrYOQ";
  var meetingNumber = 87315889329;
  var passWord = "123456";
  var role = 0;
  var userName = "React";
  // var userEmail = "";
  // var registrantToken = "";
  // var zakToken = "";

  function getSignature(e) {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/v1/meetings/createMeeting", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        // ZoomMtg.generateSDKSignature({
        //   meetingNumber: response.data.data.id,
        //   role: 0,
        //   sdkKey: "pDGbB4qiQAaDpkABPGrYOQ",
        //   sdkSecret: "zzArE5JC0LZlivFouOIeXmozLUEowRpl",
        //   success(sig) {
        //     ZoomMtg.init({
        //       leaveUrl,
        //       success() {
        //         ZoomMtg.join({
        //           meetingNumber: response.data.data.id,
        //           signature: sig.result,
        //           userName: "test",
        //           passWord: "123456",
        //           tk: "",
        //         });
        //       },
        //       error() {},
        //     });
        //   },
        //   error(err) {
        //     console.log(err);
        //   },
        // });

        startMeeting(response.signature, response.mn);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature = null, meeting) {
    let meetingSDKElement = document.getElementById("meetingSDKElement");

    client.init({
      // debug: true,
      isSupportAV: true,
      zoomAppRoot: meetingSDKElement,
      language: "en-US",
      customize: {
        meetingInfo: [
          "topic",
          "host",
          "mn",
          // "pwd",
          "telPwd",
          "invite",
          "participant",
          "dc",
          "enctype",
        ],
        toolbar: {
          buttons: [
            {
              text: "Custom Button",
              className: "CustomButton",
              onClick: () => {
                console.log("custom button");
              },
            },
          ],
        },
      },
    });

    client.join({
      signature: signature,
      sdkKey: sdkKey,
      meetingNumber: meeting,
      password: passWord,
      userName: userName,
      // userEmail: userEmail,
      tk: "",
      // zak: zakToken,
    });

    setClicked(true);
  }

  return (
    <>
      {/* For Component View */}
      <div id="meetingSDKElement">
        {/* Zoom Meeting SDK Component View Rendered Here */}
      </div>

      {!isClicked && <button onClick={getSignature}>Join Meeting</button>}
    </>
  );
}

export default Meeting;
