var promise = require('bluebird');
var knex = require('knex')
// var options = {
//   promiseLib: promise
// };

// var pg = require('knex')(options);
var connectionString = process.env.DATABASE_URL
// var db = pgp(connectionString);

var query = "SELECT login, similarity(login, $1) AS sml FROM users WHERE login % $1 ORDER BY sml DESC, login LIMIT 12"
// add query functions
// var getSuggestedUsernames = (req, res, next) => {
//   var partialLogin = req.params.partialLogin
//   db.many(query, partialLogin)
//     .then((data) => {
//       res.status(200)
//         .json({
//           status: 'success',
//           data,
//         });
//     })
// }

const suggestedUsernames = partialLogin => (
  knex('users')
    .select(knex.raw('login, similarity(login, ?) AS sml', [partialLogin]))
    .where(knex.raw('login % ?', [partialLogin]))
    .orderBy('sml', 'desc', 'login')
    .limit(12)
)

module.exports = {
  suggestedUsernames: suggestedUsernames
};
