function errHandler(err, req, res, next) {
  console.log(err.errors, `>>>>>>> Menampilkan hasil error yang muncul`);
  console.log(err, `>>>>>>> Menampilkan hasil error yang muncul`);

  let statusCode = 500;
  let errors = [];

  switch (err.name) {
    case "SequelizeValidationError":
      err.errors.forEach((el) => {
        errors.push(el.message);
      });
      statusCode = 400;
      break;

    case "JsonWebTokenError":
      errors.push(`User not authenticated`);
      statusCode = 401;
      break;

    default:
      errors.push(err.message);
      statusCode = err.statusCode || 500;
      break;
  }

  res.status(statusCode).json({ errors });
}

module.exports = errHandler;
