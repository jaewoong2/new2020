const express = require('express');
const { User, Post, Hashtag, Image, Review } = require('../models');
const { response } = require('express');
const { isLoggedIn } = require('./middleware');
const router = express.Router()
const multer = require('multer');
const fs = require('fs');
const path = require('path');

try {
    fs.accessSync('uploads');
} catch (err) {
    console.log('폴더 생성...');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done) {
            done(null, 'uploads') // 업로드 파일에 저장
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname); // 확장자
            const basename = path.basename(file.originalname, ext);
            done(null, basename + '_' + new Date().getTime() + ext)
        },
    }),
    limits : { fileSize : 20 * 1024 * 1024} // 20mb
})


router.post('/', isLoggedIn, upload.none(),async(req, res, next) => {
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
            await post.addPostHashTags(result.map(v => v[0]));
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
            }, {
                model : Hashtag,
                as : 'PostHashTags'
            }]
        })
        res.status(201).json(fullPost)
    } catch(err) {
        console.error(err);
        next(err)
    }
})

router.post('/images', isLoggedIn, upload.array('image'), (req, res, next) => {
    console.log(req.files)
    res.json(req.files.map(v => v.filename));
})

router.get('/:postId', async (req, res, next) => { // 홈페이지 확인
    try {
        const post = await Post.findOne({
            where : {id : req.params.postId},
            include : [{
                model : Image
            }, {
                model : Review,
                include : [{
                    model : User,
                    attributes : ['id', 'nickname'],
                }]
            }, {
                model : Hashtag,
                as : 'PostHashTags'
            }, { 
                model : User,
                attributes : {
                    exclude : ["password"]
                }
            }, {
                model : User,
                as : 'Carts',
                attributes : {
                    exclude : ['password'],
                }
            },]
        });
        if(!post) {
            return res.status(403).send('게시글이 존재 하지 않습니다.')
        }
        res.status(201).json(post)
    } catch (err) {
        console.error(err)
        next(err)
    }
})


router.delete('/:postId', isLoggedIn ,async (req, res, next) => {
    try {
        const post =  await Post.findOne({
            where : { id : req.params.postId }
        })
        if(!post) {
            return res.status(403).send('게시글이 존재 하지 않습니다.')
        }
        
        await Post.destroy({
            where : {
                id : req.params.postId,
                UserId : req.user.id,
            },
        });
        res.json({PostId : parseInt(req.params.postId, 10)})
    } catch(err) {
        console.error(err)
        next(err)
    }
})




module.exports = router;
