#!/usr/bin/env node
const dotenv = require('dotenv');
const fs = require("fs");
const nconf =  require('nconf');
const path = require('path');
const commandLineArgs = require('command-line-args');
const sharp = require('sharp');

dotenv.config()

nconf.argv()
   .env()
   .file({ file: path.resolve("config.json")});


const inputDir = nconf.get('INPUT_IMAGE_DIR');
const outputDir = nconf.get('OUTPUT_IMAGE_DIR');

const optionDefinitions = [
    { name: 'width', alias: 'w', type: Number },
    { name: 'height', alias: 'h', type: Number}
]


class ImageAdjustment{

    constructor(requiredWidth = 500, requiredHeight=500){
        this.requiredWidth = requiredWidth;
        this.requiredHeight = requiredHeight;
        this.images = [];
    }

    loadImage = () =>{
        this.images = (fs.readdirSync(inputDir).map(file => path.join(inputDir, file)));
    }

    adjustDimension = (imagePath) =>{
        sharp(imagePath)
        .resize( { width: this.requiredWidth , 
                   height: this.requiredHeight ,
                   fit: 'contain', 
                   background: { r: 255, g: 255, b: 255, alpha: 1 }
                })
        .toFile(path.join(outputDir, path.parse(imagePath).name + "-processed" + path.parse(imagePath).ext), (err, info) => { 
            if (err) {
                console.error("An error occurred resizing image:", err);
            }
        });
    }
}


const createDirIfNotExists = (dir) =>{
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
}


const main = () =>{
    try{
        const options = commandLineArgs(optionDefinitions)
        if(!inputDir || ! outputDir){
            console.error("Required input and output dir path.")
            return
        }
        createDirIfNotExists(outputDir)
        const imageAdj = new ImageAdjustment(options?.width, options?.height)
        imageAdj.loadImage()
        imageAdj.images.forEach(imageAdj.adjustDimension);
        console.log("Image Processed Successfully..")
    }
    catch(err){
        console.error(`Error:: ${err}`)    
    }
}

main()
