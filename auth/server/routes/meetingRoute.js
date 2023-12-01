const express = require("express");
const axios = require("axios");
const btoa = require("btoa");
const KJUR = require("jsrsasign");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const router = express.Router();

const getAccessToken = async () => {
  try {
    const base_64 = btoa(
      "sgUJMsviQSG2XCtcGsHzOw" + ":" + "XerVqzK66tMNIN7dx79fO1OnWCJtf9re"
    );

    // Client ID : Client Secret

    const resp = await axios({
      method: "POST",
      url:
        "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" +
        `tzf2gwpRR3ugWFNzlxSo2w`, // Account ID
      headers: {
        Authorization: "Basic " + `${base_64} `,
      },
    });

    return resp.data.access_token;
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
}; //your API SECRET HERE

const createMeeting = async () => {
  try {
    // const data = JSON.stringify({
    //   type: type,
    // });

    const resp = await axios({
      method: "post",
      url: "https://api.zoom.us/v2/users/me/meetings",
      headers: {
        Authorization: "Bearer " + `${await getAccessToken()} `,
        "Content-Type": "application/json",
      },
      data: {
        agenda: "My Meeting",
        default_password: false,
        duration: 60,
        password: "123456",
        pre_schedule: false,
        // schedule_for: "jchill@example.com",
        // topic: "Testing",
        type: 2,
        // password: 12345,
        settings: {
          join_before_host: true,
          approval_type: 0,
          jbh_time: 0,
          join_before_host: true,
          waiting_room: false,
        },
      },
    });

    return resp.data;
  } catch (err) {
    if (err.status == undefined) {
      console.log("Error : ", err);
      throw Error(err);
    }
  }
};

const getAllMeetings = async () => {
  try {
    // const data = JSON.stringify({
    //   type: type,
    // });

    const resp = await axios({
      method: "GET",
      url: "https://api.zoom.us/v2/users/me/meetings",
      headers: {
        Authorization: "Bearer " + `${await getAccessToken()} `,
        "Content-Type": "application/json",
      },
      // data: {
      //   agenda: "My Meeting",
      //   default_password: false,
      //   duration: 60,
      //   password: "123456",
      //   pre_schedule: false,
      //   // schedule_for: "jchill@example.com",
      //   // topic: "Testing",
      //   type: 2,
      //   // password: 12345,
      //   settings: {
      //     join_before_host: true,
      //     approval_type: 0,
      //     jbh_time: 0,
      //     join_before_host: true,
      //     waiting_room: false,
      //   },
      // },
    });

    return resp.data;
  } catch (err) {
    if (err.status == undefined) {
      console.log("Error : ", err);
      throw Error(err);
    }
  }
};

const deleteMeeting = async (meetingId) => {
  try {
    const resp = await axios({
      method: "DELETE",
      url: `https://api.zoom.us/v2/meetings/${meetingId}`,
      headers: {
        Authorization: "Bearer " + `${await getAccessToken()} `,
        "Content-Type": "application/json",
      },
    });

    return resp.data;
  } catch (err) {
    if (err.status == undefined) {
      console.log("Error : ", err);
      throw Error(err);
    }
  }
};

router.post("/createMeeting", async (req, res) => {
  try {
    const meetings = await getAllMeetings();
    meetings.meetings.forEach(async (meeting) => {
      try {
        const x = await deleteMeeting(meeting.id);
      } catch (err) {
        console.log("ERROr", err.message);
      }
    });

    const data = await createMeeting();
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const oHeader = { alg: "HS256", typ: "JWT" };
    const oPayload = {
      sdkKey: "pDGbB4qiQAaDpkABPGrYOQ",
      mn: data.id,
      appKey: "pDGbB4qiQAaDpkABPGrYOQ",
      role: 0,
      iat: iat,
      exp: exp,
      tokenExp: exp,
    };
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    const signature = KJUR.jws.JWS.sign(
      "HS256",
      sHeader,
      sPayload,
      "zzArE5JC0LZlivFouOIeXmozLUEowRpl"
    );
    res.json({
      signature: signature,
      mn: data.id,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;

/*

 "agenda": "My Meeting",
  "default_password": false,
  "duration": 60,
  "password": "123456",
  "pre_schedule": false,
  "recurrence": {
    "end_date_time": "2022-04-02T15:59:00Z",
    "end_times": 7,
    "monthly_day": 1,
    "monthly_week": 1,
    "monthly_week_day": 1,
    "repeat_interval": 1,
    "type": 1,
    "weekly_days": "1"
  },
  "schedule_for": "jchill@example.com",
  "settings": {
    "additional_data_center_regions": [
      "TY"
    ],
    "allow_multiple_devices": true,
    "alternative_hosts": "jchill@example.com;thill@example.com",
    "alternative_hosts_email_notification": true,
    "approval_type": 2,
    "approved_or_denied_countries_or_regions": {
      "approved_list": [
        "CX"
      ],
      "denied_list": [
        "CA"
      ],
      "enable": true,
      "method": "approve"
    },
    "audio": "telephony",
    "audio_conference_info": "test",
    "authentication_domains": "example.com",
    "authentication_exception": [
      {
        "email": "jchill@example.com",
        "name": "Jill Chill"
      }
    ],
    "authentication_option": "signIn_D8cJuqWVQ623CI4Q8yQK0Q",
    "auto_recording": "cloud",
    "breakout_room": {
      "enable": true,
      "rooms": [
        {
          "name": "room1",
          "participants": [
            "jchill@example.com"
          ]
        }
      ]
    },
    "calendar_type": 1,
    "close_registration": false,
    "contact_email": "jchill@example.com",
    "contact_name": "Jill Chill",
    "email_notification": true,
    "encryption_type": "enhanced_encryption",
    "focus_mode": true,
    "global_dial_in_countries": [
      "US"
    ],
    "host_video": true,
    "jbh_time": 0,
    "join_before_host": false,
    "language_interpretation": {
      "enable": true,
      "interpreters": [
        {
          "email": "interpreter@example.com",
          "languages": "US,FR"
        }
      ]
    },
    "sign_language_interpretation": {
      "enable": true,
      "interpreters": [
        {
          "email": "interpreter@example.com",
          "sign_language": "American"
        }
      ]
    },
    "meeting_authentication": true,
    "meeting_invitees": [
      {
        "email": "jchill@example.com"
      }
    ],
    "mute_upon_entry": false,
    "participant_video": false,
    "private_meeting": false,
    "registrants_confirmation_email": true,
    "registrants_email_notification": true,
    "registration_type": 1,
    "show_share_button": true,
    "use_pmi": false,
    "waiting_room": false,
    "watermark": false,
    "host_save_video_order": true,
    "alternative_host_update_polls": true,
    "internal_meeting": false,
    "continuous_meeting_chat": {
      "enable": true,
      "auto_add_invited_external_users": true
    },
    "participant_focused_meeting": false,
    "push_change_to_calendar": false
  },
  "start_time": "2022-03-25T07:32:55Z",
  "template_id": "Dv4YdINdTk+Z5RToadh5ug==",
  "timezone": "America/Los_Angeles",
  "topic": "My Meeting",
  "tracking_fields": [
    {
      "field": "field1",
      "value": "value1"
    }
  ],
  "type": 2


*/

///////////////////////////////////////////////////////////////////////////////
/*
email = "logkyakahenge7@gmail.com"; // your zoom developer email account
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Zoom Meeting Using Node JS", //meeting title
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "true",
      },
    },
    auth: {
      bearer: token,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };
*/
