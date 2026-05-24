import axios from "axios";
import type { Session, User, } from "$lib/types/concert-types";
import { loggedInUser } from "$lib/runes.svelte";

export const userService = {

  baseUrl:
    "http://localhost:3000",

  async signup(
    user: User
  ): Promise<boolean> {

    try {

      const response =
        await axios.post(
          `${this.baseUrl}/api/users`,
          user
        );

      return response.data;

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
        await axios.post(
          `${this.baseUrl}/api/users/authenticate`,
          {
            email,
            password,
          }
        );

      const session: Session = {

        name:
          response.data.firstName,

        token: "loggedin",

        _id:
          response.data._id,

      };

      this.saveSession(
        session,
        email
      );

      return session;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

      console.log(
        error.response?.data
      );

      return null;

    }

  },

  clearSession() {

  localStorage.removeItem(
    "user"
  );

},

};