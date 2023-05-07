// import { Method } from "axios";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var url = "http://localhost:5000/";
function get(URL) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(URL, { method: "GET" })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        return [2 /*return*/, response.json()];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
function changeVisibility(buttons, visibility) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = visibility;
    }
}
var search = document.getElementById("search");
var btn_group = document.getElementById("btn_group");
search === null || search === void 0 ? void 0 : search.addEventListener("keydown", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var input, buttons, i;
    return __generator(this, function (_a) {
        if (e.key !== "Enter" && e.key !== "Backspace")
            return [2 /*return*/];
        input = e.target.value;
        if (btn_group) {
            buttons = btn_group.getElementsByClassName("btn");
            if (e.key === "Backspace" && input.length == 1) {
                changeVisibility(buttons, "initial");
                return [2 /*return*/];
            }
            if (e.key === "Enter" && input.length > 0) {
                for (i = 0; i < buttons.length; i++) {
                    if (!buttons[i].innerHTML.toLowerCase().includes(input.toLowerCase())) {
                        buttons[i].style.display = "none";
                    }
                }
            }
        }
        return [2 /*return*/];
    });
}); });
function onStopClick(bus, time, direction, li, ul) {
    var drop_down = document.getElementById("drop");
    var paragraph = document.getElementById("dir");
    var btns = document.getElementById("btn_group");
    if (li.innerHTML != time) {
        li.innerHTML = time;
        li.style.background = "rgb(84,180,53)";
        paragraph.innerHTML = direction;
        drop_down.style.visibility = "visible";
        btns.style.display = "none";
    }
    else {
        drop_down.style.visibility = "hidden";
        btns.style.display = "grid";
        li.innerHTML = bus;
        li.style.background = "white";
    }
}
function byDeparture(departure, max, min, ul) {
    var _loop_1 = function (i) {
        if (departure[i].time < min || departure[i].time > max)
            return "continue";
        var li = document.createElement("li");
        li.innerHTML = departure[i].busLineId;
        li.className = "stop";
        li.style.cursor = "pointer";
        li.onclick = function () {
            return onStopClick(departure[i].busLineId, departure[i].time, departure[i].direction, li, ul);
        };
        ul.appendChild(li);
    };
    for (var i = 0; i < departure.length; i++) {
        _loop_1(i);
    }
    document.body.appendChild(ul);
}
function makeStops(response) {
    // var today = new Date();
    // var time = today.getHours() * 60 + today.getMinutes();
    // const hours_min = Math.floor((time - 10) / 60);
    // const minutes_min = (time - 10) % 60;
    // const min =
    //   hours_min + ":" + (minutes_min > 10 ? minutes_min : "0" + minutes_min);
    // const hours_max = Math.floor((time + 30) / 60);
    // const minutes_max = (time + 30) % 60;
    // const max =
    //   hours_max + ":" + (minutes_max > 10 ? minutes_max : "0" + minutes_max);
    var ul1 = document.createElement("ul");
    ul1.className = "stops";
    var min = "00:00:00";
    var max = "24:00:00";
    var p1 = document.createElement("p");
    p1.className = "dir-p";
    p1.textContent = "Smer A - OD GRADA";
    document.body.appendChild(p1);
    var departureA = response.busDepartureA;
    byDeparture(departureA, max, min, ul1);
    var ul2 = document.createElement("ul");
    ul2.className = "stops";
    var p2 = document.createElement("p");
    p2.textContent = "Smer B - DO GRADA";
    p2.className = "dir-p";
    document.body.appendChild(p2);
    var departureB = response.busDepartureB;
    byDeparture(departureB, max, min, ul2);
}
function onClick(btn_text) {
    return __awaiter(this, void 0, void 0, function () {
        var today, day, name, response, stationName, nav_bar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    today = new Date();
                    if (today.getDay() == 6) {
                        day = "saturday";
                    }
                    else if (today.getDay() == 0) {
                        day = "sunday";
                    }
                    else {
                        day = "work_day";
                    }
                    name = btn_text.split(" ").join("_") + "_" + day;
                    return [4 /*yield*/, get("".concat(url).concat(name))];
                case 1:
                    response = _a.sent();
                    if (btn_group) {
                        document.body.removeChild(btn_group);
                    }
                    stationName = document.createElement("p");
                    nav_bar = document.getElementById("station-name");
                    stationName.className = "station_name";
                    stationName.textContent = btn_text;
                    nav_bar === null || nav_bar === void 0 ? void 0 : nav_bar.appendChild(stationName);
                    makeStops(response);
                    return [2 /*return*/];
            }
        });
    });
}
function getButtons(url) {
    return __awaiter(this, void 0, void 0, function () {
        var options;
        return __generator(this, function (_a) {
            options = {
                method: "GET"
            };
            fetch(url, options)
                .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                else
                    throw new Error("Response: " + response.status);
            })
                .then(function (data) {
                var array = data.stations_arr;
                var _loop_2 = function (i) {
                    var btn = document.createElement("button");
                    btn.innerHTML = array[i];
                    btn.className = "btn";
                    btn.id = "btn_id";
                    btn.onclick = function () { return onClick(btn.innerHTML); };
                    var group = document.querySelector("#btn_group");
                    if (group) {
                        group.appendChild(btn);
                    }
                };
                for (var i = 0; i < array.length; i++) {
                    _loop_2(i);
                }
            });
            return [2 /*return*/];
        });
    });
}
// const back = document.getElementById("back_icon");
// if (back) back.onclick = () => redirect();
function redirect() {
    location.href = "http://127.0.0.1:5500/client/";
}
function start() {
    getButtons(url);
}
start();
