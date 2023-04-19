const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.reminder = functions.pubsub.schedule("every 1 minutes").onRun(() => {
  const usersRef = admin.database().ref("users");
  const notificationsRef = admin.database().ref("notifications");
  usersRef.once("value", (usersSnapshot) => {
    const usersObj = usersSnapshot.val();
    for (const userId of Object.keys(usersObj)) {
      if (usersObj[userId].tokens) {
        const tokens = Object.values(usersObj[userId].tokens).map(
          (item) => item
        );
        notificationsRef.once("value", (notificationsSnapshot) => {
          const notificationsObj = notificationsSnapshot.val();
          if (notificationsObj[userId]) {
            const notifByUserId = notificationsObj[userId];
            for (const [notifDate, notifTimes] of Object.entries(
              notifByUserId
            )) {
              const day = notifDate.split("|")[0];
              const month = notifDate.split("|")[1];
              const year = notifDate.split("|")[2];
              for (const [notifTime, notifValue] of Object.entries(
                notifTimes
              )) {
                const options = { timeZone: "Europe/Kiev" };
                const now = new Date(
                  new Date().toLocaleString("en-US", options)
                );
                const hours = notifTime.split(":")[0];
                const minutes = notifTime.split(":")[1];
                const targetTime = new Date(
                  Number(year),
                  Number(month - 1),
                  Number(day),
                  Number(hours),
                  Number(minutes),
                  now.getSeconds(),
                  now.getMilliseconds()
                );
                if (
                  `${now.getDate()}/${
                    now.getMonth() + 1
                  }/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}` ==
                    `${targetTime.getDate()}/${
                      targetTime.getMonth() + 1
                    }/${targetTime.getFullYear()} ${targetTime.getHours()}:${targetTime.getMinutes()}` &&
                  notifValue.active
                ) {
                  const message = {
                    notification: {
                      title: "Нагадування",
                      body: `${notifTime} - ${notifValue.text}`,
                    },
                    tokens: tokens,
                  };
                  admin
                    .messaging()
                    .sendMulticast(message)
                    .then((response) => {
                      console.log("Відправлено", response);
                    });
                }
              }
            }
          }
        });
      }
    }
  });
});
