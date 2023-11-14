// package init 
import multer from "multer";

// create and export multer destinations
export const storage = multer.diskStorage({
    destination : (req,file,cb) =>{
        if(file.fieldname === "userPhoto"){
            cb(null, 'public/photos/users/users photo/');
        }else if(file.fieldname === "galleryPhoto"){
            cb(null, 'public/photos/users/users gallery/');
        }else{
            cb(null, '../public/teamFile');
        }
    },
    filename : (req,file,cb) =>{
        cb(null, Date.now() + "-" + Math.ceil(Math.random() * 10000000) + "-" + file.originalname);
    }
})