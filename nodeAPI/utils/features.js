import jwt from 'jsonwebtoken';

export const sendCookie = (user, res, message, statusCode = 200) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res.status(statusCode).cookie('token', token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,

        // same site ma 3 concepts ave => none,strict, lax
        // lax means biji site mathi backend access thai sake and cookie send thay jo secure:true and samesite:lax to

        //jo strict to e j site ma hova joiye , tame biji site ma hoy and link visit karine jaav to na thay means cookie send na thay

        // jo sameSite none and secure true to backend access thay and cookie send thay frontend ma but only if jo  secure:true hoy to 

        //tethi postman ma cookie send nai thay tena mate aapde ek NODE_ENV use kariye jema development hase to secure:false rese jethi cookie postman ma send thay 
        sameSite: process.env.NODE_ENV === "Development" ?
            "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        message,
    })
}