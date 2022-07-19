const db= require("../db")
const bcrypt = require("bcrypt")
const {BCRYPT_WORK_FACTOR} = require("../config")
const {BadRequestError,UnauthorizedError } = require("../utils/errors");

class Recipe{
    static async showRecipe(recipe){
        return{
            id:recipe.id,
            name:recipe.name,
            created_at:recipe.created_at

        }
    }
    static async createRecipe(recipefact){
        const requiredFields=["name","category","ingredients","instructions", "user_id", "calories", "image_url", "description"]
        requiredFields.forEach(field =>{
            if(!recipefact.hasOwnProperty(field)){
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        const result = await db.query(`
        INSERT INTO recipe (
            name,
            category,
            description,
            instructions,
            ingredients,
            calories,
            image_url,
            user_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id, name, category,description, instructions, ingredients, calories, image_url, user_id,created_at, updated_at;
    `,
    [recipefact.name, recipefact.category, recipefact.description, recipefact.instructions,recipefact.ingredients, recipefact.calories,recipefact.image_url, recipefact.user_id]
    )

        return result.rows[0]

        


    }

    static async deleteRecipe(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("DELETE FROM recipe WHERE id = $1;", [id])

        return "Successfully deleted recipe"
    }


    static async fetchRecipeById(id) {
        
        if (!id) {
            throw new BadRequestError(`Missing ${field} in request body.`)
        } 
        
        const result = await db.query("SELECT * FROM recipe WHERE id = $1;", [id])
    
        return result.rows[0]
    }

    static async fetchAllRecipesByUserId(user_id) {
        if (!user_id) {
            throw new BadRequestError("No user_id provided")
        }

        const query = `SELECT * FROM recipe WHERE user_id = $1`

        const results = await db.query(query, [user_id])
        console.log(results.rows)
        return results.rows
    }
}

module.exports=Recipe