export const placemarkService = {

  async getPlacemarks() {

    const response =
      await fetch(
        "/api/placemarks"
      );

    return await response
      .json();

  },

  async addPlacemark(
    placemark: any
  ) {

    const response =
      await fetch(
        "/api/placemarks",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              placemark
            ),
        }
      );

    return await response
      .json();

  },

  async deletePlacemark(
    id: string
  ) {

    await fetch(
      `/api/placemarks/${id}`,
      {
        method: "DELETE",
      }
    );

  },

  async updatePlacemark(
    placemark: any
  ) {

    await fetch(
      `/api/placemarks/${placemark._id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            placemark
          ),
      }
    );

  },

};