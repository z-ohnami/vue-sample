const functions = require('firebase-functions');
const admin = require('firebase-admin')
const express = require('express');
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors);

const anonymousUser = {
  id: "anon",
  name: "Anonymous",
  avatar: ""
};

const checkUser = (req, res, next) => {
  req.user = anonymousUser;
  if((req.query.auth_token != undefined)) {
    let idToken = req.query.auth_token;
    admin.auth().verifyIdToken(idToken).then(decodedIdToken => {
      let authUser = {
        id: decodedIdToken.user_id,
        name: decodedIdToken.name,
        avatar: decodedIdToken.picture
      }
      req.uer = authUser;
      next();
    }).catch(error => {
      next();
    });
  } else {
    next();
  }
};

app.use(checkUser);

// チャンネルを作成するAPI
function createChannel(cname) {
  let channelsRef = admin.database().ref('channels');
  let date1 = new Date();
  let date2 = new Date();
  date2.setSeconds(date1.getSeconds() + 1);
  const defaultData = `{
    "messages":{
      "1":{
        "body":"Welcome to #${cname} channel.",
        "date":"${date1.toJSON()}",
        "user":{
          "avatar":"",
          "id":"robot",
          "name":"Robot"
        }
      },
      "2":{
        "body":"初めてのメッセージを投稿してみましょう。",
        "date":"${date2.toJSON()}",
        "user":{
          "avatar":"",
          "id":"robot",
          "name":"Robot"
        }
      }
    }
  }`;
  channelsRef.child(cname).set(JSON.parse(defaultData));
}

app.post('/channels', (req, res) => {
  let cname = req.body.cname;
  createChannel(cname);
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({ result: 'ok' });
});

// チャンネル一覧の取得
app.get('/channels', (req, res) => {
  let channelsRef = admin.database().ref('channels');
  channelsRef.once('value', function(snapshot) {
    let items = new Array();
    snapshot.forEach(function(childSnapshot) {
      let cname = childSnapshot.key;
      items.push(cname);
    });
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({channels: items});
  });
});

// 指定チャネルへメッセージを追加するAPI
app.post('/channels/:cname/messages', (req, res) => {
  let cname = req.params.cname;
  let message = {
    date: new Date().toJSON(),
    body: req.body.body,
    user: req.user
  };
  let messagesRef = admin.database().ref(`channels/${cname}/messages`);
  messagesRef.push(message);
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({ result: 'ok' });
});

// チャンネル内のメッセージ一覧を取得する
app.get('/channels/:cname/messages', (req, res) => {
  let cname = req.params.cname;
  let messagesRef = admin.database().ref(`channels/${cname}/messages`).orderByChild('date').limitToLast(20);
  messagesRef.once('value', function(snapshot) {
    let items = new Array();
    snapshot.forEach(function(childSnapshot) {
      let message = childSnapshot.val();
      message.id = childSnapshot.key;
      items.push(message);
    });
    items.reverse();
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({messages: items});
  });
});

// 初期状態に戻すAPI
app.post('/reset', (req, res) => {
  createChannel('general');
  createChannel('random');
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({ result: 'ok' });
});

exports.v1 = functions.https.onRequest(app);
