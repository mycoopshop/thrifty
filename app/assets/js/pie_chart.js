function toggle_pie_chart() {
  // http://bl.ocks.org/mbostock/3887235

  if ($('#pie_chart').children().length > 0) {
    $('#pie_chart').empty()
    return 0
  }

  var width = 300,
      height = 300,
      radius = Math.min(width, height) / 2

  var inflow_color = d3.scaleLinear()
      .domain([0, 100])
      .range(["#57D850", "#35C44F"])
  var outflow_color = d3.scaleLinear()
      .domain([0, 100])
      .range(["#ED7876", "#D9534F"])

  var arc = d3.arc()
      .outerRadius(radius - 20)
      .innerRadius(radius / 3)
      .padAngle(0.020)

  var pie = d3.pie()
      .value(function(d) { return Math.abs(d.amount) })

  var svg = d3.select("#pie_chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

  d3.json("/cashflows.json", function(error, dataset) {
    if (error) { throw error }

    var total_inflow = sum_inflow(dataset)
    var total_outflow = sum_outflow(dataset)

    var g = svg.selectAll(".arc")
        .data(pie(dataset)).enter()
          .append("g")
            .classed("arc", true)

    g.append("path")
        .classed("cashflow", true)
        .attr("id", function(d) { return "cashflow_" + d.data.id })
        .attr("d", arc)
        .style("fill", function(d) {
          if (d.data.amount > 0) {
            return inflow_color(percentage(Math.abs(d.data.amount) , total_inflow))
          } else {
            return outflow_color(percentage(Math.abs(d.data.amount) , total_outflow))
          }
        })

    d3.selectAll("path.cashflow").on("mouseover", highlight_cashflow)
    d3.selectAll("path.cashflow").on("mouseout", dehighlight_cashflow)
    d3.selectAll("tr.cashflow").on("mouseover", highlight_cashflow)
    d3.selectAll("tr.cashflow").on("mouseout", dehighlight_cashflow)
  })

  function percentage(a, b) {
    return (a / b) * 100
  }

  function sum_inflow(dataset) {
    inflows = dataset.map(function(a) { return a.amount > 0 ? a.amount : 0 })
    total_inflow = inflows.reduce(function(a, b) { return a + b })
    return total_inflow
  }

  function sum_outflow(dataset) {
    outflows = dataset.map(function(a) { return a.amount < 0 ? a.amount : 0 })
    total_outflow = outflows.reduce(function(a, b) { return Math.abs(a) + Math.abs(b) })
    return total_outflow
  }

  function highlight_cashflow() {
    d3.select("path#" + this.id)
        .style("opacity", ".8")
        .style("stroke", "black")
        .style("stroke-width", "2")
    d3.select("tr#" + this.id)
        .style("background-color", "#F5F5F5")
  }

  function dehighlight_cashflow() {
    d3.select("path#" + this.id)
        .style("opacity", "1")
        .style("stroke-width", "0")
    d3.select("tr#" + this.id)
        .style("background-color", "#FFF")
  }
}

toggle_pie_chart()
