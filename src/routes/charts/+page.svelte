<script lang="ts">

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  import Chart
    from "svelte-frappe-charts";

  let { data } =
    $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let placemarks: any[] =
    data.placemarks;

  let attendanceData =
    $state({

      labels:
        [] as string[],

      datasets: [
        {
          values:
            [] as number[],
        },
      ],

    });

  let categoryData =
    $state({

      labels:
        [] as string[],

      datasets: [
        {
          values:
            [] as number[],
        },
      ],

    });

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

<h1 class="title">

  Concert Analytics

</h1>

<div class="columns mt-5">

  <div class="column">

    <div class="box">

      <h2 class="title is-4">

        Attendance by Venue

      </h2>

      <Chart
        data={attendanceData}
        type="bar"
      />

    </div>

  </div>

  <div class="column">

    <div class="box">

      <h2 class="title is-4">

        Concerts by Category

      </h2>

      <Chart
        data={categoryData}
        type="pie"
      />

    </div>

  </div>

</div>