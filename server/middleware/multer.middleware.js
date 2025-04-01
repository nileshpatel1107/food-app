const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // Import Cloudinary config
// Set storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "menu_images", // Cloudinary folder name
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);

    if (extName && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error("Only images (jpeg, jpg, png, gif) are allowed"));
    }
};

// Upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter,
});

module.exports = upload;
