// This Function will print enviroment variables
const printEnvironmentVariables = () => {
    console.log('Environment variables set:', {
      BASE_URL: process.env.BASE_URL


    });
};

export {printEnvironmentVariables};