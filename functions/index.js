const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const Filter = require('bad-words');
const badWordsFilter = new Filter({ list: ['mierda', 'carajo', 'rayos'], placeHolder: '😮' });

const capitalizeSentence = require('capitalize-sentence');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.generatePreview = functions.database.ref('/labs/{labId}').onWrite(event => {
  // Only edit data when it is first created.
  // if (event.data.previous.exists()) {
  //   return;
  // }
  // Exit when the data is deleted.
  // if (!event.data.exists()) {
  //   return;
  // }
  const lab = event.data.val();
  if (event.data.exists() && lab.published) {
    console.log('Lab update public: %j', event);
    return event.data.ref.parent.parent.child('previews/labs/' + event.params.labId).set({
      title: lab.title,
      level: lab.level,
      technology: lab.technology,
      updated: lab.updated,
      videoId: lab.videoId ? lab.videoId : null
    });
  } else {
    console.log('Lab update private: %j', event);
    return event.data.ref.parent.parent.child('previews/labs/' + event.params.labId).remove();
  }
});

exports.generateArticlePreview = functions.database.ref('/articles/{articleId}').onWrite(event => {
  const article = event.data.val();
  if (event.data.exists() && article.published) {
    console.log('Article update public: %j', event);
    return event.data.ref.parent.parent.child('previews/articles/' + event.params.articleId).set({
      title: article.title,
      updated: article.updated,
      coverUrl: article.coverUrl
    });
  } else {
    console.log('Article update private: %j', event);
    return event.data.ref.parent.parent.child('previews/articles/' + event.params.articleId).remove();
  }
});

exports.saveUserInformation = functions.auth.user().onCreate(event => {
  const user = event.data;

  const email = user.email;
  const displayName = user.displayName;
  const photoURL = user.photoURL;

  console.log('saveUserInformation: ' + displayName);

  return admin.database().ref('users/' + user.uid).set({
    displayName: displayName,
    email: email,
    photoURL: photoURL
  });
});

exports.moderator = functions.database.ref('/comments/{placeComment}/{itemId}/{commentId}').onWrite(event => {
  const message = event.data.val();

  if (message && !message.sanitized) {
    console.log('Retrieved message content: ', message);

    const moderatedMessage = moderateMessage(message.content);

    console.log('Message has been moderated. Saving to DB: ', moderatedMessage);
    return event.data.adminRef.update({
      content: moderatedMessage,
      sanitized: true,
      moderated: message.content !== moderatedMessage
    });
  }
});

// Moderates the given message if appropriate.
function moderateMessage(message) {
  // Re-capitalize if the user is Shouting.
  if (isShouting(message)) {
    console.log('User is shouting. Fixing sentence case...');
    message = stopShouting(message);
  }

  // Moderate if the user uses SwearWords.
  if (containsSwearwords(message)) {
    console.log('User is swearing. moderating...');
    message = moderateSwearwords(message);
  }

  return message;
}

// Returns true if the string contains swearwords.
function containsSwearwords(message) {
  return message !== badWordsFilter.clean(message);
}

// Hide all swearwords. e.g: Crap => ****.
function moderateSwearwords(message) {
  return badWordsFilter.clean(message);
}

// Detect if the current message is shouting. i.e. there are too many Uppercase
// characters or exclamation points.
function isShouting(message) {
  return message.replace(/[^A-Z]/g, '').length > message.length / 2 || message.replace(/[^!]/g, '').length >= 3;
}

// Correctly capitalize the string as a sentence (e.g. uppercase after dots)
// and remove exclamation points.
function stopShouting(message) {
  return capitalizeSentence(message.toLowerCase()).replace(/!+/g, '.');
}
