const crypto = require('crypto');
const connection = require ('../database/connection');
const utf8 = require('utf8');

module.exports = {
    async create(request, response) { 
        const { titulo, ingredientes, modo_preparo, tempo_preparo, rendimento,categoria,imagem} = request.body; 

        await connection('receitas').insert({
          titulo,
          ingredientes, 
          modo_preparo, 
          tempo_preparo, 
          rendimento,
          categoria,
          imagem
        })
    
        return response.json({ titulo });
      },

      async index(request, response) {
        const [count] = await connection('receitas').count();
        const {page = 1} = request.query;
        const receitas = await connection('receitas')
          .limit(10)
          .offset((page-1) * 10)
          .select('*');
        response.header("Total_Receitas",count["count(*)"])
        return response.json(receitas);
      },
	  
	    async recipe_by_category(request, response) {
        var { categoria} = request.body;

        const usuarios = await connection('receitas').where("categoria","=",categoria).select('*');
        const [count] = await connection('receitas').where("categoria","=",categoria).count();

        response.header("Total_Receitas_by_Cetegoria",count["count(*)"])
        return response.json(usuarios);
      },

      async recipe_random(request, response) {
        var list_ids = [];
        const { quant } = request.params;
        var receita = ""
        var receitas = []

        console.log(quant)

        while(list_ids.length < quant){
            var random_id = Math.floor((Math.random() * 7000)+ 1)
            console.log((Math.random() * 100)+ 1)

            if(list_ids.indexOf(random_id) == -1 ){
              list_ids.push(random_id)
              receita = await connection('receitas').where("id","=",random_id).select('*');
              receitas.push(receita[0])
            }
        }

        return response.json(receitas);
      },

      async recipe_by_id(request, response) {
        const { id } = request.params;

        const receita = await connection('receitas').where("id","=",id).select('*').first()

        if(!receita){
          return response.json({"status":false});
        }

        return response.json({"status":true});
      },

      async recipe_by_ingredients(request, response) {
        const decode = { 
        '2': 'ã',
        '3': 'ç',
        '4': 'õ',
        '5': 'á',
        '6': 'é',
        '7': 'í',
        '8': 'ó',
        '9': 'ú',
        '10': 'â',
        '11': 'ê',
        '12': 'î',
        '13': 'ô',
        '14': 'û'
        }

        var { ingredientes} = request.headers;

        var lista_ingredientes = ingredientes.split(" ");
        
        var lista_ingredientes_decode = []

        for(var i = 0; i < lista_ingredientes.length; i++){
          var ingrid = ""
          for(var j = 0; j < lista_ingredientes[i].length; j++){
            if(Object.keys(decode).includes(lista_ingredientes[i][j])){
              ingrid += decode[lista_ingredientes[i][j]]
            }
            else{
              ingrid += lista_ingredientes[i][j]
            }
          }
          lista_ingredientes_decode.push(ingrid)
        }

        console.log(lista_ingredientes_decode)

        var query = "SELECT * FROM receitas WHERE ingredientes LIKE "+"'%"+lista_ingredientes_decode[0]+"%'";

        for(var i = 1; i < lista_ingredientes_decode.length; i++){
          query += " and ingredientes LIKE "+"'%"+lista_ingredientes_decode[i]+"%'"
        }

        console.log(ingredientes)
        console.log(query)
        var receitas_encontradas = await connection.raw(query);
        var count = Object.keys(receitas_encontradas).length;
        
        response.header("Total_Receitas_by_Ingredientes",count)
        response.header("Ingredientes",ingredientes)
        response.header("Query",query)
        return response.json(receitas_encontradas);
      },
      async recipe_ids(request, response) {
        const { ids } = request.params;
        
        const i = (ids.split(',')).map(id => {
          return Number(id);
        })
        const receitas = await connection('receitas').whereIn('id', i).select('*');

        return response.json(receitas)
      },
}