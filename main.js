document.addEventListener('DOMContentLoaded', function () {

    const dataSets = createDatasets();

    const svg = d3.select("svg");
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = +svg.attr("width") - margin.left - margin.right;
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    const y = d3.scaleLinear().rangeRound([height, 0]);

    const xAxis = g.append("g")
        .attr("transform", `translate(0,${height})`)
        .attr("class", "axis axis--x");
    const yAxis = g.append("g")
        .attr("class", "axis axis--y");

    // Función para actualizar el gráfico
    function update(data, index) {
        var parrafo = document.getElementById("miniChartTitle");
        if (index >= 6) {
            parrafo.textContent = "Diferencia en % de suicidios de 2017 a 2022";
        } else {
            parrafo.textContent = "Número de suicidios por comunidad autónoma";
        }

        x.domain(data.map(d => d.name));
        y.domain([0, d3.max(data, d => d.value)]);

        xAxis.transition().call(d3.axisBottom(x).tickSizeOuter(0));
        yAxis.transition().call(d3.axisLeft(y));

        const bars = g.selectAll(".bar").data(data);

        bars.exit().remove();

        bars.enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.name))
            .attr("y", d => y(0))
            .attr("width", x.bandwidth())
            .attr("height", 0)
            .merge(bars)
            .transition()
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => {
                if (d.value > 100 && index >= 6) {
                    return "#a26464"
                } else {
                    return "#5d9b9b"
                }
            });
    }

    update(dataSets[0]);

    document.getElementById('dataSelector').addEventListener('change', function () {
        const selectedIndex = +this.value;
        update(dataSets[selectedIndex], selectedIndex);
    });
});

function createDatasets() {
    const data2017Total = [
        { name: 'Total Nacional', value: 3679 },
        { name: 'AND', value: 692 },
        { name: 'ARA', value: 100 },
        { name: 'PAS', value: 134 },
        { name: 'IBA', value: 103 },
        { name: 'CAN', value: 200 },
        { name: 'CA', value: 27 },
        { name: 'CyL', value: 218 },
        { name: 'CLM', value: 157 },
        { name: 'CAT', value: 504 },
        { name: 'CVA', value: 397 },
        { name: 'EXT', value: 77 },
        { name: 'GAL', value: 323 },
        { name: 'CMA', value: 341 },
        { name: 'MUR', value: 98 },
        { name: 'NAV', value: 48 },
        { name: 'PV', value: 182 },
        { name: 'R', value: 25 }
    ];
    const data2017Hombres = [
        { name: 'Total Nacional', value: 2718 },
        { name: 'AND', value: 506 },
        { name: 'ARA', value: 73 },
        { name: 'PAS', value: 91 },
        { name: 'IBA', value: 71 },
        { name: 'CAN', value: 147 },
        { name: 'CA', value: 18 },
        { name: 'CyL', value: 155 },
        { name: 'CLM', value: 126 },
        { name: 'CAT', value: 374 },
        { name: 'CVA', value: 280 },
        { name: 'EXT', value: 61 },
        { name: 'GAL', value: 242 },
        { name: 'CMA', value: 251 },
        { name: 'MUR', value: 82 },
        { name: 'NAV', value: 39 },
        { name: 'PV', value: 136 },
        { name: 'R', value: 20 }
    ];
    const data2017Mujeres = [
        { name: 'Total Nacional', value: 961 },
        { name: 'AND', value: 186 },
        { name: 'ARA', value: 27 },
        { name: 'PAS', value: 43 },
        { name: 'IBA', value: 32 },
        { name: 'CAN', value: 53 },
        { name: 'CA', value: 9 },
        { name: 'CyL', value: 63 },
        { name: 'CLM', value: 31 },
        { name: 'CAT', value: 130 },
        { name: 'CVA', value: 117 },
        { name: 'EXT', value: 16 },
        { name: 'GAL', value: 81 },
        { name: 'CMA', value: 90 },
        { name: 'MUR', value: 16 },
        { name: 'NAV', value: 9 },
        { name: 'PV', value: 46 },
        { name: 'R', value: 5 }
    ];

    const data2022Total = [
        { name: 'Total Nacional', value: 4227 },
        { name: 'AND', value: 830 },
        { name: 'ARA', value: 114 },
        { name: 'PAS', value: 126 },
        { name: 'IBA', value: 109 },
        { name: 'CAN', value: 233 },
        { name: 'CA', value: 59 },
        { name: 'CyL', value: 242 },
        { name: 'CLM', value: 184 },
        { name: 'CAT', value: 614 },
        { name: 'CVA', value: 445 },
        { name: 'EXT', value: 95 },
        { name: 'GAL', value: 328 },
        { name: 'CMA', value: 403 },
        { name: 'MUR', value: 137 },
        { name: 'NAV', value: 57 },
        { name: 'PV', value: 174 },
        { name: 'R', value: 30 }
    ];
    const data2022Hombres = [
        { name: 'Total Nacional', value: 3126 },
        { name: 'AND', value: 651 },
        { name: 'ARA', value: 86 },
        { name: 'PAS', value: 91 },
        { name: 'IBA', value: 75 },
        { name: 'CAN', value: 180 },
        { name: 'CA', value: 39 },
        { name: 'CyL', value: 179 },
        { name: 'CLM', value: 147 },
        { name: 'CAT', value: 440 },
        { name: 'CVA', value: 328 },
        { name: 'EXT', value: 74 },
        { name: 'GAL', value: 236 },
        { name: 'CMA', value: 270 },
        { name: 'MUR', value: 107 },
        { name: 'NAV', value: 38 },
        { name: 'PV', value: 124 },
        { name: 'R', value: 22 }
    ];
    const data2022Mujeres = [
        { name: 'Total Nacional', value: 1101 },
        { name: 'AND', value: 179 },
        { name: 'ARA', value: 28 },
        { name: 'PAS', value: 35 },
        { name: 'IBA', value: 34 },
        { name: 'CAN', value: 53 },
        { name: 'CA', value: 20 },
        { name: 'CyL', value: 63 },
        { name: 'CLM', value: 37 },
        { name: 'CAT', value: 174 },
        { name: 'CVA', value: 117 },
        { name: 'EXT', value: 21 },
        { name: 'GAL', value: 92 },
        { name: 'CMA', value: 133 },
        { name: 'MUR', value: 30 },
        { name: 'NAV', value: 19 },
        { name: 'PV', value: 50 },
        { name: 'R', value: 8 }
    ];

    const diferenciaTotal = [];
    const diferenciaHombres = [];
    const diferenciaMujeres = [];

    for (let i = 0; i < data2017Total.length; i++) {
        diferenciaTotal.push({
            name: data2017Total[i].name,
            value: (data2022Total[i].value * 100) / data2017Total[i].value
        })
        diferenciaHombres.push({
            name: data2017Hombres[i].name,
            value: (data2022Hombres[i].value * 100) / data2017Hombres[i].value
        })
        diferenciaMujeres.push({
            name: data2017Mujeres[i].name,
            value: (data2022Mujeres[i].value * 100) / data2017Mujeres[i].value
        })
    }

    const dataSets = [
        data2017Total,
        data2017Hombres,
        data2017Mujeres,

        data2022Total,
        data2022Hombres,
        data2022Mujeres,

        diferenciaTotal,
        diferenciaHombres,
        diferenciaMujeres
    ];
    return dataSets;
}
