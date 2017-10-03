class AJAX {

    generateHeaders(headers = {}, method = 'GET') {
        headers['Content-Type'] = 'application/json';
        headers['Accept'] = 'application/json';
        let myHeaders = new Headers(headers);
        return {
            method,
            headers: myHeaders
        };
    }

    get(URL, headers) {
        return new Promise((resolve, reject) => {
            fetch(URL, this.generateHeaders(headers, 'GET')).then(res => res.json())
                .then(result => {
                    if (result.error) {
                        reject(result);
                    } else {
                        resolve(result);
                    }
                })
        });
    }

    post(URL, headers, body) {
        return new Promise((resolve, reject) => {
            let requestHeader = this.generateHeaders(headers, 'POST');
            requestHeader.body = body;
            fetch(URL, requestHeader).then(res => res.json())
                .then(result => {
                    if (result.error) {
                        reject(result);
                    } else {
                        resolve(result);
                    }
                })
        });
    }

    put(URL, headers, body) {
        return new Promise((resolve, reject) => {
            let requestHeader = this.generateHeaders(headers, 'PUT');
            requestHeader.body = body;
            fetch(URL, requestHeader).then(res => res.json())
                .then(result => {
                    if (result.error) {
                        reject(result);
                    } else {
                        resolve(result);
                    }
                })
        });
    }

    delete(URL, headers) {
        return fetch(URL, this.generateHeaders(headers, 'DELETE'));
    }
};

export const Fetch = new AJAX();