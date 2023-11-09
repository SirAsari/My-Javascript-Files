

const responseNotFound = (res) => {
    res.status(494).json({
        success: false,
        message: 'Not Found'
    })
}

const responseSuccess = (res, result, message) => {
    res.status(200).json({
        success: true,
        data: result,
        message: message
    })
}

module.exports = {
    responseNotFound,
    responseSuccess
}
