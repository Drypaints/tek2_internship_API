

export const hello =  ({ body, params }, res, next) => {
    res.status(200).json('Hello World')
}
