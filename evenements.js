let url =
  "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start%3A%5B2022-08-31T22%3A00%3A00Z+TO+2022-09-30T21%3A59%3A59Z%5D&q=date_end%3A%5B2022-09-29T22%3A00%3A00Z+TO+2022-09-30T21%3A59%3A59Z%5D&facet=date_start&facet=date_end&facet=tags&rows=1000&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=transport&facet=price_type&facet=access_type&facet=updated_at&facet=programs";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log("data", data);

    let nhits = data.nhits; // I need to build 24 articles
    console.log("nhits", nhits);

    for (let i = 0; i < nhits; i++) {
      //crée la balise article pour chaque data
      let newArt = document.createElement("article");
      //crée les tags
      let newDivTag = document.createElement("div");
      let newTagContent = document.createTextNode(data.records[i].fields.tags);
      //crée le titre
      let newH2 = document.createElement("h2");
      let newContent = document.createTextNode(data.records[i].fields.title);
      //crée l'image
      let newPImg = document.createElement("div");
      let newImg = document.createElement("img");
      let src = document.createAttribute("src");
      let alt = document.createAttribute("alt");
      src.value = data.records[i].fields.cover_url;
      alt.value = `image de :${data.records[i].fields.cover_alt}`;
      newImg.setAttributeNode(src);
      newImg.setAttributeNode(alt);
      newPImg.appendChild(newImg);
      //crée la date
      let newDate = document.createElement("h3");
      let classDate = document.createAttribute("class");
      classDate.value = "date";
      newDate.setAttributeNode(classDate);
      let newDateContent = document.createTextNode(
        data.records[i].fields.date_description
      );
      //crée le prix et le lien d'accès
      let newDivPriceAccessLink = document.createElement("div");
      let newPrice = document.createElement("span");
      let newAccessLink = document.createElement("a");
      let classAccessLinkHref = document.createAttribute("href");
      classAccessLinkHref.value = data.records[i].fields.access_link;
      newAccessLink.setAttributeNode(classAccessLinkHref);
      let classPrice = document.createAttribute("class");
      classPrice.value = "price";
      newPrice.setAttributeNode(classPrice);
      let classAccessLink = document.createAttribute("class");
      classAccessLink.value = "accessLink";
      newAccessLink.setAttributeNode(classAccessLink);
      let newPriceContent = document.createTextNode(
        `${data.records[i].fields.price_type} ${data.records[i].fields.price_detail}`
      );
      let newAccessLinkContent = document.createTextNode(
        data.records[i].fields.access_link
      );
      //crée le lieu et l'adresse
      let newDivPlace = document.createElement("div");
      let newAddress = document.createElement("span");
      let newPlace = document.createElement("span");
      let classPlace = document.createAttribute("class");
      classPlace.value = "place";
      newPlace.setAttributeNode(classPlace);
      let classAddress = document.createAttribute("class");
      classAddress.value = "address";
      newAddress.setAttributeNode(classAddress);
      let newPlaceContent = document.createTextNode(
        data.records[i].fields.address_name
      );
      let newAddressContent = document.createTextNode(
        `${data.records[i].fields.address_street} ${data.records[i].fields.address_zipcode} ${data.records[i].fields.address_city}`
      );
      //crée la description
      let newDescription = document.createElement("p");
      let newDescriptionContent = document.createTextNode(
        data.records[i].fields.description
      );
      //crée le lien
      let newUrl = document.createElement("a");
      let classUrl = document.createAttribute("href");
      classUrl.value = data.records[i].fields.url;
      newUrl.setAttributeNode(classUrl);
      let newUrlContent = document.createTextNode(data.records[i].fields.url);
      //crée les coordonnées
      let newContact = document.createElement("div");
      let newContactContent = document.createTextNode(
        `${data.records[i].fields.contact_mail} ${data.records[i].fields.contact_phone}`
      );
      //////
      //ajoute les tags
      newArt.appendChild(newDivTag);
      newDivTag.appendChild(newTagContent);
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
      newDivPriceAccessLink.appendChild(newPrice);
      newPrice.appendChild(newPriceContent);
      newDivPriceAccessLink.appendChild(newAccessLink);
      newAccessLink.appendChild(newAccessLinkContent);
      //ajoute le lieu et l'adresse
      newArt.appendChild(newDivPlace);
      newDivPlace.appendChild(newPlace);
      newDivPlace.appendChild(newAddress);
      newPlace.appendChild(newPlaceContent);
      newAddress.appendChild(newAddressContent);
      //ajoute la description
      newArt.appendChild(newDescription);
      newDescription.appendChild(newDescriptionContent);
      //ajoute le lien
      newArt.appendChild(newUrl);
      newUrl.appendChild(newUrlContent);
      //ajoute les coordonnées
      newArt.appendChild(newContact);
      newContact.appendChild(newContactContent);
      //ajoute à l'élément section du body dans le main
      let current = document.getElementById("contenu");
      current.appendChild(newArt);
    }
  })
  .catch((error) => {
    console.log("Error", error);
  });
