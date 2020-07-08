const express = require('express');
const { Post, Hashtag, Image, Review, User } = require('../models');
const { Op } = require('sequelize');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const where = {};
        if (parseInt(req.query.lastId, 10)) {
            where.id = {[Op.lt] : parseInt(req.query.lastId, 10)}
             // where : {id : 9,8,7,6,5,4,3,2,1}
        }
        const posts = await Post.findAll({
            where : where,
            limit : 10,
            order : [['createdAt', 'DESC']],
            include : [{
                model : User,
                attributes : {
                    exclude : ['password'],
                }
            }, {
                model : Hashtag,
                as : "PostHashTags"
            }, {
                model : Image,
            }, {
                model : Review,
                include : [{
                    model : User,
                    attributes : {
                        exclude : ['password'],
                    },
                    oreder : [['createdAt', 'DESC']]
                }]
            }, {
                model : User,
                as : 'Carts',
                attributes : {
                    exclude : ['password'],
                }
            }]
        });
        res.status(200).json(posts)
    } catch (err) {
        console.error(err)
        next(err)
    }
});

module.exports = router 
