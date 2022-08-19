const dynamoose = require('dynamoose');
require('dotenv').config()

dynamoose.aws.sdk.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

function create(model, data) {
    try {
        return model.create(data);
    } catch (err) {
        return `Error: ${err}`
    }
}

function getAll(model) {
    try {
        return model.scan().exec();
    } catch (err) {
        return `Error: ${err}`
    }
}

function getOne(model, id) {
    try {
        return model.get(id);
    } catch (err) {
        return `Error: ${err}`
    }

}

function searchBy(model, data) {
    try {
        return model.scan(data.key).eq(data.value).exec();
    } catch (err) {
        return `Error: ${err}`
    }

}

function update(model, id, data) {
    try {
        return model.update({ id }, { ...data });
    } catch (err) {
        return `Error: ${err}`
    }
}

function destroy(model, id) {
    const result = model.delete({ id }).then(() => {
        return 'Success Deleted!'
    }).catch((err) => {
        return `Error: ${err}`
    })

    return result
}

module.exports = {
    create,
    getAll,
    getOne,
    searchBy,
    update,
    destroy
}