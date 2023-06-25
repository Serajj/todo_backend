export const jsonResponse = (status , message , data , responseCode = 200)=>{
    return {"status":status , "message" : message , "data" : data , "code" : responseCode}
}