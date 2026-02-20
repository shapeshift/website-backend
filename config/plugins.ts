export default ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        accessKeyId: env('AWS_ACCESS_KEY_ID'),
        secretAccessKey: env('AWS_SECRET_ACCESS_KEY'),
        region: env('AWS_REGION', 'auto'),
        endpoint: env('AWS_ENDPOINT'),
        params: {
          ACL: 'private',
          signedUrlExpires: env.int('AWS_SIGNED_URL_EXPIRES', 3600),
          Bucket: env('AWS_BUCKET'),
        },
        s3ForcePathStyle: true,
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
})
