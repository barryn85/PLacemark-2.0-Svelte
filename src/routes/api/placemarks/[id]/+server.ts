import { json }
  from "@sveltejs/kit";

import {
  placemarkStore
} from "$lib/models/mongo/placemark-store";

export async function DELETE(
  { params }
) {

  await placemarkStore
    .delete(
      params.id
    );

  return json({
    success: true
  });

}

export async function PUT(
  { request }
) {

  const placemark =
    await request.json();

  await placemarkStore
    .updatePlacemark(
      placemark
    );

  return json({
    success: true
  });

}