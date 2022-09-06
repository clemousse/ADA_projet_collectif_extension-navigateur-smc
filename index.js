const maRequete = new Request(
  "https://www.offi.fr/theatre/programme.html?criterion_sch_ville=75&criterion_NbDay=30&criterion_SRubrique=operas-ballets-danse"
);
//"https://www.theatredelaville-paris.com/fr/spectacles/saison-2022-2023/danse";
//http://www.ens-lyon.fr/";"

const myHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "text/html;charset=UTF-8",
  "Access-Control-Allow-Headers": "Accept, Content-Type",
};

const myInit = {
  mode: "cors",
  cache: "default",
  method: "GET",
  headers: myHeaders,
};

async function getData(u) {
  let response = await fetch(u, myInit);
  if (response) {
    console.log("response headers :", response.headers);
    let data = await response.text();
    console.log("result : ", data);
    return data;
  } else {
    alert("Http-ERROR " + response.status);
  }
}

getData(maRequete);
