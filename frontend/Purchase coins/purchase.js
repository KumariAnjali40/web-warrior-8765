function loadChart(coinname){
  var prices;
  let date = [];
  let currentDate = new Date();
  for (let i = 0; i < 15; i++) {
    const d = new Date(currentDate);
    d.setDate(currentDate.getDate() - i);
    const formattedDate = `${d.getDate()} ${d.toLocaleString("default", {
      month: "short",
    })}`; // format date
    date.push(formattedDate);
  }
  date.reverse();
  console.log(date);
  fetch(
    `https://api.coingecko.com/api/v3/coins/${coinname}/market_chart?vs_currency=usd&days=14&interval=daily`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      prices = data.prices;
      let marketcap = data.market_caps;
      let volume = data.total_volumes;
      let prices_data = [];
      let market_caps_data = [];
      let total_volume = [];
      prices.forEach((item) => {
        prices_data.push(item[1]);
      });
      marketcap.forEach((item) => {
        market_caps_data.push(item[1]);
      });
      volume.forEach((item) => {
        total_volume.push(item[1]);
      });
      console.log(prices_data);
      // Sample data
      const data_1 = {
        labels: date,
        datasets: [
          {
            label: "Price in last 14 days (in usd)",
            data: prices_data,
            fill: false,
            borderColor: "blue",
            tension: 0.1,
          //   pointStyle: "rectRounded",
          //   pointRadius: 6,
          },
        ],
      };
      const data_2 = {
        labels: date,
        datasets: [
          {
            label: "Total Volume",
            data: total_volume,
            fill: false,
            borderColor: "red",
            tension: 0.1,
            
          //   pointStyle: "triangle",
          //   pointRadius: 6,
          //   backgroundColor: "white"
          },
        ],
      };
      const config_2 = {
        type: "line",
        data: data_2,
        options: {
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // X-axis grid color
              },
              ticks: {
                color: "white", // X-axis label color
              },
            },
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Y-axis grid color
              },
              ticks: {
                color: "white", // Y-axis label color
              },
            },
          },
          plugins: {
              title: {
                display: true,
                text: "Total Volume in last 14 days",
                color: "white", // Label text color
              },
              legend: {
                  labels: {
                    color: "white", // Color of the label for the "Total Volume" dataset
                  },
                },
            },
        },
       
     
        
      };
  
      // Chart configuration
      const config = {
        type: "line",
        data: data_1,
        options: {
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // X-axis grid color
              },
              ticks: {
                color: "white", // X-axis label color
              },
            },
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.2)", // Y-axis grid color
              },
              ticks: {
                color: "white", // Y-axis label color
              },
            },
          },
          plugins: {
              title: {
                display: true,
                text: "Price of the coin in the last 14 days",
                color: "white", // Label text color
              },
              legend: {
                  labels: {
                    color: "white", // Color of the label for the "Total Volume" dataset
                  },
                },
            },
        },
     
      };
  
      // // Get the canvas element and create the chart
      const ctx = document.getElementById("myChart").getContext("2d");
      const myChart = new Chart(ctx, config);
      const ctx2 = document.getElementById("myChart_2").getContext("2d");
      const myChart_2 = new Chart(ctx2, config_2);
    })
    .catch((error) => console.log(error));
}
loadChart("dogecoin")

// purchase form Implementation

const purchase_coin_name = document.getElementById('coinName');
const purchase_coin_price = document.getElementById('coinPrice');

function getPurchaseForm() {
  purchase_coin_name.innerHTML = "";
  purchase_coin_price.innerHTML = "";

  const stored_items = JSON.parse(localStorage.getItem('local_items'));
  purchase_coin_name.textContent = stored_items.coin_name.charAt(0).toUpperCase() + stored_items.coin_name.slice(1);
  purchase_coin_price.textContent = stored_items.price
}

getPurchaseForm();


const add_funds_btn=document.getElementById('addFunds');
add_funds_btn.addEventListener('click',()=>{
  window.location.href='../payment.html';
})