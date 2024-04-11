const contendor = document.getElementById("contenedor");
//
let peliculas = [];
fetch("peliculas.json")
  .then((data) => {
    // Comando que conecta al data.son para cargar un json
    return data.json();
  })
  .then((data) => {
    peliculas = data;
  });

//CONECCION CON EL DOM
const mostrarPeliculas = (peliculas) => {
  contenedor.innerHTML = "";

  // [peliculasa]-->[div]
  const peliculasDiv = peliculas.map((pelicula, peliculaIndex) => {
    const peliculaDiv = document.createElement("div");
    peliculaDiv.classList.add("pelicula");

    const index = document.createElement("p");
    index.textContent = "No" + (peliculaIndex + 1);
    peliculaDiv.appendChild(index);

    const poster = document.createElement("img");
    poster.src = pelicula.Poster; // llamar la imagen de data.json
    peliculaDiv.appendChild(poster);

    const añoP = document.createElement("p");
    añoP.textContent = pelicula.Year;
    peliculaDiv.appendChild(añoP);

    const tituloP = document.createElement("p");
    tituloP.textContent = pelicula.Title;
    peliculaDiv.appendChild(tituloP);

    const ratedP = document.createElement("p");
    ratedP.textContent = pelicula.Rated;
    peliculaDiv.appendChild(ratedP);

    /*const clasContP = document.createElement("p");
    clasContP.textContent = pelicula.Ratings;
    peliculaDiv.appendChild(clasContP);
    */
    // Creando un super Div para Rating(.json)
    const div_rate = document.createElement("div");

    //INICIO......................................... CONVERTIR RATING A ETIQUETAS P
    const ratingdivs = pelicula.Ratings.map((rating) => {
      const ratingdiv = document.createElement("div"); //Creando un div para meter los otros div co  etiqueta p

      const sourceP = document.createElement("span");
      sourceP.textContent = rating.Source;
      ratingdiv.appendChild(sourceP);

      const valueP = document.createElement("span");
      valueP.textContent = rating.Value;
      ratingdiv.appendChild(valueP);
      return ratingdiv;
    });
    ratingdivs.forEach((element) => {
      div_rate.appendChild(element);
    });

    peliculaDiv.appendChild(div_rate);

    // ............................................................FIN
    const lanzP = document.createElement("p");
    lanzP.textContent = pelicula.Released;
    peliculaDiv.appendChild(lanzP);

    const metaRating = document.createElement("p");
    metaRating.textContent = pelicula.Metascore;
    peliculaDiv.appendChild(metaRating);

    return peliculaDiv;
  });
  peliculasDiv.forEach((element) => {
    contendor.appendChild(element);
  });
};

const mostrarStrings = (strings) => {
  //Borrar contenido de contenedor
  contendor.innerHTML = "";

  //[string] -> [div]
  const stringDivs = strings.map((cadena) => {
    const stringDiv = document.createElement("div");
    stringDiv.textContent = cadena;
    return stringDiv;
  });
  //agregar todos los divs al contenedor
  stringDivs.forEach((stringDiv) => {
    contendor.appendChild(stringDiv);
  });
};

//....................................... TOP 3 PELICULAS CON MEJOR RATING
const top3 = () => {
  contendor.innerHTML = "";
  peliculas.sort((a, b) => {
    if (a.Metascore < b.Metascore) {
      return 1;
    } else if (b.Metascore < a.Metascore) {
      return -1;
    } else {
      return 0;
    }
  });
  const top_3 = peliculas.slice(0, 3);
  mostrarPeliculas(top_3);
};

//......................................ORDENAR POR FECHA DE LANZAMIENTO..................
// Convertir  "Released": "01 Feb 2019", a Date (año.mes,dia)

// Se convirito en tres elemetos separados con split

const arrayFechaString = peliculas.Released;

const stringToDate = (cadenaFecha) => {
  //Dividir la fecha en partes(dia,mes,año)
  const parteFecha = cadenaFecha.split(" ");

  //obtener las partes individuales
  const dia = parseInt(parteFecha[0], 10);
  const mesTexto = parteFecha[1];
  const year = parseInt(parteFecha[2], 10);
  const meses = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const mes = meses.indexOf(mesTexto); //Para el indice del mes

  //console.log(arrayFechaDate);
  return new Date(year, mes, dia);
};

//....Ordenar mi arreglo Date por fecha de lanzamiento
const ordenFecha = () => {
  contendor.innerHTML = "";

  peliculas.sort((a, b) => {
    const fechaA = stringToDate(a.Released);
    const fechaB = stringToDate(b.Released);
    if (fechaA < fechaB) {
      return -1;
    } else if (fechaB < fechaA) {
      return 1;
    } else {
      return 0;
    }
  });

  mostrarPeliculas(peliculas);
};

//...............................................ORDENAR POR TITULO ALFABETICAMENTE......................................................

const ordeAlfabetico = () => {
  contendor.innerHTML = "";

  peliculas.sort((a, b) => {
    if (a.Title.toLowerCase() > b.Title.toLowerCase()) {
      return 1;
    } else if (b.Title.toLowerCase() > a.Title.toLowerCase()) {
      return -1;
    } else {
      return 0;
    }
  });

  mostrarPeliculas(peliculas);
  peliculas.forEach((pelicula) => {
    console.log("imprimir", pelicula.Title);
  });
};
//..............................................................BARRA DE BUSQUEDA.........................................
//............................................AÑO
const searchInput1 = document.getElementById("searchInput1");
const resultList1 = document.getElementById("resultList1");

const yearSearch = () => {
  const searchIterm1 = searchInput1.value;
  const filteredYear = peliculas.filter((pelicula) =>
    pelicula.Year.toString().startsWith(searchIterm1)
  );
  resultList1.innerHTML = "";

  /*filteredYear.forEach((Year) => {
    li = document.createElement("li");
    li.textContent = Year;
    resultList1.appendChild(li);
  });
  */
  mostrarPeliculas(filteredYear);
};
searchInput1.addEventListener("input", yearSearch);
//...........................................TITULO......................................................
const searchInput = document.getElementById("searchInput"); //Capturandoo el input del html
const resultList = document.getElementById("resultList"); //capturando el input del html
//Funcion
const handleSearch = () => {
  const searchIterm = searchInput.value.toLowerCase();
  //
  const filteredPeliculas = peliculas.filter((pelicula) =>
    pelicula.Title.toLowerCase().startsWith(searchIterm)
  );

  resultList.innerHTML = "";

  /*  filteredPeliculas.forEach((Title) => {
    li = document.createElement("li");
    li.textContent = Title.Title;
    resultList.appendChild(li);
  });
*/
  mostrarPeliculas(filteredPeliculas);
};
//Invocandola
searchInput.addEventListener("input", handleSearch);

//.......................................Content Rating................................................................
const searchInput2 = document.getElementById("searchInput2"); //Capturandoo el input del html
const resultList2 = document.getElementById("resultList2"); //capturando el input del html
//Funcion
const ratedSearch = () => {
  const searchIterm2 = searchInput2.value.toLowerCase();
  //
  const filteredRated = peliculas.filter((pelicula) =>
    pelicula.Rated.toLowerCase().startsWith(searchIterm2)
  );

  resultList.innerHTML = "";
  /*
  filteredRated.forEach((Rated) => {
    li = document.createElement("li");
    li.textContent = Rated.Year;
    resultList.appendChild(li);
  });
  */
  mostrarPeliculas(filteredRated);
};
//Invocandola
searchInput2.addEventListener("input", ratedSearch);

//......................FECHA DE LANZAMIENTO
const searchInput3 = document.getElementById("searchInput3"); //Capturandoo el input del html
const resultList3 = document.getElementById("resultList3");
const releasedSearch = () => {
  const searchIterm3 = searchInput3.value.toLowerCase();
  const filteredReleased = peliculas.filter((pelicula) =>
    pelicula.Released.toLowerCase().startsWith(searchIterm3)
  );
  resultList1.innerHTML = "";
  /*
  filteredReleased.forEach((Released) => {
    li = document.createElement("li");
    li.textContent = Released;
    resultList1.appendChild(li);
  });
  */
  mostrarPeliculas(filteredReleased);
};
searchInput3.addEventListener("input", releasedSearch);

//BOTONES

const top3Button = document.getElementById("top3");
top3Button.addEventListener("click", top3);

const fechaLanzButton = document.getElementById("orden_f_lanz");
fechaLanzButton.addEventListener("click", ordenFecha);

const ordenAlButton = document.getElementById("orden_alf");
ordenAlButton.addEventListener("click", ordeAlfabetico);

const inicioButton = document.getElementById("inicio");
inicioButton.addEventListener("click", ordeAlfabetico);
