using System;
using System.Xml;

namespace Kadry
{
    public class OsobaDlaKonsoli
    {
        private Osoba _osoba;

        public Osoba Osoba
        {
            set { _osoba = value; }
            get { return _osoba; }
        }

        public OsobaDlaKonsoli()
        {
            Console.Write("Enter a name: ");
            string imie = Console.ReadLine();
            Console.Write("Enter a surname: ");
            string nazwisko = Console.ReadLine();
            int numerEwidencyjny;
            do
            {
                Console.Write("Enter you registration number: ");
            } while (!int.TryParse(Console.ReadLine(), out numerEwidencyjny));

            int rokUrodzenia;
            do
            {
                Console.Write("Enter your year of birth: ");
            } while (!int.TryParse(Console.ReadLine(), out rokUrodzenia));
            
            Console.WriteLine("\nEnter your address");
            AdresDlaKonsoli adr = new AdresDlaKonsoli();
            this.Osoba = new Osoba(numerEwidencyjny, rokUrodzenia, imie,
                nazwisko, adr.Adres);
        }

        public OsobaDlaKonsoli(Osoba osoba)
        {
            this.Osoba = osoba;
        }

        public void ZmienNazwisko()
        {
            Console.Write("Enter a new surname: ");
            Osoba.Nazwisko = Console.ReadLine();
        }

        public void ZmienAdres()
        {
            Console.WriteLine("Enter new address: ");
            AdresDlaKonsoli adr = new AdresDlaKonsoli();
            _osoba.AdresZamieszkania = adr.Adres;
        }

        public void WypiszOsobe()
        {
            Console.Write("Pan(i) {0} {1} numer ewidencyjny {2} lat {3} ",
                Osoba.Imie, Osoba.Nazwisko, Osoba.NumerEwidencyjny, Osoba.Wiek);
            AdresDlaKonsoli adr = new AdresDlaKonsoli(Osoba.AdresZamieszkania);
            adr.WypiszAdres();
        }
    }
}