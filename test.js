// const chat = await Chat.aggregate([
//     {
//         $match: {
//             $or: [
//                 { "members": new mongoose.Types.ObjectId("65897da27e4a17a24e163d02") },
//                 { "admin": new mongoose.Types.ObjectId("65897da27e4a17a24e163d02") },
//             ],
//         },
//     },
//     {
//         $lookup: {
//             from: "users",
//             localField: "members",
//             foreignField: "_id",
//             as: "members",
//         },
//     },
//     {
//         $lookup: {
//             from: "users",
//             localField: "admin",
//             foreignField: "_id",
//             as: "admin",
//         },
//     },
//     {
//         $lookup: {
//             from: "messages",
//             localField: "messages",
//             foreignField: "_id",
//             as: "messages",
//         },
//     },
//     {
//         $addFields: {
//             messages: {
//                 $cond: {
//                     if: { $isArray: "$messages" },
//                     then: { $slice: ["$messages", 10] }, // Adjust the number based on your requirements
//                     else: [],
//                 },
//             },
//         },
//     },
//     {
//         $unwind: "$messages",
//     },
//     {
//         $sort: { "messages.createdAt": -1 }, // Assuming there is a 'createdAt' field in your messages
//     },
//     {
//         $group: {
//             _id: "$_id",
//             name: { $first: "$name" }, // Include the name field
//             isGroupChat: { $first: "$isGroupChat" }, // Include the isGroupChat field
//             members: { $first: "$members" },
//             admin: { $first: "$admin" },
//             messages: { $push: "$messages" },
//             updatedAt: { $first: "$updatedAt" },
//         },
//     },
//     {
//         $sort: { updatedAt: -1 },
//     },
// ]);