import {dbConnect} from "$lib/models/db";
import type {Handle} from "@sveltejs/kit";

await dbConnect();

export const handle:Handle = async ({event,resolve}) => {

    const user =
      event.cookies.get(
        "placemark-user"
      );

    if (user) {
      event.locals.user =
        JSON.parse(user);
    }

    return await resolve(
      event
    );

};