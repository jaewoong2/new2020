const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Post } = require('../models');
const user = require('../models/user');
const router = express.Router()


// 로그인확인 ( 및 유지)
router.get('/', async (req, res, next) => {
    try {
        if(req.user) {
            const fullUser = await User.findOne({
                where : { id : req.user.id },
                attributes : {
                    exclude : ['password'],
                },
                include : [{
                    model : Post
                }, {
                    model : Post,
                    as : 'Cart'
                }]
            });
            return res.status(200).json(fullUser)
        } else {
            res.status(200).json(null)
        }
    } catch(err) {
        console.error(err)
        next(err)
    }
})

//회원가입
router.post('/', async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where : {
                email : req.body.email,
            }
        });
        if(exUser) {
            return res.status(403).send('이미 사용중인 이메일 입니다.')
        }

        const secretPassword = await bcrypt.hash(req.body.password, 8);
        await User.create({
            email : req.body.email,
            password : secretPassword,
            nickname : req.body.nickname
        });
        res.status(200).send('회원가입 완료');
    } catch (err) {
        console.error(err)
        next(err)
    }
})


//로그인
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) {
            console.error(err)
            return next(err)
        }
        if(info) {
            return res.status(403).send(info.reason);
        }
        return req.login(user, async (loginErr) => {
            if(loginErr) {
                return next(loginErr);
            }
            const fullUser = await User.findOne({
                where : { id : user.id },
                attributes : {
                    exclude : ['password'],
                },
                include : [{
                    model : Post
                }, {
                    model : Post,
                    as : 'Carts'
                }]
            });
            return res.status(200).json(fullUser)
        });
    })(req, res, next);
});


//로그아웃 
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('로그아웃 성공');
});

//장바구니 담기
router.patch('/cart/:postId', async (req, res, next) => {
    try {
        const post = await Post.findOne({
            where : { id : req.params.postId }
        })
        if(!post) {
            return res.status(403).send('존재하지 않는 게시물 입니다');
        }
        await post.addCarts(req.user.id)
        res.status(200).json({ PostId : post.id, UserId : req.user.id })
    } catch {
        console.error(err);
        next(error)
    }
})






module.exports = router;
