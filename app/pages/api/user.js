const handler = (req, res) => {
    if (false) {
      res.status(401).json('Denied poto')
    } else {
      res.status(200).json({
        username: 'Sauce God',
        email: 'saucegod@epson.com'
      })
    }
  }
  
  export default handler;