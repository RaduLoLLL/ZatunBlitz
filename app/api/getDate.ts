export default function getDate(req, res) {
  res.status(200).json({ date: new Date() })
}
