const express = require('express');
const { User, Post, Hashtag, Image } = require('../models');
const router = express.Router();
const { Op } = require('sequelize')

router.get('/:hashtag', async (req, res, next) => { // hashtag/:hashtag?lastId=33
    try {
        const where = {};
        if(parseInt(req.query.lastId, 10)) {
            where.id = { [Op.lt] : parseInt(req.query.lastId, 10)}
        }
        const posts = await Post.findAll({
            where,
            limit : 10,
            order : [['createdAt', 'DESC']],
            include : [{
                model : Hashtag,
                as : 'PostHashTags',
                where : { name : decodeURIComponent(req.params.hashtag)}
            }, {
                model : User,
                attributes : ['id', 'nickname']
            }, {
                model : User,
                as : 'Carts',
                attributes : ['id', 'nickname']
            }, {
                model : Image
            }]
        });
        if(!posts) {
            return res.status(403).send('존재하지 않는 게시물')
        }
        res.status(201).json(posts)
    } catch (err) {
        console.error(err)
        next(err)
    }
})

module.exports = router;
