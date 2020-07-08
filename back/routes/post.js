const express = require('express');
const { User, Post, Hashtag, Image, Review } = require('../models');
const { response } = require('express');
const router = express.Router()

router.post('/', async(req, res, next) => {
    try {
        const hashtags = req.body.hashtag.match(/(#[^\s#]+)/g);
        const post = await Post.create({
            title : req.body.title,
            description : req.body.description,
            price : req.body.price,
            UserId : req.user.id,
        });

        if(hashtags) {
            const result = await Promise.all(hashtags.map((tag) => Hashtag.findOrCreate({
                where : { name : tag.slice(1).toLowerCase() }
            })));
            await post.addHashtags(result.map(v => v[0]));
        }

        if(req.body.image) {
            if(Array.isArray(req.body.image)) {
                const images = await Promise.all(req.body.image.map((image) => {
                    return Image.create({ src : image });
                }))
                await post.addImages(images);
            } else {
                const image = await Image.create({ src : req.body.image });
                await post.addImages(image)
            }
        }

        const fullPost = await Post.findOne({
            where : { id : post.id },
            include : [{
                model : Image,
            }, {
                model : Review,
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                }]
            }, {
                model : User,
                attributes : ['id', 'nickname'],
            }, {
                model : User,
                attributes : ['id'],
                as : 'Carts',
            }]
        })
        res.status(201).json(fullPost)
    } catch(err) {
        console.error(err);
        next(err)
    }
})




module.exports = router;
