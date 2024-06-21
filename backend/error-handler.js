exports.handleErrors = (err, request, response, next) => {
    if(err.status && err.msg){
      response.status(err.status).send({msg: err.msg})
    };
    next(err);
  };