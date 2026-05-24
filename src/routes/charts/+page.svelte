<script lang="ts">

  import Chart from "svelte-frappe-charts";

  let { data } =
    $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let placemarks: any[] =
    data.placemarks;

  let attendanceData = {

    labels: [] as string[],

    datasets: [
      {
        values: [] as number[],
      },
    ],

  };

  let categoryData = {

    labels: [] as string[],

    datasets: [
      {
        values: [] as number[],
      },
    ],

  };

  placemarks.forEach(

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (placemark: any) => {

      attendanceData.labels.push(
        placemark.name
      );

      attendanceData.datasets[0]
        .values.push(
          Number(
            placemark.attendance
          )
        );

    }

  );

  const categoryTotals:
    Record<string, number> = {};

  placemarks.forEach(

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (placemark: any) => {

      if (
        categoryTotals[
          placemark.category
        ]
      ) {

        categoryTotals[
          placemark.category
        ] += 1;

      } else {

        categoryTotals[
          placemark.category
        ] = 1;

      }

    }

  );

  Object.keys(
    categoryTotals
  ).forEach((category) => {

    categoryData.labels.push(
      category
    );

    categoryData.datasets[0]
      .values.push(
        categoryTotals[
          category
        ]
      );

  });

</script>