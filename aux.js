// const msg_collection = "hscargo_chat"
// const msg_subcollection = "messages"

// async function sendMessage() {
//     const doc = db.collection(msg_collection).doc(notificationData.userid)
//     await doc.set({ name: 'Agent 1', photo: "photo.png", latestMsg: " latest message" });
//     await doc.collection(msg_subcollection).add({
//         message: "latest message",
//         receiver: notificationData.userid,
//         sender: "321",
//         type: 'TEXT',
//         attachment_url: "",
//         time_stamp: Timestamp.now()
//     });
// }

// async function readMessage() {
//     const msgs = await db.collection(msg_collection).get()
//     // .collection(msg_subcollection)
//     // .get();

//     console.log(msgs.docs.map((r) => {
//         return {
//             ...r.data(),
//             id: r.id
//         }
//     }))
//     // msgs.docs.forEach((r) => console.log(r.id, r.data()))
// }
// readMessage();
// sendMessage();
