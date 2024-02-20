module.exports.fetchInfo = async (req, res) => {
  try {
    const admin = req?.user;
    console.log("d",admin);
    res.status(200).send(admin);
  } catch (e) {
    res.status(400).send(e);
  }
};
