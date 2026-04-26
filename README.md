# Inlämningsuppgift 1 i JavaScript intro

## Hej och välkommen till min README för JavaScript intro

Jag presenterar här med mitt projekt, G:s Donut Shop. (Gettruds Donut Shop)

Jag valde att gå för en clean design som både skall funka i desktop och mobile. Sidan är annpassad efter mobile-first. Jag ville att sidan skulle kännas lekfull och färgglad, då det trots allt är en Donut-butik :) <br>Fokus har legat på att webbshoppen skall vara enkel att navigera, tillgänglig, och anpassningsbar till olika enheter. <br><br> Tyvärr hann jag ej med att få dit en footer eller darkmode - då tiden ej fanns där. Jag prioriterade i första hand funktioner i JS vilket har varit en utmaning, men också väldigt roligt och inte minst lärorikt. <br> I och med att JS ska implementeras som ytterligare ett element i projekt så förstår jag hur otroligt viktigt det blir med ett bra och strukturerat HTML-träd. <br> <br> Jag valde till en början att sammla all JavaScript kod i en och samma main-fil. Men när den blev över 1000-rader lång (Förmodligen inte opimal DRY-kodning), så valde jag att göra en mapp-struktur, likt mina tidigare projekt med SASS. <br> Detta var både hjälpsamt och en stor utmaning under projektets gång. Jag kommer in på detta under <b>"utmaningar".</b>

### Tech-stack:

- HTML5
- SCSS
- JavaScript (Vanilla)
- Vite
- GitHub

---

## Presentation av sidan

### Mobile Screenshots:

<img 
  src="public/assets/README-pics/mobile_first_hero.png" 
  alt="Mobile first hero view"
  width="600"
/>

<img 
  src="public/assets/README-pics/mobile_first_product.png" 
  alt="Mobile first product view"
  width="600"
/>

<img 
  src="public/assets/README-pics/mobile_first_cart.png" 
  alt="Mobile first cart view"
  width="600"
/>

<img 
  src="public/assets/README-pics/mobile_first_checkout.png" 
  alt="Mobile first checkout view"
  width="600"
/>

---

### Desktop:

<img 
  src="public/assets/README-pics/desktop_hero.png" 
  alt="Desktop hero view"
  width="750"
/>

<img 
  src="public/assets/README-pics/desktop_product.png" 
  alt="Desktop product view"
  width="750"
/>

<img 
  src="public/assets/README-pics/desktop_cart.png" 
  alt="Desktop cart view"
  width="750"
/>

<img 
  src="public/assets/README-pics/desktop_checkout.png" 
  alt="Desktop checkout view"
  width="750"
/>

---

### Validators:

<img 
  src="public/assets/README-pics/css_validator.png" 
  alt="CSS-validator from W3SCHOOLS"
  width="1000"
/>

<b> Inga Errors för CSS </b>

<img 
  src="public/assets/README-pics/html_validator.png" 
  alt="HTML-validator from W3SCHOOLS"
  width="1000"
/>

<b> Varningar finns för HTML, dock är det bara på kommentarer. </b>

---

### Lighthouse:

<b>Mobile:</b> <br><br> <img 
  src="public/assets/README-pics/lighthouse_report_mobile.png" 
  alt="Lighthouse report for mobile"
  width="1000"
/>

<b>Desktop:</b> <br><br> <img 
  src="public/assets/README-pics/lighthouse_report.png" 
  alt="Lighthouse report for desktop"
  width="1000"
/>

---

### Utmaningar

Den största utmaningen i projektet var att få ordning på struktur. Till en början så tyckte jag det var svårt att se och finna logik i koden, men desto mer jag suttit med det under projektet, desto mer logiskt har det blivit med JavaScript (Snälla inte fler språk nu ;D ) <br> Som sagt i introduktionen så bestämde jag mig för att göra en omfattande mapp-struktur för JavaScript-koden. Det gjorde så att jag inte riktigt visste vart jag var. Hela projektet kändes nytt.. Koden var svår att hitta. Det tog otroligt lång tid för att hitta åter hitta synergi och tempo i arbetet. <br> Jag ångrar det inte då det istälet var hjälpsamt framåt slutet.

### Reflektion och framtidstänk

- Jag tar framförallt med mig att börja tidigt med en mappstruktur för JavaScript likt det jag tidigare gjort med SASS.
- Jag förstår varför "utvecklare" säger, <b>90% felsökning - 10% kodning.</b> Ändrar jag på något i min kod, då är det buggar någon annanstanns. Jag är helt säker på att människor som kodar har bäst tålamod i hela världen.
- Fokus på en sak i taget - framförallt när det kommer till JavaScript.
- Jag är otroligt glad att jag följde Jennis rekommendation om issues i GitHub och Pseudokod - Det har hjälpt mig <b>OTROLIGT</b> mycket att få en bättre struktur och arbetsflöde. Att ticka av något som är klart är en ganska kul känsla :)

### Kommentarer

- Jag har lagt in testers - om du skall prova måndagsrabatt / helgpåslag. Det ligger under orderSummary.js, högst upp i filen. <br><br> FORCERA måndag före 10.00 (For testing) const FORCE_MONDAY_DISCOUNT = false; <br>FORCERA helgpåslag 15% (For testing) const FORCE_WEEKEND_MARKUP = false;
- Timern har jag console.loggat -> funktionen funkar. För att testa satte jag timer på 5 sekunder -> Sidan återvänder till cart-menu med ett meddelande "You snooze you loose"<br>
- <b>OBS!</b> Jag har använt luhn algorithm. Mest för att jag va sjukt nyfiken på hur den funkar och agerar. Jag lade förmodligen allt för lång tid på att lära mig hur beräkningen fungerar, så jag kunde inte låta bli. Men basically så kommer du inte vidare utan ett giltligt personnummer i detta fall. Sorry ^.^ Hoppas det är Ok.<br><br>

Sist men inte minst! Ett STORT tack för ett roligt projekt!

<b>Länk till live-version:</b><br> https://medieinstitutet.github.io/fed25d-js-intro-inl-1-AlexJCodes/
