import Reserve from '../models/Reserve'
import User from '../models/User'
import House from '../models/House'

class ReserveController{
    async index(req, res){
        const { user_id } = req.headers;

        const reserves = await Reserve.find({ user: user_id }).populate('house');

        return res.json(reserves)
    }

    async store(req, res){
        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house = await House.findById(house_id)
        if (!house) {
            return res.status(400).json( { error: 'Essa casa não existe.' } )
        }

        if (house.status !== true){
            return res.status(400).json( { error: 'Solicitação Indisponível.' }  )
        }
    }

    async destroy(req, res){
        const { reserve_id } = req.body;

        await Reserve.findByIdAndDelete({ _id: reserve_id })

        return res.send();
    }
}

export default new ReserveController()