function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    //short validation
    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: 'Signed up! Your email is: ' + userEmail });
  }
}

export default handler;
