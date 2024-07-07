var admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');


// var serviceAccount = require("./trinity_push_noti.json");
// var serviceAccount1 = require("./city_point_key.json");
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
    deviceNotiToken: 'eQK_KaR5TyGUSpxRtR-hmC:APA91bF_4Sa___SBMI4n35Q7HajWKxW4aRXkq1m8DeGIkC5YKalWxyj3idRWw9Tu4m0vYx8K1x6bKA3qvTL8sUYyzyFcDhlBCTEbNJqpGXRdFyaMhS9hL2I-_Q7Dc8MOW1qryxl_BTxV',
    data: {
        icon: "",
        type: '',
        title: `${Appname} Noti Test`,
        content: `Welcome to our Flash Sale: 1-Hour Delivery – your ticket to swift, stress-free shopping! 🚀✨
Limited Time Offer!
🕒 Countdown: 31 Jan 2024
🔥 Use Code: CITYPOINT1HR
Ready, set, shop! Browse our curated selection, apply code CITYPOINT1HR at checkout, and voilà – enjoy your order within just one hour. Why wait when you can have it now?
Perks:
🚚 Ultra-Fast Delivery: Experience the thrill of 1-Hour Delivery – your purchases at your doorstep in 60 minutes!
💰 Exclusive Discount: Enter code CITYPOINT1HR for a 15% discount on your delivery fee.
How to Unlock:
Browse and add your favorites to the cart.
Apply code CITYPOINT1HR at checkout.
Get ready to receive your order in 1 hour!
Terms & Conditions:
Valid only during the Flash Sale hours.
Applicable to eligible products and locations.
Limited redemptions available – act fast!
Don't miss out on the fastest shopping spree ever! Tap into the Flash Sale now and experience the joy of express deliveries.`,
        subTitle: `Need it now? Order in the next hour for lightning-fast delivery! Don't miss our Flash Sale – quick, easy, and right on time. ⏳📦`,
        time: Timestamp.now(),
    }
}


async function sendNoti(token, title, body) {
    fbAdmin.messaging().send({
        token,
        android: {
            priority: "high",
            notification: {
                // clickAction: "hi",
                channelId: 'important',
                priority: 'high',
                sound: 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/player_shoot.wav',
            },

        },
        notification: {
            title,
            body,
            imageUrl: 'https://i.pinimg.com/736x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg',
        },
        apns: {
            payload: {
                aps: {
                    category: 'dd',
                    sound: 'https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/player_shoot.wav',
                    alert: 'hi',

                },

            }
        }
    })
}

async function addNoti() {
    const res = await db.collection(collectionName).doc(notificationData.userid).collection(subcollection).add(notificationData.data);
}

// sendNoti(token, "TRINITY", "Send from backend");
addNoti().then(sendNoti(notificationData.deviceNotiToken, Appname, notificationData.data.content));