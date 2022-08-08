import Hall from "../Models/Hall.js"

class AdminController {
    async gethalls(req,res){
        try {
            const halls= await Hall.findAll()
            res.json(halls)
        } catch (error) {
            console.log(e);
        }
    }
    
    
}


export default new AdminController()