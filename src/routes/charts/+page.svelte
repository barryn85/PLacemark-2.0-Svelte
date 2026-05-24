<script lang="ts">

  import Chart
    from "svelte-frappe-charts";

  let { data } =
    $props();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let placemarks =
    data.placemarks;

  const attendanceData = {

    labels:
      placemarks.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (placemark: any) =>
          placemark.name
      ),

    datasets: [
      {
        values:
          placemarks.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (placemark: any) =>
              Number(
                placemark.attendance
              )
          ),
      },
    ],

  };

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

  const categoryData = {

    labels:
      Object.keys(
        categoryTotals
      ),

    datasets: [
      {
        values:
          Object.values(
            categoryTotals
          ),
      },
    ],

  };

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