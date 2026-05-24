import { json } from "@sveltejs/kit";

import {userStore} from "$lib/models/mongo/user-store";

export async function POST(
  { request, cookies }
) {

  const {
    email,
    password
  } = await request.json();

  const user =
    await userStore.findBy(
      email
    );

  if (
    user &&
    user.password === password
  ) {

    const session = {

      _id:
        user._id,
      firstName:
        user.firstName,
      lastName:
        user.lastName,
      email:
        user.email,
    };

    cookies.set(
      "placemark-user",
      JSON.stringify(
        session
      ),

      {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      }

    );

    return json({
      success: true,
      user: session,
    });

  }

  return json({
    success: false,
  });

}