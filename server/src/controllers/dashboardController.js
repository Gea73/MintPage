import path from "node:path";


const __dirname = import.meta.dirname;

const dashboardController = async (req,res)=>{
    
 res.sendFile(path.join(__dirname,"../../../client/private/dashboard.html"));
}

export  {dashboardController};