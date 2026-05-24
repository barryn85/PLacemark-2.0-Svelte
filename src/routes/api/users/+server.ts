import { json }
  from "@sveltejs/kit";

import {
  userStore
} from "$lib/models/mongo/user-store";

export async function POST(
  { request }
) {

  const user =
    await request.json();

  const newUser =
    await userStore.add(
      user
    );

  return json(
    newUser
  );

}