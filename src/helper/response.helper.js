module.exports = {
    success: (res, data, status, message) => {
      res.json({
        code: 200,
        status,
        data,
        message,
      });
    },
  
    failed: (res, error, status, message) => {
      res.json({
        code: 500,
        status,
        data: null,
        message,
        error,
      });
    },
  
    succesWithToken: (res, data, status, message) => {
      res.json({
        status,
        data,
        message,
      });
    },
  };
  