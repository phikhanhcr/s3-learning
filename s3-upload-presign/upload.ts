import axios from 'axios';
import fs from 'fs';
import path from 'path';
const file = path.join(__dirname, 'test.jpg');

const uploadFile = async (filePath, presignedUrl) => {
    try {
        const fileStream = fs.createReadStream(filePath);
        const response = await axios.put(presignedUrl, fileStream, {
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });
        console.log('File uploaded successfully', response.status);
    } catch (err) {
        console.error('Error uploading file', err);
    }
};

const presignedUrl =
    'https://learncloudfront123.s3.ap-southeast-1.amazonaws.com/test.jpg?AWSAccessKeyId=AKIA6JYFPUTYVJKNUU4K&Expires=1717547257&Signature=ml4WTk9rDTYRbydAxOA6yurPzVo%3D';
uploadFile(file, presignedUrl);

// npx ts-node ./s3-upload-presign/generate_presign_url.ts
