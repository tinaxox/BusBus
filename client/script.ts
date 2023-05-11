// import { Method } from "axios";

const url = "http://192.168.0.32:5000/";

async function get(URL: string) {
  const response = await fetch(URL, { method: "GET" });
  if (response.ok) {
    return response.json();
  }
  return null;
}
function changeVisibility(
  buttons: HTMLCollectionOf<Element>,
  visibility: string
) {
  for (let i = 0; i < buttons.length; i++) {
    (buttons[i] as HTMLElement).style.display = visibility;
  }
}
const search = document.getElementById("search");
const btn_group = document.getElementById("btn_group");
search?.addEventListener("keydown", async (e) => {
  if (e.key !== "Enter" && e.key !== "Backspace") return;
  const input = (e.target as HTMLInputElement).value;
  if (btn_group) {
    const buttons = btn_group.getElementsByClassName("btn"); // || [], ako je btn_group null

    if (e.key === "Backspace" && input.length == 1) {
      changeVisibility(buttons, "initial");
      return;
    }
    if (e.key === "Enter" && input.length > 0) {
      for (let i = 0; i < buttons.length; i++) {
        if (!buttons[i].innerHTML.toLowerCase().includes(input.toLowerCase())) {
          (buttons[i] as HTMLElement).style.display = "none";
        }
      }
    }
  }
});

function findLength(str: string) {
  var final: string;
  if (str.length > 1) final = str;
  else final = "0" + str;
  return final;
}

function getTime(time: string) {
  var today = new Date();
  const yearToday = today.getFullYear();
  const monthToday = (today.getMonth() + 1).toString();
  const finalm = findLength(monthToday);
  const dayToday = today.getDate().toString();
  const finald = findLength(dayToday);
  const dateToday = yearToday + "-" + finalm + "-" + finald;
  var arrival = new Date(
    dateToday + "T" + time[0] + time[1] + ":" + time[3] + time[4] + ":" + "00"
  );
  var diff = arrival.valueOf() - today.valueOf();
  var ss = Math.floor(diff / 1000);
  let minutes = Math.floor(ss / 60);
  return minutes;
}

function onStopClick(
  bus: string,
  time: string,
  direction: string,
  li: HTMLLIElement
  // ul: HTMLUListElement
) {
  const drop_down = document.getElementById("drop");
  const ex_paragraph = document.getElementsByClassName(
    "dir-p"
  ) as HTMLCollectionOf<HTMLElement>;
  const paragraph = document.getElementById("dir");
  const info_time = document.getElementById("info-time");
  const info_in = document.getElementById("info-in-mins");
  const stops = document.getElementsByClassName(
    "stops"
  ) as HTMLCollectionOf<HTMLElement>;
  const stationName = document.getElementById("statioName");
  const busName = document.getElementById("bus-name");
  if (li.innerHTML != time) {
    stationName!.style.display = "none";
    busName!.textContent = bus;
    busName!.style.display = "block";
    paragraph!.innerHTML = direction;
    info_time!.innerHTML = time;
    const arrival_time = getTime(time);
    info_in!.innerHTML = "za " + arrival_time.toString() + " minuta";
    drop_down!.style.visibility = "visible";
    for (var i = 0; i < stops.length; i++) {
      stops[i].style.display = "none";
    }
    for (var i = 0; i < ex_paragraph.length; i++) {
      ex_paragraph[i].style.visibility = "hidden";
    }
    // } else {
    //   drop_down!.style.visibility = "hidden";
    //   for (var i = 0; i < stops.length; i++) {
    //     stops[i].style.display = "grid";
    //   }
    // li.innerHTML = bus;
    // li.style.background = "white";
  }
}

function byDeparture(
  departure: any,
  max: string,
  min: string,
  ul: HTMLUListElement
) {
  for (let i = 0; i < departure.length; i++) {
    if (departure[i].time < min || departure[i].time > max) continue;
    const li = document.createElement("li");
    li.innerHTML = departure[i].busLineId;
    li.className = "stop";
    li.style.cursor = "pointer";
    li.onclick = () =>
      onStopClick(
        departure[i].busLineId,
        departure[i].time,
        departure[i].direction,
        li
      );
    ul.appendChild(li);
  }
  document.body.appendChild(ul);
}

function makeStops(response: any) {
  var today = new Date();

  var time = today.getHours() * 60 + today.getMinutes();

  const hours_min = Math.floor((time - 10) / 60);
  const minutes_min = (time - 10) % 60;
  const min =
    hours_min + ":" + (minutes_min > 10 ? minutes_min : "0" + minutes_min);

  const hours_max = Math.floor((time + 30) / 60);
  const minutes_max = (time + 30) % 60;
  const max =
    hours_max + ":" + (minutes_max > 10 ? minutes_max : "0" + minutes_max);
  const ul1 = document.createElement("ul");
  ul1.className = "stops";
  ul1.id = "stops_stations";

  const p1 = document.createElement("p");
  p1.className = "dir-p";
  p1.textContent = "Smer A";
  document.body.appendChild(p1);
  const departureA = response.busDepartureA;
  byDeparture(departureA, max, min, ul1);

  const ul2 = document.createElement("ul");
  ul2.className = "stops";
  ul2.id = "stops_stations";

  const p2 = document.createElement("p");
  p2.textContent = "Smer B";
  p2.className = "dir-p";
  document.body.appendChild(p2);
  const departureB = response.busDepartureB;
  byDeparture(departureB, max, min, ul2);
}

async function onClick(btn_text: string) {
  var today = new Date();
  let day;
  if (today.getDay() == 6) {
    day = "saturday";
  } else if (today.getDay() == 0) {
    day = "sunday";
  } else {
    day = "work_day";
  }
  const name = btn_text.split(" ").join("_") + "_" + day;
  const response = await get(`${url}${name}`);

  if (btn_group) {
    document.body.removeChild(btn_group);
  }
  const stationName = document.createElement("p");
  const nav_bar = document.getElementById("station-name");
  stationName.className = "station_name";
  stationName.id = "statioName";
  stationName.textContent = btn_text;
  nav_bar?.appendChild(stationName);
  makeStops(response);
}

async function getButtons(url: string) {
  const options: RequestInit = {
    method: "GET",
  };
  fetch(url, options)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else throw new Error("Response: " + response.status);
    })
    .then(function (data) {
      const array: string[] = data.stations_arr;
      for (let i = 0; i < array.length; i++) {
        const btn = document.createElement("button");
        btn.innerHTML = array[i];
        btn.className = "btn";
        btn.id = "btn_id";
        btn.onclick = () => onClick(btn.innerHTML);
        const group = document.querySelector("#btn_group");
        if (group) {
          group.appendChild(btn);
        }
      }
    });
}
// const back = document.getElementById("back_icon");
// if (back) back.onclick = () => redirect();

function redirect() {
  location.href = "http://192.168.0.32:5500/client/";
}

function redirectToStops() {
  const drop_down = document.getElementById("drop");
  const ex_paragraph = document.getElementsByClassName(
    "dir-p"
  ) as HTMLCollectionOf<HTMLElement>;
  const stops = document.getElementsByClassName(
    "stops"
  ) as HTMLCollectionOf<HTMLElement>;
  drop_down!.style.visibility = "hidden";
  const stationName = document.getElementById("statioName");
  const busName = document.getElementById("bus-name");
  stationName!.style.display = "block";
  busName!.style.display = "none";
  for (var i = 0; i < ex_paragraph.length; i++) {
    ex_paragraph[i].style.visibility = "visible";
  }
  for (var i = 0; i < stops.length; i++) {
    stops[i].style.display = "grid";
  }
}
function start() {
  getButtons(url);
}
start();
