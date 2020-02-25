// console.log('hello world');

var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://na174.force.com'
});
const username = 'emmalozhkin@uwblueprint.org';
const password = 'uwbp2019twnNYt189jrCqldineseIEcrb';

conn.login(username, password, function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  // ...
  // Single record creation
  // conn.sobject("Test__c").create({ Name : 'My Account #1', Email__c: 'test@tests.com' }, function(err, ret) {
  //   if (err || !ret.success) { return console.error(err, ret); }
  //   console.log("Created record id : " + ret.id);
  //   // ...
  // });

  // GET QUERY
  // var records = [];
  // conn.query("SELECT Name,Email__c FROM Test__c", function(err, result) {
  //   if (err) { return console.error(err); }
  //   console.log("total : " + result.totalSize);
  //   console.log("fetched : " + result.records.length);
  //   console.log(result.records);
  // });

  // POST QUERY


});


// conn.logout(function(err) {
//   if (err) { return console.error(err); }
//   // now the session has been expired.
// });
