import Layout from "app/core/layouts/Layout"

function TC() {
  return (
    <>
      <div className="mx-20 mt-20">
        <div className="flex justify-center text-3xl font-semibold text-black">
          Termeni si Conditii
        </div>
        <div className="mt-12 text-justify">
          <p>
            Te rugam sa lecturezi cu atentie urmatoarea Politica pentru a intelege cum vor fi
            tratate informatiile despre tine denumite in continuare "date cu caracter personal".
            Prin prezenta Politica dorim sa informam persoanele care acceseaza site-ul
            www.baltazatun.ro cu privire la natura datelor cu caracter personal pe care le operam,
            cu privire la scopurile prelucrarii si cu privire la drepturile de care beneficiaza
            aceste persoane.
            <br /> Date cu caracter personal inseamna orice informatii privind o persoana fizica
            identificata sau identificabila ("persoana vizata"); o persoana fizica identificabila
            este o persoana care poate fi identificata, direct sau indirect, in special prin
            referire la un element de identificare, cum ar fi un nume, un numar de identificare,
            date de localizare, un identificator online, sau la unul sau mai multe elemente
            specifice, proprii identitatii sale fizice, fiziologice genetice, psihice, economice,
            culturale sau sociale.
            <br /> Prin furnizarea oricaror date cu caracter personal prin intermediul site-ului
            www.baltazatun.ro , intelegi si esti de acord ca datele tale vor fi prelucrate in
            conformitate cu prevederile prezentei Politici de protectie a datelor. Pentru a accesa
            website-ul nostru nu este nevoie sa te inregistrezi. Cu toate acestea, pot exista
            circumstante in care alegi sa te inregistrezi/inscrii pentru a primi informari sau
            noutati despre serviciile si solutiile noastre sau despre actiunile desfasurate de noi.
            In aceste cazuri, putem contacta persoanele inregistrate pentru a le invita la
            evenimente, pentru a le oferi informatii despre serviciile noastre sau pentru alte
            scopuri de marketing direct.
            <br /> Daca esti doar un vizitator, nu colectam informatii personale, decat informatiile
            stocate prin utilizarea cookie-urilor, care sunt descrise la Sectiunea "Politica de
            cookie." Daca ne contactezi prin e-mail, fax sau prin intermediul acestui site, ne vom
            permite sa te contactam in viitor pentru a-ti trimite materiale si oferte promotionale
            sau a te informa in legatura cu ofertele pe care le avem sau cu evenimentele pe care le
            vom organiza sau la care vom participa. Nu vom folosi niciodata numele sau informatiile
            despre tine fara sa avem in prealabil acordul tau. Vei avea posibilitatea sa ne comunici
            daca doresti sa primesti aceste informatii in viitor. Scopul nostru, in ceea ce priveste
            site-ul nostru, este unul de informare si prezentare, iar noile reguli de protectie a
            datelor cu caracter personal (GDPR) fac parte din acest context. Prin urmare, iti
            promitem ca siguranta datelor tale este o prioritate pentru noi si ca folosim aceste
            date pentru unicul scop de a-ti oferi o experienta personalizata atat pe site-ul nostru,
            cat si pe platformele online pe care ne promovam serviciile. Folosim datele tale, doar
            daca avem acordul tau, in mai multe feluri, in functie de natura lor.
            <br /> In cazul in care ne-ai furnizat adresa ta de e-mail, o vom folosi pentru a-ti
            trimite emailuri de informare cu privire la serviciile noastre, evenimentele si
            proiectele noastre, publicate periodic pe acest site. In cazul in care ne-ai furnizat
            Prenumele si Numele tau, folosim aceste date pentru a personaliza email-urile pe care le
            primesti de la noi.In cazul in care ne-ai furnizat Numarul de Telefon, folosim aceste
            date pentru a te putea contacta rapid, in cazul in care depui comenzi sau participi la
            evenimentele noastre/in cadrul proiectelor noastre, in scopul informarii cu privire la
            locurile de desfasurare a acestor proiecte/evenimente sau la modificarile de ultim
            moment in programul acestora.
            <br />
            In cazul in care ai fost de acord sa colectam detaliile despre Browser, IP, Dispozitiv,
            folosim aceste date pentru a determina cum folosesti site-ul nostru, scopul fiind sa
            facem schimbarile necesare pentru ca tu sa gasesti mai usor informatiile pe care le
            cauti.Datele tale cu caracter personal pot fi transmise catre alte entitati doar pe baza
            consimtamantului tau expres, cu exceptia situatiilor in care exista o obligatie legala
            pentru noi de a proceda in acest mod. Te rugam sa ai in vedere ca este posibil ca, in
            anumite circumstante, sa avem obligatia de a divulga datele dumneavoastra cu caracter
            personal, partenerilor cu care colaboram si/sau altor terti care ne furnizeaza servicii.
            Nu am vandut, nu vindem si nu vom vinde niciodata datele tale catre terte parti. Oferim
            servicii care se bazeaza pe increderea clientilor si a potentialilor clienti, iar
            siguranta datelor personale este esentiala in acest proces.
          </p>
        </div>
      </div>
    </>
  )
}

export default TC

TC.getLayout = (page) => <Layout title="TC">{page}</Layout>
