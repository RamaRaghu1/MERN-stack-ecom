class ApiResponse{
    constructor(statusCode, data, mesaage="success"){
        this.statusCode=statusCode
        this.data=data
        this.mesaage=mesaage
        this.success=statusCode<400 //will return true only if the statuscode is less than 400 
    }
}