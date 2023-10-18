import express from 'express'
const rotas = express.Router();
import User from './model/User.js'

rotas.route('/add').post((req, res) => {
    let user = new User(req.body);
    user.save().then(user => {
        res.status(200).json({ 'status': 'sucess', 'mssg': 'User added', 'dados': user })
    }).catch(err => {
        res.status(409).send({ 'status': 'failure', 'mssg': 'An erro ocurred' })
    })
})

rotas.route('/').get(async (req, res) => {
    await User.find({  }).exec().then((dados) => {
        res.status(200).json({ 'status': 'sucess', 'mssg': dados })
    }).catch((err, dados) => {
        res.status(400).send({ 'status': 'error', 'mssg': err, 'error': dados })
    })
});

rotas.route('/user/:id').get(async (req, res) => {
    let id = req.params.id;

        await User.findById(id).exec().then((user) => {
            res.status(200).json({ 'status': 'success', 'user': user });
        }).catch((err) => {
            res.status(400).send({ 'status': 'failure', 'mssg': err })
        })
})

rotas.route('/update/:id').put( async (req, res) => {
   await User.findById(req.params.id).exec().then((user) => {
        if (user) {
            user.name = req.body.name;
            user.password = req.body.password;
            user.email = req.body.email;

            user.save().then(datas => {
                res.status(200).json({ 'status': 'sucess', 'mssg': 'data updated' })
            })
        } else {
            res.status(400).send({ 'status': 'failed', 'mssg': "can't update the data" })
        }
    })
})

rotas.route('/delete/:id').delete((req, res) => {
    User.findByIdAndRemove({ _id: req.params.id }).exec().then((data) => {
        if (data) {
            res.status(200).json({ 'status': 'sucess', 'mssg': 'Account deleted' })
        } else {
            res.status(400).send({ 'status': 'error', 'mssg': "can't delete the account" })
        }
    })
})

export default rotas;