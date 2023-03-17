const challengesModel = require("../models/ChallangesModel");
const ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");

// gat all challenges of a user

module.exports.readChallanges = async (req, res) => {
  const challenges = await challengesModel.find()
    .sort({ createdAt: -1 })
    
  res.status(200).json(challenges);
};



// Create an  new challenge

const createChallenge = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file;
  
    const uploadImage = (imageBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'challenges' }, (error, result) => {
          if (error) { reject(error); }
          else { resolve(result.secure_url); };
        });
        // Stream the image to Cloudinary
        streamifier.createReadStream(imageBuffer).pipe(stream);
      });
    }
  
    const imageUrl = await uploadImage(image.buffer);
    const newChallenge = await challengesModel.create({
      
      title,
      description,
      image: imageUrl
    });
  
    res.status(200).json(newChallenge);
  };

module.exports = {createChallenge};




// get challenge info  by id

module.exports.getChallengeInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  challengesModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown:" + err);
  })
};

// update challenge by id

module.exports.updateChallenge = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const updateChallenge = await challengesModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          images: req.file.path,
          description: req.body.description,
          title: req.body.title,
          membersNumber: req.body.membersNumber,
          location:req.body.location,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: "challenge updated", updateChallenge });
  } catch (error) {
    res.status(400).json({ message: "failed to update challenge ", error });
  }
};

// delete challenge by id

module.exports.deleteChallenge = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const deleteChallenge = await challengesModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "challenge deleted", deleteChallenge });
  } catch (error) {
    res.status(400).json({ message: "failed to delete challenge ", error });
  }
};














