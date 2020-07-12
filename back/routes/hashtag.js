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
            include : [{
                model : Hashtag,
                as : 'PostHashTags',
                where : { name : decodeURIComponent(req.params.hashtag) }
            }]
        });
        
        if(!posts) {
            return res.status(403).send('존재하지 않는 게시물')
        }

        const postWithHashtag = await Post.findAll({
            where : {id : posts.map((v) => v.id)},
            limit : 10,
            order : [['createdAt', 'DESC']],
            include : [{
                model : Hashtag,
                as : 'PostHashTags',
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
        })
        res.status(201).json(postWithHashtag)
    } catch (err) {
        console.error(err)
        next(err)
    }
})

module.exports = router;
