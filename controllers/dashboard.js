import path from 'path';

export const getDashboard = function(req, res){
        res.render(path.resolve('./views/dashboard.ejs'));
}