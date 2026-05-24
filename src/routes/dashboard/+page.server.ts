import {redirect} from "@sveltejs/kit";
import type {PageServerLoad} from "./$types";
import {placemarkStore} from "$lib/models/mongo/placemark-store";

export const load:
  PageServerLoad =
  async ({ locals }) => {
    if (!locals.user) {
      throw redirect(
        302,
        "/login"
      );
    }

    return {
      placemarks:
        JSON.parse(
          JSON.stringify(
            await placemarkStore
              .find()
          )
        ),

    };

};