var express = require('express');
var express_graphql = require('express-graphql').graphqlHTTP;
var { buildSchema } = require('graphql');
var mysql = require('mysql');
var fs = require('fs')

var schema = buildSchema(`
	type Query {
		idol(name: String!): Idol
	},
	type Idol {
		name: String
		label: String
		producer: String
		birth: Int
		member: Int
    song: String
	}
`);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hoge',
    password: 'fuga',
    database: 'foo'
  });
  connection.query(
    'SELECT * FROM idols',
    (error, results) => {
      var object = JSON.parse(JSON.stringify(results));
      fs.writeFile('idol.json', JSON.stringify(object), function(err, result){
        if(err) console.log('error', err);
      });
    }
);

var getIdol = function(args){

	var name = args.name;
  const jsonObject = JSON.parse(fs.readFileSync('idol.json', 'utf8'));

  return jsonObject.filter(idol => {
      return idol.name == name;
  })[0];
}
var root = {
	idol: getIdol
};

var app = express();
app.use('/graphql', express_graphql({
 schema: schema,
 rootValue: root,
 graphiql: true
}));
app.listen(8000, () => console.log('Express GraphQL Server Now Running On 192.168.34.10:8000/graphql'))