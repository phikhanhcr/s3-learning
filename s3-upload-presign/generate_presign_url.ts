import AWS from 'aws-sdk';

AWS.config.update({ region: 'ap-southeast-1' });

const s3 = new AWS.S3();

const generatePresignedUrl = async (bucketName, objectName, expiration = 3600) => {
    const params = {
        Bucket: bucketName,
        Key: objectName,
        Expires: expiration,
    };

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);
        return url;
    } catch (err) {
        console.error('Error generating presigned URL', err);
        return null;
    }
};

(async () => {
    const bucketName = 'learncloudfront123';
    const objectName = 'test.jpg';
    const url = await generatePresignedUrl(bucketName, objectName);
    if (url) {
        console.log(`Presigned URL: ${url}`);
    }
})();
