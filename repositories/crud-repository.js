const{Logger} = require('../config')

class CrudRepository{
    constructor(model) {
        this.model = model;
    }

    
    async create(data) {
            const newData = await this.model.create(data);
            return newData;
        
    }

    async destroy(data){
        try{
            const result = await this.model.destroy({
                where: data
            });
            return result;
        }
        catch(error){
            Logger.error('Error deleting data: ', error);
            throw new Error('Error deleting data: ' + error.message);
        }
    }

    async get(data) {
        try {
            const result = await this.model.findAll({
                where: data
            });
            return result;
        } catch (error) {
            Logger.error('Error fetching data: ', error);
            throw new Error('Error fetching data: ' + error.message);
        }
    }

    async update(data, condition) {
    try {
        const result = await this.model.update(data, {
            where: condition
        });
        return result;
    } catch (error) {
        Logger.error('Error updating data: ', error);
        throw new Error('Error updating data: ' + error.message);
    }
}


    async getAll() {
        try {
            const result = await this.model.findAll();
            return result;
        } catch (error) {
            Logger.error('Error fetching all data: ', error);
            throw new Error('Error fetching all data: ' + error.message);
        }
    }

    async findByPk(id) {
        try {
            const result = await this.model.findByPk(id);
            return result;
        } catch (error) {
            Logger.error('Error fetching data by PK: ', error);
            throw new Error('Error fetching data by PK: ' + error.message);
        }
    }   
}

module.exports = CrudRepository;