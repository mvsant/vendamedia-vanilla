let orderList = [];
let noSellMessage = "Sem venda";

let orderId = document.getElementById("orderId");
let orderPrice = document.getElementById("orderPrice");
let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");

let resultTable = document.getElementById("resultTable");

const clearScreen = function () {
  orderId.value = "";
  orderPrice.value = "";
  option1.checked = false;
  option2.checked = false;
  option3.checked = false;
};

class Order {
  constructor(id, price, opt1, opt2, opt3) {
    this.id = id || noSellMessage;
    this.price = +price.replace(/[,.]/, "") || 0;
    this.opt1 = opt1 || false;
    this.opt2 = opt2 || false;
    this.opt3 = opt3 || false;
  }
  #clearOrder() {
    this.id = "";
    this.price = 0;
    this.opt1 = false;
    this.opt2 = false;
    this.opt3 = false;
  }
  noSell() {
    clearScreen();
    this.#clearOrder;
    return this;
  }
  sellCheck() {
    if (this.id === noSellMessage || this.price === 0) {
      return false;
    } else {
      clearScreen();
      return this;
    }
  }
}

class Output {
  constructor(list) {
    this.list = list;
    this.lines = Object.values(this.list);
  }

  formatCurrencyOutput(value) {
    const arra = Array.from(`${value}`);
    if (arra.length === 1) {
      arra.unshift("0", "0");
    } else if (arra.length === 2) {
      arra.unshift("0");
    }
    arra.splice(-2, 0, ",");
    return `R$ ${arra.join("")}`;
  }

  formatPercentageOutput(opt) {
    return `${(
      (Math.round((opt / this.lines.length + Number.EPSILON) * 100) / 100) *
      100
    ).toFixed(2)}%`;
  }

  averageSum() {
    let total = 0;
    let result = 0;
    const lines = Object.values(this.list);
    if (lines.length > 0) {
      lines.map((line) => {
        total += line.price;
      });
      result = Math.floor(total / this.lines.length);
      return this.formatCurrencyOutput(result);
    } else {
      return false;
    }
  }

  priceSum() {
    let total = 0;
    const lines = Object.values(this.list);
    if (lines.length > 0) {
      lines.map((line) => {
        total += line.price;
      });
      return this.formatCurrencyOutput(total);
    } else {
      return false;
    }
  }

  convertionSum() {
    let total = 0;
    if (this.lines.length > 0) {
      this.lines.map((line) => {
        if (line.price > 0) {
          total++;
        }
      });
      return this.formatPercentageOutput(total);
    } else {
      return false;
    }
  }

  optionAvg(opt) {
    let total = 0;
    const lines = Object.values(this.list);
    if (lines.length > 0) {
      lines.map((line) => {
        if (line[opt]) {
          total++;
        }
      });
      return this.formatPercentageOutput(total);
    } else {
      return false;
    }
  }

  insertResults() {
    const table = dailyTable.getElementsByTagName("tbody")[0];
    if (this.list.length > 0) {
      table.innerHTML = "";
      this.lines.forEach((line, index) => {
        table.insertRow();
        table.rows[index].insertCell(0).innerHTML = line.id;
        table.rows[index].insertCell(1).innerHTML = this.formatCurrencyOutput(
          line.price
        );
        table.rows[index].insertCell(2).innerHTML = line.opt1;
        table.rows[index].insertCell(3).innerHTML = line.opt2;
        table.rows[index].insertCell(4).innerHTML = line.opt3;
      });
    }
  }

  removeLast() {
    this.list.pop();
    if (this.list.length === 0) {
      const table = dailyTable.getElementsByTagName("tbody")[0];
      table.rows[0].cells[0].innerHTML = "---";
      table.rows[0].cells[1].innerHTML = "---";
      table.rows[0].cells[2].innerHTML = "---";
      table.rows[0].cells[3].innerHTML = "---";
      table.rows[0].cells[4].innerHTML = "---";
    }
    console.log(this.list);
  }

  test() {}

  getResults() {
    const table = resultTable.getElementsByTagName("tbody")[0];
    table.rows[0].cells[0].innerHTML = this.averageSum();
    table.rows[0].cells[1].innerHTML = this.priceSum();
    table.rows[0].cells[2].innerHTML = this.convertionSum();
    table.rows[0].cells[3].innerHTML = this.optionAvg("opt1");
    table.rows[0].cells[4].innerHTML = this.optionAvg("opt2");
    table.rows[0].cells[5].innerHTML = this.optionAvg("opt3");
  }
}

const addOrder = function () {
  let newOrder = new Order(
    orderId.value,
    orderPrice.value,
    option1.checked,
    option2.checked,
    option3.checked
  );
  return newOrder;
};

const checkOrder = function () {
  const order = addOrder().sellCheck();
  if (order) {
    orderList.push(order);
  } else {
    alert("Insira um número de pedido e um preço.");
  }
};

const exporter = function() {
  var tabelahtm = document.getElementById("tablesArea");
  var cria = tabelahtm.outerHTML;
  window.open(
    "data:application/vnd.ms-excel;charset=utf-8," +
      encodeURI(cria)
        .replace(/Op%C3%A7%C3%A3o/g, "Op%E7%E3o")
        .replace(/Convers%C3%A3o/g, "Convers%E3o")
        .replace(/M%C3%A9dia/g, "M%E9dia")
  );
  window.close();
}

insertButton.addEventListener("click", function (event) {
  event.preventDefault();
  checkOrder();
  new Output(orderList).getResults();
  new Output(orderList).insertResults();
});

noSell.addEventListener("click", (event) => {
  event.preventDefault();
  const order = addOrder().noSell();
  orderList.push(order);
  new Output(orderList).getResults();
  new Output(orderList).insertResults();
});

removeLast.addEventListener("click", (event) => {
  event.preventDefault();
  new Output(orderList).removeLast();
  new Output(orderList).insertResults();
});

exportButton.addEventListener("click", (event) => {
  event.preventDefault();
  exporter();
});

/* 

const populateHelperList = {
  0: {
    orderId: "0001",
    orderPrice: "10.00",
    option1: false,
    option2: true,
    option3: false,
  },
  1: {
    orderId: "0002",
    orderPrice: "42,50",
    option1: false,
    option2: true,
    option3: true,
  },
  2: {
    orderId: "0003",
    orderPrice: "30,74",
    option1: true,
    option2: false,
    option3: false,
  },
  3: {
    orderId: "0004",
    orderPrice: "9.99",
    option1: true,
    option2: true,
    option3: false,
  },
  4: {
    orderId: "0005",
    orderPrice: "10000",
    option1: true,
    option2: true,
    option3: true,
  },
  5: {
    orderId: "0006",
    orderPrice: "99.50",
    option1: false,
    option2: true,
    option3: true,
  },
  6: {
    orderId: "0007",
    orderPrice: "2200",
    option1: false,
    option2: false,
    option3: false,
  },
  7: {
    orderId: "0008",
    orderPrice: "50.00",
    option1: false,
    option2: true,
    option3: false,
  },
  8: {
    orderId: "0009",
    orderPrice: "10.00",
    option1: false,
    option2: false,
    option3: false,
  },
  9: {
    orderId: "",
    orderPrice: "",
    option1: false,
    option2: false,
    option3: false,
  },
  10: {
    orderId: "0011",
    orderPrice: "11.00",
    option1: true,
    option2: false,
    option3: false,
  },
};

const populateHelperInjection = function (collection) {
  const group = Object.values(collection);

  group.forEach((item) => {
    let newOrder = new Order(
      item.orderId,
      item.orderPrice,
      item.option1,
      item.option2,
      item.option3
    );
    newOrder.sellCheck();
    orderList.push(newOrder);
  });
};

  formatPercentageOutput(opt) {
    return `${(
      (Math.round((opt / this.lines.length + Number.EPSILON) * 100) / 100) *
      100
    ).toFixed(2)}%`;
  }

  populateHelperInjection(populateHelperList);
new Output(orderList).test();
new Output(orderList).getResults();
//new Output(orderList).test();
  
*/
