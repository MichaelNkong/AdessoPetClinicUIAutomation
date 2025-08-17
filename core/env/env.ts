// This Function will print enviroment variables
const printEnvironmentVariables = () => {
    console.log('Environment variables set:', {
      Base_URL: process.env.BASE_URL


    });
};

export {printEnvironmentVariables};