import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated (
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Receive token
    const authToken = request.headers.authorization;
     
    // Validate that the token is filled
    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        // Validate if token is valid 
        const { sub } = verify(
            token, 
            "7e143fa3408f441400be84f44b072faa"
        ) as IPayload;
        
        // Retrieve user information
        request.user_id = sub;

        return next(); 
    } catch (err) {
        return response.status(401).end();
    }
   
}