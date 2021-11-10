import path from 'path';

export const getHome = function(req, res){
        res.render(path.resolve('./views/home.ejs'));
}