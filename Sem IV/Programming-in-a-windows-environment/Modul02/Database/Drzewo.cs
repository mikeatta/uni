using Osoba;
using Osoba = Osoba.Osoba;

namespace Drzewa
{
    public class Drzewo
    {
        public Drzewo()
        {
            korzen = null;
        }

        public Drzewo(string imie, string nazwsiko, int rok, byte miesiac, byte dzien)
        {
            global::Osoba.Osoba nowaOsoba = new global::Osoba.Osoba(imie, nazwsiko, new Data(rok, miesiac, dzien));
            DodajElement(nowaOsoba);
        }

        public Drzewo(List<global::Osoba.Osoba> osoby)
        {
            foreach (var os in osoby)
            {
                DodajElement(os);
            }
        }

        class Wezel
        {
            public global::Osoba.Osoba Dane;
            public Wezel Lewy=null, Prawy=null;

            public Wezel()
            {
                Dane = new global::Osoba.Osoba();
                Lewy = null;
                Prawy = null;
            }

            public Wezel(global::Osoba.Osoba osoba)
            {
                osoba = osoba;
                Lewy = null;
                Prawy = null;
            }

            public Wezel(string imie, string nazwisko, int rok, byte miesiac, byte dzien)
            {
                Dane.imie = imie;
                Dane.nazwisko = nazwisko;
                Dane.dataUrodzenia = new Data(rok, miesiac, dzien);
                Lewy = null;
                Prawy = null;
            }
            
            public void WypiszWezel()
            {
                if (Lewy != null)
                    Lewy.WypiszWezel();
                Dane.WypiszOsobe();
                Console.WriteLine();
                if (Prawy != null)
                    Prawy.WypiszWezel();
            }
        
        }
        private Wezel korzen = null;

        public bool CzyPuste()
        {
            return korzen == null;
        }

        public void DodajElement(global::Osoba.Osoba osoba)
        {
            if(korzen == null)
            {
                korzen = new Wezel();
                korzen.Dane = osoba;
                return ;
            }
            Wezel p = korzen, poprzedni;
            do{
                poprzedni = p;
                if(osoba.CompareTo(p.Dane )<0)
                    p = p.Lewy;
                else
                    p = p.Prawy;
            }
            while(p != null);
            if (osoba.CompareTo(poprzedni.Dane) < 0)
            {
                poprzedni.Lewy = new Wezel();
                poprzedni.Lewy.Dane = osoba;
            }
            else
            {
                poprzedni.Prawy = new Wezel();
                poprzedni.Prawy.Dane = osoba;
            }
        }   

        public void PrintAll()
        {
            if (korzen != null)
                korzen.WypiszWezel();
        }

        public Drzewo DeepCopy()
        {
            Drzewo copy = (Drzewo)this.MemberwiseClone();
            copy.korzen = new Wezel { Dane = korzen.Dane };
            return copy;
        }

        public Drzewo CopySharedPersonData()
        {
            Drzewo copy = (Drzewo)this.MemberwiseClone();
            copy.korzen = new Wezel
            {
                Dane = korzen.Dane,
                Lewy = korzen.Lewy,
                Prawy = korzen.Prawy
            };
            return copy;
        }
    }

}
