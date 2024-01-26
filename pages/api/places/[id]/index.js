import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  try {
    const { id } = request.query;

    if (request.method === "GET") {
      const place = await Place.findById(id);

      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }
      response.status(200).json(place);
    } else if (request.method === "PUT") {
      const placeData = request.body;
      await Place.findByIdAndUpdate(id, placeData);
      return response.status(200).json({ status: `Place ${id} updated!` });
    } else {
      response
        .status(405)
        .json({ status: "error", message: "Method not allowed" });
    }
  } catch (error) {
    response.status(500).json({
      status: error,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
