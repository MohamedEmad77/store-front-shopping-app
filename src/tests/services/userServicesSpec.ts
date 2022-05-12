import { check_if_email_exists, signin, signup } from "../../services/userServices";
import {User} from '../../models/user';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


dotenv.config();
const saltRounds: string = process.env.SALT_ROUNDS || '';
const pepper: string = process.env.BCRYPT_PASSWORD || '';
const secret: string = process.env.TOKEN_SECRET || '';

describe("User Services tests", () => {


    it('check email should return true', () => {
      expect(check_if_email_exists('test3@test.com')).toBeTrue;
    });

    it('check email should return false', () => {
        expect(check_if_email_exists('test3@test.com')).toBeFalse;
    });    
  
    it('sign in should return truthy value', () => {
        expect(signin('test@test.com', '123456')).toBeTruthy;
    });

    it('sign in should return falsy value', () => {
        expect(signin('test33@test.com', '123456')).toBeFalsy;
    });

    it('sign in should return falsy value', () => {
        expect(signin('test@test.com', '12345jj6')).toBeFalsy;
    });

    it('sign in should return truthy value', () => {
        expect(signin('test2@test.com', '123456')).toBeTruthy;
    });

    it('sign up should return email already exist', async () => {
        const u: User = {
            firstName: 'false test',
            lastName: 'false test',
            email: 'test2@test.com',
            password: '123456',
          };
        expect(await signup(u)).toBe("Email already exist");
    });

    it('sign up should create user and return token', async () => {
        const u: User = {
            firstName: 'right test',
            lastName: 'right test',
            email: 'testright@test.com',
            password: '123456',
          };
          u.password = bcrypt.hashSync(
            u.password + pepper,
            parseInt(saltRounds)
          );
          const token : any = await signup(u);
          const decoded : any = jwt.verify(token, secret);  
        expect(decoded.user.id).toEqual(3);
    });    
  

  
  });