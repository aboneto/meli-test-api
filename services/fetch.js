const axios = require('axios');

const fetch = (url, customOptions = {}) => {
    try {
        let source = axios.CancelToken.source();
        let options =  Object.assign({
            url,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            method: 'GET',
            body: null,
            data: null,
            responseHeader: false,
            cancelToken: source.token,
            timeout: 10000
        }, customOptions);

        setTimeout(() => {
            if(source){
                source.cancel(`Request Timeout ${options.timeout}ms: ${url}`);
            }
        }, options.timeout);

        return axios(options)
            .then(results => {
                source = null;

                if(options.responseHeader){
                    return {headers: results.headers, data: results.data};
                }

                return results.data;
            }).catch(err => {
                source = null;
                throw err;
            });

    } catch(err) {
        return new Promise((resolve, reject) => reject(err));
    }
};

module.exports = fetch;