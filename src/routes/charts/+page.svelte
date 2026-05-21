<script lang="ts">

  // @ts-ignore
  import Chart from "svelte-frappe-charts";

  import { onMount }
    from "svelte";

  import { placemarkService }
    from "$lib/services/placemark-service";

  let placemarks: any[] = [];

  let attendanceData = $state({

    labels: [],

    datasets: [
      {
        values: [],
      },
    ],

  });

  let categoryData = $state({

    labels: [],

    datasets: [
      {
        values: [],
      },
    ],

  });

  onMount(async () => {

    placemarks =
      await placemarkService.getPlacemarks();

    placemarks.forEach(
      (placemark: any) => {

        attendanceData.labels.push(
          placemark.name
        );

        attendanceData.datasets[0]
          .values.push(
            Number(placemark.attendance)
          );    
          

        }
    );

    const categoryTotals:
      Record<string, number> = {};

    placemarks.forEach(
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

  });

</script>

<h1 class="title">
  Concert Analytics
</h1>

<div class="columns">

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