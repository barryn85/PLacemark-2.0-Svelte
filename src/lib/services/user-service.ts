import type {Session,User} from "$lib/types/concert-types";

import {loggedInUser} from "$lib/runes.svelte";

export const userService = {

  async signup(
    user: User
  ): Promise<boolean> {

    try {

      const response =
        await fetch(
          "/api/users",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                user
              ),
          }
        );

      return response.ok;

    } catch (error) {

      console.log(error);

      return false;

    }

  },

  saveSession(
    session: Session,
    email: string
  ) {

    loggedInUser.email =
      email;

    loggedInUser.name =
      session.name;

    loggedInUser.token =
      session.token;

    loggedInUser._id =
      session._id;

    localStorage.user =
      JSON.stringify(
        loggedInUser
      );

  },

  restoreSession() {

    const savedUser =
      localStorage.user;

    if (savedUser) {

      const session =
        JSON.parse(savedUser);

      loggedInUser.email =
        session.email;

      loggedInUser.name =
        session.name;

      loggedInUser.token =
        session.token;

      loggedInUser._id =
        session._id;

    }

  },

  async login(
    email: string,
    password: string
  ): Promise<Session | null> {

    try {

      const response =
        await fetch(
          "/api/users/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                email,
                password,
              }),
          }
        );

      const data =
        await response.json();

      if (data.success) {

        const session:
          Session = {

          name:
            `${data.user.firstName} ${data.user.lastName}`,

          token:
            data.user._id,

          _id:
            data.user._id,

          email:
            data.user.email,

        };

        this.saveSession(
          session,
          email
        );

        return session;

      }

      return null;

    } catch (error) {

      console.log(error);

      return null;

    }

  },

 clearSession() {

  loggedInUser.email =
    "";

  loggedInUser.name =
    "";

  loggedInUser.token =
    "";

  loggedInUser._id =
    "";

  localStorage.removeItem(
    "user"
  );
 },

};
