const app = require('./app')

//look if the port 5000 server is initialized
app.listen(5000, () => {
  console.log("Server running on port 5000");
});