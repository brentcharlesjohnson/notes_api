module.exports = (sequelize, type) => {
    return sequelize.define('note', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: type.STRING,
        message: type.STRING,
        tags: type.STRING
    })
}