import {useRef, useEffect} from 'react';
import Chart from 'chart.js/auto';

function ChartComponent({result}){
	const chartRef = useRef(null);
	const getChartColor = () => {
		if (result?.percentageLow <= 40) {
			return '249, 116, 118'
		} else if ((result?.percentageLow >= 41) && (result?.percentageLow <= 64)) {
			return '253, 196, 72'
		} else if ((result?.percentageLow >= 65) && (result?.percentageLow <= 74)) {
			return '179, 160, 207'
		} else if ((result?.percentageLow >= 75) && (result?.percentageLow <= 100)) {
			return '56, 193, 114'
		}
	}

	useEffect(() => {
		if (!result) return;
		/* if (chartRef.current) {
			chartRef.current.destroy();
		} */
		const chartOptions = {
			responsive: true,
			maintainAspectRatio: false
		};
		const chartColor = getChartColor();
		const chartData = {
			labels: [
			],
			datasets: [{
				label: 'Maximum',
				data: [result.percentageHigh, 100 - result.percentageHigh],
				backgroundColor: [
					`rgba(${chartColor}, 1)`,
					'rgba(255, 255, 255, 0.0)',
				],
				hoverOffset: 4
			},
			{
				label: 'Minimum',
				data: [result.percentageLow, 100 - result.percentageLow],
				backgroundColor: [
					`rgba(${chartColor}, 0.7)`,
					'rgba(255, 255, 255, 0.0)',
				],
				hoverOffset: 4
			}
			]
		};

		// Create a new chart
		const ctx = chartRef.current.getContext('2d');
		const newChart = new Chart(ctx, {
			type: 'doughnut',
			data: chartData,
			options: chartOptions
		});

		// Cleanup function to destroy the chart on component unmount
		return () => {
			newChart.destroy();
		};
	}, []); // Empty dependency array ensures that the effect runs only once

	return <canvas ref={chartRef} />;
};
export default ChartComponent;
