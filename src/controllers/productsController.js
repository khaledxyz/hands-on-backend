const productsModel = require("../models/ChallangesModel");
const ObjectId = require("mongoose").Types.ObjectId;
const multer = require("multer");

// gat all products of a user

module.exports.readChallanges = async (req, res) => {
  const products = await productsModel.find()
    .sort({ createdAt: -1 })
  res.status(200).json(products);
};



// Create an  new Product

const createProduct = async (req, res) => {
    const { title, description ,price } = req.body;
    const image = req.file;
  
    const uploadImage = (imageBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({ folder: 'products' }, (error, result) => {
          if (error) { reject(error); }
          else { resolve(result.secure_url); };
        });
        // Stream the image to Cloudinary
        streamifier.createReadStream(imageBuffer).pipe(stream);
      });
    }
  
    const imageUrl = await uploadImage(image.buffer);
    const newProduct = await productsModel.create({
      
      title,
      description,
      image: imageUrl
    });
  
    res.status(200).json(newProduct);
  };

module.exports = {createProduct};




// get Product info  by id

module.exports.getProductInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  productsModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown:" + err);
  })
};

// update Product by id

module.exports.updateProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const updateProduct = await productsModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          images: req.file.path,
          description: req.body.description,
          title: req.body.title,
          price:req.body.price,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: "Product updated", updateProduct });
  } catch (error) {
    res.status(400).json({ message: "failed to update Product ", error });
  }
};

// delete Product by id

module.exports.deleteProduct = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const deleteProduct = await productsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted", deleteProduct });
  } catch (error) {
    res.status(400).json({ message: "failed to delete Product ", error });
  }
};














