const fetch = require('services/fetch');
const { apiMile } = require("config");

const name = 'Antonio';
const lastname = 'Neto';

const _factoryProduct = (item, detail = false) => {
    let response = {
        "id": item.id,
        "title": item.title,
        "price": {
            "currency": item.currency_id,
            "amount": parseInt(item.price),
            "decimals": parseInt((item.price % 1) * 100)
        },
        "picture": item.thumbnail,
        "condition": item.condition,
        "free_shipping": item.shipping.free_shipping
    };

    if(detail){
        response.sold_quantity = item.sold_quantity;
        response.description = item.plain_text;
        response.picture = item.pictures.length > 0 ? item.pictures[0].secure_url : '';
    }

    return response;
};

const _getCategories = (filters) => {
    if(!filters) return [];
    filters = filters.filter(item => item.id === 'category');

    if(!(filters[0] && filters[0].values && filters[0].values[0] && filters[0].values[0].path_from_root)) return [];

    return filters[0].values[0].path_from_root.map(item => item.name);
};

const search = (req, res) => {
    const { query } = req;
    const { q } = query;

    if(!q){
        res.send({
            status: 400,
            message: 'Bad Request'
        });
    }

    fetch(`${apiMile}/sites/MLA/search?q=${q}`)
        .then(data => {
            if(!data){
                res.send({
                    status: 500,
                    message: 'Internal Server Error'
                });
                return false;
            }

            const {results, filters} = data;

            const items = results.slice(0, 4).map(item => {
                return _factoryProduct(item);
            });

            const categories = _getCategories(filters);

            res.send({
                "author": {
                    name,
                    lastname
                },
                categories,
                items
            });
        })
        .catch(error => {
            console.log(error);
            res.send({
                status: 500,
                message: 'Internal Server Error'
            });
        })
};

const detail = (req, res) => {
    const { params } = req;
    const { id } = params;

    if(!id){
        res.send({
            status: 400,
            message: 'Bad Request'
        });
    }

    const consults = [
        fetch(`${apiMile}/items/${id}`),
        fetch(`${apiMile}/items/${id}/description `)
    ];

    Promise.all(consults)
        .then(results => {
            const item = Object.assign(results[0], results[1]);

            res.send({
                "author": {
                    name,
                    lastname
                },
                item: _factoryProduct(item, true)
            });
        })
        .catch(error => {
            console.log(error);
            res.send({
                status: 500,
                message: 'Internal Server Error'
            });
        })
};

module.exports = {
    search,
    detail
};