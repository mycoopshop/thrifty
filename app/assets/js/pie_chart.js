function toggle_pie_chart(cashflows, total_inflow, total_outflow, netflow) {
  // http://bl.ocks.org/mbostock/3887235

  if ($('#pie_chart').children().length > 0) {
    $('#pie_chart').empty()
    return 0
  }

  let width = 300,
      height = 300,
      radius = Math.min(width, height) / 2

  let inflow_color = d3.scaleLinear()
      .domain([0, 100])
      .range(["#57D850", "#35C44F"])
  let outflow_color = d3.scaleLinear()
      .domain([0, 100])
      .range(["#ED7876", "#D9534F"])

  let arc = d3.arc()
      .outerRadius(radius - 20)
      .innerRadius(radius / 3)
      .padAngle(0.020)

  let pie = d3.pie()
      .value(function(d) { return Math.abs(d.amount) })

  let svg = d3.select("#pie_chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

  let g = svg.selectAll(".arc")
      .data(pie(cashflows)).enter()
        .append("g")
          .classed("arc", true)

  g.append("path")
      .classed("cashflow", true)
      .attr("id", function(d) { return "cashflow_" + d.data.id })
      .attr("d", arc)
      .style("fill", function(d) {
        if (d.data.amount > 0) {
          return inflow_color(
            percentage(Math.abs(d.data.amount), total_inflow)
          )
        } else {
          return outflow_color(
            percentage(Math.abs(d.data.amount), total_outflow)
          )
        }
      })

  d3.selectAll("path.cashflow").on("mouseover", highlight_cashflow)
  d3.selectAll("path.cashflow").on("mouseout", dehighlight_cashflow)
  d3.selectAll("tr.cashflow").on("mouseover", highlight_cashflow)
  d3.selectAll("tr.cashflow").on("mouseout", dehighlight_cashflow)

  function percentage(a, b) {
    return (a / b) * 100
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
