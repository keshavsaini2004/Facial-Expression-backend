const express=require("express");
const router=express.Router();
const multer=require("multer");
const songsModel=require("../model/songs.model")
const uploadFile=require("../services/songs.services")
const cors=require("cors")

const storage=multer({
    storage:multer.memoryStorage(),
    limits:{
        file:20,
        fileSize:200*1024*1024
    }
});

router.use(express.json());
router.use(cors());

/*
    songTitle
    artistTitle
    Song
    mood
*/

router.post("/songs",storage.array("audioFile"),async(req,res)=>{
    // res.send(req.body);

    // multer will populate text fields on req.body when using multipart/form-data
    console.log('received body:', req.body);
    console.log('received files:', req.files);

    // Accept either a JSON blob in songData or individual fields for a single track
    let songDatas;
    if (req.body.songData) {
        const { songData } = req.body;
        // songData might already be an object/array if multer parsed it
        if (typeof songData === 'string') {
            try {
                songDatas = JSON.parse(songData);
            } catch (err) {
                console.error('JSON parse error for songData string:', err);
                return res.status(400).json({
                    message: "Invalid JSON provided in songData",
                    error: err.message
                });
            }
        } else if (Array.isArray(songData) || typeof songData === 'object') {
            songDatas = songData;
        } else {
            return res.status(400).json({
                message: "songData has unexpected type",
                type: typeof songData
            });
        }
    } else {
        console.log('body fields did not include songData:', req.body);
        // fallback: build from individual fields for a single song
        const { title, artist, mood } = req.body;
        if (title && artist && mood) {
            songDatas = [{ title, artist, mood }];
        } else {
            return res.status(400).json({
                message: "Missing songData field in form data"
            });
        }
    }

    const files = req.files;

    if(songDatas.length !== files.length){
        return res.status(400).json({
            message:"Song data count & File count is not equal!"
        })
    }

    let savedSongs=[];
    for(let i=0;i<files.length;i++){
    const fileData= await uploadFile(req.files[i])

    const songs=await songsModel.create({
        title:songDatas[i].title,
        artist:songDatas[i].artist,
        audioFile:fileData.url,
        mood:songDatas[i].mood
    })

    savedSongs.push(songs)
    }

    // const allSong=songsModel.find()

    res.status(201).json({
        message:"Song Created",
        songs:savedSongs
    })

    // res.status(201).json({
    //     message:"Song Created"
    // })

})

router.get("/songs",async(req,res)=>{
    let data=await songsModel.find();
    res.status(200).json({
        data
    })
})

module.exports=router;