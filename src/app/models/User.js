import { Model, Sequelize } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model{
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            passwordHash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        }, 
        {
            sequelize,
        });

        this.addHook('beforeSave', async user => {
            if(User.password) {
                User.passwordHash = await bcrypt.hash (User.password, 10)
            }
        })
        return this;
    }

    checkPassword(password){
        return bcrypt.compare(password, this.passwordHash)
    }
}

export default User;