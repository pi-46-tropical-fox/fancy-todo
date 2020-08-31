const {Todo} = require("../models")

class TodoController{
  static async getAllTodos(req,res){
    try{
      let todosData = await Todo.findAll()
      return res.status(200).json(todosData)
    } catch (err) {
      return res.status(500).json({message: err.message})
    }
  }
  
  static async getTodoById(req, res){
    const reqId = req.params.id
 
    
    try{
      let todoData = await Todo.findByPk(reqId)

      if(todoData){
        return res.status(200).json(todoData)
      }else {
        return res.status(404).json({message: "Data not found"})
      }

    } catch (err){

      return res.status(500).json({message: err.message})
      
    }
  }
  static async addDataTodos(req, res){
    const {title, description, status, due_date} = req.body

    try{
      await Todo.create({title, description, status, due_date})
      return res.status(201).json({title, description, status, due_date})
    } catch (err){

      if (err.errors[0].type === 'Validation error'){
        return res.status(400).json({message: err.errors[0].message})
      }else{
      return res.status(500).json({message: err.message})
      }
    }

  }

  static async editDataTodo (req, res){
    const reqId = req.params.id;
    const {title, description, status, due_date} = req.body
    try{
      await Todo.update(
        {title, description, status, due_date}, 
        {where : {id : reqId}}
      )
      let todoData = await Todo.findByPk(reqId)
      if(todoData){
        return res.status(200).json(todoData)
      }else {
        return res.status(404).json({message: "Data not found"})
      }
    } catch (err){
      if (err.errors[0].type === 'Validation error'){
        return res.status(400).json({message: err.errors[0].message})
      }else{
      return res.status(500).json({message: err.message})
      }
    }
  }

  static async deleteDataTodo (req, res){
    const reqId = req.params.id

    try{
      let todoData = await Todo.findByPk(reqId)

      if(todoData){
        await Todo.destroy({where: {id : reqId}})
        return res.status(200).json(todoData)
      }else {
        return res.status(404).json({message: "Data not found"})
      }
      
    } catch (err){

      return res.status(500).json({message: err.message})
      
    }
  }
}

module.exports=TodoController