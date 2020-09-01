module.exports = {
    throwUnauthenticated: (res, reason) => res.status(401).json({ msg: `Unauthenticated. Reason: ${reason}` }),
    throwUnauthorized: (res, reason) => res.status(403).json({ msg: `Unauthorized. Reason: ${reason}` }),
    throwServerError: (res, err) => {
        console.log(err)
        
        return res.status(500).json({ msg: 'Oops! A server error has occurred. We have recorded the accident, though.' })
    }
}