const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://bhadrastores.herokuapp.com/"
    : "http://localhost:" + process.env.PORT;

export default baseUrl;
