import type {
  PageServerLoad
} from "./$types";

import {
  placemarkStore
} from "$lib/models/mongo/placemark-store";

export const load:
  PageServerLoad =
  async () => {

    return {

      placemarks:
        JSON.parse(
          JSON.stringify(
            await placemarkStore.find()
          )
        ),

    };

};