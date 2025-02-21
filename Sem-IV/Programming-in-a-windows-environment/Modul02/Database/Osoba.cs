namespace Osoba
{
    public struct Data
    {
        private int rok;
        private byte miesiac;
        private byte dzien;

        public Data(int rok, byte miesiac, byte dzien)
        {
            this.rok = rok;
            this.miesiac = miesiac;
            this.dzien = dzien;
        }

        public void WprowadzDate()
        {
            Console.Write("Podaj rok: ");
            rok = Convert.ToInt32(Console.ReadLine());
            do
            {
                Console.Write("Podaj miesi¹c: ");
                miesiac = Convert.ToByte(Console.ReadLine());
            }
            while (miesiac < 1 || miesiac > 12);
            bool flaga = true;
            do
            {
                Console.Write("Podaj dzieñ: ");
                dzien = Convert.ToByte(Console.ReadLine());
                if(dzien>=1 && dzien<=31)
                {
                    switch (miesiac)
                    {
                        case 2:
                            if (dzien < 29)
                                flaga = false;
                            break;
                        case 4:
                        case 6:
                        case 9:
                        case 11:
                            if(dzien<=30)
                                flaga = false;
                            break;
                        default:
                            flaga = false;
                            break;
                    }
                }
                
            }
            while (flaga);
        }

        public void WypiszDate()
        {
            Console.Write("{0}-{1}-{2}", dzien, miesiac, rok);
        }
    }

    public class Osoba
    {
        public string imie;
        public string nazwisko;
        public Data dataUrodzenia;

        public Osoba()
        {
            nazwisko = "Kowalski";
            imie = "Jan";
            dataUrodzenia = new Data(1990, 12, 1);
        }

        public Osoba(string imie, string nazwisko, Data dataUrodzenia)
        {
            this.imie = imie;
            this.nazwisko = nazwisko;
            this.dataUrodzenia = dataUrodzenia;
        }

        public void WprowadzOsobe()
        {            
            Console.Write("Podaj imie: ");
            imie = Console.ReadLine();
            Console.Write("Podaj nazwisko: ");
            nazwisko = Console.ReadLine();
            dataUrodzenia.WprowadzDate();
        }

        public void WypiszOsobe()
        {
            Console.Write("Pan(i) {0} {1}, urodzony(a): ", imie, nazwisko);
            dataUrodzenia.WypiszDate();
        }

        public int CompareTo(Osoba os2)
        {
            int i = String.Compare(nazwisko, os2.nazwisko);
            if (i != 0)
                return i;
            return String.Compare(imie, os2.imie);
        }
    }
}
