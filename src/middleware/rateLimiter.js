import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        /*
         Aquí lo simplificamos. 
         En una aplicación real, te gustaría usar el ID de usuario o la dirección IP como clave.
        */
        const {success} = await ratelimit.limit('my-rate-limit')

        if(!success) {
            return res.status(429).json({
                message:'Demasiadas solicitudes, por favor intenta más tarde.'
            });
        }
        next();
    } catch (error) {
        console.log('Rate limit error', error);
        next(error);
    }
};

export default rateLimiter;