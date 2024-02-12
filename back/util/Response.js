class Response{
    constructor(success, message, data){
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
function success(data){
    return new Response(true, null, data);
}
function error(message){
    return new Response(false, message, null);
}

module.exports = {
    success,
    error
}