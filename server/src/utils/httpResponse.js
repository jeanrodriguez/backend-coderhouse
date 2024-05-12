// Reusable function to send a JSON response with a status code
export function sendOkResponse(res, data) {
  res.status(200).json({ status: "success", data: data });
}

export function sendNotFoundResponse(res) {
  res.status(404).json({ status: "Not found", data: null });
}
export function sendServerErrorResponse(res, error) {
  res.status(500).json({ status: "error", data: `server error: ${error}` });
}
