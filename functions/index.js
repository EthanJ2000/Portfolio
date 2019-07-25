exports.sendEmail = functions.database.ref('/emails')
  .onWrite(event => {
    return sendEmail('ethan.jansen@younglings.africa');
  })