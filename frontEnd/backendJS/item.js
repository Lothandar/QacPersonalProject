import { Model } from "sequelize/types"
import { REPL_MODE_SLOPPY } from "repl"

router.post('', async (req, res)=> {
    try{
        await models.Item.create(req.body);
        res.send();
    } catch (exc){
        console.log(exc)
    }
});