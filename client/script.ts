// import { Method } from "axios";

const url = "http://localhost:5000/";

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

function onStopClick(bus: string, time: string, li: HTMLLIElement) {
  if (li.innerHTML != bus) {
    li.innerHTML = bus;
    li.style.background = "rgb(80, 200, 120)";
  } else {
    li.innerHTML = time;
    li.style.background = "white";
  }
}

function makeStops(response: any) {
  var today = new Date();
  var time = today.getHours() * 60 + today.getMinutes();

  const hours_min = Math.floor((time - 10) / 60);
  const minutes_min = (time - 10) % 60;
  const min =
    hours_min + ":" + (minutes_min > 10 ? minutes_min : "0" + minutes_min);

  const hours_max = Math.floor((time + 10) / 60);
  const minutes_max = (time + 10) % 60;
  const max =
    hours_max + ":" + (minutes_max > 10 ? minutes_max : "0" + minutes_max);

  const ul = document.createElement("ul");
  ul.className = "stops";
  for (let i = 0; i < response.busDepartureA.length; i++) {
    if (
      response.busDepartureA[i].time < min ||
      response.busDepartureA[i].time > max
    )
      continue;
    const li = document.createElement("li");
    li.innerHTML = response.busDepartureA[i].time;
    li.className = "stop";
    li.style.cursor = "pointer";
    li.onclick = () =>
      onStopClick(
        response.busDepartureA[i].busLineId,
        response.busDepartureA[i].time,
        li
      );
    ul.appendChild(li);
  }
  document.body.appendChild(ul);
}

//smerove da uvedes, proveri koja je koja stanica
//ime stanice iznad stops kada se klikne
//mogucnost vracanja nazad
//vikendi (fajl i datum uvedi da uzima i tako izlistava po danu)

async function onClick(btn_text: string) {
  const name = btn_text.split(" ").join("_");
  const response = await get(`${url}${name}`);

  if (btn_group) {
    document.body.removeChild(btn_group);
  }
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
function start() {
  getButtons(url);
}
start();
