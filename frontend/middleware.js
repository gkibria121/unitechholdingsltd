import { NextResponse } from "next/server" 
export default function middleware(request) { 

    const user =  request.cookies.get('user');
   
    
    if(!user){   
        return NextResponse.redirect(new URL('/login', request.url))
       
        
    }
    return NextResponse.next();
    
    
    
}


export const config = {
    matcher: ['/dashboard/:path*'],  
  };