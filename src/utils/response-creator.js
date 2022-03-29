module.exports = res => ({
  success: ({ status = 200, data = { success: true } } = {}) => res.status(status).json(data),
  fail: ({ status = 500, message = "Internal Server Error" } = {}) => res.status(status).json({ message }),
  notFound: ({ status = 404, message = "Data Not Found" } = {}) => res.status(status).json({ message }),
});
