export default function errorBarMiddleware(config = {}){
  return ( { dispatch }) => next => (action) => {
    return next(action);
  }
}
