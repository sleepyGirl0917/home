module.exports = (req,res)=>{
  // res.send(req.params)
  if (req.params.pro == 'zd') {
    res.redirect(301, 'http://www.xujing917.xyz:3001')
  } else if (req.params.pro == 'xcf') {
    res.redirect(301, 'http://www.xujing917.xyz:3002')
  }
}