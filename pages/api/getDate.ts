import { api } from "app/blitz-server";
export default api(function getDate(req, res) {
  res.status(200).json({ date: new Date() })
});
