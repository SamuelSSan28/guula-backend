const express = require('express');

const RecipeController = require('./controllers/RecipeController');

const {celebrate,Segments,Joi} = require('celebrate') 

const routes = express.Router(); 

routes.post('/recipes',celebrate({  //Cadastrar receitas
    [Segments.BODY] : Joi.object().keys({
        titulo:Joi.string().required(),
        categoria:Joi.string().required(),
        tempo_preparo:Joi.string().required(),
        rendimento:Joi.string().required(),
        ingredientes:Joi.string().required(),
        modo_preparo:Joi.string().required(),
        imagem:Joi.string().required()
    })}
    ),RecipeController.create);



routes.get('/recipes', celebrate({ 
        [Segments.QUERY]:{
            page: Joi.number().required()
        }
        }), RecipeController.index);


/*

routes.get('/recipes/category',celebrate({
    [Segments.BODY] : Joi.object().keys({
        categoria:Joi.string().required()
    })}
    ),RecipeController.recipe_by_category);
	
*/


routes.get('/recipes/ingredientes',RecipeController.recipe_by_ingredients); //Receitas por Ingredientes



routes.get('/recipes/id/:id',celebrate({     //Receita po ID
        [Segments.PARAMS] : Joi.object().keys({
            id:Joi.number().required(),
        })}), RecipeController.recipe_by_id);



module.exports = routes; //exportando as rotas
