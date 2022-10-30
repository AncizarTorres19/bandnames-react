import { useContext, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { SocketConext } from '../context/SocketContext';
Chart.register(...registerables);

export const BandChart = () => {

    const { socket } = useContext(SocketConext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            createChart(bands)
        })
    }, [socket]);

    let myChart = null
    const createChart = (bands = []) => {
        const ctx = document.getElementById('myChart');
        if (myChart != null) {
            myChart.destroy();
        }
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map(band => band.name),
                datasets: [{
                    label: '# of Votes for bands',
                    data: bands.map(band => band.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                indexAxis: 'y',
                scales: {
                    xAxes: {
                        stacked: true
                    }
                }
            }
        });
    }

    return (
        <canvas id="myChart" ></canvas>
    )
}
