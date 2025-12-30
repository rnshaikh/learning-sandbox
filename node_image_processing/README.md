# README #

Image Processing

Please Add following env variable to .env file to run:

| Environment Variable | Value |
| :---: | :---: |
| MONGO_URL| 'mongo-url' |
| MAX_POOL_SIZE | 'pool size' |
| SECRET_KEY | 'secret key' |
| INPUT_IMAGE_DIR | 'directory path of image to be process' |
| OUTPUT_IMAGE_DIR | 'directory path of output processed images. ' |


To run express app:

```sh
npm install 
npm run start-dev

```

To Run image adjustment script:

```sh
node ./src/scripts/image-adjustment.js  [--height=500, --width=500]
```


Please refer postman collection for crud API's.


