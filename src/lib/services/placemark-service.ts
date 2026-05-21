import axios from "axios";

import { loggedInUser }
  from "$lib/runes.svelte";

const baseUrl =
  "http://localhost:3000";

export const placemarkService = {

  async getPlacemarks() {

    const response =
      await axios.get(
        `${baseUrl}/api/placemarks/user/${loggedInUser._id}`
      );

    return response.data;

  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async addPlacemark(
    placemark: any
  ) {

    const response =
      await axios.post(
        `${baseUrl}/api/placemarks`,
        placemark
      );

    return response.data;

  },

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
async updatePlacemark(
  placemark: any
) {

  await axios.put(
    `${baseUrl}/api/placemarks/${placemark._id}`,
    placemark
  );

},

  async deletePlacemark(
    id: string
  ) {

    await axios.delete(
      `${baseUrl}/api/placemarks/${id}`
    );

  },

};