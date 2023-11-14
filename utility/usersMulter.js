import multer from "multer";
import { storage } from "../helpers/multer.js";

// create and export users multer
export const usersMulter = multer({
    storage : storage
}).fields([
    {
        name : "userPhoto",
        maxCount : 1
    },
    {
        name : "galleryPhoto",
        maxCount : 5
    }
]);