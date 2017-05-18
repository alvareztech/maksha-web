var functions = require('firebase-functions');

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
      videoId: lab.videoId
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
