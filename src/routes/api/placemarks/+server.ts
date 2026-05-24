import { json } from "@sveltejs/kit";

import { placemarkStore} from "$lib/models/mongo/placemark-store";

export async function GET() {

  const placemarks =
    await placemarkStore.find();

  return json(
    placemarks
  );

}

export async function POST(
  { request }
) {

  const placemark =
    await request.json();

  const newPlacemark =
    await placemarkStore.add(
      placemark
    );

  return json(
    newPlacemark
  );

}