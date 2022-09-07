let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start%3A%5B2022-08-31T22%3A00%3A00Z+TO+2022-09-30T21%3A59%3A59Z%5D&q=date_end%3A%5B2022-09-29T22%3A00%3A00Z+TO+2022-09-30T21%3A59%3A59Z%5D&facet=date_start&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=transport&facet=price_type&facet=access_type&facet=updated_at&facet=programs";

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    let res = data.records[0].fields.title;
    console.log(res);

  })

  