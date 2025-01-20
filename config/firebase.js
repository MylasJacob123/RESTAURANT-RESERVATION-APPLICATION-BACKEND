const admin = require('firebase-admin');
const serviceAccount = require('./path/to/your/firebaseServiceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (token, message) => {
  const messagePayload = {
    notification: {
      title: message.title,
      body: message.body,
    },
    token: token,
  };

  try {
    await admin.messaging().send(messagePayload);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = { sendNotification };
