const { StatusCodes } = require('http-status-codes');

const info = (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        msg: "ok",
        data: {
            name: "Nodejs API",
            version: "1.0.0",
            description: "This is a sample Node.js API"
        }
    });
};

module.exports = {
    info
};
