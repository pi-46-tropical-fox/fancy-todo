const {Todo} = require("../models")

class TodoController{
  static async getAllTodos(req,res, next){
    try{
      const UserId = req.userData.id
      let todosData = await Todo.findAll({where:{UserId}})
      return res.status(200).json(todosData)
    } catch (err) {
      next(err)
    }
  }
  
  static async getTodoById(req, res, next){
 
    
    try{
      const reqId = req.params.id
      let todoData = await Todo.findByPk(reqId)

      // if(todoData){
      return res.status(200).json(todoData)
      // }else {
      //   return res.status(404).json({message: "Data not found"})
      // }

    } catch (err){

      next(err)
      
    }
  }
  static async addDataTodos(req, res, next){

    try{
      const {title, description, status, due_date} = req.body
      const UserId = req.userData.id
      let todoData = await Todo.create({title, description, status, due_date, UserId})
      return res.status(201).json(todoData)
    } catch (err){

      // if (err.errors[0].type === 'Validation error'){
      //   return res.status(400).json({message: err.errors[0].message})
      // }else{
      // return res.status(500).json({message: err.message})
      // }
      next(err)
    }

  }

  static async editDataTodo (req, res, next){

    try{
      const reqId = req.params.id;
      const {title, description, status, due_date} = req.body
      const UserId = req.userData.id
      let todoData = await Todo.update(
        {title, description, status, due_date, UserId}, 
        {where : {id : reqId}}
      )
      return res.status(200).json(todoData)

    } catch (err){
      // if (err.errors[0].type === 'Validation error'){
      //   return res.status(400).json({message: err.errors[0].message})
      // }else{
      // return res.status(500).json({message: err.message})
      // }
      next(err)
    }
  }

  static async deleteDataTodo (req, res, next){

    try{
      const reqId = req.params.id
      let todoData = await Todo.findByPk(reqId)

      await Todo.destroy({where: {id : reqId}})
      return res.status(200).json(todoData)

    } catch (err){

      next()
      
    }
  }
}

module.exports=TodoController