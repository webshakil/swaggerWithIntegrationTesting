import bcrypt from 'bcrypt'
import {expect, jest} from '@jest/globals';
import User from '../models/user'
import {register} from '../controllers/auth'
const mockRequest =()=>{
    return{
        body:{
            name: 'Test User',
            email: 'test@gmail.com',
            password:"123456"
        }
    }
}
const mockResponse =()=>{
    return{
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
}
}
const mockUser ={
    _id:"6506f2f018e5227a5e143fb2",
    name:"Test User",
    email:"test@gamil.com",
    password:"hashPassword"
}

describe('register user',()=>{
    it('Should register user', async()=>{
        jest.spyOn(bcrypt,'hash').mockResolvedValueOnce("hashPassword")
        jest.spyOn(User,"create").mockResolvedValueOnce(mockUser)

        const mockReq= mockRequest();
        const mockRes= mockResponse()

        await register(mockReq, mockRes)
        // expect(mockRes.status).toHaveBeenCalledWith(201);
        // expect(bcrypt.hash).toHaveBeenLastCalledWith("123456",10)


    })
})