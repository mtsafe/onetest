function addSchemaDataToWebpage() {

  var jsonData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "One Test at a Time - Diabetic Coach",
    "image": "https://onetestatatime.com/images/1test-image.jpg",
    "@id": "https://onetestatatime.com/index.html",
    "url": "https://onetestatatime.com/",
    "telephone": "+1-817-714-0088",
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2301 Village Cir, Ste 115",
      "addressLocality": "Bedford",
      "addressRegion": "TX",
      "postalCode": "76022",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.8320,
      "longitude": -97.1300
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/onetestatatime",
      "https://www.linkedin.com/company/one-test-at-a-time/about/"
    ]
  }

  var el = document.createElement('script');
  el.type = 'application/ld+json';
  el.innerHTML = JSON.stringify(jsonData);
  document.body.appendChild(el);
}

addSchemaDataToWebpage();
