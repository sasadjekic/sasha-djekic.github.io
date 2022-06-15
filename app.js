const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controls');
const sectBtn = document.querySelectorAll('.control');

//Parent el svih sekcija kroz koje idemo kasnije sa foreach
const allSections = document.querySelector('.main-content');


function pageTransition(){

    ////ADDING CLASS ACTIVE-BTN TO Button for it to change color and show which page iz active
    //Tranzicija stranica odnosno promena active-btn klase butona za stranice 
    for (let i = 0; i < sectBtn.length; i++) {
        /*Za svaki element sa klasom control (svako dugme) se:
        - dodaje Event listener sa:
             1. funkcijom koja dohvata element sa klasom 'active-btn' i smesta u varijablu
             2. i brise mu tu klasu (prazan string)  preko className
             3. a zatim elementu na koji je kliknuto (preko this koji upucuje na taj element) se 
            dodaje klasa 'active-btn'*/ 
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelector('.active-btn');
            console.log(currentBtn.classList)
            currentBtn.className = currentBtn.className.replace('active-btn', ''); //string operacija
            //Moze i sa let currentBtn = document.querySelectorAll('.active-btn'); - visestruka selekcija
            //currentBtn[0].className = currentBtn[0].className.replace('active-btn', ''); - [0] samo jedan el.

            this.className += ' active-btn'

        })
        

    }



    /*primeniti “event delegation” tehniku koja se zasniva na tome da se definiše samo jedan “event listener” 
    na roditeljskom elementu. Princip na kojem radi ova tehnika se zasniva na osobini da ukoliko aktiviramo neki 
    dogadjaj na elementu, zbog bubbling rasporeda aktiviranja dogadjaja, posle nekog vremena će taj dogadjaj 
    biti “okinut” i na roditeljskom elementu. A da bi odredili koji je element bio okidač dogadjaja ova tehnika 
    koristi “event.target” svojstvo. Pored jednostavnosti ove tehnike i smenjenje potrošnje resursa, 
    prednost je što su na ovaj način obuhvaćeni i budući dinamički kreirani elementi.*/

    //ADDING CLASS ACTIVE TO ELEMENT for page to stand out
    //Sections Active
    allSections.addEventListener('click', (e) => { //PointerEvent sa brojnim atributima - izmedju ostalih i target
        //console.log(e)
        //console.log(e.target);  //npr - div class="control control-1 active-btn" data-id="home">
        const id = e.target.dataset.id; // element sa data atributom i vrednoscu id
        if(id){
            //ukljanjanje selekcije sa drugih btns i setovanje kliknute na klasu active
            console.log(sectBtn) // NodeList(5) [ div.control.control-1, div.control.control-2, ...5]
            sectBtn.forEach((btn) => { //ili secBtns!
                //uklanjanje iz niza 
                btn.classList.remove('active');
            })
            e.target.classList.add('active');

            //Skrivanje svih ostalih sekcija uklanjanjem klase active
            sections.forEach((section) => {
                console.log(section)
                section.classList.remove('active')
                console.log(section)
            })
            //Nakon sto je svim sekcijama uklonjena klasa active, setuje se el. koji je kliknut 
            const element = document.getElementById(id);
            element.classList.add('active')

        }
    })

    //COLOR THEME TOGGLE
    //U okviru ove funkcije dodajemo i funkcionalnost za menjanje colorne sheme tamno/svetlo
    //To postizemo dodavanjem event lisenera na buton element i dodavanju klase sa svetlim bojama 
    //preko metoda toggle() - klik - dodajemo, sledeci klik - uklanjamo, sledeci - dodajemo...
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', () => {
        let element = document.body;
        element.classList.toggle('light-mode');
    })
}

pageTransition();
