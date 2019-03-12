
// remote TRADEWIN db
const port = process.env.PORT || 2020;
const host = '127.0.0.1';
const dbUrl = 'mongodb://ds163721.mlab.com:63721/rk_blog';
const authSource = 'rk_blog';
const dbUser = 'rkAdmin';
const dbPwd = 'ramki567';
const secretKay = 'Thisismysecretkeyforjwt'

module.exports = {
    PORT : port,
    HOST : host,
    DBURL : dbUrl,
    AUTHSRC : authSource,
    DBUSR : dbUser,
    DBPWD : dbPwd,
    SECRETKEY : secretKay,
}