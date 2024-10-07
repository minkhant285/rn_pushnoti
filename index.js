var admin = require("firebase-admin");
const { getFirestore, Timestamp } = require('firebase-admin/firestore');

var HS = require("./hs_key.json");

const fbAdmin = admin.initializeApp({
    credential: admin.credential.cert(HS)
});

const db = getFirestore();
const Appname = "HS Cargo"
const noitCollection = 'hscargo_noti'
const notiSubcollection = 'noti_data'

const notiUserInfo = {
    user_id: 'HSC004AI', //blackmore471998@gmail.com
    deviceNotiToken: 'eY1fiDlHQ1eX7oIqk61QU2:APA91bEKre9j76LT1dFz4yB4e40wWxX5WimjVG-FnJuknfIG9swYmKq16irAC-Qe10nGgxNhbQO3Cv4BhgcGeCJTeccWKrF8_DFGYSBMUOHIez7nYOGPalw',
}

//sotre to firestore dabatase
const annoucementNotiData = {
    type: 'annoucement',
    title: `${Appname} Annoucement`,
    subTitle: `Important fact!`,
    body: `ပစ္စည်းပေါ်တွင် ပစ္စည်းလက်ခံမည့်သူ၏ အချက်အလက်အပြည့်စုံကိုရေးပြီးပို့ပေးရပါမည်။`,
    time: Timestamp.now(),
    isRead: false

}

//sotre to firestore dabatase
const waybillNotiData = {
    type: 'waybill',
    title: `${Appname} New Waybill`,
    subTitle: `New Way Bill Created!`,
    body: `New Way bill crated. Tracking ID: HST2406002398`,
    time: Timestamp.now(),
    isRead: false

}

// this will send notification to user's device
async function sendNoti(token, data) {
    fbAdmin.messaging().send({
        token,
        data,
        android: {
            priority: "high",
        },
        apns: {
            headers: {
                "apns-priority": "10"
            },
            payload: {
                aps: {
                    "content-available": 1
                }
            }
        }
    })
}

async function saveNoti(notiData) {
    const res = await db.collection(noitCollection).doc(notiUserInfo.user_id).collection(notiSubcollection).add(notiData);
}


//send chat message noti that doesn't store noti to firestore

// sendNoti(notiUserInfo.deviceNotiToken, {
//     title: `${Appname} Admin!`,
//     subTitle: 'Admin Send you a message',
//     type: 'chat',
// });


// send waybill noti and also store noti to firestore
// saveNoti(waybillNotiData).then(
//     sendNoti(
//         notiUserInfo.deviceNotiToken, {
//         type: 'waybill',
//         tracking_id: 'HST2406002398',
//         title: `${Appname} New WayBill`,
//         subTitle: 'New Way Bill Created'
//     })
// )


//send annoucement noti and also store noti to firestore
saveNoti(annoucementNotiData).then(sendNoti(notiUserInfo.deviceNotiToken, {
    title: `${Appname} Annoucement`,
    subTitle: `Important fact!`,
    type: 'annoucement'
}));


