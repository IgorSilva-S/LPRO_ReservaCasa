/*
    index (listAll): Listagem de seções;
    store (add): Criar uma seção;
    show (list): Quando queremos listar uma ÚNICA seção;
    update: Quando queremos alterar uma seção;
    destroy (delete): Quando queremos deletar uma seção
*/

import User from '../models/User'
import * as Yup from 'yup'

class SectionController {
    async store(req, res){
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),

        })
        const { email } = req.body
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação'})
        }
        let user = await User.findOne({ email })
        if (!user) {
            user = await User.create({ email })
        }
        return res.json(user)
    }
}

export default new SectionController()