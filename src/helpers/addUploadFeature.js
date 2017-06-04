const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

const addUploadCapabilities = (type, resource, params) => {
    if (type === 'CREATE' && resource === 'events') {
        console.log(params.data.logo);
        if (params.data.logo) {
            return convertFileToBase64(params.data.logo[0]).then(base64Logo => {
                return {
                    type,
                    resource,
                    params: {
                        ...params,
                        logo: base64Logo
                    }
                };
            });
        }
    }

    return Promise.resolve({type, resource, params});
};

export default addUploadCapabilities;