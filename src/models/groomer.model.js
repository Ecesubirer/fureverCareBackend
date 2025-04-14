const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Groomer = sequelize.define('Groomer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  taxNumber: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  }
}, {
  hooks: {
    beforeSave: async (groomer) => {
      if (groomer.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        groomer.password = await bcrypt.hash(groomer.password, salt);
      }
    }
  }
});

Groomer.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = Groomer; 