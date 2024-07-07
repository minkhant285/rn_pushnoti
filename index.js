var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


var trinity = require("./trinity_push_noti.json");
var citypoint = require("./city_point_key.json");
var HS = require("./hs_key.json");

const fbAdmin = admin.initializeApp({
    credential: admin.credential.cert(HS)
});

const db = getFirestore();

// const tho = 'eyun9okbRUW2hzJyCmL1P9:APA91bFcJZIVo37VXi0KTq8wgaxrDhiaiQa5gToOdnAbNJOPLV33BS1lytYuqxdYeLNIbi3Fs52rWaAckDuaTSyD4b4-fZt06o7E_kM3Fx-VbMzbzWyTV4jqXgCGDxhlKmGPV4Uumv5N';

const Appname = "HS Cargo"
const collectionName = 'hscargo_noti'
const subcollection = 'noti_data'

const notificationData = {
    userid: 'eb257e7d-55f7-41f6-b9f0-6392fdf57394', //mk
    deviceNotiToken: 'fltNQgIgRgu_2q1OrYoiEq:APA91bGdtB2X_NmM6EHeWIpLaMS7eKLMr4Ja4j-awQ4i7kq6_knF-iBu-BJZf6WcUVgJz6ST8hG04CnSABdUcns0UmMb96YfIP0rokOKfhP9aDMJxt31F9dApBn6UI-qUVN48xv0q-bm',

}


async function sendNoti(token, data) {
    fbAdmin.messaging().send({
        token,
        data,
        android: {
            priority: 'high',
        },
        apns: {
            headers: {
                'apns-priority': '10',
            },
            payload: {
                aps: {
                    'content-available': 1,
                },
            },
        },
    })
}

// async function addNoti() {
//     const res = await db.collection(collectionName).doc(notificationData.userid).collection(subcollection).add(notificationData.data);
// }
sendNoti(notificationData.deviceNotiToken, {
    title: 'New Message',
    body: 'You have a new message!',
    type: 'chat',
    click_action: 'FLUTTER_NOTIFICATION_CLICK',  // Make sure to include this
});

// sendNoti(notificationData.deviceNotiToken, {
//     title: 'New Waybill',
//     body: 'Tracking Code: HST2406002392',
//     type: 'waybill',
//     tracking_id: "HST2406002392",
//     click_action: 'FLUTTER_NOTIFICATION_CLICK',  // Make sure to include this
// });

// sendNoti(notificationData.deviceNotiToken, {
//     title: 'Annoucement',
//     body: 'You can track with tracking Code: HST2406002392 via Tracking Page',
//     type: 'annoucement',
//     click_action: 'FLUTTER_NOTIFICATION_CLICK',  // Make sure to include this
// });
