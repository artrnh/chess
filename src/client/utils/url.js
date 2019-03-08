export const getSocketUrl = () =>
    process.env.NODE_ENV === 'development'
        ? process.env.BACKEND_DEV_API
        : process.env.PRODUCTION_HOST;
