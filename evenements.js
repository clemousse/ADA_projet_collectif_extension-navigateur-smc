// récupère les dates en fonction du mois en cours selon le modèle suivant :
// let dateStart1 = "2022-08-31";
// let dateStart2 = "2022-09-30";
// let dateEnd1 = "2022-09-29";
// let dateEnd2 = "2022-09-30";

// le mois en cours
const date = new Date();
let month = date.getMonth() + 1;
// l'année
let year = date.getFullYear();
// les jours
let days = {
  1: 31,
  2: () => {
    return (year % 4 == 0) & (year % 100 != 0) & (year % 400 != 0) ||
      (year % 4 == 0) & (year % 100 == 0) & (year % 400 == 0)
      ? 29
      : 28;
  },
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

let monthString = {
  1: "Janvier",
  2: "Février",
  3: "Mars",
  4: "Avril",
  5: "Mai",
  6: "Juin",
  7: "Juillet",
  8: "Août",
  9: "Septembre",
  10: "Octobre",
  11: "Novembre",
  12: "Décembre",
};

// crée les dates finales
let dateStart1 = `${year.toString()}-${
  (month - 1).toString().length === 1
    ? "0" + (month - 1).toString()
    : (month - 1).toString()
}-${days[month - 1].toString()}`;
let dateStart2 = `${year.toString()}-${
  month.toString().length === 1 ? "0" + month.toString() : month.toString()
}-${days[month]}`;
let dateEnd1 = `${year.toString()}-${
  month.toString().length === 1 ? "0" + month.toString() : month.toString()
}-${(days[month] - 1).toString()}`;
let dateEnd2 = `${year.toString()}-${
  month.toString().length === 1 ? "0" + month.toString() : month.toString()
}-${days[month].toString()}`;

//fetch l'API Que Faire à Paris
let url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start%3A%5B${dateStart1}T22%3A00%3A00Z+TO+${dateStart2}T21%3A59%3A59Z%5D&q=date_end%3A%5B${dateEnd1}T22%3A00%3A00Z+TO+${dateEnd2}T21%3A59%3A59Z%5D&sort=-date_start&facet=date_start&facet=date_end&facet=tags&rows=1000&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=transport&facet=price_type&facet=access_type&facet=updated_at&facet=programs`;

function deleteTextInString(text) {
  let str = text;
  //console.log(str.replace(/<br \/>/g, " "));
  let newStr = str.replace(/<br \/>/g, " ");
  newStr = newStr.replace(/<p>/g, " ");
  newStr = newStr.replace(/<\/p>/g, " ");
  newStr = newStr.replace(/<strong>/g, " ");
  newStr = newStr.replace(/<\/strong>/g, " ");
  newStr = newStr.replace(/_/g, " ");
  newStr = newStr.replace(/<a href="/g, " ");
  newStr = newStr.replace(/target=" blank">/g, " ");
  newStr = newStr.replace(/"/g, " ");
  newStr = newStr.replace(/<\/a>/g, " ");
  newStr = newStr.replace(/&amp;/g, " ");
  newStr = newStr.replace(/&gt;/g, " ");
  newStr = newStr.replace(/target=/g, " ");
  newStr = newStr.replace(/blank/g, " ");
  newStr = newStr.replace(/rel= noopener/g, " ");
  newStr = newStr.replace(/title=/g, " ");
  newStr = newStr.replace(/Ouverture dans un nouvel onglet >/g, " ");
  newStr = newStr.replace(/https:\/\/www.ecole-itsuo-tsuda.org\/aikido\//, " ");
  newStr = newStr.replace(/<em>/g, " ");
  newStr = newStr.replace(/<\/em>/g, " ");
  newStr = newStr.replace(/<br>/g, " ");
  newStr = newStr.replace(/<sup>/g, " ");
  newStr = newStr.replace(/<\/sup>/g, " ");
  newStr = newStr.replace(/<h2>/g, " ");
  newStr = newStr.replace(/<\/h2>/g, " ");
  newStr = newStr.replace(/<div class= component-video >/g, " ");
  newStr = newStr.replace(/<div/g, " ");
  newStr = newStr.replace(/<\/div/g, " ");
  newStr = newStr.replace(/class=/g, " ");
  newStr = newStr.replace(/component-video >/g, " ");
  newStr = newStr.replace(/>/g, " ");
  newStr = newStr.replace(/<iframe src=/g, " ");
  newStr = newStr.replace(/\?feature=oembed/g, " ");
  newStr = newStr.replace(/frameborder= 0/g, " ");
  newStr = newStr.replace(/allow= accelerometer;/g, " ");
  newStr = newStr.replace(
    /autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture/g,
    " "
  );
  newStr = newStr.replace(/allowfullscreen=/g, " ");
  newStr = newStr.replace(/<\/iframe/g, " ");
  newStr = newStr.replace(/——/g, " ");
  newStr = newStr.replace(/<ul/g, " ");
  newStr = newStr.replace(/<\/ul/g, " ");
  newStr = newStr.replace(/<li/g, " ");
  newStr = newStr.replace(/<\/li/g, " ");
  newStr = newStr.replace(/▂▂▂▂/g, " ");
  newStr = newStr.replace(/ component-image/g, " ");
  newStr = newStr.replace(/<img src=/g, " ");
  newStr = newStr.replace(/ alt= Kyoto inspiration/g, " ");
  newStr = newStr.replace(/<\/img/g, " ");
  return newStr;
}

function setDisplayUndefined(data) {
  //console.log("array : ", data);
  let result = "";
  for (const el of data) {
    if (el || el != undefined || el != null) {
      //console.log("el : ", el);
      result += `${el} `;
    }
  }
  //console.log("result :", result.trim());
  return result.trim();
}

function reformate(text) {
  let result = text.replace(" ", "-");
  result = result.replace(/é|è|ê/g, "e");
  result = result.replace(/à|â/g, "a");
  result = result.replace(/ô/g, "o");
  result = result.replace(/ù|û/g, "u");
  result = result.replace(/î/g, "i");
  return result;
}

function displayData(data) {
  //crée la balise article pour chaque data
  let newArt = document.createElement("article");
  //crée les tags
  let tags = data.tags.split(";");
  let newDivTag = document.createElement("div");
  for (let el of tags) {
    let newTag = document.createElement("span");
    let classTag = document.createAttribute("class");
    classTag.value = reformate(setDisplayUndefined([el]).toLowerCase());
    newTag.setAttributeNode(classTag);
    el = el.replace(/ /g, "\u00a0");
    let newTagContent = document.createTextNode(setDisplayUndefined([el]));
    newDivTag.appendChild(newTag);
    newTag.appendChild(newTagContent);
  }
  //crée le titre
  let newH2 = document.createElement("h2");
  let newContent = document.createTextNode(setDisplayUndefined([data.title]));
  //crée l'image
  let newPImg = document.createElement("div");
  let newImg = document.createElement("img");
  let src = document.createAttribute("src");
  let alt = document.createAttribute("alt");
  src.value = data.cover_url;
  alt.value = `image de : ${data.cover_alt}`;
  newImg.setAttributeNode(src);
  newImg.setAttributeNode(alt);
  newPImg.appendChild(newImg);
  //crée la date
  let newDate = document.createElement("h3");
  let classDate = document.createAttribute("class");
  classDate.value = "date";
  newDate.setAttributeNode(classDate);
  let result = deleteTextInString(data.date_description);
  let newDateContent = document.createTextNode(setDisplayUndefined([result]));
  //crée le prix et le lien d'accès
  let newDivPriceAccessLink = document.createElement("div");
  let newAddressSubtitle = document.createElement("h4");
  let newPrice = document.createElement("span");
  let newAccessLink = document.createElement("a");
  let classAddressSubtitle = document.createAttribute("class");
  let classAccessLink = document.createAttribute("class");
  let classAccessLinkHref = document.createAttribute("href");
  let classAccessLinkTarget = document.createAttribute("target");
  let classPrice = document.createAttribute("class");
  classAddressSubtitle.value = "subtitle";
  classAccessLink.value = "accessLink";
  classAccessLinkHref.value = data.access_link;
  classAccessLinkTarget.value = "_blank";
  classPrice.value = "price";
  newAddressSubtitle.setAttributeNode(classAddressSubtitle);
  newAccessLink.setAttributeNode(classAccessLink);
  newAccessLink.setAttributeNode(classAccessLinkHref);
  newAccessLink.setAttributeNode(classAccessLinkTarget);
  newPrice.setAttributeNode(classPrice);
  let newAddressSubtitleContent = document.createTextNode(
    "Tarif - Billetterie : "
  );
  let newPriceContent = document.createTextNode(
    " " + setDisplayUndefined([data.price_type, data.price_detail]) + " "
  );
  let newAccessLinkContent = document.createTextNode("");
  if (data.access_link) {
    newAccessLinkContent = document.createTextNode(`lien vers la billetterie`);
  }

  //crée le lieu et l'adresse
  let newDivPlace = document.createElement("div");
  let newPlaceSubtitle = document.createElement("h4");
  let newAddress = document.createElement("span");
  let newPlace = document.createElement("span");
  let classPlace = document.createAttribute("class");
  let classPlaceSubtitle = document.createAttribute("class");
  let classAddress = document.createAttribute("class");
  classPlace.value = "place";
  classPlaceSubtitle.value = "subtitle";
  classAddress.value = "address";
  newAddress.setAttributeNode(classAddress);
  newPlaceSubtitle.setAttributeNode(classPlaceSubtitle);
  newPlace.setAttributeNode(classPlace);
  let newPlaceContent = document.createTextNode(
    setDisplayUndefined([data.address_name])
  );
  let newAddressContent = document.createTextNode(
    " " +
      setDisplayUndefined([
        data.address_street,
        data.address_zipcode,
        data.address_city,
      ])
  );
  let newPlaceSubtitleContent = document.createTextNode(
    "Lieu de l'événement : "
  );
  //crée la description
  let newDivDescription = document.createElement("div");
  let newDescriptionSubtitle = document.createElement("h4");
  let newDescription = document.createElement("span");
  let classDescriptionSubtitle = document.createAttribute("class");
  let classDescriptionDescription = document.createAttribute("class");
  classDescriptionSubtitle.value = "subtitle";
  classDescriptionDescription.value = "description";
  newDescriptionSubtitle.setAttributeNode(classDescriptionSubtitle);
  newDivDescription.setAttributeNode(classDescriptionDescription);
  result = deleteTextInString(data.description);
  let newDescriptionContent = document.createTextNode(
    setDisplayUndefined([result])
  );
  let newDescriptionSubtitleContent = document.createTextNode(
    "Description de l'événement : "
  );
  //crée le lien
  let newDivUrl = document.createElement("div");
  let newUrl = document.createElement("a");
  let classUrl = document.createAttribute("href");
  let classTarget = document.createAttribute("target");
  let newUrlSubtitle = document.createElement("h4");
  let classUrlSubtitle = document.createAttribute("class");
  classUrl.value = data.url;
  classTarget.value = "_blank";
  classUrlSubtitle.value = "subtitle";
  newUrl.setAttributeNode(classUrl);
  newUrl.setAttributeNode(classTarget);
  newUrlSubtitle.setAttributeNode(classUrlSubtitle);
  let newUrlContent = document.createTextNode(setDisplayUndefined([data.url]));
  let newUrlSubtitleContent = document.createTextNode("Lien de l'événement : ");
  /////////////////
  /////////////////
  //ajoute les tags
  newArt.appendChild(newDivTag);
  //ajoute et remplit le titre
  newArt.appendChild(newH2);
  newH2.appendChild(newContent);
  //ajoute l'image
  newArt.appendChild(newPImg);
  //ajoute la date
  newArt.appendChild(newDate);
  newDate.appendChild(newDateContent);
  //ajoute le prix et le lien d'accès
  newArt.appendChild(newDivPriceAccessLink);
  newDivPriceAccessLink.appendChild(newAddressSubtitle);
  newAddressSubtitle.appendChild(newAddressSubtitleContent);
  newDivPriceAccessLink.appendChild(newPrice);
  newPrice.appendChild(newPriceContent);
  newDivPriceAccessLink.appendChild(newAccessLink);
  newAccessLink.appendChild(newAccessLinkContent);
  //ajoute le lieu et l'adresse
  newArt.appendChild(newDivPlace);
  newDivPlace.appendChild(newPlaceSubtitle);
  newPlaceSubtitle.appendChild(newPlaceSubtitleContent);
  newDivPlace.appendChild(newPlace);
  newDivPlace.appendChild(newAddress);
  newPlace.appendChild(newPlaceContent);
  newAddress.appendChild(newAddressContent);
  //ajoute la description
  newArt.appendChild(newDivDescription);
  newDivDescription.appendChild(newDescriptionSubtitle);
  newDescriptionSubtitle.appendChild(newDescriptionSubtitleContent);
  newDivDescription.appendChild(newDescription);
  newDescription.appendChild(newDescriptionContent);
  //ajoute le lien
  newArt.appendChild(newDivUrl);
  newDivUrl.appendChild(newUrlSubtitle);
  newUrlSubtitle.appendChild(newUrlSubtitleContent);
  newDivUrl.appendChild(newUrl);
  newUrl.appendChild(newUrlContent);
  //ajoute à l'élément section du body dans le main
  let contenu = document.getElementById("contenu");
  contenu.appendChild(newArt);
}

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    let nhits = data.nhits; // pour avoir le nombre d'événements/activités du mois
    let tags = []; //pour avoir l'ensemble des tags existants sur les événements/activités

    //affiche le mois en cours dans le header
    document.getElementById("titre").textContent += " : " + monthString[month];

    //////CREATION DU FORMULAIRE
    //label
    let newLabel = document.createElement("label");
    let classLabelFor = document.createAttribute("for");
    classLabelFor.value = "tags-select";
    newLabel.setAttributeNode(classLabelFor);
    let newLabelContent = document.createTextNode("Choisissez votre catégorie");
    newLabel.appendChild(newLabelContent);
    //select
    let newSelect = document.createElement("select");
    let classSelectName = document.createAttribute("name");
    classSelectName.value = "tags";
    newSelect.setAttributeNode(classSelectName);
    let classSelectId = document.createAttribute("id");
    classSelectId.value = "tags-select";
    newSelect.setAttributeNode(classSelectId);
    //option
    let newOption = document.createElement("option");
    let classOption = document.createAttribute("value");
    classOption.value = "tous";
    newOption.setAttributeNode(classOption);
    let newOptionContent = document.createTextNode(
      "-- toutes les catégories --"
    );
    newOption.appendChild(newOptionContent);
    newSelect.appendChild(newOption);

    for (let i = 0; i < data.facet_groups.length; i++) {
      if (data.facet_groups[i].name === "tags") {
        for (let j = 0; j < data.facet_groups[i].facets.length; j++) {
          let tag = data.facet_groups[i].facets[j].name.trim();
          tags.push(tag);
        }
        tags.sort();
        for (let i = 0; i < tags.length; i++) {
          let newOption = document.createElement("option");
          let classOption = document.createAttribute("value");
          classOption.value = tags[i];
          newOption.setAttributeNode(classOption);
          let newOptionContent = document.createTextNode(tags[i]);
          newOption.appendChild(newOptionContent);
          newSelect.appendChild(newOption);
        }
      }
    }

    //button
    let newButton = document.createElement("button");
    let classButton = document.createAttribute("id");
    classButton.value = "go";
    newButton.setAttributeNode(classButton);
    let newButtonContent = document.createTextNode("GO !");
    newButton.appendChild(newButtonContent);
    //formulaire final
    let navigation = document.getElementById("formulaire");
    navigation.appendChild(newLabel);
    navigation.appendChild(newSelect);
    navigation.appendChild(newButton);

    ////// AFFICHAGE DE LA DATA AU CLIC BOUTON
    newButton.addEventListener("click", () => {
      let getSelect = document.getElementById("tags-select");
      let tag = getSelect.options[getSelect.selectedIndex].text;
      //efface le contenu précédent
      document.getElementById("contenu").innerHTML = "";
      //code clem debut
      if (
        tag == "-- toutes les catégories --" ||
        tag == undefined ||
        tag == null
      ) {
        for (let i = 0; i < nhits; i++) {
          displayData(data.records[i].fields);
        }
      }

      for (let i = 0; i < nhits; i++) {
        //affiche les data en fonction de la catégorie
        if (data.records[i].fields.tags.includes(tag)) {
          displayData(data.records[i].fields);
        }
      }
      //code clem fin
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });
