exports.code = {
    SUCCESS: 200,
    PARAM_ERROR: 1
};

exports.msgWrapper = (code, data, err) => {
    return {
        code,
        data,
        err
    }
};
