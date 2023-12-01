const { generateToken04 } = require("./tokenGenerator");

const appID = 1437058845; // type: number

// Please modify serverSecret to your own serverSecret. serverSecret is a string.
// Example: 'sdfsdfsd323sdfsdf'
const serverSecret = "335966e840bce7411ba8c661a267b4e5"; // type: 32 byte length string

// Please modify userId to the user's userId.
const userId = "123"; // type: string

const effectiveTimeInSeconds = 3600; //type: number; unit: s; expiration time of token, in seconds.

// When generating a basic authentication token, the payload should be set to an empty string.
const payload = "";
// Build token

const getToken = function (req, res) {
  console.log(req.body);

  const token = generateToken04(
    appID,
    req.body.id,
    serverSecret,
    effectiveTimeInSeconds,
    payload
  );

  res.json({ token });
};

module.exports = getToken;
