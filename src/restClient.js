import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    DELETE,
    fetchUtils,
} from 'admin-on-rest';
import addUploadFeature from './helpers/addUploadFeature';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

/**
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} { url, options } The HTTP request parameters
 */
const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const { queryParameters } = fetchUtils;
    const options = {};
    switch (type) {
        case GET_LIST: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
                filter: JSON.stringify(params.filter),
            };
            url = `${API_URL}/${resource}?${queryParameters(query)}`;
            break;
        }
        case GET_ONE:
            url = `${API_URL}/${resource}/${params.id}`;
            break;
        case GET_MANY: {
            const query = {
                filter: JSON.stringify({ id: params.ids }),
            };
            url = `${API_URL}/${resource}?${queryParameters(query)}`;
            break;
        }
        case GET_MANY_REFERENCE: {
            const { page, perPage } = params.pagination;
            const { field, order } = params.sort;
            const query = {
                sort: JSON.stringify([field, order]),
                range: JSON.stringify([(page - 1) * perPage, (page * perPage) - 1]),
                filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
            };
            url = `${API_URL}/${resource}?${queryParameters(query)}`;
            break;
        }
        case UPDATE:
            url = `${API_URL}/${resource}/${params.id}`;
            options.method = 'PUT';
            options.body = JSON.stringify(params.data);
            break;
        case CREATE:
            console.log(JSON.stringify(params.data));
            url = `${API_URL}/${resource}`;
            options.method = 'POST';
            switch (resource) {
                case 'events': {
                    let where = [params.data.lat, params.data.lng];
                    if (params.logo) {
                        options.body = JSON.stringify({ ...params.data, where, logo: params.logo});
                    } else {
                        options.body = JSON.stringify({ ...params.data, where});
                    }
                    break;
                }
                case 'advcampaign': {
                    let finalParams = {...params.data};
                    console.log(finalParams);

                    let age = [params.data.audience.ageFrom, params.data.audience.ageTo];
                    let coordinates = [params.data.lat, params.data.lng];
                    let audience = {radius: params.data.audience.radius};
                    let gender = params.data.audience.gender;
                    if (age[0] && age[1]) {
                        audience = {...audience, age};
                    }
                    if (gender) {
                        audience = {...audience, gender};
                    }
                    if (coordinates[0] && coordinates[1]) {
                        finalParams = {...finalParams, coordinates}
                    }
                    finalParams = {...finalParams, audience};
                    console.log(finalParams);
                    options.body = JSON.stringify(finalParams);
                    break;
                }
                default:
                    options.body = JSON.stringify(params.data);
            }
            console.log(options.body);
            break;
        case DELETE:
            url = `${API_URL}/${resource}/${params.id}`;
            options.method = 'DELETE';
            break;
        default:
            throw new Error(`Unsupported fetch action type ${type}`);
    }
    console.log(url);
    return { url, options };
};

/**
 * @param {Object} response HTTP response from fetch()
 * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
 * @param {String} resource Name of the resource to fetch, e.g. 'posts'
 * @param {Object} params The REST request params, depending on the type
 * @returns {Object} REST response
 */
const convertHTTPResponseToREST = (response, type, resource, params) => {
    let { headers, json } = response;
    switch (type) {
        case GET_LIST:
            console.log(json);
            json = json.map(x => {
                Object.defineProperty(x, 'id',
                    Object.getOwnPropertyDescriptor(x, '_id'));
                delete x['_id'];
                return x;
            });
            console.log(json);
            return {
                data: json,
                total: json.length,
            };
        case CREATE:
            if ('Error' in json) {
                throw new Error(JSON.stringify(json['Error']));
            }
            return { data: { ...params.data, id: json._id, } };
        default:
            return { data: json };
    }
};

/**
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the request type
 * @returns {Promise} the Promise for a REST response
 */
export default (type, resource, params) => {
    const { fetchJson } = fetchUtils;
    return addUploadFeature(type, resource, params)
        .then(data => data)
        .then(data => {
            return convertRESTRequestToHTTP(data.type, data.resource, data.params)
        })
        .then(data => {
            const { url, options } = data;
            return fetchJson(url, options)
        })
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
};